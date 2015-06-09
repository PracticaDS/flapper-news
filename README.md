[![Build Status](https://travis-ci.org/PracticaDS/flapper-news.svg)](https://travis-ci.org/PracticaDS/flapper-news)

# flapper-news

Ejemplo de aplicacion MEAN.
Inicialmente seguimos el tutorial de flapper-news, pero a eso le agregamos:

* Grunt
* Bower
* Wiredeps
* JSHint
* Travis

# Sonar

Además tiene configurado grunt para poder ejecutar Sonar.
Para eso hay que tener levantado un sonar.

```
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube:5.1
```
Ver (https://registry.hub.docker.com/_/sonarqube/)(https://registry.hub.docker.com/_/sonarqube/)

Y luego 

```
grunt  sonarRunner:analysis
```
