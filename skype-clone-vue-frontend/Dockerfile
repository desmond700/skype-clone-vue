FROM node:12.18-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install ./
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]
