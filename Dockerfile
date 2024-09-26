# Use the official NGINX base image from Docker Hub
FROM nginx:latest

# Copy the content of the current directory (your application files)
# to the default NGINX public directory
COPY . /usr/share/nginx/html

# Expose port 80 (default NGINX port) to the Docker host
EXPOSE 80

# Run NGINX in the foreground to keep the container running
CMD ["nginx", "-g", "daemon off;"]
