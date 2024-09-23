# Use an Nginx base image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the HTML and CSS files into the container
COPY . .

# Expose port 80
EXPOSE 8000

# Nginx will serve the static files by default
CMD ["nginx", "-g", "daemon off;"]
