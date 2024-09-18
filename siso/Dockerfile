FROM maven:3.9.8

ENV PROJECT_HOME=/usr/src/siso
ENV JAR_NAME=siso.jar

RUN mkdir -p ${PROJECT_HOME}
WORKDIR ${PROJECT_HOME}

COPY . .

RUN mvn clean package -DskipTests

RUN mv ${PROJECT_HOME}/target/${JAR_NAME} ${PROJECT_HOME}

ENTRYPOINT [ "java" , "-jar", "-Dspring.profiles.active=prod", "siso.jar"]

EXPOSE 8080