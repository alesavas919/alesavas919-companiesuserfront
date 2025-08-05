# # Usa una imagen base de Node.js con la versión que necesites
# FROM node:22-alpine AS base
# #FROM node:18 AS base
# # FROM node:18 AS base

# # Establece el directorio de trabajo en el contenedor
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:alpine
# # FROM nginx:stable-alpine as production-stage

# COPY --from=base /app/dist /usr/share/nginx/html
# #
# # COPY nginx.conf /etc/nginx/conf.d/default.conf
# #
# ####################RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html
# #
# EXPOSE 5173
# #E################XPOSE 80

# # ARGS
# ARG VITE_TEST_SHOW
# ARG VITE_INDEX_API_URL

# ENV VITE_INDEX_API_URL=${VITE_INDEX_API_URL}
# ENV VITE_TEST_SHOW=${VITE_TEST_SHOW}

# # Comando para ejecutar la aplicación 
# CMD ["nginx", "-g", "daemon off;"]
###################################
# Compilation
FROM node:22-alpine as build

# Get dir
WORKDIR /app

# Packages
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy all files
COPY . .

# Build project
RUN npm run build

# Create server nginx
FROM nginx:stable-bookworm as production-stage
#FROM nginx:1.13.12-alpine as production-stage

# Start server
COPY --from=build /app/dist /usr/share/nginx/html

# Port
EXPOSE 80

# Init server command
CMD ["nginx", "-g", "daemon off;"]