# Use the official Nginx image as the base
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy the website files to the Nginx HTML folder
COPY . /usr/share/nginx/html

# Expose port 80 to serve the website
EXPOSE 8000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
