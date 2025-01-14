# Architecture des Services CELIAN

## 1. Gateway Service (Port: 8080)
Service de point d'entrée qui gère le routage et la sécurité.

```java
@SpringBootApplication
@EnableEurekaClient
public class GatewayServiceApplication {
    // Configuration des routes
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("auth-service", r -> r.path("/api/auth/**").uri("lb://auth-service"))
            .route("catalog-service", r -> r.path("/api/catalog/**").uri("lb://catalog-service"))
            .route("order-service", r -> r.path("/api/orders/**").uri("lb://order-service"))
            .route("document-service", r -> r.path("/api/documents/**").uri("lb://document-service"))
            .route("customer-service", r -> r.path("/api/customers/**").uri("lb://customer-service"))
            .route("payment-service", r -> r.path("/api/payments/**").uri("lb://payment-service"))
            .build();
    }
}
```

## 2. Auth Service (Port: 8081)
Gestion de l'authentification et des autorisations.

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        // Authentification
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        // Inscription
    }
}
```

## 3. Catalog Service (Port: 8082)
Gestion du catalogue des véhicules avec le pattern Abstract Factory.

```java
// Abstract Factory Pattern
public interface VehicleFactory {
    Vehicle createVehicle();
    Engine createEngine();
}

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        // Liste des véhicules
    }

    @GetMapping("/vehicles/{id}")
    public ResponseEntity<Vehicle> getVehicle(@PathVariable Long id) {
        // Détails d'un véhicule
    }

    @GetMapping("/vehicles/search")
    public ResponseEntity<List<Vehicle>> searchVehicles(@RequestParam String query) {
        // Recherche de véhicules
    }
}
```

## 4. Order Service (Port: 8083)
Gestion des commandes avec le pattern Builder et Template Method.

```java
// Builder Pattern pour la construction des commandes
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

    public Order build() {
        return order;
    }
}

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        // Création d'une commande
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        // Détails d'une commande
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody StatusUpdate status) {
        // Mise à jour du statut
    }
}
```

## 5. Document Service (Port: 8084)
Génération des documents avec le pattern Builder.

```java
// Builder Pattern pour les documents
public class DocumentBuilder {
    private Document document = new Document();

    public DocumentBuilder withType(DocumentType type) {
        document.setType(type);
        return this;
    }

    public DocumentBuilder withContent(String content) {
        document.setContent(content);
        return this;
    }

    public Document build() {
        return document;
    }
}

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    @PostMapping("/generate")
    public ResponseEntity<Document> generateDocument(@RequestBody DocumentRequest request) {
        // Génération de document
    }
}
```

## 6. Customer Service (Port: 8085)
Gestion des clients avec le pattern Composite pour les sociétés.

```java
// Composite Pattern pour les sociétés
public interface Company {
    void addSubsidiary(Company subsidiary);
    List<Company> getSubsidiaries();
}

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody CustomerRequest request) {
        // Création d'un client
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        // Détails d'un client
    }

    @GetMapping("/companies/{id}/subsidiaries")
    public ResponseEntity<List<Company>> getSubsidiaries(@PathVariable Long id) {
        // Liste des filiales
    }
}
```

## 7. Payment Service (Port: 8086)
Gestion des paiements avec le pattern Strategy.

```java
// Strategy Pattern pour les méthodes de paiement
public interface PaymentStrategy {
    void processPayment(Order order);
}

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @PostMapping("/process")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody PaymentRequest request) {
        // Traitement du paiement
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<PaymentStatus> getPaymentStatus(@PathVariable Long id) {
        // Statut du paiement
    }
}
```

## Frontend (Port: 3000)
Interface utilisateur React avec Redux pour la gestion d'état.

```typescript
// Store Redux
interface AppState {
    catalog: {
        vehicles: Vehicle[];
        loading: boolean;
    };
    cart: {
        items: CartItem[];
        total: number;
    };
    orders: {
        currentOrder: Order | null;
        orderHistory: Order[];
    };
}

// Exemple de composant React
const VehicleCatalog: React.FC = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state: AppState) => state.catalog.vehicles);

    useEffect(() => {
        dispatch(fetchVehicles());
    }, []);

    return (
        <div className="catalog">
            {vehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
        </div>
    );
};
```

## Communication Inter-Services

```yaml
# Exemple de message RabbitMQ pour la communication asynchrone
OrderCreatedEvent:
  orderId: string
  customerId: string
  vehicleId: string
  amount: number
  status: string
  timestamp: string

# Exemple de réponse synchrone API
OrderResponse:
  id: string
  customer:
    id: string
    name: string
  vehicle:
    id: string
    model: string
  amount: number
  status: string
  documents: Document[]
```

## Base de Données

```sql
-- Exemple de schéma PostgreSQL
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    model VARCHAR(100),
    type VARCHAR(50),
    price DECIMAL,
    stock INTEGER
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    vehicle_id INTEGER,
    status VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    type VARCHAR(50),
    parent_company_id INTEGER NULL
);
```
