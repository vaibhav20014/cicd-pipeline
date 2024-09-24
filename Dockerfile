# Use an Nginx base image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the HTML and CSS files into the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Update Nginx to listen on port 8000
RUN sed -i 's/listen 80;/listen 8000;/' /etc/nginx/conf.d/default.conf

# Nginx will serve the static files by default
CMD ["nginx", "-g", "daemon off;"]
