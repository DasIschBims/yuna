# Stage 0 - Install dependencies
FROM node:18 as dependencies
WORKDIR /usr/src/app

# Install app dependencies and copy files
COPY package.json ./
COPY /prisma ./prisma

RUN npm install --omit=dev

################################################
# Stage 1 - Build app
FROM node:18 as build
WORKDIR /usr/src/app

# Copy app dependencies
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy app source
COPY . .

# Build app
RUN npm run build

################################################
# Stage 2 - Run app
FROM node:18 as run
WORKDIR /usr/src/app

# Copy files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/.env ./.env
COPY --from=build /usr/src/app/prisma ./prisma

# Change NODE_ENV to prod inside .env if not already set
RUN sed -i 's/NODE_ENV=.*/NODE_ENV=prod/g' .env

# Debugging
RUN ls -la
RUN pwd
RUN cat .env

# Run the app
CMD [ "npm", "run", "start:prod" ]

