import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    id: String,
    title: String,
    category: String,
    img: String,
    description: String
  });

  const Card = mongoose.model('Card', cardSchema);

export default Card;