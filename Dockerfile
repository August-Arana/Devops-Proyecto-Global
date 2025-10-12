################################################################################
# Base dependencies
################################################################################
FROM node:20-alpine AS dependencies

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

RUN npm install --only development --loglevel verbose

CMD ["npm", "run", "start:dev"]

################################################################################
# Productive Enviroment
################################################################################
FROM dependencies AS production

CMD ["npm", "run", "start:prod"]
