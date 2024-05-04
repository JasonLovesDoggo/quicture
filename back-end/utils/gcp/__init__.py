import aiohttp
from typing import  Dict, Any
import os
from gcloud.aio.storage import Storage
BUCKET_NAME = 'quickshare-images'
CREDS_FILE = '/home/json/.secrets/gdsc/creds.json' 
if os.getenv("ENVIROMENT", "local") == "production":
    CREDS_FILE = '/creds.json'


async def upload_to_bucket(room_hash: str, file_name: str, file_obj: bytes):
    """ Upload csv files to bucket. """
    async with aiohttp.ClientSession() as session:
        storage = Storage(service_file=CREDS_FILE, session=session) 
        status = await storage.upload(BUCKET_NAME, f'{room_hash}/{file_name}', file_obj)
        return status['selfLink']
        



async def get_list_by_room(room_hash: str) -> Dict[str, Any]:
    async with aiohttp.ClientSession() as session:
        storage = Storage(service_file=CREDS_FILE, session=session) 
        images = await storage.list_objects(BUCKET_NAME, params={"prefix": room_hash})
        return images
