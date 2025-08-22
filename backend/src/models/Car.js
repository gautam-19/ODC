// import mongoose from 'mongoose';

// const carSchema = new mongoose.Schema({
//   carId: String,
//   latitude: Number,
//   longitude: Number,
//   imagePath: String, // image file path
//   timestamp: { type: Date, default: Date.now },
// });

// export default mongoose.model('Car', carSchema);

//---------------------------------------------
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  carId: { type: String },
  carNumber: { type: String }, // Optional, no unique constraint
  isActive: { type: Boolean, default: false }, // Optional: add activity flag
  obstacleDetected: { type: Boolean, default: false },
  obstacleDistance: { type: Number }, // <-- Added field
  obstacleImage: { type: String },    // <-- Added base64 image string

  location: {
    latitude: { type: Number },       // <-- Changed from String to Number
    longitude: { type: Number },      // <-- Changed from String to Number
    address: { type: String },        // <-- Optional: if you reverse geocode
  },

  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Car', carSchema);

