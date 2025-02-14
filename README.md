<p align="center">
    <img width="400px" height=auto src="https://www.energy-hub.io/wp-content/uploads/2023/12/logo-1.svg" />
</p>

# EHA Demo App
If you ever wanted to check how your integration with [Energy Hub Alliance](https://www.energy-hub.io) software solution might look and feel this is the right place.
This is true example of partner integration providing all features at glance.

## Why use the EHA-Demo App?

* Understand the connect flow and backend implementation
* Get inspired for front-end screens
* Use as a basis to build your first energy app
* Test your EHA connection

## Community
* In order to be contact us go [HERE](https://www.energy-hub.io/contact-us/)
* Find more documentation on [Developer portal](https://developer.energy-hub.io/documentation/introduction)
* ![Linkedin](https://de.linkedin.com/company/energy-hub-alliance) follow and interact with us

## Project Overview

![EHA_Demo_Web_App.png](documentation%2FEHA_Demo_Web_App.png)

### Applications

The Demo App is split between a demo-frontend and a demo-backend.
The demo-backend communicates with the EHA-API and adds business logic for the frontend.

In the setup, the demo-backend should use the EHA platform from your subscription. The Keycloak client should be hosted locally.
Below in table find endpoints to access services included in this demo solution, when default provided configuration is used.

| Application | URL                                   | Credentials           |
|-------------|---------------------------------------|-----------------------|
| demo-fe     | http://localhost:3000                 | Keycloak user account |
| demo-be     | http://localhost:8090/swagger-ui.html | Keycloak access token |
| Keycloak    | http://localhost:8080/admin           | `admin/admin`         |

<br>

## Quickstart

Below you will find explained steps how to run this demo solution by executing `docker-compose.yaml` file.
Most of the configuration will be in place, you will have to acquire set of credentials and other values which go into environment variables used by demo-backend app.

### 1. Setup Keycloak

There are configuration files for the Keycloak realms in folder `config/keycloak`.
File `demo-realm.json` is already preconfigured realm for the purpose of this demo and will be included if you run `keycloak` service defined in `docker-compose.yaml`
Realm used by this solution is `eha-demo-app` where corresponding client is `democlient`.
If you wish to alter configuration, make sure to propagate changes where needed.

<br>

### 2. Create subscription

Precondition for this step is that you already went through onboard Partner process with approved application.
After your Partner application has been approved, you have to create subscription and API key for subscription. It is required for consuming of EHA-API.

1. Go to homepage of Partner Web portal and create subscription.
   Id of created subscription use for environment variable `DEMO_APP_SUBSCRIPTION_ID`
2. Go to the API Keys page of Partner Web portal and select subscription for which you want to create API key
   Take API key and use it for environment variable `DEMO_APP_API_KEY`

### 2. Setup Kafka broker connection

Actions needed for this step are related to registering your future client within EHA ecosystem that will be listening to Kafka notifications.

1. Go to Streaming clients page on Partner Web portal and create new streaming client for your target subscription.
2. Acquire credentials needed for establishing connection with our Kafka broker.
    - Take Authentication URL from General information section and use it for environment variable `KAFKA_KEYCLOAK_TOKEN_URL`
    - Take Kafka URL from General information section and use it for environment variable `KAFKA_URL`
    - Take client ID for created streaming client and use it for environment variable `KAFKA_CLIENT_ID`
    - Take client secret for created streaming client and use it for environment variable `KAFKA_CLIENT_SECRET`
    - Download public certificate and create java trust store. Created trust store place under `demo-be/src/main/java/resources` with name `kafka.truststore.jks`.
      Remember trust store password and use it for environment variable `KAFKA_TRUST_STORE_PASSWORD` If you want to change location of trust store, make sure to update configuration
      inside `docker-comspose.yaml` for `demo-be` service.

<br>

### 3. Populate environment variables needed for demo-be app

Before running the application, make sure you set the environment variables for demo-backend app.
In `docker-compose.yaml` file there is dedicated part for environment variables under `demo-be` service, where you can set proper values.

| Environment variable        | Description                                                      | 
|-----------------------------|------------------------------------------------------------------|
| KAFKA_CLIENT_ID             | Client ID for the authentication to notification Kafka topic     | 
| KAFKA_CLIENT_SECRET         | Client secret for the authentication to notification Kafka topic | 
| KAFKA_URL                   | URL of the Kafka broker                                          | 
| KAFKA_KEYCLOAK_TOKEN_URL    | URL for the OAuth identity provider                              | 
| KAFKA_TRUST_STORE_FILE_PATH | Location of the trust store file                                 | 
| KAFKA_TRUST_STORE_PASSWORD  | Password for the trust store file                                | 
| GATEWAY_BASE_URL            | Base URL of the Gateway of the EHA services                      | 
| DEMO_APP_API_KEY            | API key used by the BE app when contacting EHA services          | 
| DEMO_APP_SUBSCRIPTION_ID    | Subscription used for interacting with EHA services              |

<br>

### 4. Configuration values needed for demo-frontend app

Similar to previously described setup of demo-backend, demo-frontend also has configurable part.
That is located under `Dockerfile` in folder `demo-fe`. Values for default configuration are prepopulated and you don't need to change it, unless you make changes for Keycloak service and
demo-backend.

| Configuration property    | Description                                                  | 
|---------------------------|--------------------------------------------------------------|
| VITE_KEYCLOAK_REALM       | Name of the Keycloak realm which is used for user management |
| VITE_KEYCLOAK_CLIENT      | Name of the Keycloak client which demo-frontend app uses     |
| VITE_KEYCLOAK_URL         | URL of Keycloak service                                      |
| VITE_DEMO_APP_SERVICE_URL | Base URL of demo-backend app                                 |
| VITE_DEMO_APP_DOMAIN      | Domain of demo-frontend app                                  |

<br>

### 5. Run the application using Docker Compose 🚀

The root folder contains functional `docker-compose.yml` file.

Run the application using it as shown below:

```console
docker-compose up -d
```
