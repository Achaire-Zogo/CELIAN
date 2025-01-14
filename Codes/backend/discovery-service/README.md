# Discovery Service (Eureka Server)

## Description
Service de découverte qui permet l'enregistrement et la localisation dynamique des microservices CELIAN.

## Fonctionnalités
- Enregistrement automatique des services
- Découverte dynamique des services
- Health checking
- Load balancing
- Haute disponibilité
- Dashboard de monitoring

## Configuration

### Application Properties
```yaml
server:
  port: 8761

spring:
  application:
    name: discovery-service
    
eureka:
  client:
    registerWithEureka: false
    fetchRegistry: false
  server:
    waitTimeInMsWhenSyncEmpty: 0
    enableSelfPreservation: false
```

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/discovery/
│   │       ├── DiscoveryServiceApplication.java
│   │       └── config/
│   │           └── EurekaConfig.java
│   └── resources/
│       ├── application.yml
│       └── bootstrap.yml
```

## Configuration Application

```java
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(DiscoveryServiceApplication.class, args);
    }
}
```

## Configuration Eureka
```java
@Configuration
public class EurekaConfig {
    @Bean
    public ServerCodecs serverCodecs() {
        return ServerCodecs.builder()
            .withMaxInboundSize(512000)
            .build();
    }
}
```

## Sécurité
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
            .anyRequest().authenticated()
            .and()
            .httpBasic();
    }
}
```

## Client Configuration
Pour les services clients, ajouter dans leur `application.yml` :
```yaml
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
    registerWithEureka: true
    fetchRegistry: true
  instance:
    preferIpAddress: true
```

## Dashboard
- URL: http://localhost:8761
- Fonctionnalités:
  - Liste des instances
  - Statut des services
  - Métriques de santé
  - Configuration

## Haute Disponibilité
Configuration pour cluster Eureka :
```yaml
eureka:
  client:
    serviceUrl:
      defaultZone: http://eureka-1:8761/eureka/,http://eureka-2:8762/eureka/
```

## Métriques et Monitoring
- Intégration avec Spring Boot Actuator
- Endpoints de santé
- Métriques JVM
- Métriques personnalisées

## Docker
```dockerfile
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
docker build -t celian/discovery-service .
docker run -p 8761:8761 celian/discovery-service
```

## Docker Compose
```yaml
version: '3.8'
services:
  discovery-service:
    build: ./discovery-service
    ports:
      - "8761:8761"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    networks:
      - celian-network
```

## Tests
```bash
./mvnw test
```

## Logging
```yaml
logging:
  level:
    com.netflix.eureka: INFO
    com.netflix.discovery: INFO
```

## Intégration
- Spring Cloud Config
- Spring Boot Admin
- Prometheus
- Grafana

## Production Checklist
- [ ] Sécurité configurée
- [ ] SSL/TLS activé
- [ ] Monitoring en place
- [ ] Logging centralisé
- [ ] Backup strategy
- [ ] Circuit breakers configurés
- [ ] Rate limiting activé
