#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <Adafruit_INA219.h>

#define LED_BUILTIN T2

// Задай здесь свои данные сети
const char* ssid = "TP-Link_4EA9";
const char* password = "35814610";
bool isConnected = false;
bool sensorFound = false;

// Запускаем сервер на порту 8081
WebServer server(8081);

// Инициализируем датчик INA219
Adafruit_INA219 ina219;

// === Обработчики маршрутов ===

// Обработка CORS
void handleCORS() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
}


// ===== Обёртка =====
using HandlerFunc = std::function<void()>;

HandlerFunc withCORS(HandlerFunc handler) {
  return [handler]() {
    handleCORS();
    handler();
  };
}


// API "/api/ping" - проверка подключения к серверу
void handleRoot() {
  server.send(200, "application/json", "\"pong\"");
}

// API "/api/getInfo" - получение данных
void handleGetInfo() {
  static bool ina219Available = false;

  if (!ina219Available) {
    ina219Available = ina219.begin();  // Инициализируем датчик
  }

  String json = "{";

  if (ina219Available) {
    float busVoltage = ina219.getBusVoltage_V();
    float current_mA = ina219.getCurrent_mA();
    float power_mW = ina219.getPower_mW();


    json += "\"voltage\":" + String(busVoltage, 2) + ",";
    json += "\"current\":" + String(current_mA, 1) + ",";
    json += "\"power\":" + String(power_mW, 1);


    Serial.print("Напряжение (шина): ");
    Serial.print(busVoltage);
    Serial.println(" В");

    Serial.print("Ток: ");
    Serial.print(current_mA);
    Serial.println(" мА");

    Serial.print("Мощность: ");
    Serial.print(power_mW);
    Serial.println(" мВт");

    Serial.println("-------------------------");
    delay(3000);
  } else {
    json += "\"voltage\":0.00,";
    json += "\"current\":0.0";
  }

  json += "}";
  server.send(200, "application/json", json);
}


// === Функция подключения к Wi-Fi ===
void connectToWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.disconnect(true);
  delay(1000);

  WiFi.scanNetworks();
  delay(1000);

  Serial.println("Попытка подключения к Wi-Fi...");
  WiFi.begin(ssid, password);

  unsigned long startAttemptTime = millis();
  const unsigned long wifiTimeout = 20000;

  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < wifiTimeout) {
    delay(500);
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Успешное подключение к Wi-Fi!");
  } else {
    Serial.println("Ошибка подключения: таймаут.");
  }
}


// === Обработчик реконекта ===
void handleReconnect() {
  Serial.println("Wi-Fi не подключен. Сканирование доступных сетей...");

  delay(40000); // Ждем перед повторным сканом
  int n = WiFi.scanNetworks();
  Serial.println("Сети найдены: " + String(n));

  for (int i = 0; i < n; ++i) {
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.print(WiFi.SSID(i));
    Serial.print(" (уровень сигнала: ");
    Serial.print(WiFi.RSSI(i));
    Serial.println(" dBm)");
  }

  connectToWiFi();
}


void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  delay(1000);

  connectToWiFi();

  // === Настройка сервера ===
  server.on("/api/ping", withCORS(handleRoot));
  server.on("/api/get-info", withCORS(handleGetInfo));

  server.begin();
  Serial.println("HTTP-сервер запущен на порту 8081");
}


void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, LOW);
    handleReconnect();
    isConnected = false;
  } else {
    if (!isConnected) {
        digitalWrite(LED_BUILTIN, HIGH);

        Serial.print("IP адрес сервера: http://");
        Serial.print(WiFi.localIP());
        Serial.println(":8081/api/");

        isConnected = true;
      }

    server.handleClient(); // обрабатываем входящие запросы
    delay(1000);
  }
}

