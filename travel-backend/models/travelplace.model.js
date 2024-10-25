// models/TravelPlace.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TravelPlaceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Adventure', 'Nature', 'Cultural'],
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
});

const TravelPlace = model('TravelPlace', TravelPlaceSchema);
export default TravelPlace;
