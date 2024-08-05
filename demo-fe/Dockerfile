FROM node:alpine3.18 as build

WORKDIR /home

COPY .  /home

RUN echo "VITE_KEYCLOAK_REALM=eha-demo-app" >> .env
RUN echo "VITE_KEYCLOAK_CLIENT=democlient" >> .env
RUN echo "VITE_KEYCLOAK_URL=http://localhost:8080" >> .env
RUN echo "VITE_DEMO_APP_SERVICE_URL=http://localhost:8090" >> .env
RUN echo "VITE_DEMO_APP_DOMAIN=http://localhost:3000" >> .env


RUN yarn install
RUN yarn build

FROM node:alpine3.18
LABEL MAINTAINER = developer@energy-hub-alliance.com

WORKDIR /app

COPY --from=build /home/dist /app

RUN yarn global add serve

EXPOSE 3000
CMD ["serve", "-s"]
