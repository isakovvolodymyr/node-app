FROM node:12

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN apt-get update -y && apt-get install -y

# Bundle app source
COPY . .
CMD ["nodemon"]
