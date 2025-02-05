# Use an official Nginx image as a base
FROM nginx:alpine

# Copy your static website files (e.g., index.html) into the container
COPY . /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

