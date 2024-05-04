#!/bin/bash
# fastapi run main.py --proxy-headers --port 8300 
uvicorn main:app --port 8300 --log-config /log-format.yml  --proxy-headers 
