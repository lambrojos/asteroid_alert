#
# Development environment for mobsystem-adv-messaging
# Not suitable for production
#
FROM node:7
RUN npm install -g knex nodemon mocha istanbul node-gyp snyk jsdoc
WORKDIR /src
RUN mkdir ~/ssh
#CMD ["/bin/sh","/src/start.sh"]
