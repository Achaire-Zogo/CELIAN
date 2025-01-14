# Payment Service

## Description
Service de gestion des paiements utilisant le pattern Strategy.

## Fonctionnalités
- Traitement des paiements
- Gestion des différentes méthodes de paiement
- Gestion des crédits
- Calcul des taxes
- Gestion des remboursements
- Historique des transactions
- Rapports financiers

## Design Patterns

### Strategy Pattern
```java
public interface PaymentStrategy {
    PaymentResult process(Payment payment);
}

public class CreditCardPaymentStrategy implements PaymentStrategy {
    @Override
    public PaymentResult process(Payment payment) {
        // Logique de paiement par carte
        return processCardPayment(payment);
    }
}

public class CreditPaymentStrategy implements PaymentStrategy {
    @Override
    public PaymentResult process(Payment payment) {
        // Logique de paiement par crédit
        return processCreditPayment(payment);
    }
}
```

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/payment/
│   │       ├── strategy/
│   │       │   ├── PaymentStrategy.java
│   │       │   └── CreditCardStrategy.java
│   │       ├── controller/
│   │       │   ├── PaymentController.java
│   │       │   └── TransactionController.java
│   │       ├── service/
│   │       │   ├── PaymentService.java
│   │       │   └── TransactionService.java
│   │       ├── processor/
│   │       │   ├── PaymentProcessor.java
│   │       │   └── RefundProcessor.java
│   │       ├── repository/
│   │       │   └── TransactionRepository.java
│   │       └── model/
│   │           ├── Payment.java
│   │           └── Transaction.java
│   └── resources/
│       └── application.yml
```

## API Endpoints

### Paiements
```http
POST /api/payments/process
GET /api/payments/{id}
POST /api/payments/{id}/refund
GET /api/payments/order/{orderId}
```

### Transactions
```http
GET /api/transactions
GET /api/transactions/{id}
GET /api/transactions/customer/{customerId}
GET /api/transactions/report
```

## Modèles de Données

### Payment
```java
@Entity
public class Payment {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    private Order order;
    
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    private PaymentMethod method;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    
    private String transactionId;
    private LocalDateTime processedAt;
}
```

### Transaction
```java
@Entity
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    private Payment payment;
    
    private String externalTransactionId;
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    
    @Enumerated(EnumType.STRING)
    private TransactionStatus status;
    
    private LocalDateTime createdAt;
    private Map<String, String> metadata;
}
```

## Intégration Stripe
```java
@Service
public class StripePaymentProcessor {
    private final Stripe stripeClient;
    
    public PaymentResult processPayment(Payment payment) {
        try {
            PaymentIntent intent = PaymentIntent.create(
                new PaymentIntentCreateParams.Builder()
                    .setAmount(payment.getAmount())
                    .setCurrency("eur")
                    .build()
            );
            return new PaymentResult(intent.getId(), PaymentStatus.SUCCESS);
        } catch (StripeException e) {
            return new PaymentResult(null, PaymentStatus.FAILED);
        }
    }
}
```

## Events RabbitMQ
```java
@Service
public class PaymentEventPublisher {
    private final RabbitTemplate rabbitTemplate;
    
    public void publishPaymentProcessed(Payment payment) {
        PaymentEvent event = new PaymentEvent("PAYMENT_PROCESSED", payment);
        rabbitTemplate.convertAndSend("payment-exchange", "payment.processed", event);
    }
}
```

## Cache Redis
```java
@Cacheable(value = "transactions", key = "#transactionId")
public Transaction getTransaction(String transactionId) {
    return transactionRepository.findByTransactionId(transactionId)
        .orElseThrow(() -> new TransactionNotFoundException(transactionId));
}
```

## Tests
```bash
./mvnw test
```

## Docker
```bash
docker build -t celian/payment-service .
docker run -p 8086:8086 celian/payment-service
```

## Intégration
- Service Discovery (Eureka)
- Configuration centralisée
- Message Queue (RabbitMQ)
- Cache Redis
- Stripe API
- Circuit Breaker
- Distributed Tracing
