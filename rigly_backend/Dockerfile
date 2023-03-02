FROM python:3.10.2-slim-bullseye

RUN apt-get update && apt-get -y install cron vim



ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY crontab /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab
RUN /usr/bin/crontab /etc/cron.d/crontab

# run crond as main process of container


COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy from the current directory of the Dockerfile to /api in the image
COPY . . 
CMD ["cron", "-f"]
EXPOSE 8000
