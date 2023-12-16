#!/bin/bash

cd /data
source venv/bin/activate

cd /data/app
pip install -r requirements.txt
python manage.py runserver 0.0.0.0:8000