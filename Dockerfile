FROM nginx
COPY . /usr/share/nginx/html
RUN echo 'index Signup.html;' >> /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
