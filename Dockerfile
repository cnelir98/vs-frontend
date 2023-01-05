FROM node:16-alpine as build
#Create working directory
WORKDIR /usr/src/app
#Copy full application code into the working directory
COPY . .
COPY package*.json ./
#Install all dependencies of angular application
RUN npm install
#Build angular apdocplication
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/vs-frontend /usr/share/nginx/html

# Expose port 4200
EXPOSE 80
