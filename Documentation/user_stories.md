# User Stories par Module

## 1. Module Authentification

![Authentication Module](user-stories/authentication.png)

```mermaid
graph TD
    subgraph "Authentication Module"
        A[Client] --> B[S'inscrire]
        A --> C[Se connecter]
        A --> D[Réinitialiser mot de passe]
        
        B --> B1[Remplir formulaire]
        B --> B2[Vérifier email]
        B --> B3[Activer compte]
        
        C --> C1[Entrer credentials]
        C --> C2[Recevoir JWT]
        
        D --> D1[Demander réinitialisation]
        D --> D2[Recevoir email]
        D --> D3[Définir nouveau mot de passe]
    end
```


## 2. Module Catalogue

![Catalogue Module](user-stories/catalogue.png)

```mermaid
graph TD
    subgraph "Catalogue Module"
        A[Client] --> B[Consulter catalogue]
        A --> C[Rechercher véhicule]
        A --> D[Voir détails véhicule]
        
        B --> B1[Filtrer par type]
        B --> B2[Trier par prix]
        B --> B3[Voir disponibilité]
        
        C --> C1[Recherche par mot-clé]
        C --> C2[Recherche avancée]
        
        D --> D1[Voir spécifications]
        D --> D2[Voir images]
        D --> D3[Voir options disponibles]
        D --> D4[Voir prix]
    end
```

## 3. Module Commande

![Order Module](user-stories/order.png)

```mermaid
graph TD
    subgraph "Order Module"
        A[Client] --> B[Créer commande]
        A --> C[Gérer panier]
        A --> D[Suivre commande]
        
        B --> B1[Sélectionner véhicule]
        B --> B2[Choisir options]
        B --> B3[Vérifier compatibilité]
        B --> B4[Calculer prix total]
        
        C --> C1[Ajouter au panier]
        C --> C2[Modifier quantité]
        C --> C3[Supprimer du panier]
        C --> C4[Sauvegarder panier]
        
        D --> D1[Voir statut]
        D --> D2[Recevoir notifications]
        D --> D3[Annuler commande]
    end
```

## 4. Module Document

![Document Module](user-stories/document.png)

```mermaid
graph TD
    subgraph "Document Module"
        A[Client] --> B[Générer documents]
        A --> C[Télécharger documents]
        A --> D[Gérer documents]
        
        B --> B1[Demande immatriculation]
        B --> B2[Certificat de cession]
        B --> B3[Bon de commande]
        
        C --> C1[Format PDF]
        C --> C2[Format HTML]
        
        D --> D1[Archiver documents]
        D --> D2[Partager documents]
        D --> D3[Supprimer documents]
    end
```

## 5. Module Client

![Customer Module](user-stories/customer.png)

```mermaid
graph TD
    subgraph "Customer Module"
        A[Client] --> B[Gérer profil]
        A --> C[Gérer société]
        A --> D[Gérer préférences]
        
        B --> B1[Modifier informations]
        B --> B2[Voir historique]
        B --> B3[Gérer adresses]
        
        C --> C1[Ajouter filiale]
        C --> C2[Gérer employés]
        C --> C3[Gérer flottes]
        
        D --> D1[Notifications]
        D --> D2[Mode paiement préféré]
        D --> D3[Langue préférée]
    end
```

## 6. Module Paiement

![Payment Module](user-stories/payment.png)

```mermaid
graph TD
    subgraph "Payment Module"
        A[Client] --> B[Choisir paiement]
        A --> C[Effectuer paiement]
        A --> D[Gérer transactions]
        
        B --> B1[Paiement comptant]
        B --> B2[Demande crédit]
        B --> B3[Paiement échelonné]
        
        C --> C1[Valider paiement]
        C --> C2[Recevoir confirmation]
        C --> C3[Générer facture]
        
        D --> D1[Voir historique]
        D --> D2[Télécharger reçus]
        D --> D3[Contester transaction]
    end
```

## 7. Module Administration

![Admin Module](user-stories/admin.png)

```mermaid
graph TD
    subgraph "Admin Module"
        A[Admin] --> B[Gérer catalogue]
        A --> C[Gérer utilisateurs]
        A --> D[Gérer commandes]
        
        B --> B1[Ajouter véhicule]
        B --> B2[Modifier stock]
        B --> B3[Gérer promotions]
        
        C --> C1[Valider comptes]
        C --> C2[Gérer rôles]
        C --> C3[Bloquer utilisateurs]
        
        D --> D1[Valider commandes]
        D --> D2[Gérer livraisons]
        D --> D3[Gérer retours]
    end
```

## 8. Module Reporting

![Reporting Module](user-stories/reporting.png)

```mermaid
graph TD
    subgraph "Reporting Module"
        A[Admin] --> B[Rapports ventes]
        A --> C[Analyses clients]
        A --> D[KPIs]
        
        B --> B1[Ventes par période]
        B --> B2[Ventes par modèle]
        B --> B3[Ventes par région]
        
        C --> C1[Segmentation clients]
        C --> C2[Comportement achat]
        C --> C3[Satisfaction client]
        
        D --> D1[Taux conversion]
        D --> D2[Panier moyen]
        D --> D3[ROI marketing]
    end
```

Chaque diagramme représente :

- Les acteurs principaux
- Les actions principales
- Les sous-actions et workflows
- Les interactions entre les différentes fonctionnalités

Ces user stories sont organisées de manière hiérarchique pour montrer :

1. L'objectif principal de chaque module
2. Les fonctionnalités détaillées
3. Les interactions utilisateur
4. Les résultats attendus

Voulez-vous que je détaille davantage certains modules ou que j'ajoute d'autres diagrammes ?
