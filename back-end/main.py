from os import urandom
from typing import List
import string as strings
import secrets
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import RedirectResponse
from utils.gcp import upload_to_bucket, get_list_by_room
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    expose_headers=["*"],
    allow_headers=["*"],
)

SYMBOLS = "@#!$%()*+-.:;<=>[]^_~"
def generate_hash():
    charset = strings.ascii_letters + strings.digits + SYMBOLS
    return ''.join([secrets.choice(charset) for _ in range(32)])

@app.get("/generate/")
async def generate():
    "Generates a random room hash."
    return generate_hash()

@app.get("/")
async def root():
    "Just redirects you to the docs page for the API."
    return RedirectResponse("/docs")

@app.get("/list/{room_hash}/")
async def list_files(room_hash: str) -> List[str]:
    """Returns the list of files in the bucket in the form of a list of URLs."""
    if len(room_hash) != 32:
        raise HTTPException(status_code=400, detail='Invalid room hash')
    raw_data = await get_list_by_room(room_hash)
    del raw_data['kind']
    parsed_image_links: List[str] = [obj["mediaLink"] for obj in raw_data["items"]]
    return parsed_image_links


@app.post('/upload-multi/{room_hash}/')
async def upload_multi(room_hash: str, files: List[UploadFile] = File(...)):
    "Uploads multiple files to the bucket. The room_hash is the name of the folder in the bucket."
    if len(room_hash) != 32:
        raise HTTPException(status_code=400, detail='Invalid room hash')
    for file in files:
        try:
            contents = file.file.read()
            file.file.seek(0)
            # Upload the file to to your S3 service
            if file.filename is None:
                file.filename = str(urandom(8)) # if there is no filename, generate a random one
            await upload_to_bucket(room_hash, file.filename, contents)
        except Exception:
            raise HTTPException(status_code=500, detail='Something went wrong')
        finally:
            file.file.close()
    
    return {'room_hash': room_hash, 'files': [file.filename for file in files]}

@app.post('/upload/{room_hash}/')
async def upload(room_hash: str, file: UploadFile = File(...)):
    "Uploads a file to the bucket. The room_hash is the name of the folder in the bucket."
    if len(room_hash) != 32:
        raise HTTPException(status_code=400, detail='Invalid room hash')

    try:
        contents = file.file.read()
        file.file.seek(0)
        # Upload the file to to your S3 service
        if file.filename is None:
            file.filename = str(urandom(8)) # if there is no filename, generate a random one
        await upload_to_bucket(room_hash, file.filename, contents)
    except Exception:
        raise HTTPException(status_code=500, detail='Something went wrong')
    finally:
        file.file.close()
    
    return {'filename': file.filename, 'room_hash': room_hash}

