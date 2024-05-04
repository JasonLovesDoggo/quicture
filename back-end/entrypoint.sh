#!/bin/bash
# fastapi run main.py --proxy-headers --port 8300 
uvicorn main:app --host 0.0.0.0 --port 8300 --log-config /log-format.yml  --proxy-headers 
