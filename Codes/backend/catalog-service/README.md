# Catalog Service

## Description
Service de gestion du catalogue des véhicules, implémentant le pattern Abstract Factory.

## Fonctionnalités
- Gestion du catalogue de véhicules
- Recherche avancée
- Gestion des options
- Gestion du stock
- Gestion des prix
- Gestion des promotions
- Gestion des images

## Design Patterns
### Abstract Factory
```java
public interface VehicleFactory {
    Vehicle createVehicle();
    Engine createEngine();
    Options createOptions();
}

public class ElectricVehicleFactory implements VehicleFactory {
    @Override
    public Vehicle createVehicle() {
        return new ElectricCar();
    }
    
    @Override
    public Engine createEngine() {
        return new ElectricEngine();
    }
    
    @Override
    public Options createOptions() {
        return new ElectricVehicleOptions();
    }
}
```

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/catalog/
│   │       ├── factory/
│   │       │   ├── VehicleFactory.java
│   │       │   └── ElectricVehicleFactory.java
│   │       ├── controller/
│   │       │   ├── VehicleController.java
│   │       │   └── OptionController.java
│   │       ├── service/
│   │       │   ├── VehicleService.java
│   │       │   └── SearchService.java
│   │       ├── repository/
│   │       │   └── VehicleRepository.java
│   │       └── model/
│   │           ├── Vehicle.java
│   │           └── Option.java
│   └── resources/
│       └── application.yml
```

## API Endpoints

### Véhicules
```http
GET /api/catalog/vehicles
GET /api/catalog/vehicles/{id}
POST /api/catalog/vehicles
PUT /api/catalog/vehicles/{id}
DELETE /api/catalog/vehicles/{id}
GET /api/catalog/vehicles/search
```

### Options
```http
GET /api/catalog/options
GET /api/catalog/options/{id}
POST /api/catalog/options
PUT /api/catalog/options/{id}
DELETE /api/catalog/options/{id}
GET /api/catalog/vehicles/{id}/compatible-options
```

## Modèles de Données

### Vehicle
```java
@Entity
public class Vehicle {
    @Id
    @GeneratedValue
    private Long id;
    
    private String model;
    private String type;
    private BigDecimal price;
    private Integer stock;
    
    @OneToMany
    private List<Option> availableOptions;
    
    @ElementCollection
    private List<String> images;
}
```

## Recherche Elasticsearch
```yaml
spring:
  elasticsearch:
    rest:
      uris: http://localhost:9200
```

```java
@Document(indexName = "vehicles")
public class VehicleDocument {
    @Id
    private String id;
    
    @Field(type = FieldType.Text)
    private String model;
    
    @Field(type = FieldType.Keyword)
    private String type;
    
    @Field(type = FieldType.Double)
    private BigDecimal price;
}
```

## Cache Redis
```java
@Cacheable(value = "vehicles", key = "#id")
public Vehicle getVehicle(Long id) {
    return vehicleRepository.findById(id)
        .orElseThrow(() -> new VehicleNotFoundException(id));
}
```

## Tests
```bash
./mvnw test
```

## Docker
```bash
docker build -t celian/catalog-service .
docker run -p 8082:8082 celian/catalog-service
```

## Intégration
- Service Discovery (Eureka)
- Configuration centralisée
- Cache distribué (Redis)
- Search Engine (Elasticsearch)
- Message Queue (RabbitMQ)
- Circuit Breaker
