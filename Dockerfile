# Select a base image
FROM node:6-alpine
# Add an unprivileged user
RUN adduser -D -u 1001 app 
# Create a working directory and change its permissions 
RUN mkdir -p /usr/src/app && chown -R app /usr/src/app
# Switch to that path
WORKDIR /usr/src/app
# Switch to the user we created
USER 1001
# Copy files to current path
COPY . .
# Use node package manager to build app and run tests 
RUN npm install --quiet && npm test
# Open up a port
EXPOSE 4000
# Use node package manager to run app
CMD npm start
