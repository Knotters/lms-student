FROM node:latest

WORKDIR /student

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

ADD /student/build /var/www/student