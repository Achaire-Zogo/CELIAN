# Patrons de Conception Utilisés

## 1. Factory Pattern

### Description
Le Factory Pattern est utilisé pour la création de différents types de véhicules sans exposer la logique de création au client.

### Implémentation
```java
// Interface Factory
public interface VehiculeFactory {
    Car getCar();
    Scooter getScooter();
}

// Implémentation pour véhicules électriques
@Component
public class ElectricVehiculeFactory implements VehiculeFactory {
    @Override
    public Car getCar() {
        return new ElectricCar();
    }
    
    @Override
    public Scooter getScooter() {
        return new ElectricScooter();
    }
}

// Implémentation pour véhicules à essence
@Component
public class PetrolVehiculeFactory implements VehiculeFactory {
    @Override
    public Car getCar() {
        return new PetrolCar();
    }
    
    @Override
    public Scooter getScooter() {
        return new PetrolScooter();
    }
}
```

### Utilisation
- Création de différents types de véhicules
- Séparation de la logique de création
- Facilite l'ajout de nouveaux types de véhicules

## 2. Singleton Pattern

### Description
Le Singleton Pattern est utilisé pour assurer qu'une classe n'a qu'une seule instance et fournit un point d'accès global à cette instance.

### Implémentation
```java
@Component
public class DocumentBundle {
    private static DocumentBundle instance;
    
    private DocumentBundle() {
        // Constructeur privé
    }
    
    public static DocumentBundle getInstance() {
        if(instance == null) {
            instance = new DocumentBundle();
        }
        return instance;
    }
}
```

### Utilisation
- Gestion centralisée des documents
- Point d'accès unique aux ressources partagées
- Contrôle de l'instanciation

## 3. State Pattern

### Description
Le State Pattern est utilisé pour gérer les différents états des commandes et leur transition.

### Implémentation
```java
public enum OrderState {
    CREATED,
    PENDING,
    PAID,
    DELIVERED,
    CANCELLED
}

@Entity
public class Order {
    @Enumerated(EnumType.STRING)
    private OrderState state;
    
    public void setState(OrderState state) {
        this.state = state;
    }
    
    public OrderState getState() {
        return state;
    }
}
```

### Utilisation
- Gestion du cycle de vie des commandes
- Transitions d'état contrôlées
- Comportements spécifiques à chaque état

## 4. Builder Pattern

### Description
Le Builder Pattern est utilisé pour la construction de documents complexes (PDF, HTML) étape par étape.

### Implémentation
```java
public interface IDocumentBuilder {
    void buildHeader();
    void buildBody();
    void buildFooter();
    Document getResult();
}

public class PdfDocumentBuilder implements IDocumentBuilder {
    private PdfDocument document;
    
    public void buildHeader() {
        // Construction de l'en-tête PDF
    }
    
    public void buildBody() {
        // Construction du corps PDF
    }
    
    public void buildFooter() {
        // Construction du pied de page PDF
    }
    
    public Document getResult() {
        return document;
    }
}

public class HtmlDocumentBuilder implements IDocumentBuilder {
    private HtmlDocument document;
    
    public void buildHeader() {
        // Construction de l'en-tête HTML
    }
    
    public void buildBody() {
        // Construction du corps HTML
    }
    
    public void buildFooter() {
        // Construction du pied de page HTML
    }
    
    public Document getResult() {
        return document;
    }
}
```

### Utilisation
- Construction de documents complexes
- Séparation du processus de construction
- Support de différents formats de documents

## 5. Factory Method Pattern (pour les commandes)

### Description
Le Factory Method Pattern est utilisé pour créer différents types de commandes (Cash, Credit).

### Implémentation
```java
public interface OrderFactory {
    Order createOrder(Long userId, Long countryId, OrderType type, List<CartItem> items);
}

@Component
public class CashOrderFactory implements OrderFactory {
    @Override
    public Order createOrder(Long userId, Long countryId, OrderType type, List<CartItem> items) {
        Order order = new Order();
        order.setType(OrderType.CASH);
        // Configuration spécifique pour commande en espèces
        return order;
    }
}

@Component
public class CreditOrderFactory implements OrderFactory {
    @Override
    public Order createOrder(Long userId, Long countryId, OrderType type, List<CartItem> items) {
        Order order = new Order();
        order.setType(OrderType.CREDIT);
        // Configuration spécifique pour commande à crédit
        return order;
    }
}
```

### Utilisation
- Création de différents types de commandes
- Gestion des spécificités de chaque type de commande
- Extensibilité pour nouveaux types de commandes
