################################################################################
# Base dependencies
################################################################################
FROM node:20 AS dependencies

RUN mkdir -p /opt/devops-project

WORKDIR /opt/devops-project

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . ./

################################################################################
# Development Enviroment
################################################################################
FROM dependencies AS development

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]

RUN npm install --only development --loglevel verbose

################################################################################
# Productive Enviroment
################################################################################
FROM dependencies AS production

CMD ["npm", "run", "start:prod"]
