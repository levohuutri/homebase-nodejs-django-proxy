build: 
	docker compose build

up: 
	docker compose up

bash-express: 
	docker compose exec express sh

build-express:
	docker compose build express --no-cache

bash-django: 
	docker compose exec django bash

build-django:
	docker compose build django --no-cache
