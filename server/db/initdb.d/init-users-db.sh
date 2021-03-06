#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER blog;
    CREATE DATABASE blog_db ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog;

    ALTER USER blog WITH PASSWORD 'password123';
    ALTER USER blog WITH SUPERUSER;
EOSQL
