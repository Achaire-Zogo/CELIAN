# CELIAN - Système de Vente de Véhicules en Ligne

## 📝 Description
CELIAN est une plateforme de vente en ligne de véhicules moderne et robuste, construite avec une architecture microservices. Le système permet la gestion complète du processus de vente de véhicules, du catalogue jusqu'à la livraison.

## 🚀 Fonctionnalités Principales

- Catalogue de véhicules interactif
- Système de recherche avancé
- Gestion des commandes et du panier
- Configuration de véhicules avec options
- Gestion des documents administratifs
- Système de paiement multi-modal
- Gestion des clients B2B et B2C
- Interface web et API REST

## 🛠 Prérequis Techniques

- Docker & Docker Compose
- Git
- JDK 17+
- Node.js 18+
- Maven 3.8+

## 🏗 Architecture

### Microservices
- Gateway Service
- Auth Service
- Catalogue Service
- Order Service
- Document Service
- Customer Service
- Payment Service

### Technologies
- **Backend**: Java 17 + Spring Boot 3.x
- **Frontend**: React 18 + Redux
- **Base de données**: 
  - PostgreSQL (données principales)
  - MySQL (données historiques)
  - Redis (cache)
  - Elasticsearch (recherche)
- **Message Broker**: RabbitMQ
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## 🚀 Installation

1. Cloner le repository

```bash
git clone https://github.com/Acahire-ZOGO/CELIAN.git
cd CELIAN
```

2. Configuration des variables d'environnement

```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

3. Lancer avec Docker Compose

```bash
docker-compose up -d
```

## 📦 Structure des Conteneurs Docker

```yaml
services:
  # Services d'Infrastructure
  postgres:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  mysql:
    image: mysql:8
    volumes:
      - mysql_data:/var/lib/mysql
    
  redis:
    image: redis:7-alpine
    
  elasticsearch:
    image: elasticsearch:8.x
    
  rabbitmq:
    image: rabbitmq:3-management
    
  # Services Applicatifs
  gateway:
    build: ./gateway
    depends_on:
      - service-registry
      
  auth-service:
    build: ./auth-service
    depends_on:
      - postgres
      
  catalogue-service:
    build: ./catalogue-service
    depends_on:
      - postgres
      - elasticsearch
      
  order-service:
    build: ./order-service
    depends_on:
      - mysql
      - rabbitmq
      
  document-service:
    build: ./document-service
    depends_on:
      - postgres
      
  customer-service:
    build: ./customer-service
    depends_on:
      - postgres
      
  payment-service:
    build: ./payment-service
    depends_on:
      - mysql
      - rabbitmq
      
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
```

## 🔧 Configuration

### Ports des Services

- Frontend: 3000
- Gateway: 8080
- Service Registry: 8761
- Auth Service: 8081
- Catalogue Service: 8082
- Order Service: 8083
- Document Service: 8084
- Customer Service: 8085
- Payment Service: 8086

### Base de données

- PostgreSQL: 5432
- MySQL: 3306
- Redis: 6379
- Elasticsearch: 9200, 9300

### Monitoring

- Prometheus: 9090
- Grafana: 3000

## 🔒 Sécurité

- JWT pour l'authentification
- HTTPS obligatoire en production
- Rate limiting au niveau Gateway
- Données sensibles chiffrées
- Logs sécurisés

## 📊 Monitoring

- Métriques applicatives via Prometheus
- Dashboards Grafana personnalisés
- Logging centralisé avec ELK Stack
- Alerting configuré pour les événements critiques

## 🚀 Déploiement


### Développement
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Staging
```bash
docker-compose -f docker-compose.staging.yml up -d
```

## 📝 Documentation API
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/api-docs

## 🧪 Tests
```bash
# Tests unitaires
./mvnw test

# Tests d'intégration
./mvnw verify

# Tests E2E
npm run cypress:run
```

## 📈 Scalabilité
- Services horizontalement scalables
- Load balancing automatique
- Cache distribué
- Database sharding configurable

## 🤝 Contribution
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License
Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## 📧 Contact
Email - achaire.zogo@facsciences-uy1.cm
Project Link: https://github.com/Achaire-Zogo/CELIAN
