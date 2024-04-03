FROM node:14-alpine

LABEL maintainer="Kenny Roger <kennyrogers330@gmail.com>"

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80

ENV NAME mobile-BFF

# Create a non-root user
RUN addgroup -g 1001 -S nodejs \
    && adduser -u 1001 -S nodejs -G nodejs

# Change ownership of the application directory to the non-root user
RUN chown -R nodejs:nodejs /app

# Switch to the non-root user
USER nodejs

CMD ["npm", "start"]
