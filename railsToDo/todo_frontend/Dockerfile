FROM node:14-slim
WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install react-scripts@2.1.8 -g --silent
COPY . /app

EXPOSE 5000

CMD ["npm", "start"]
