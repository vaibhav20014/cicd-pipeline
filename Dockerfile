FROM nginx
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf  # Copy custom config
CMD ["nginx", "-g", "daemon off;"]
