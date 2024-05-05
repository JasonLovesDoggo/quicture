FROM node:20.5.0

#copy source 

WORKDIR /app
COPY . /app

# Install deps 
RUN cd /app && npm install 

# Build 
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]