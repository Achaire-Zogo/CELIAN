# Customer Service

## Description
Service de gestion des clients utilisant le pattern Composite pour les sociétés.

## Fonctionnalités
- Gestion des profils clients
- Gestion des sociétés et filiales
- Gestion des préférences
- Historique des commandes
- Gestion des adresses
- Programme de fidélité
- Notifications clients

## Design Patterns

### Composite Pattern
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
    
    @Override
    public List<Company> getSubsidiaries() {
        return subsidiaries;
    }
}
```

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/customer/
│   │       ├── composite/
│   │       │   ├── Company.java
│   │       │   └── ParentCompany.java
│   │       ├── controller/
│   │       │   ├── CustomerController.java
│   │       │   └── CompanyController.java
│   │       ├── service/
│   │       │   ├── CustomerService.java
│   │       │   └── CompanyService.java
│   │       ├── repository/
│   │       │   ├── CustomerRepository.java
│   │       │   └── CompanyRepository.java
│   │       └── model/
│   │           ├── Customer.java
│   │           └── Company.java
│   └── resources/
│       └── application.yml
```

## API Endpoints

### Clients
```http
POST /api/customers
GET /api/customers/{id}
PUT /api/customers/{id}
DELETE /api/customers/{id}
GET /api/customers/{id}/orders
GET /api/customers/{id}/preferences
```

### Sociétés
```http
POST /api/companies
GET /api/companies/{id}
PUT /api/companies/{id}
DELETE /api/companies/{id}
GET /api/companies/{id}/subsidiaries
POST /api/companies/{id}/subsidiaries
```

## Modèles de Données

### Customer
```java
@Entity
public class Customer {
    @Id
    @GeneratedValue
    private Long id;
    
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    
    @OneToMany
    private List<Address> addresses;
    
    @ManyToOne
    private Company company;
    
    @ElementCollection
    private Map<String, String> preferences;
    
    private Integer loyaltyPoints;
    private LocalDateTime createdAt;
}
```

### Company
```java
@Entity
public class Company {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private String registrationNumber;
    
    @ManyToOne
    private Company parent;
    
    @OneToMany(mappedBy = "parent")
    private List<Company> subsidiaries;
    
    @OneToMany
    private List<Customer> employees;
}
```

## Events RabbitMQ
```java
@Service
public class CustomerEventPublisher {
    private final RabbitTemplate rabbitTemplate;
    
    public void publishCustomerCreated(Customer customer) {
        CustomerEvent event = new CustomerEvent("CUSTOMER_CREATED", customer);
        rabbitTemplate.convertAndSend("customer-exchange", "customer.created", event);
    }
}
```

## Cache Redis
```java
@Cacheable(value = "customers", key = "#customerId")
public Customer getCustomer(Long customerId) {
    return customerRepository.findById(customerId)
        .orElseThrow(() -> new CustomerNotFoundException(customerId));
}
```

## Tests
```bash
./mvnw test
```

## Docker
```bash
docker build -t celian/customer-service .
docker run -p 8085:8085 celian/customer-service
```

## Intégration
- Service Discovery (Eureka)
- Configuration centralisée
- Message Queue (RabbitMQ)
- Cache Redis
- Circuit Breaker
- Distributed Tracing
