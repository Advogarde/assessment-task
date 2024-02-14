#!/bin/bash
echo "Stop Container"
docker stop silberfluss_assessment_backend
docker stop silberfluss_assessment_frontend
docker stop silberfluss_assessment_db
echo "Start Container"
docker-compose -f ./docker-compose.yml up