# Gateway Service

## Description
Service de passerelle API qui gère le routage, l'équilibrage de charge et la sécurité pour tous les microservices CELIAN.

## Fonctionnalités
- Routage dynamique des requêtes
- Load balancing
- Circuit breaker avec Resilience4j
- Rate limiting
- Filtrage des requêtes
- Logging centralisé
- Authentification JWT

## Configuration

### Application Properties
```yaml
server:
  port: 8080

spring:
  application:
    name: gateway-service
  cloud:
    gateway:
      routes:
        - id: auth-service
          uri: lb://auth-service
          predicates:
            - Path=/api/auth/**
        - id: catalog-service
          uri: lb://catalog-service
          predicates:
            - Path=/api/catalog/**
```

### Sécurité
```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
            .csrf().disable()
            .authorizeExchange()
            .pathMatchers("/api/auth/**").permitAll()
            .anyExchange().authenticated()
            .and()
            .build();
    }
}
```

## Endpoints
| Route | Service | Description |
|-------|---------|-------------|
| `/api/auth/**` | Auth Service | Authentification |
| `/api/catalog/**` | Catalog Service | Gestion catalogue |
| `/api/orders/**` | Order Service | Gestion commandes |
| `/api/documents/**` | Document Service | Gestion documents |
| `/api/customers/**` | Customer Service | Gestion clients |
| `/api/payments/**` | Payment Service | Gestion paiements |

## Métriques et Monitoring
- Prometheus endpoints
- Circuit breaker metrics
- Rate limiting metrics
- Request/Response logging

## Démarrage
```bash
./mvnw spring-boot:run
```

## Tests
```bash
./mvnw test
```

## Docker
```bash
docker build -t celian/gateway-service .
docker run -p 8080:8080 celian/gateway-service
```
