# CELIAN Driver Cart API

## Description
API de gestion de commandes et de paniers pour le projet CELIAN, utilisant Spring Security pour l'authentification et les autorisations.

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
- Username: `admin@celian.com`
- Password: `admin123`

## Architecture du Projet

### 1. Gestion des Utilisateurs

Le système implémente deux niveaux de contrôle :

#### Rôles Utilisateurs
- **ADMIN** : Accès complet à l'application
  - Peut voir tous les utilisateurs
  - Peut supprimer des utilisateurs
  - Accès à toutes les fonctionnalités
- **USER** : Accès limité à ses propres ressources
  - Peut gérer son propre profil
  - Peut gérer ses paniers et commandes

#### Types de Clients
- **Personne Physique (INDIVIDUAL)**
  - Nom et prénom
  - Numéro de téléphone
- **Personne Morale (COMPANY)**
  - Nom de l'entreprise
  - Numéro d'enregistrement (SIRET/SIREN)

#### Endpoints Utilisateurs (`/api/v1/users`)
- `POST /register` : Création d'un compte
- `GET /` : Liste tous les utilisateurs (ADMIN uniquement)
- `GET /{id}` : Détails d'un utilisateur (ADMIN ou propriétaire)
- `PUT /{id}` : Mise à jour d'un utilisateur (ADMIN ou propriétaire)
- `DELETE /{id}` : Suppression d'un utilisateur (ADMIN uniquement)

#### Exemples de Création de Compte

**Personne Physique :**
```json
{
  "email": "john@example.com",
  "password": "secret123",
  "name": "John Doe",
  "clientType": "INDIVIDUAL",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "0123456789"
}
```

**Personne Morale :**
```json
{
  "email": "contact@company.com",
  "password": "secret123",
  "name": "ACME Corp",
  "clientType": "COMPANY",
  "companyName": "ACME Corporation",
  "registrationNumber": "123456789"
}
```

### 2. Gestion du Panier

Chaque panier est strictement lié à un utilisateur spécifique :

#### Modèle de Panier
- `Cart` : Contient la liste des articles et le montant total
  - Lié à un utilisateur spécifique
  - Traçabilité avec timestamps
- `CartItem` : Article individuel avec quantité et prix

#### Endpoints Panier (`/api/v1/carts`)
- `POST /` : Créer un nouveau panier
- `GET /` : Liste des paniers de l'utilisateur connecté
- `GET /{cartId}` : Consulter un panier spécifique
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

1. **Création d'un Compte**
   ```http
   POST /api/v1/users/register
   {
     "email": "john@example.com",
     "password": "secret123",
     "name": "John Doe",
     "clientType": "INDIVIDUAL",
     "firstName": "John",
     "lastName": "Doe",
     "phoneNumber": "0123456789"
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
     "deliveryAddress": "123 Main St"
   }
   ```

## Sécurité
- Authentification via Spring Security
- Tous les endpoints sont sécurisés sauf `/register`
- Les mots de passe sont hashés avec BCrypt
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