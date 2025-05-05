FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "run", "start:prod"]