FROM node
WORKDIR /usr/src/app/client
COPY package*.json ./
COPY . . 
RUN npm install
EXPOSE 4000

CMD ["npm", "run", "dev"]