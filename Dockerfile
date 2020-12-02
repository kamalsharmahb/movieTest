# Dockerfile

FROM node:15.3.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#RUN adduser --disabled-password app
#COPY addressbook/ .
#RUN chown -R app:app /opt/app
#USER app
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "pm2" ]