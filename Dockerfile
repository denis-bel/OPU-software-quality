FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npm i pm2 @babel/cli @babel/node @babel/core @babel/preset-env sequelize-cli -g

COPY . .

RUN babel src -d dist --extensions ".ts,.js"

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "api"]