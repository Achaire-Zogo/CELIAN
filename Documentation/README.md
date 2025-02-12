# Documentation Technique - Application Driver Cart

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Backend (Java)](#backend-java)
   - [Patrons de conception](#patrons-de-conception)
   - [Structure du projet](#structure-du-projet)
   - [API REST](#api-rest)
4. [Frontend (React)](#frontend-react)
   - [Structure du projet](#structure-du-projet-1)
   - [Composants](#composants)
   - [État global](#état-global)
5. [Base de données](#base-de-données)
6. [Diagrammes](#diagrammes)
   - [Cas d'utilisation](#cas-dutilisation)
   - [Classes](#classes)
   - [Architecture](#architecture-1)
7. [Sécurité](#sécurité)
8. [Déploiement](#déploiement)

## Vue d'ensemble

Driver Cart est une application de commerce électronique spécialisée dans la vente de véhicules. Elle est composée de :

- Un backend en Java avec Spring Boot
- Un frontend en React.js
- Une architecture RESTful
- Une gestion avancée des véhicules (électriques, essence, flottes)

## Architecture

L'application suit une architecture en couches :

1. **Couche Présentation** (Frontend React)
   - Interface utilisateur
   - Gestion de l'état avec Redux
   - Routage avec React Router

2. **Couche API** (Backend Java)
   - Controllers REST
   - Services métier
   - Repositories

3. **Couche Données**
   - Base de données relationnelle
   - Gestion des entités JPA

## Backend (Java)

### Patrons de conception

1. **Factory Pattern**
   - `VehiculeFactory` - Création de différents types de véhicules
   - `OrderFactory` - Création de différents types de commandes

2. **Singleton Pattern**
   - `DocumentBundle` - Gestion des documents

3. **State Pattern**
   - Gestion des états des commandes

4. **Builder Pattern**
   - Construction de documents

### Structure du projet

```
backend/driver-cart/
├── src/main/java/com/inf4067/driver_cart/
│   ├── config/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   ├── factory/
│   ├── document/
│   └── security/
```

### API REST

Endpoints principaux :

- `/api/auth` - Authentification
- `/api/vehicles` - Gestion des véhicules
- `/api/orders` - Gestion des commandes
- `/api/cart` - Gestion du panier
- `/api/users` - Gestion des utilisateurs

## Frontend (React)

### Structure du projet

```
drive-cart/
├── src/
│   ├── auth/
│   ├── catalogue/
│   ├── cart/
│   ├── orders/
│   ├── payment/
│   ├── clients/
│   ├── dashboard/
│   └── store/
```

### Composants principaux

1. **Catalogue**
   - Affichage des véhicules
   - Filtres de recherche
   - Gestion des types de véhicules

2. **Panier**
   - Gestion des articles
   - Calcul des totaux
   - Actions (ajout/suppression)

3. **Paiement**
   - Processus en étapes
   - Multiples méthodes de paiement
   - Sélection du pays

4. **Dashboard**
   - Statistiques
   - Graphiques
   - Gestion administrative

### État global (Redux)

- Authentification
- Panier
- Notifications
- État des véhicules

## Base de données

### Entités principales

1. **User**
   - id
   - email
   - password
   - role
   - clientType
   - createdAt
   - updatedAt

2. **Vehicle**
   - id
   - type
   - marque
   - model
   - price
   - specifications

3. **Order**
   - id
   - userId
   - items
   - total
   - status
   - createdAt

4. **Cart**
   - id
   - userId
   - items
   - total

## Sécurité

1. **Authentification**
   - JWT (JSON Web Tokens)
   - Gestion des rôles
   - Validation des tokens

2. **Autorisations**
   - CORS configuré
   - Protection des routes
   - Validation des entrées

## Déploiement

1. **Prérequis**
   - Java 11+
   - Node.js 14+
   - Base de données compatible

2. **Configuration**
   - Variables d'environnement
   - Propriétés Spring Boot
   - Configuration React

3. **Étapes de déploiement**
   - Build du backend
   - Build du frontend
   - Configuration du serveur
   - Déploiement des artefacts
