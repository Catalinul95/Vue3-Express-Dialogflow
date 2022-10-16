FROM node
WORKDIR /usr/src/app/server
COPY package*.json ./
COPY . . 
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "dev"]