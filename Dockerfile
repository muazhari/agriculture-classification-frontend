FROM node:18.13.0-alpine
ENTRYPOINT [ "/bin/sh", "-c"]
WORKDIR /repository
COPY . .
RUN yarn install