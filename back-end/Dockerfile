FROM python:3.10-slim@sha256:161d1e3deddba156d7834d15e6fe4d010b3b6f69f18ee1cfba9348e712f4a4ba
LABEL org.opencontainers.image.authors="Jason Cameron <contact@jasoncameron.dev>"
LABEL org.opencontainers.image.source="https://github.com/JasonLovesDoggo/gdsc"
ENV PYTHONUNBUFFERED 1 \
    PYTHONDONTWRITEBYTECODE 1 \
    POETRY_NO_INTERACTION=1 \ 
    POETRY_HOME="/poetry" \
    POETRY_VIRTUALENVS_CREATE=false 
    

# ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"
    
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    # deps for installing poetry
    curl \
    # deps for building python deps
    build-essential 

RUN python -m pip install setuptools aiohttp fastapi uvicorn gcloud-aio-storage --no-cache-dir


WORKDIR /code



# Install requirements via poetry
# COPY pyproject.toml poetry.lock /code/
# RUN poetry install --no-root --no-dev && \
#     python -m pip install fastapi uvicorn

COPY . /code

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

