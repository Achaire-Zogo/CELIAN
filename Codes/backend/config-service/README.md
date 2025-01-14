# Config Service

## Description
Service de configuration centralisée pour tous les microservices CELIAN, basé sur Spring Cloud Config.

## Fonctionnalités
- Configuration centralisée
- Gestion des profils (dev, staging, prod)
- Rechargement dynamique des configurations
- Chiffrement/Déchiffrement des propriétés sensibles
- Versioning des configurations
- Notifications de changements

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/config/
│   │       ├── ConfigServiceApplication.java
│   │       └── config/
│   │           ├── SecurityConfig.java
│   │           └── EncryptionConfig.java
│   └── resources/
│       ├── application.yml
│       └── bootstrap.yml
```

## Configuration

### Application Properties
```yaml
server:
  port: 8888

spring:
  application:
    name: config-service
  cloud:
    config:
      server:
        git:
          uri: https://github.com/Achaire-Zogo/celian-config
          searchPaths: '{application}'
          default-label: main
        encrypt:
          enabled: true
```

## Configuration Git Repository
Structure du repo de configuration :
```
celian-config/
├── application.yml           # Configuration commune
├── gateway-service/
│   ├── application.yml
│   ├── application-dev.yml
│   └── application-prod.yml
├── auth-service/
│   ├── application.yml
│   ├── application-dev.yml
│   └── application-prod.yml
└── ...
```

## Encryption/Decryption
```java
@Configuration
@EnableConfigServer
public class EncryptionConfig {
    @Bean
    public TextEncryptor textEncryptor() {
        return Encryptors.text(
            env.getProperty("encrypt.key"),
            env.getProperty("encrypt.salt")
        );
    }
}
```

## Client Configuration
Pour les services clients, ajouter dans leur `bootstrap.yml` :
```yaml
spring:
  application:
    name: service-name
  cloud:
    config:
      uri: http://localhost:8888
      fail-fast: true
```

## Endpoints
```http
# Récupérer la configuration
GET /{application}/{profile}[/{label}]

# Chiffrer une valeur
POST /encrypt

# Déchiffrer une valeur
POST /decrypt

# Rafraîchir la configuration
POST /actuator/refresh
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
            .antMatchers("/actuator/**").hasRole("ADMIN")
            .anyRequest().authenticated()
            .and()
            .httpBasic();
    }
}
```

## Monitoring
Integration avec Spring Boot Actuator :
```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: always
```

## Docker
```dockerfile
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
docker build -t celian/config-service .
docker run -p 8888:8888 celian/config-service
```

## Docker Compose
```yaml
version: '3.8'
services:
  config-service:
    build: ./config-service
    ports:
      - "8888:8888"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - ENCRYPT_KEY=${ENCRYPT_KEY}
    volumes:
      - ./config-repo:/config-repo
    networks:
      - celian-network
```

## Haute Disponibilité
Configuration pour cluster :
```yaml
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/Achaire-Zogo/celian-config
          clone-on-start: true
          force-pull: true
```

## Notifications de Changements
Intégration avec Spring Cloud Bus :
```yaml
spring:
  cloud:
    bus:
      enabled: true
    stream:
      kafka:
        binder:
          brokers: localhost:9092
```

## Tests
```bash
./mvnw test
```

## Production Checklist
- [ ] Sécurité configurée
- [ ] Encryption key sécurisée
- [ ] Monitoring en place
- [ ] Logging centralisé
- [ ] Backup des configurations
- [ ] High Availability configurée
- [ ] Rate limiting activé

## Intégration
- Spring Cloud Bus
- Vault pour les secrets
- Git pour le versioning
- Kafka pour les notifications
- Spring Boot Admin
- Prometheus/Grafana
