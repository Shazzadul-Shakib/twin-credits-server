FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build && \
    echo "Checking dist folder contents:" && \
    ls -la dist/ && \
    test -f dist/server.js || (echo "ERROR: dist/server.js not found!" && exit 1)

RUN npm prune --production

EXPOSE 5000

CMD ["npm", "start"]