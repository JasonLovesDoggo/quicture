FROM python:3.10-slim
LABEL org.opencontainers.image.authors="Jason Cameron <contact@jasoncameron.dev>"
LABEL org.opencontainers.image.source="https://github.com/JasonLovesDoggo/gdsc"
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /code
# Install requirements via poetry
COPY pyproject.toml poetry.lock /code/
RUN python -m pip install --no-cache-dir poetry && \
    python -m poetry config virtualenvs.in-project true && \
    python -m poetry install --no-root && \ 
    python -m pip uninstall poetry -y


# 
COPY . /code/

# 
CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "80"]
