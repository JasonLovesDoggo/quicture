import asyncio
import aiohttp
from typing import  Dict, Any
from aiofile import AIOFile
from gcloud.aio.storage import Storage 
CREDS_FILE = '/home/json/.config/gcloud/application_default_credentials.json'
BUCKET_NAME = 'quickshare-images'
async def upload_to_bucket(room_hash: str, file_name: str, file_obj: bytes):
    """ Upload csv files to bucket. """
    async with aiohttp.ClientSession() as session:
        storage = Storage(service_file=CREDS_FILE, session=session) 
        status = await storage.upload(BUCKET_NAME, f'{room_hash}/{file_name}', file_obj)
        print(status)
        return status['selfLink']
        



async def get_list_by_room(room_hash: str) -> Dict[str, Any]:
    async with aiohttp.ClientSession() as session:
        storage = Storage(service_file=CREDS_FILE, session=session) 
        images = await storage.list_objects(BUCKET_NAME, params={"prefix": room_hash})
        return images
