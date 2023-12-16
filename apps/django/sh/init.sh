#!/bin/bash
cd /data
python -m venv venv
source venv/bin/activate

cd /data/app
pip install --upgrade setuptools
pip install -r requirements.txt