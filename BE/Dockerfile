FROM adoptopenjdk/openjdk11
VOLUME /tmp
ARG JAR_FILE=./build/libs/*.jar
RUN ./gradlew clean build
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
