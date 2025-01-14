# Auth Service

## Description
Service d'authentification et d'autorisation pour la plateforme CELIAN.

## Fonctionnalités
- Inscription utilisateur
- Authentification
- Gestion des tokens JWT
- Gestion des rôles
- Réinitialisation mot de passe
- Validation email
- Session management

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/auth/
│   │       ├── config/
│   │       │   ├── SecurityConfig.java
│   │       │   └── JwtConfig.java
│   │       ├── controller/
│   │       │   ├── AuthController.java
│   │       │   └── UserController.java
│   │       ├── service/
│   │       │   ├── AuthService.java
│   │       │   └── UserService.java
│   │       ├── repository/
│   │       │   └── UserRepository.java
│   │       └── model/
│   │           ├── User.java
│   │           └── Role.java
│   └── resources/
│       └── application.yml
```

## API Endpoints

### Authentification
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET /api/auth/verify-email
```

### Gestion Utilisateurs
```http
GET /api/users/me
PUT /api/users/me
GET /api/users/{id}
PUT /api/users/{id}/role
DELETE /api/users/{id}
```

## Modèles de Données

### User
```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;
    
    private boolean enabled;
    private boolean emailVerified;
}
```

## Configuration

### Application Properties
```yaml
server:
  port: 8081

spring:
  application:
    name: auth-service
  datasource:
    url: jdbc:postgresql://localhost:5432/celian_auth
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update

jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000
```

## Sécurité
- Hachage des mots de passe avec BCrypt
- Validation des tokens JWT
- Protection CSRF
- Rate limiting
- Session management

## Métriques
- Nombre de connexions
- Taux d'échec d'authentification
- Temps de réponse des endpoints
- Nombre d'utilisateurs actifs

## Tests
```bash
./mvnw test
```

## Docker
```bash
docker build -t celian/auth-service .
docker run -p 8081:8081 celian/auth-service
```

## Intégration
- Service Discovery (Eureka)
- Configuration centralisée
- Circuit Breaker
- Distributed Tracing
