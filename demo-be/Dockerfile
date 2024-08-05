FROM maven:3.9.5-sapmachine-17 as build

WORKDIR /build
COPY . /build

RUN mvn clean install


FROM amazoncorretto:21-alpine

WORKDIR /app
LABEL MAINTAINER = developer@energy-hub-alliance.com

RUN addgroup -S eha && adduser -S eha -G eha
USER eha:eha

COPY --from=build /build/target/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]
