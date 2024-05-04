from typing import Union

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/")
async def root():
    return RedirectResponse("/docs")


@app.post('/upload/{room_hash}/')
def upload(room_hash: str, file: UploadFile = File(...)):
    if len(room_hash) != 32:
        raise HTTPException(status_code=400, detail='Invalid room hash')

    try:
        contents = file.file.read()
        file.file.seek(0)
        # Upload the file to to your S3 service
        s3_client.upload_fileobj(file.file, 'local', 'myfile.txt')
    except Exception:
        raise HTTPException(status_code=500, detail='Something went wrong')
    finally:
        file.file.close()
    
    return {'filename': file.filename, 'room_hash': room_hash}
