# CELIAN Driver Cart API

## Description
API de gestion de commandes et de paniers pour le projet CELIAN, utilisant les patrons de conception Factory Method et State pour une meilleure flexibilité et maintenabilité.

## Prérequis
- Java 17
- MySQL 8.0+
- Maven 3.6+

## Configuration

### Base de données
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/drivercart
spring.datasource.username=root
spring.datasource.password=
```

### Identifiants par défaut
- Username: `admin`
- Password: `admin123`

## Architecture du Projet

### 1. Gestion des Utilisateurs
Le système gère trois types d'utilisateurs :

#### Types d'Utilisateurs
- **Utilisateur de base** : Informations communes
- **Client Individuel** : Particuliers
- **Client Entreprise** : Entreprises avec possibilité de filiales

#### Endpoints Utilisateurs (`/api/v1/users`)
- `POST /register` : Création d'un nouvel utilisateur
- `POST /individual` : Création d'un client individuel
- `POST /company` : Création d'un client entreprise
- `POST /company/{parentId}/subsidiary` : Ajout d'une filiale
- `GET /company/parent` : Liste des entreprises parentes
- `GET /company/{parentId}/subsidiaries` : Liste des filiales

### 2. Gestion du Panier

Le panier utilise une structure simple et efficace :

#### Modèle de Panier
- `Cart` : Contient la liste des articles et le montant total
- `CartItem` : Article individuel avec quantité et prix

#### Endpoints Panier (`/api/v1/carts`)
- `POST /` : Créer un nouveau panier
- `GET /{cartId}` : Consulter un panier
- `POST /{cartId}/items` : Ajouter un article
- `DELETE /{cartId}/items` : Supprimer un article
- `DELETE /{cartId}` : Vider le panier

### 3. Gestion des Commandes

Les commandes utilisent les patrons Factory Method et State :

#### États de Commande
- CREATED
- PENDING
- CONFIRMED
- IN_PREPARATION
- READY_FOR_DELIVERY
- IN_DELIVERY
- DELIVERED
- CANCELLED

#### Types de Commandes
- **Commande Individuelle** : Pour les clients particuliers
- **Commande Entreprise** : Pour les clients entreprises

#### Pattern Factory Method
- `OrderFactory` : Classe abstraite de base
- `IndividualOrderFactory` : Pour les commandes individuelles
- `CompanyOrderFactory` : Pour les commandes entreprises

#### Endpoints Commandes (`/api/v1/orders`)
- `POST /from-cart` : Créer une commande depuis un panier
- `PUT /{orderId}/state` : Mettre à jour l'état
- `GET /client/{clientId}` : Commandes d'un client
- `GET /type/{orderType}` : Commandes par type

## Flux de Travail Typique

1. **Création d'un Client**
   ```http
   POST /api/v1/users/individual
   {
     "name": "John Doe",
     "email": "john@example.com"
   }
   ```

2. **Création d'un Panier**
   ```http
   POST /api/v1/carts
   ```

3. **Ajout d'Articles au Panier**
   ```http
   POST /api/v1/carts/{cartId}/items
   {
     "productName": "Product 1",
     "quantity": 2,
     "price": 19.99
   }
   ```

4. **Création de la Commande**
   ```http
   POST /api/v1/orders/from-cart
   {
     "cartId": 1,
     "clientId": 1,
     "deliveryAddress": "123 Main St"
   }
   ```

## Sécurité
- Tous les endpoints sont sécurisés par authentification Basic
- Swagger UI accessible à : `http://localhost:8080/swagger-ui.html`
- Documentation OpenAPI à : `http://localhost:8080/v3/api-docs`

## Démarrage

1. Créer la base de données :
   ```sql
   CREATE DATABASE drivercart;
   ```

2. Compiler le projet :
   ```bash
   mvn clean install
   ```

3. Lancer l'application :
   ```bash
   mvn spring-boot:run
   ```

## Documentation API
Une documentation complète est disponible via Swagger UI à `http://localhost:8080/swagger-ui.html`
