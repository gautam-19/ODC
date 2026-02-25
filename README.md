# 🚗 Obstacle Detecting Self-Driving Car with Email Alert & Live Monitoring

## 📌 Overview

This project demonstrates a **low-cost autonomous vehicle prototype** capable of detecting obstacles, capturing visual evidence, retrieving GPS coordinates, and sending automated alerts.

The system integrates:

* Arduino Uno
* ESP32-CAM
* Ultrasonic & TOF Sensors
* GPS Module
* Node.js + MongoDB Backend
* React Monitoring Dashboard

Designed for **safety, surveillance, and remote monitoring applications**.

---

## ✨ Key Features

✅ Real-time obstacle detection
✅ Immediate motor halt on detection
✅ ESP32-CAM image capture
✅ GPS coordinate tracking
✅ Email alerts (Image + Location)
✅ Cloud data logging
✅ Web-based live monitoring

---

## 🧠 System Architecture

**Dual-Controller Design**

| Controller      | Responsibilities                  |
| --------------- | --------------------------------- |
| **Arduino Uno** | Sensor processing & motor control |
| **ESP32-CAM**   | Image capture, Wi-Fi, GPS & email |

**Operational Flow**

1. Sensors scan surroundings
2. Obstacle detected
3. Motors stop instantly
4. Arduino triggers ESP32-CAM
5. Image captured
6. GPS coordinates fetched
7. Email alert sent
8. Data uploaded to backend

---

## 🔧 Hardware Components

* **Arduino Uno** – Main controller
* **ESP32-CAM** – Camera + Wi-Fi module
* **HC-SR04 Ultrasonic Sensor** – Distance sensing
* **VL53L0X TOF Sensor** – Precision short-range sensing
* **SG90 Servo Motor** – Directional scanning
* **Neo-6M GPS Module** – Location tracking
* **L298N Motor Driver** – Motor interface
* **DC Motors** – Vehicle movement

---

## 💻 Software Stack

### Embedded / Firmware

* Arduino IDE
* ESP32 Board Support
* TinyGPSPlus
* ESP_Mail_Client
* Wi-Fi / HTTPClient Libraries

### Backend

* Node.js
* Express.js
* MongoDB

### Frontend

* React.js
* Monitoring Dashboard

---

## ⚙️ Working Principle

* Ultrasonic sensor performs continuous scanning
* TOF sensor improves measurement accuracy
* Obstacle detection triggers emergency stop
* ESP32-CAM captures image
* GPS module retrieves coordinates
* Email notification dispatched
* Event logged in database

---

## 📡 Alert & Logging System

Each obstacle event records:

* 📷 Captured image
* 📍 GPS coordinates
* ⏱ Timestamp
* 🗂 Incident log

Alerts are delivered via **email notification system**.

---

## ✅ Advantages

✔ Low-cost & scalable design
✔ Real-time safety response
✔ Visual incident recording
✔ Cloud-based monitoring
✔ Remote accessibility

---

## ⚠ Limitations

✖ Ultrasonic sensor range constraints
✖ GPS accuracy variability
✖ Network-dependent alerts
✖ No AI-based classification

---

## 🔮 Future Improvements

* AI/ML obstacle classification
* SMS / multi-channel alerts
* Google Maps integration
* LiDAR / IR sensors
* Higher resolution camera
* Dynamic network handling

---

## 📷 Applications

* Autonomous safety vehicles
* Hazard detection systems
* Remote surveillance robots
* Smart delivery bots
* Disaster inspection units
* Wildlife monitoring platforms

---

## 🎥 Demo

*https://drive.google.com/file/d/1CibwH4NcFgNq56REZj_DjfPa76d9AT4E/view?usp=sharing*

---

