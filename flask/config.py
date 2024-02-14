import os

import psycopg2

conn = psycopg2.connect(
    os.environ.get('DATABASE_URL', 'postgresql://ahmed:ahmed@silberfluss_assessment_db:5432/questionnaire'))
