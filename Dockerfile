FROM node:18

# Create app directory
WORKDIR /usr/src/app
# Bundle app source
COPY . .

# If you are building your code for production
RUN npm ci --only=production

CMD [ "node", "server.js" ]