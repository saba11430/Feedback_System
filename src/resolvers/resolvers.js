const User = require('../models/User');
const Product = require('../models/Product');
const Feedback = require('../models/Feedback');

const resolvers = {
  Query: {
    users: async () => await User.find(),
    products: async () => await Product.find(),
    feedbacks: async () => await Feedback.find(),
    feedbacksByProduct: async (_, { productName }) =>
      await Feedback.find({ productName }),
  },

  Mutation: {
    createUser: async (_, { username, email }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Ce nom d'utilisateur existe déjà.");
      }

      const user = new User({ username, email });
      return await user.save();
    },

    createProduct: async (_, { name, description, version }) => {
      const product = new Product({ name, description, version });
      return await product.save();
    },

    createFeedback: async (_, { username, productName, rating, comment }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("Utilisateur introuvable");

      const product = await Product.findOne({ name: productName });
      if (!product) throw new Error("Produit introuvable");

      const feedback = new Feedback({
        username,
        productName,
        rating,
        comment,
      });

      return await feedback.save();
    }
  },

  Feedback: {
    user: async (parent) => await User.findOne({ username: parent.username }),
    product: async (parent) => await Product.findOne({ name: parent.productName })
  }
};

module.exports = resolvers;
