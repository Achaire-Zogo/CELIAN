# Order Service

## Description
Service de gestion des commandes utilisant les patterns Builder et Template Method.

## Fonctionnalités
- Création de commandes
- Gestion du panier
- Suivi des commandes
- Calcul des taxes
- Gestion des options
- Validation des commandes
- Notifications

## Design Patterns

### Builder Pattern
```java
public class OrderBuilder {
    private Order order = new Order();
    
    public OrderBuilder withCustomer(Customer customer) {
        order.setCustomer(customer);
        return this;
    }
    
    public OrderBuilder withVehicle(Vehicle vehicle) {
        order.setVehicle(vehicle);
        return this;
    }
    
    public OrderBuilder withOptions(List<Option> options) {
        order.setOptions(options);
        return this;
    }
    
    public Order build() {
        validateOrder();
        calculateTotal();
        return order;
    }
}
```

### Template Method Pattern
```java
public abstract class OrderProcessor {
    public final void processOrder(Order order) {
        validateOrder(order);
        calculateTaxes(order);
        applyDiscounts(order);
        saveOrder(order);
        notifyCustomer(order);
    }
    
    protected abstract void calculateTaxes(Order order);
    protected abstract void applyDiscounts(Order order);
}
```

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/order/
│   │       ├── builder/
│   │       │   └── OrderBuilder.java
│   │       ├── controller/
│   │       │   ├── OrderController.java
│   │       │   └── CartController.java
│   │       ├── service/
│   │       │   ├── OrderService.java
│   │       │   └── CartService.java
│   │       ├── processor/
│   │       │   ├── OrderProcessor.java
│   │       │   └── TaxCalculator.java
│   │       ├── repository/
│   │       │   └── OrderRepository.java
│   │       └── model/
│   │           ├── Order.java
│   │           └── Cart.java
│   └── resources/
│       └── application.yml
```

## API Endpoints

### Commandes
```http
POST /api/orders
GET /api/orders/{id}
PUT /api/orders/{id}/status
DELETE /api/orders/{id}
GET /api/orders/customer/{customerId}
```

### Panier
```http
GET /api/cart
POST /api/cart/items
DELETE /api/cart/items/{id}
PUT /api/cart/items/{id}/quantity
POST /api/cart/checkout
```

## Modèles de Données

### Order
```java
@Entity
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    private Customer customer;
    
    @ManyToOne
    private Vehicle vehicle;
    
    @OneToMany
    private List<Option> options;
    
    private BigDecimal subtotal;
    private BigDecimal taxes;
    private BigDecimal total;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

## Events RabbitMQ
```java
@Service
public class OrderEventPublisher {
    private final RabbitTemplate rabbitTemplate;
    
    public void publishOrderCreated(Order order) {
        OrderEvent event = new OrderEvent("ORDER_CREATED", order);
        rabbitTemplate.convertAndSend("order-exchange", "order.created", event);
    }
}
```

## Cache Redis
```java
@Cacheable(value = "carts", key = "#customerId")
public Cart getCustomerCart(Long customerId) {
    return cartRepository.findByCustomerId(customerId)
        .orElse(new Cart(customerId));
}
```

## Tests
```bash
./mvnw test
```

## Docker
```bash
docker build -t celian/order-service .
docker run -p 8083:8083 celian/order-service
```

## Intégration
- Service Discovery (Eureka)
- Configuration centralisée
- Message Queue (RabbitMQ)
- Cache distribué (Redis)
- Circuit Breaker
- Distributed Tracing
