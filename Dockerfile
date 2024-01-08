FROM node:20.10.0

RUN npm install -g @nestjs/cli@10.0.0

WORKDIR /app

CMD [ "tail", "-f", "/dev/null" ]