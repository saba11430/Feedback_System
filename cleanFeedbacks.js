const mongoose = require('mongoose');

async function cleanFeedbacks() {
  await mongoose.connect('mongodb://localhost:27017/ton_nom_de_bdd', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const Feedback = mongoose.model('Feedback', new mongoose.Schema({
    username: String,
    productName: String,
    rating: Number,
    comment: String,
    createdAt: Date,
  }));

  const result = await Feedback.deleteMany({
    $or: [
      { username: null },
      { username: { $exists: false } },
      { productName: null },
      { productName: { $exists: false } }
    ]
  });

  console.log(`Documents supprimés : ${result.deletedCount}`);
  await mongoose.disconnect();
}

cleanFeedbacks().catch(console.error);
