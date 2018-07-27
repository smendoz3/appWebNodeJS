FROM node:9.6.1

LABEL version="1.0"
LABEL description="Web app GPS NodeJS"
LABEL maintainer="Santiago Mendoza - smendoz3@eafit.edu.co" 

ARG PORT=3000
ENV PORT $PORT  

WORKDIR /nodeApp

COPY . ./

RUN npm install --test

EXPOSE 3000

CMD npm start