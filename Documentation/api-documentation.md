# Documentation API REST

## Base URL
```
http://localhost:8082/api
```

## Authentification

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "token": "string",
    "user": {
        "id": "number",
        "email": "string",
        "firstName": "string",
        "lastName": "string"
    }
}
```

### Register
```http
POST /auth/register
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "clientType": "INDIVIDUAL|COMPANY",
    "companyName": "string",
    "registrationNumber": "string"
}
```

## Véhicules

### Liste des véhicules
```http
GET /vehicles
```

**Response:**
```json
[
    {
        "id": "number",
        "type": "ELECTRIC_CAR|FUEL_CAR|ELECTRIC_SCOOTER|FUEL_SCOOTER|FLEET",
        "marque": "string",
        "model": "string",
        "price": "number",
        "specifications": {
            "batteryCapacity": "number",
            "drivingRange": "number",
            "engineSize": "number",
            "fuelType": "string"
        }
    }
]
```

### Recherche de véhicules
```http
GET /vehicles/search
```

**Query Parameters:**
- `model`: string
- `marque`: string
- `type`: string
- `minPrice`: number
- `maxPrice`: number

### Ajout d'un véhicule
```http
POST /vehicles
```

**Request Body:**
```json
{
    "type": "ELECTRIC_CAR|FUEL_CAR|ELECTRIC_SCOOTER|FUEL_SCOOTER|FLEET",
    "marque": "string",
    "model": "string",
    "price": "number",
    "specifications": {
        "batteryCapacity": "number",
        "drivingRange": "number",
        "engineSize": "number",
        "fuelType": "string"
    }
}
```

## Panier

### Obtenir le panier
```http
GET /cart
```

**Query Parameters:**
- `userId`: number

**Response:**
```json
{
    "items": [
        {
            "id": "number",
            "vehicleId": "number",
            "quantity": "number",
            "vehicle": {
                "id": "number",
                "type": "string",
                "marque": "string",
                "model": "string",
                "price": "number"
            }
        }
    ],
    "total": "number"
}
```

### Ajouter au panier
```http
POST /cart/add
```

**Query Parameters:**
- `userId`: number
- `vehicleId`: number
- `quantity`: number

### Mettre à jour la quantité
```http
POST /cart/update_cart_quantity
```

**Query Parameters:**
- `cartId`: number
- `quantity`: number

## Commandes

### Créer une commande
```http
POST /orders
```

**Query Parameters:**
- `userId`: number
- `type`: string (CASH|CREDIT)
- `countryId`: number

**Response:**
```json
{
    "id": "number",
    "userId": "number",
    "items": [
        {
            "id": "number",
            "vehicleId": "number",
            "quantity": "number",
            "price": "number"
        }
    ],
    "total": "number",
    "state": "string",
    "type": "string",
    "createdAt": "string"
}
```

### Liste des commandes
```http
GET /orders
```

**Response:**
```json
[
    {
        "id": "number",
        "userId": "number",
        "items": [],
        "total": "number",
        "state": "string",
        "type": "string",
        "createdAt": "string"
    }
]
```

### Détails d'une commande
```http
GET /orders/{id}
```

## Pays

### Liste des pays
```http
GET /countries
```

**Response:**
```json
[
    {
        "id": "number",
        "name": "string",
        "taxRate": "number"
    }
]
```

## Utilisateurs

### Profil utilisateur
```http
GET /users/profile
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
    "id": "number",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "clientType": "string",
    "companyName": "string",
    "registrationNumber": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

### Liste des utilisateurs (Admin)
```http
GET /users
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
[
    {
        "id": "number",
        "email": "string",
        "firstName": "string",
        "lastName": "string",
        "clientType": "string"
    }
]
```

## Sécurité

### Headers requis
Toutes les requêtes (sauf login et register) doivent inclure :
```http
Authorization: Bearer <token>
```

### Codes d'erreur
- `400`: Bad Request - Données invalides
- `401`: Unauthorized - Token manquant ou invalide
- `403`: Forbidden - Permissions insuffisantes
- `404`: Not Found - Ressource non trouvée
- `500`: Internal Server Error - Erreur serveur
