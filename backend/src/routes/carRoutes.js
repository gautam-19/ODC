import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Car from '../models/Car.js'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const router = express.Router();

// // ✅ Use uploads directory inside routes folder
// const uploadsDir = path.join(__dirname, 'uploads'); // Now: src/routes/uploads
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // ✅ GET all cars
// router.get('/', async (req, res) => {
//   try {
//     const cars = await Car.find().sort({ timestamp: -1 });
//     res.json(cars);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch cars' });
//   }
// });

// ✅ POST: update from ESP32


// router.get('/latest-image', (req, res) => {
//   fs.readdir(uploadsDir, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Unable to read uploads directory' });
//     }

//     const imageFiles = files
//       .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
//       .map(file => ({
//         name: file,
//         time: fs.statSync(path.join(uploadsDir, file)).mtime.getTime()
//       }))
//       .sort((a, b) => b.time - a.time);

//     if (imageFiles.length === 0) {
//       return res.status(404).json({ error: 'No image found' });
//     }

//     const latestImage = imageFiles[0].name;
//     const imageUrl = `/uploads/${latestImage}`;
//     const timestamp = fs.statSync(path.join(uploadsDir, latestImage)).mtime.toISOString();

//     res.json({ imageUrl, timestamp });
//   });
// });



// export default router;


//*************************************************************changes made************************************************************************************ */


// import express from 'express';
// import Car from '../models/Car.js';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const router = express.Router();

// // ✅ Use uploads directory inside routes folder
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // ✅ GET all cars
// router.get('/', async (req, res) => {
//   try {
//     const cars = await Car.find().sort({ timestamp: -1 });
//     res.json(cars);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch cars' });
//   }
// });

// // ✅ POST: update from ESP32
// router.post('/update-from-device', async (req, res) => {
//   try {
//     let {
//       image,
//       carId,
//       carNumber,
//       timestamp,
//       latitude,
//       longitude,
//       obstacleDetected=true,
//       location,
//     } = req.body;

//     if (!image || !carId) {
//       return res.status(400).send({ error: 'Missing required fields: image or carId' });
//     }

//     const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
//     const buffer = Buffer.from(base64Data, 'base64');

//     const safeCarId = carId.replace(/[^a-z0-9]/gi, '_').toLowerCase();
//     const filename = `obstacle_${safeCarId}_${Date.now()}.jpg`;
//     const imagePath = path.join(uploadsDir, filename);

//     fs.writeFileSync(imagePath, buffer);
//     const imageUrl = `/uploads/${filename}`;

//     let parsedTimestamp = new Date(timestamp);
//     if (isNaN(parsedTimestamp.getTime())) parsedTimestamp = new Date();

//     let loc = location && typeof location === 'object' ? location : {};
//     loc.latitude = loc.latitude !== undefined ? Number(loc.latitude) : Number(latitude);
//     loc.longitude = loc.longitude !== undefined ? Number(loc.longitude) : Number(longitude);
//     loc.address = loc.address || '';

//     if (isNaN(loc.latitude) || isNaN(loc.longitude)) {
//       return res.status(400).send({ error: 'Invalid latitude or longitude' });
//     }

//     let car = await Car.findOne({ carId });
//     if (!car) {
//       car = new Car({ carId });
//     }

//     car.carNumber = carNumber || car.carNumber || `unknown_${Date.now()}`;
//     car.obstacleDetected = obstacleDetected;
//     car.obstacleImage = imageUrl;
//     car.location = {
//       latitude: loc.latitude,
//       longitude: loc.longitude,
//       address: loc.address,
//     };
//     car.timestamp = parsedTimestamp;
//     car.isActive = true;

//     await car.save();

//     res.status(200).json({
//       message: 'Car data and image saved successfully',
//       carId,
//       imageUrl,
//       timestamp: parsedTimestamp.toISOString(),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // ✅ GET latest image with carId
// router.get('/latest-image', (req, res) => {
//   fs.readdir(uploadsDir, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Unable to read uploads directory' });
//     }

//     const imageFiles = files
//       .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
//       .map(file => ({
//         name: file,
//         time: fs.statSync(path.join(uploadsDir, file)).mtime.getTime()
//       }))
//       .sort((a, b) => b.time - a.time);

//     if (imageFiles.length === 0) {
//       return res.status(404).json({ error: 'No image found' });
//     }

//     const latestImage = imageFiles[0].name;
//     const imageUrl = `/uploads/${latestImage}`;
//     const timestamp = fs.statSync(path.join(uploadsDir, latestImage)).mtime.toISOString();

//     // ✅ Extract carId from filename: obstacle_<carId>_<timestamp>.jpg
//     const match = latestImage.match(/^obstacle_(.+?)_\d+\.(jpg|jpeg|png|gif)$/i);
//     const carId = match ? match[1] : 'unknown';

//     res.json({ carId, imageUrl, timestamp });
//   });
// });

// export default router;

//***************************************************Last Running Code end************************************************************** */
// import express from 'express';
// import Car from '../models/Car.js';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const router = express.Router();

// // ✅ Use uploads directory inside routes folder
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // ✅ GET all cars
// router.get('/', async (req, res) => {
//   try {
//     const cars = await Car.find().sort({ timestamp: -1 });
//     res.json(cars);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch cars' });
//   }
// });

// // ✅ POST: update from ESP32
// router.post('/update-from-device', async (req, res) => {
//   try {
//     let {
//       image,
//       carId,
//       carNumber,
//       timestamp,
//       latitude,
//       longitude,
//       obstacleDetected = true,
//       location,
//     } = req.body;

//     if (!image || !carId) {
//       return res.status(400).send({ error: 'Missing required fields: image or carId' });
//     }

//     const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
//     const buffer = Buffer.from(base64Data, 'base64');

//     const safeCarId = carNumber.replace(/[^a-z0-9]/gi, '_').toLowerCase();
//     // const filename = `obstacle_${safeCarId}_${Date.now()}.jpg`;
//     const filename = `${safeCarId}.jpg`;

//     const imagePath = path.join(uploadsDir, filename);

//     fs.writeFileSync(imagePath, buffer);
//     const imageUrl = `/uploads/${filename}`;

//     let parsedTimestamp = new Date(timestamp);
//     if (isNaN(parsedTimestamp.getTime())) parsedTimestamp = new Date();

//     let loc = location && typeof location === 'object' ? location : {};
//     loc.latitude = loc.latitude !== undefined ? Number(loc.latitude) : Number(latitude);
//     loc.longitude = loc.longitude !== undefined ? Number(loc.longitude) : Number(longitude);
//     loc.address = loc.address || '';

//     if (isNaN(loc.latitude) || isNaN(loc.longitude)) {
//       return res.status(400).send({ error: 'Invalid latitude or longitude' });
//     }

//     let car = await Car.findOne({ carId });
//     if (!car) {
//       car = new Car({ carId });
//     }

//     car.carNumber = carNumber || car.carNumber || `unknown_${Date.now()}`;
//     car.obstacleDetected = obstacleDetected;
//     car.obstacleImage = imageUrl;
//     car.location = {
//       latitude: loc.latitude,
//       longitude: loc.longitude,
//       address: loc.address,
//     };
//     car.timestamp = parsedTimestamp;
//     car.isActive = true;

//     await car.save();

//     res.status(200).json({
//       message: 'Car data and image saved successfully',
//       carId,
//       imageUrl,
//       timestamp: parsedTimestamp.toISOString(),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // ✅ GET latest image with carId, carNumber, obstacleDetected, and location
// router.get('/latest-image', async (req, res) => {
//   try {
//     const files = fs.readdirSync(uploadsDir);

//     const imageFiles = files
//       .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
//       .map(file => ({
//         name: file,
//         time: fs.statSync(path.join(uploadsDir, file)).mtime.getTime()
//       }))
//       .sort((a, b) => b.time - a.time);

//     if (imageFiles.length === 0) {
//       return res.status(404).json({ error: 'No image found' });
//     }

//     const latestImage = imageFiles[0].name;
//     const imageUrl = `/uploads/${latestImage}`;
//     const timestamp = fs.statSync(path.join(uploadsDir, latestImage)).mtime.toISOString();

//     const match = latestImage.match(/^obstacle_(.+?)_\d+\.(jpg|jpeg|png|gif)$/i);
//     const carId = match ? match[1] : null;

//     let obstacleDetected = false;
//     let carNumber = 'unknown';
//     let location = {
//       latitude: null,
//       longitude: null,
//       address: ''
//     };

//     if (carId) {
//       const car = await Car.findOne({ carId }).sort({ timestamp: -1 });

//       if (car) {
//         obstacleDetected = !!car.obstacleDetected;
//         carNumber = car.carNumber || 'unknown';
//         if (car.location) {
//           location.latitude = car.location.latitude ?? null;
//           location.longitude = car.location.longitude ?? null;
//           location.address = car.location.address || '';
//         }
//       }
//     }
//     let hasObstacle=obstacleDetected;
//     res.json({
//       carId: carId || 'unknown',
//       carNumber,
//       imageUrl,
//       timestamp,
//       hasObstacle,
//       location
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;





// const router = express.Router();

// const uploadsDir = path.join(__dirname, 'uploads');
 

// GET image by carNumber
// router.get('/image-by-carNumber/:carNumber', async (req, res) => {
//   try {
//     const { carNumber } = req.params;

//     // Possible extensions to check
//     const extensions = ['jpg', 'jpeg', 'png', 'gif'];

//     // Find the first matching file with carNumber and one of the extensions
//     let foundFile = null;
//     for (const ext of extensions) {
//       const filename = `${carNumber.toLowerCase()}.${ext}`;
//       const filePath = path.join(uploadsDir, filename);
//       if (fs.existsSync(filePath)) {
//         foundFile = filename;
//         break;
//       }
//     }

//     if (!foundFile) {
//       return res.status(404).json({ error: `No image found for carNumber: ${carNumber}` });
//     }

//     const imageUrl = `/uploads/${foundFile}`;

//     // You can add additional metadata here if you want, or just return the URL
//     return res.json({
//       carNumber,
//       imageUrl,
//       timestamp: fs.statSync(path.join(uploadsDir, foundFile)).mtime.toISOString(),
//       hasObstacle: true // or false if you want to customize
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// ✅ Use uploads directory inside routes folder
const uploadsDir = path.join(__dirname, 'uploads');
// ✅ GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ timestamp: -1 });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// ✅ POST: update from ESP32


router.get('/latest-image', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read uploads directory' });
    }

    const imageFiles = files
      .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(uploadsDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (imageFiles.length === 0) {
      return res.status(404).json({ error: 'No image found' });
    }

    const latestImage = imageFiles[0].name;
    const imageUrl = `/uploads/${latestImage}`;
    const timestamp = fs.statSync(path.join(uploadsDir, latestImage)).mtime.toISOString();

    res.json({ imageUrl, timestamp });
  });
});

router.get('/image-by-car-number/:carNumber', async (req, res) => {
  try {
    const { carNumber } = req.params;
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    let foundFile = null;

    for (const ext of extensions) {
      const filename = `${carNumber.toLowerCase()}.${ext}`;
      const filePath = path.join(uploadsDir, filename);
      console.log("asdf" , filePath);
      if (fs.existsSync(filePath)) {
        foundFile = filename;
        break;
      }
    }
    if (!foundFile) {
      return res.status(404).json({ error: `No image found for carNumber: ${carNumber}` });
    }

    // Query car data for additional info
    const car = await Car.findOne({ carNumber });
    if (!car) {
      return res.status(404).json({ error: `Car with carNumber ${carNumber} not found` });
    }

    const imageUrl = `/uploads/${foundFile}`;
    const timestamp = fs.statSync(path.join(uploadsDir, foundFile)).mtime.toISOString();

    return res.json({
      carId: car.carId,
      carNumber: car.carNumber,
      imageUrl,
      timestamp,
      hasObstacle: car.obstacleDetected || false,
      location: car.location || {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// ✅ POST: Add a new car


router.post('/', async (req, res) => {
  console.log(req.body); 
  try {
    const { carNumber, hostName, location } = req.body;

    console.log(carNumber , hostName , location); 

    if (!carNumber || !hostName || !location?.address) {
      return res.status(400).json({ error: 'carNumber, hostName, and location.address are required.' });
    }

    // Check if car already exists
    const existing = await Car.findOne({ carNumber });
    if (existing) {
      return res.status(409).json({ error: 'Car with this number already exists' });
    }

    const newCar = new Car({
      carNumber,
      hostName,
      location,
      obstacleDetected: false, // default
    });

    await newCar.save();
    return res.status(201).json({ message: 'Car created successfully', car: newCar });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error while creating car' });
  }
});
// DELETE /api/cars/:carNumber
router.delete('/:carNumber', async (req, res) => {
  try {
    const { carNumber } = req.params;
    const deletedCar = await Car.findOneAndDelete({ carNumber });
    if (!deletedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
});
// routes/auth.js
 // adjust the path to your User model

// Login route
// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin, // Add this
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
