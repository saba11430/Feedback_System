
# 🛠️ Web Service GraphQL - Feedback system

## 1. ✅ Solution proposée

### 🔍 Analyse du problème
Les entreprises ont besoin de centraliser les avis de leurs utilisateurs afin d’améliorer leurs produits. Ce système permet aux utilisateurs de laisser des **feedbacks** sur les produits 
L’objectif est de développer un web service permettant :
- La gestion d’utilisateurs
- L’ajout de produits
- La collecte de feedbacks liés aux produits

### 📦 Identification des entités & relations

#### Entités :
- **User** : username, email
- **Product** : name, description, version
- **Feedback** : username, productName, rating, comment

#### Relations :
- Un utilisateur peut envoyer plusieurs feedbacks
- Un produit peut avoir plusieurs feedbacks
- Chaque feedback est lié à un utilisateur et un produit

### 🧩 Liste des fonctionnalités (sous forme de web service GraphQL)

**Query :**
  - `users` : récupérer tous les utilisateurs
  - `products` : récupérer tous les produits
  - `feedbacks` : récupérer tous les feedbacks
  - `feedbacksByProduct(productName: String!)` : feedbacks liés à un produit

- **Mutation :**
  - `createUser(username, email)` : ajouter un utilisateur
  - `createProduct(name, description, version)` : ajouter un produit
  - `createFeedback(username, productName, rating, comment)` : ajouter un feedback

---
### 💡 Remarque

Les **mutations** et **requêtes GraphQL** peuvent être testées de deux façons :  
- Directement via l'**interface GraphiQL** (souvent disponible sur `http://localhost:4000/graphql`)  
- Ou via un **frontend simple** (ex. : formulaire HTML + fetch JavaScript)  
👉 Cela permet de **faciliter les tests** et **éviter d'écrire manuellement** des mutations complètes à chaque fois.
## 2. 📊 Diagrammes

### 📘 Diagramme de classes / Entités

```
User
 └─ username: String
 └─ email: String

Product
 └─ name: String
 └─ description: String
 └─ version: String

Feedback
 └─ username: String (relation vers User)
 └─ productName: String (relation vers Product)
 └─ rating: Int
 └─ comment: String
```
---

## . 🛠️ Implémentation technique
Web service : GraphQL via Apollo Server

Back-end : Node.js + Express

Base de données : MongoDB

Front-end : Interface simple HTML/JS pour soumettre et voir les feedbacks

Structure :
├── frontend/
│   ├── index.html
│   ├── user.html
│   ├── product.html
│   ├── feedback.html
│   └── view_feedback.html
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Feedback.js
├── resolvers
│      └──  resolvers.js
├── schemas
│      └──  typeDefs.js
│   
├── index.js
├── config.js
└── README.md

---
### 3 🔁 Schéma des requêtes & réponses (GraphQL)

#### Exemple Mutation :
```graphql
mutation {
  createUser(username: "amine", email: "amine@example.com") {
    id
    username
    email
  }
}
```

#### Exemple Query :
```graphql
{
  feedbacksByProduct(productName: "AppX") {
    username
    rating
    comment
  }
}
```

## .4 📚 Documentation

### 🔍 Description du schéma GraphQL

#### Mutations :
```graphql
createUser(username: String!, email: String!): User
createProduct(name: String!, description: String!, version: String!): Product
createFeedback(username: String!, productName: String!, rating: Int!, comment: String): Feedback
```

#### Queries :
```graphql
users: [User]
products: [Product]
feedbacks: [Feedback]
feedbacksByProduct(productName: String!): [Feedback]
```

---

### 📌 Exemples d'utilisation

#### ➕ Ajouter un produit
```graphql
mutation {
  createProduct(name: "AppX", description: "Application de test", version: "1.0") {
    name
    version
  }
}
```

#### 🔍 Voir tous les feedbacks
```graphql
{
  feedbacks {
    username
    productName
    rating
    comment
  }
}
```
