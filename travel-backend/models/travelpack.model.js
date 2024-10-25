// models/TravelPackage.js
import mongoose from 'mongoose';

const travelPackagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true, // Duration in nights
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    mapUrl: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,  
    }
    
}, { timestamps: true });

const TravelPackages = mongoose.model('TravelPackages', travelPackagesSchema);

export default TravelPackages;
