# 📋 Feedback System – Web App (GraphQL + Node.js + MongoDB)

## 1. ✅ Solution proposée

### 🔍 Analyse du problème
Les entreprises ont besoin de centraliser les avis de leurs utilisateurs afin d’améliorer leurs produits. Ce système permet aux utilisateurs de laisser des **feedbacks** (commentaires et notes) sur des produits, et aux administrateurs de gérer les produits et utilisateurs.

### 🧩 Identification des entités & relations
- **User** : peut donner un feedback
- **Product** : reçoit plusieurs feedbacks
- **Feedback** : lie un utilisateur à un produit par un commentaire et une note

Relations :
- Un `User` peut envoyer plusieurs `Feedback`
- Un `Product` peut recevoir plusieurs `Feedback`

### ⚙️ Liste des fonctionnalités (sous forme de services GraphQL)
- **Query :**
  - `users` : récupérer tous les utilisateurs
  - `products` : récupérer tous les produits
  - `feedbacks` : récupérer tous les feedbacks
  - `feedbacksByProduct(productName: String!)` : feedbacks liés à un produit

- **Mutation :**
  - `createUser(username, email)` : ajouter un utilisateur
  - `createProduct(name, description, version)` : ajouter un produit
  - `createFeedback(username, productName, rating, comment)` : ajouter un feedback

---

## 2. 🧾 Diagrammes

### 📦 Diagramme de classes (entités)

```plaintext
User
 ├── id: ID
 ├── username: String
 ├── email: String
 └── createdAt: String

Product
 ├── id: ID
 ├── name: String
 ├── description: String
 ├── version: String
 └── createdAt: String

Feedback
 ├── id: ID
 ├── username: String
 ├── productName: String
 ├── rating: Int
 ├── comment: String
 └── createdAt: String

# 🛠️ Implémentation technique

Web service : GraphQL via Apollo Server

Back-end : Node.js + Express

Base de données : MongoDB

Front-end : Interface simple HTML/JS pour soumettre et voir les feedbacks


# 🧾 Documentation

🔗 Schéma GraphQL 

type Query {
  users: [User!]!
  products: [Product!]!
  feedbacks: [Feedback!]!
  feedbacksByProduct(productName: String!): [Feedback!]!
}

type Mutation {
  createUser(username: String!, email: String!): User!
  createProduct(name: String!, description: String, version: String): Product!
  createFeedback(username: String!, productName: String!, rating: Int!, comment: String): Feedback!
}

# 🧪 Exemples d’utilisation

Créer un utilisateur :

mutation {
  createUser(username: "alice", email: "alice@mail.com") {
    id
    username
  }
}

Lister les feedbacks :

query {
  feedbacks {
    productName
    comment
    rating
  }
}




