#!/bin/bash
python3 -m venv venv
source venv/bin/activate

cd app
pip install --upgrade setuptools
pip install -r requirements.txt

python manage.py runserver