# Powermanager

## Übersicht
Diese Anwendung besteht aus einem Node.js Express-Backend, einem MQTT-Broker und einer React-Frontend-Anwendung. Die Einrichtung umfasst die Weiterleitung des Backends über ngrok ins Internet, das Erstellen eines MQTT-Brokers auf shifter.io mit einem Webhook sowie das Starten des Frontends.

---

## Voraussetzungen

### Software und Tools
- **Node.js** (Version 16 oder höher)
- **npm** (Node Package Manager, normalerweise mit Node.js installiert)
- **ngrok** (Installieren von [hier](https://ngrok.com/download))
- **Shifter.io**-Konto (für den MQTT-Broker)
- **React**-Projekt (bereits eingerichtet mit `create-react-app` oder ähnlichem)

---

## Einrichtungsschritte

### 1. Starten des Backends
1. Navigiere in das Backend-Verzeichnis:
   ```bash
   cd BE_energy_managment_powersuply
   ```

2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

3. Starte den Server auf Port 3000:
   ```bash
   npm start
   ```
   Das Backend sollte nun unter `http://localhost:3000` erreichbar sein.

### 2. Weiterleitung des Backends ins Internet mit ngrok
1. Öffne ein neues Terminalfenster.
2. Führe folgenden Befehl aus, um den Port 3000 zu tunneln:
   ```bash
   ngrok http 3000
   ```
3. Kopiere die generierte ngrok-URL (z. B. `https://abc123.ngrok.io`). Diese URL wird später für den Webhook benötigt.

### 3. Erstellen eines MQTT-Brokers auf Shifter.io
1. Melde dich bei deinem Shifter.io-Konto an.
2. Erstelle einen neuen MQTT-Broker.
3. Konfiguriere einen Webhook mit der folgenden URL:
   ```
   {backend-url}/webhook/create
   ```
   Ersetze `{backend-url}` durch die ngrok-URL (z. B. `https://abc123.ngrok.io/webhook/create`).

### 4. Starten des Frontends
1. Navigiere in das Frontend-Verzeichnis:
   ```bash
   cd enery_manamgent_powersuply
   ```

2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

3. Starte das Frontend:
   ```bash
   npm start
   ```
   Das Frontend sollte nun unter `http://localhost:3000` (oder einem anderen Port, falls dieser bereits belegt ist) erreichbar sein.

---

## Testen der Anwendung
1. Stelle sicher, dass das Backend, der ngrok-Tunnel und der MQTT-Broker korrekt eingerichtet sind.
2. Öffne das React-Frontend in deinem Browser.
3. Teste die Funktionalität der Anwendung. Daten sollten über den MQTT-Broker und die Webhooks zwischen Backend und Frontend synchronisiert werden.

---

## Fehlerbehebung
- **Backend ist nicht erreichbar:** Stelle sicher, dass der Server auf Port 3000 läuft.
- **ngrok-URL funktioniert nicht:** Verifiziere, dass ngrok korrekt gestartet wurde und die richtige URL verwendet wird.
- **MQTT-Broker-Verbindung fehlschlägt:** Überprüfe die Webhook-URL und die Broker-Konfiguration.
- **Frontend-Fehler:** Stelle sicher, dass alle Abhängigkeiten installiert sind und das Backend läuft.
