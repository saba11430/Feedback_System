const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config');

// Importer les schémas GraphQL (typeDefs) et les resolvers (à créer)
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers/resolvers');

const startServer = async () => {
  const app = express();

  // Connexion à MongoDB
  await connectDB();

  // Création du serveur Apollo
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`🚀 Serveur prêt sur http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
