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

// Датчик температуры 
const int adcPin = 34; // GPIO34 (ADC1_6)
const float R_fixed = 10000.0; // постоянный резистор (10 кОм)
const float Vcc = 3.3;
const float Beta = 3950.0;
const float R0 = 33100.0; // сопротивление при 25°C по текущим данным
const float T0_K = 298.15;

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

  Serial.println(ina219Available);

  String json = "{";

  if (ina219Available) {
    float busVoltage = ina219.getBusVoltage_V();
    float current_mA = ina219.getCurrent_mA();
    float power_mW = ina219.getPower_mW();

    json += "\"voltage\":" + String(busVoltage, 2) + ",";
    json += "\"current\":" + String(current_mA, 1) + ",";
    json += "\"power\":" + String(power_mW, 1) + ",";

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
    json += "\"voltage\":1.0,";
    json += "\"current\":2.0,";
    json += "\"power\":3.0,";
  }

  // Измерение температуры

  int adcValue = analogRead(adcPin);
  float voltage = (adcValue / 4095.0) * Vcc;
  float Rt = (voltage * R_fixed) / (Vcc - voltage);

  float tempK = 1.0 / (1.0 / T0_K + (1.0 / Beta) * log(Rt / R0));
  float tempC = tempK - 273.15;

  json += "\"temperature\":" + String(tempC, 2);

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

