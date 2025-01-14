# Architecture Logicielle

## Structure des Services

### 1. Architecture Générale des Services (Clean Architecture)

Chaque microservice suit une architecture en couches :

```
service/
├── api/           # Couche API (Controllers)
├── domain/        # Couche Domain (Entités, Value Objects)
├── application/   # Couche Application (Use Cases, Services)
└── infrastructure/# Couche Infrastructure (Repositories, External Services)
```

### 2. Patterns par Service

#### Service Catalogue
- **Pattern Factory & Abstract Factory**: Création des différents types de véhicules
- **Pattern Iterator**: Navigation dans le catalogue
- **Pattern Observer**: Notification des changements de prix/stock
- **Pattern Decorator**: Ajout dynamique d'options aux véhicules

#### Service Document
- **Pattern Builder**: Construction des documents
- **Pattern Bridge**: Abstraction pour différents formats (PDF/HTML)
- **Pattern Template Method**: Structure commune pour tous les documents
- **Pattern Adapter**: Adaptation des formats de sortie

#### Service Commande
- **Pattern State**: Gestion des états des commandes
- **Pattern Strategy**: Stratégies de calcul des taxes
- **Pattern Chain of Responsibility**: Validation des commandes
- **Pattern Memento**: Sauvegarde des états du panier

#### Service Client
- **Pattern Composite**: Gestion de la hiérarchie des sociétés
- **Pattern Proxy**: Accès contrôlé aux données clients
- **Pattern Flyweight**: Optimisation des données partagées

## Implémentation des Design Patterns Clés

### 1. Abstract Factory (Création de Véhicules)
```java
public interface VehicleFactory {
    Vehicle createVehicle();
    Engine createEngine();
}

public class ElectricCarFactory implements VehicleFactory {
    @Override
    public Vehicle createVehicle() { return new ElectricCar(); }
    @Override
    public Engine createEngine() { return new ElectricEngine(); }
}
```

### 2. Builder (Documents)
```java
public class DocumentBuilder {
    private Document document;
    
    public DocumentBuilder() {
        document = new Document();
    }
    
    public DocumentBuilder addHeader(String header) {
        document.setHeader(header);
        return this;
    }
    
    public DocumentBuilder addContent(String content) {
        document.setContent(content);
        return this;
    }
    
    public Document build() {
        return document;
    }
}
```

### 3. Composite (Gestion des Sociétés)
```java
public interface Company {
    void addSubsidiary(Company subsidiary);
    void removeSubsidiary(Company subsidiary);
    List<Company> getSubsidiaries();
}

public class ParentCompany implements Company {
    private List<Company> subsidiaries = new ArrayList<>();
    
    @Override
    public void addSubsidiary(Company subsidiary) {
        subsidiaries.add(subsidiary);
    }
}
```

## Communication Inter-Services

### Event-Driven Architecture
```java
@Service
public class OrderEventPublisher {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;
    
    public void publishOrderCreated(Order order) {
        OrderEvent event = new OrderEvent("ORDER_CREATED", order);
        kafkaTemplate.send("order-events", event);
    }
}
```

## Gestion des Données

### Exemple de Structure de Base de Données
```sql
-- Véhicules
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    model VARCHAR(100),
    price DECIMAL,
    stock INTEGER
);

-- Options
CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL
);

-- Commandes
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER,
    vehicle_id INTEGER,
    status VARCHAR(50),
    total_price DECIMAL
);
```

## Sécurité et Authentification

### Exemple de Configuration JWT
```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.oauth2ResourceServer()
            .jwt()
            .and()
            .authorizeRequests()
            .antMatchers("/api/public/**").permitAll()
            .antMatchers("/api/private/**").authenticated();
    }
}
```
