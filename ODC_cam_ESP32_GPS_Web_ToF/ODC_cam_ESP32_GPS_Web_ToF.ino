// #include "esp_camera.h"
// #include <WiFi.h>
// #include <ESP_Mail_Client.h>
// #include <HTTPClient.h>
// #include "base64.h"
// #include <TinyGPSPlus.h>

// // CAMERA MODEL
// #define CAMERA_MODEL_AI_THINKER
// #include "camera_pins.h"

// // GPS setup
// TinyGPSPlus gps;
// HardwareSerial gpsSerial(1); // Use UART1 for GPS (RX=15, TX=14)

// // Wi-Fi credentials
// const char* ssid = "10 Prime";
// const char* password = "12349876";

// // Email settings
// #define SMTP_HOST "smtp.gmail.com"
// #define SMTP_PORT 465
// #define AUTHOR_EMAIL "gautam.cse.21@nitap.ac.in"
// #define AUTHOR_PASSWORD "kamjmvnlveajeidl"
// #define RECIPIENT_EMAIL "bina.cse.21@nitap.ac.in"

// // Trigger pin
// #define TRIGGER_PIN 13

// // Create SMTP session
// SMTPSession smtp;

// // === Setup camera ===
// void setupCamera() {
//   camera_config_t config;
//   config.ledc_channel = LEDC_CHANNEL_0;
//   config.ledc_timer = LEDC_TIMER_0;
//   config.pin_d0 = Y2_GPIO_NUM;
//   config.pin_d1 = Y3_GPIO_NUM;
//   config.pin_d2 = Y4_GPIO_NUM;
//   config.pin_d3 = Y5_GPIO_NUM;
//   config.pin_d4 = Y6_GPIO_NUM;
//   config.pin_d5 = Y7_GPIO_NUM;
//   config.pin_d6 = Y8_GPIO_NUM;
//   config.pin_d7 = Y9_GPIO_NUM;
//   config.pin_xclk = XCLK_GPIO_NUM;
//   config.pin_pclk = PCLK_GPIO_NUM;
//   config.pin_vsync = VSYNC_GPIO_NUM;
//   config.pin_href = HREF_GPIO_NUM;
//   config.pin_sccb_sda = SIOD_GPIO_NUM;
//   config.pin_sccb_scl = SIOC_GPIO_NUM;
//   config.pin_pwdn = PWDN_GPIO_NUM;
//   config.pin_reset = RESET_GPIO_NUM;
//   config.xclk_freq_hz = 20000000;
//   config.frame_size = FRAMESIZE_UXGA;
//   config.pixel_format = PIXFORMAT_JPEG;
//   config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
//   config.fb_location = CAMERA_FB_IN_PSRAM;
//   config.jpeg_quality = 12;
//   config.fb_count = 1;

//   if (config.pixel_format == PIXFORMAT_JPEG) {
//     if (psramFound()) {
//       config.jpeg_quality = 10;
//       config.fb_count = 2;
//       config.grab_mode = CAMERA_GRAB_LATEST;
//     } else {
//       config.frame_size = FRAMESIZE_SVGA;
//       config.fb_location = CAMERA_FB_IN_DRAM;
//     }
//   } else {
//     config.frame_size = FRAMESIZE_240X240;
//   }

//   esp_err_t err = esp_camera_init(&config);
//   if (err != ESP_OK) {
//     Serial.printf("Camera init failed with error 0x%x\n", err);
//     return;
//   }

//   sensor_t *s = esp_camera_sensor_get();
//   if (s->id.PID == OV3660_PID) {
//     s->set_vflip(s, 1);
//     s->set_brightness(s, 1);
//     s->set_saturation(s, -2);
//   }

//   if (config.pixel_format == PIXFORMAT_JPEG) {
//     s->set_framesize(s, FRAMESIZE_QVGA);
//   }
// }

// // === Setup ===
// void setup() {
//   Serial.begin(115200);
//   Serial.setDebugOutput(true);
//   Serial.println();

//   gpsSerial.begin(9600, SERIAL_8N1, 15, 14); // GPS RX, TX
//   pinMode(TRIGGER_PIN, INPUT);

//   setupCamera();

//   WiFi.begin(ssid, password);
//   Serial.print("Connecting to WiFi");
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("\nWiFi connected");
// }

// // === Reconnect WiFi if disconnected ===
// void ensureWiFiConnected() {
//   if (WiFi.status() != WL_CONNECTED) {
//     Serial.println("WiFi disconnected, reconnecting...");
//     WiFi.disconnect();
//     WiFi.begin(ssid, password);
//     unsigned long startAttemptTime = millis();
//     while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
//       delay(500);
//       Serial.print(".");
//     }
//     if (WiFi.status() == WL_CONNECTED) {
//       Serial.println("\nWiFi reconnected");
//     } else {
//       Serial.println("\nFailed to reconnect WiFi");
//     }
//   }
// }

// // === Get GPS Location with timeout ===
// bool getGPSLocation(float &latitude, float &longitude) {
//   unsigned long start = millis();
//   while (millis() - start < 2000) {  // wait max 2 seconds for GPS update
//     while (gpsSerial.available()) {
//       gps.encode(gpsSerial.read());
//     }
//     if (gps.location.isUpdated() && gps.location.isValid()) {
//       latitude = gps.location.lat();
//       longitude = gps.location.lng();
//       return true;
//     }
//   }
//   // If no update, return false
//   latitude = 0.0;
//   longitude = 0.0;
//   return false;
// }
// String getGPSDateTime() {
//   if (gps.date.isValid() && gps.time.isValid()) {
//     char datetimeStr[30];
//     sprintf(datetimeStr, "%04d-%02d-%02d %02d:%02d:%02d",
//             gps.date.year(), gps.date.month(), gps.date.day(),
//             gps.time.hour(), gps.time.minute(), gps.time.second());
//     return String(datetimeStr);
//   }
//   return "Unknown";
// }


// // === Send to Backend Server ===
// void sendToServer(String base64Image, float latitude, float longitude, String timestamp) {
//   HTTPClient http;
//   http.begin("http://192.168.28.8:5000/api/cars/update-from-device");
//   http.addHeader("Content-Type", "application/json");

//   // Clean base64 string from newlines that break JSON
//   base64Image.replace("\n", "");
//   base64Image.replace("\r", "");

//   String latStr = (latitude == 0.0) ? "\"00\"" : String(latitude, 6);
//   String lonStr = (longitude == 0.0) ? "\"00\"" : String(longitude, 6);

//   String payload = "{";
// payload += "\"image\":\"" + base64Image + "\",";
// payload += "\"latitude\":" + latStr + ",";
// payload += "\"longitude\":" + lonStr + ",";
// payload += "\"timestamp\":\"" + timestamp + "\",";
// payload += "\"obstacleDetected\":true";
// payload += "}";

//   Serial.println("Sending payload:");
//   Serial.println(payload);

//   int httpResponseCode = http.POST(payload);
//   if (httpResponseCode > 0) {
//     Serial.print("Data sent to server. Response code: ");
//     Serial.println(httpResponseCode);
//     String response = http.getString();
//     Serial.println("Server response: " + response);
//   } else {
//     Serial.print("Failed to send data. Error: ");
//     Serial.println(http.errorToString(httpResponseCode));
//   }

//   http.end();
// }

// // === Loop ===
// void loop() {
//   ensureWiFiConnected();

//   if (digitalRead(TRIGGER_PIN) == HIGH) {
//     delay(5000); // debounce

//     camera_fb_t* fb = esp_camera_fb_get();
//     if (!fb) {
//       Serial.println("Camera capture failed");
//       return;
//     }

//     float lat, lng;
//     bool gpsValid = getGPSLocation(lat, lng);
//     String timestamp = getGPSDateTime();

//     String locationInfo = gpsValid ?
//       "Latitude: " + String(lat, 6) + ", Longitude: " + String(lng, 6) + "\nTime: " + timestamp :
//       "Location or Time not available";


//     // Convert image to Base64
//     String base64Image = base64::encode(fb->buf, fb->len);

//     // Send to backend
//     sendToServer(base64Image, lat, lng, timestamp);


//     // Send email alert
//     SMTP_Message message;
//     message.sender.name = "ESP32-CAM";
//     message.sender.email = AUTHOR_EMAIL;
//     message.subject = "Obstacle Detected - ESP32-CAM";
//     message.text.content = "An obstacle was detected.\n\nLocation:\n" + locationInfo; // TODO: update with actual URL serving your saved image

//     message.addRecipient("Recipient", RECIPIENT_EMAIL);

//     SMTP_Attachment attachment;
//     attachment.descr.filename = "obstacle.jpg";
//     attachment.descr.mime = "image/jpeg";
//     attachment.blob.data = fb->buf;
//     attachment.blob.size = fb->len;
//     attachment.descr.transfer_encoding = Content_Transfer_Encoding::enc_base64;
//     message.addAttachment(attachment);

//     smtp.debug(1);
//     ESP_Mail_Session session;
//     session.server.host_name = SMTP_HOST;
//     session.server.port = SMTP_PORT;
//     session.login.email = AUTHOR_EMAIL;
//     session.login.password = AUTHOR_PASSWORD;
//     session.login.user_domain = "";

//     if (smtp.connect(&session)) {
//       if (!MailClient.sendMail(&smtp, &message)) {
//         Serial.println("Send failed: " + smtp.errorReason());
//       }
//       smtp.closeSession();
//     } else {
//       Serial.println("SMTP connection failed");
//     }

//     esp_camera_fb_return(fb);

//     // Wait for trigger release before continuing
//     while (digitalRead(TRIGGER_PIN) == HIGH) {
//       delay(100);
//     }
//   }

//   delay(100);
// }

#include "esp_camera.h"
#include <WiFi.h>
#include <ESP_Mail_Client.h>
#include <HTTPClient.h>
#include "base64.h"
#include <TinyGPSPlus.h>
#include <Wire.h>
#include <Adafruit_VL53L0X.h>

Adafruit_VL53L0X lox = Adafruit_VL53L0X();
#define TOF_SDA 2
#define TOF_SCL 4
#define ARDUINO_SIGNAL_PIN 16

// CAMERA MODEL
#define CAMERA_MODEL_AI_THINKER
#include "camera_pins.h"

// GPS setup
TinyGPSPlus gps;
HardwareSerial gpsSerial(1); // Use UART1 for GPS (RX=15, TX=14)

// Wi-Fi credentials
const char* ssid = "10 Prime";
const char* password = "12349876";

// Email settings
#define SMTP_HOST "smtp.gmail.com"
#define SMTP_PORT 465
#define AUTHOR_EMAIL "gautam.cse.21@nitap.ac.in"
#define AUTHOR_PASSWORD "kamjmvnlveajeidl"
#define RECIPIENT_EMAIL "raghav.gsr.20@gmail.com"

// Trigger pin
#define TRIGGER_PIN 13

// Car ID for backend identification
String carId = "682c5a8817597494c14d2d37"; // Replace with actual carId from MongoDB

// Create SMTP session
SMTPSession smtp;

// === Setup camera ===
void setupCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_UXGA;
  config.pixel_format = PIXFORMAT_JPEG;
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  if (config.pixel_format == PIXFORMAT_JPEG) {
    if (psramFound()) {
      config.jpeg_quality = 10;
      config.fb_count = 2;
      config.grab_mode = CAMERA_GRAB_LATEST;
    } else {
      config.frame_size = FRAMESIZE_SVGA;
      config.fb_location = CAMERA_FB_IN_DRAM;
    }
  } else {
    config.frame_size = FRAMESIZE_240X240;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x\n", err);
    return;
  }

  sensor_t *s = esp_camera_sensor_get();
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1);
    s->set_brightness(s, 1);
    s->set_saturation(s, -2);
  }

  if (config.pixel_format == PIXFORMAT_JPEG) {
    s->set_framesize(s, FRAMESIZE_QVGA);
  }
}

// === Setup ===
void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600, SERIAL_8N1, 15, 14);

  pinMode(TRIGGER_PIN, INPUT);
  pinMode(ARDUINO_SIGNAL_PIN, OUTPUT);
  digitalWrite(ARDUINO_SIGNAL_PIN, LOW);

  setupCamera();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  esp_log_level_set("i2c", ESP_LOG_WARN);

}

// === Reconnect WiFi if disconnected ===
void ensureWiFiConnected() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected, reconnecting...");
    WiFi.disconnect();
    WiFi.begin(ssid, password);
    unsigned long startAttemptTime = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
      delay(500);
      Serial.print(".");
    }
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\nWiFi reconnected");
    } else {
      Serial.println("\nFailed to reconnect WiFi");
    }
  }
}

// === Get GPS Location with timeout ===
bool getGPSLocation(float &latitude, float &longitude) {
  unsigned long start = millis();
  while (millis() - start < 2000) {
    while (gpsSerial.available()) {
      gps.encode(gpsSerial.read());
    }
    if (gps.location.isUpdated() && gps.location.isValid()) {
      latitude = gps.location.lat();
      longitude = gps.location.lng();
      return true;
    }
  }
  latitude = 0.0;
  longitude = 0.0;
  return false;
}

String getGPSDateTime() {
  if (gps.date.isValid() && gps.time.isValid()) {
    char datetimeStr[30];
    sprintf(datetimeStr, "%04d-%02d-%02d %02d:%02d:%02d",
            gps.date.year(), gps.date.month(), gps.date.day(),
            gps.time.hour(), gps.time.minute(), gps.time.second());
    return String(datetimeStr);
  }
  return "Unknown";
}

// === Send to Backend Server ===
void sendToServer(String base64Image, float latitude, float longitude, String timestamp) {
  HTTPClient http;
  http.begin("http://192.168.28.8:5000/api/cars/update-from-device");
  http.addHeader("Content-Type", "application/json");

  base64Image.replace("\n", "");
  base64Image.replace("\r", "");

  String payload = "{";
  payload += "\"carId\":\"" + carId + "\",";
  payload += "\"image\":\"" + base64Image + "\",";
  payload += "\"latitude\":" + String(latitude, 6) + ",";
  payload += "\"longitude\":" + String(longitude, 6) + ",";
  payload += "\"timestamp\":\"" + timestamp + "\",";
  payload += "\"obstacleDetected\":true,";
  payload += "\"obstacleDistance\":1.5";
  payload += "}";

  Serial.println("Sending payload:");
  Serial.println(payload);

  int httpResponseCode = http.POST(payload);
  if (httpResponseCode > 0) {
    Serial.print("Data sent to server. Response code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println("Server response: " + response);
  } else {
    Serial.print("Failed to send data. Error: ");
    Serial.println(http.errorToString(httpResponseCode));
  }

  http.end();
}
bool tofInitialized = false;

bool setupTOF() {
  Wire.begin(TOF_SDA, TOF_SCL);
  if (!lox.begin()) {
    Serial.println("TOF sensor failed to initialize.");
    return false;
  }
  Serial.println("TOF sensor initialized.");
  tofInitialized = true;
  return true;
}
// === Loop ===
void loop() {
  ensureWiFiConnected();

  if (digitalRead(TRIGGER_PIN) == HIGH) {
    delay(5000); // debounce

    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Camera capture failed");
      return;
    }

    float lat, lng;
    bool gpsValid = getGPSLocation(lat, lng);
    String timestamp = getGPSDateTime();

    String locationInfo = gpsValid ?
      "Latitude: " + String(lat, 6) + ", Longitude: " + String(lng, 6) + "\nTime: " + timestamp :
      "Location or Time not available";

    String base64Image = base64::encode(fb->buf, fb->len);

    // === Send to backend ===
    sendToServer(base64Image, lat, lng, timestamp);

    // === Send Email ===
    SMTP_Message message;
    message.sender.name = "ESP32-CAM";
    message.sender.email = AUTHOR_EMAIL;
    message.subject = "Obstacle Detected - ESP32-CAM";
    message.text.content = "An obstacle was detected.\n\nLocation:\n" + locationInfo;
    message.addRecipient("Recipient", RECIPIENT_EMAIL);

    SMTP_Attachment attachment;
    attachment.descr.filename = "obstacle.jpg";
    attachment.descr.mime = "image/jpeg";
    attachment.blob.data = fb->buf;
    attachment.blob.size = fb->len;
    attachment.descr.transfer_encoding = Content_Transfer_Encoding::enc_base64;
    message.addAttachment(attachment);

    smtp.debug(1);
    ESP_Mail_Session session;
    session.server.host_name = SMTP_HOST;
    session.server.port = SMTP_PORT;
    session.login.email = AUTHOR_EMAIL;
    session.login.password = AUTHOR_PASSWORD;
    session.login.user_domain = "";

    if (smtp.connect(&session)) {
      if (!MailClient.sendMail(&smtp, &message)) {
        Serial.println("Send failed: " + smtp.errorReason());
      }
      smtp.closeSession();
    } else {
      Serial.println("SMTP connection failed");
    }

    esp_camera_fb_return(fb);
    smtp.closeSession();

    //ToF Sensor
    if (!tofInitialized) {
    tofInitialized = setupTOF();
    }

    if (!tofInitialized) {
      Serial.println("Error: TOF not initialized. Skipping ranging.");
      return;
      }

    VL53L0X_RangingMeasurementData_t measure;

    while (true) {
      lox.rangingTest(&measure, false);
      if (measure.RangeStatus == 0) {
        Serial.print("TOF Distance: ");
        Serial.print(measure.RangeMilliMeter);
        Serial.println(" mm");

        if (measure.RangeMilliMeter > 250) {
          digitalWrite(ARDUINO_SIGNAL_PIN, HIGH);
          Serial.println("Signal sent to Arduino...");
          delay(200);
          digitalWrite(ARDUINO_SIGNAL_PIN, LOW);
          break;
        }
      } else {
        Serial.println("TOF Sensor Error");
      }
      delay(100);
    }
  }

  delay(100);
}