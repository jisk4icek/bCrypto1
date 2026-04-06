# 📚 bCrypto - Official Technical Documentation

Welcome to the **bCrypto Wiki**! This documentation covers everything you need to know about setting up and configuring the ultimate cryptocurrency economy plugin for your server.

**Note:** All communication and support is handled directly through our GitHub Issues page. 

---

## 📑 Table of Contents
1. [Installation & Requirements](#1-installation--requirements)
2. [Commands & Permissions](#2-commands--permissions)
3. [Configuration Guide (`config.yml`)](#3-configuration-guide)
4. [WebServer Setup (Live vs. Static)](#4-webserver-setup)
5. [PlaceholderAPI Integration](#5-placeholderapi-integration)
6. [Holograms Setup](#6-holograms-setup)

---

## 1. Installation & Requirements

**Required Dependencies:**
- **Vault** - Required for base economy transitions (taking/adding server money).
- **PlaceholderAPI** - Required for displaying crypto stats in scoreboards and chat.

**Optional (but recommended) Dependencies:**
- **InteractiveBoard** - For rendering beautiful, real-time cryptocurrency charts inside Minecraft.

**Setup Instructions:**
1. Download the latest `bCrypto.jar`.
2. Move it inside your server's `/plugins/` folder.
3. Restart the server. 
4. The plugin will generate a `bCrypto` folder containing `config.yml`, `messages.yml`, and the database.

---

## 2. Commands & Permissions

### 🙎‍♂️ Player Commands
- `/crypto` (or `/cypher`, `/krypto`) - Opens the highly interactive player GUI. Players can buy, sell, and check their crypto portfolios.
  - *No permission required (or `bcrypto.use` based on setup)*

### 🛡️ Admin Commands
*Requires permission: `bkrypto.admin`*
- `/crypto admin` - Opens the administrative menu or lists all admin subcommands.
- `/crypto admin reload` - Instantly reloads the `config.yml` and `messages.yml` changes without restarting the server.
- `/crypto admin hologram set <coin_id>` - Places a floating hologram tracking the real-time price of a specific coin exactly where you stand.
- `/crypto admin hologram remove` - Removes the nearest bCrypto hologram.

---

## 3. Configuration Guide

The `config.yml` is the brain of bCrypto. 

### Global Settings
```yaml
# Global Settings
settings:
  language: "en"             # Translation file to use
  format-currency: true      # Format numbers like 1,000,000
  timezone: "System"         # Server Timezone for logs
```

### Supported Cryptocurrencies
You can add or remove supported crypto coins under the `crypto-coins` list. **Important:** The names must perfectly match the CoinGecko API IDs!
```yaml
fetch-interval: 1 # How often prices fetch data from external APIs (in minutes)

crypto-coins:
  - "bitcoin"
  - "ethereum"
  - "solana"
  - "dogecoin"
  - "ripple"
```

### Server Market Fees
You can enforce a "tax" on every trade that is processed on the server, serving as an outstanding money-sink for your economy!
```yaml
market:
  fee-buy: 1.5   # 1.5% Server fee automatically applied during coin purchase
  fee-sell: 1.5  # 1.5% Server fee applied during coin sale
```

---

## 4. WebServer Setup

bCrypto offers a revolutionary way to display your server's crypto market on the web! The raw web-interface Node/React source code is located directly in this GitHub Repository.

Inside your Minecraft `config.yml`, there are two modes to choose from:

### STATIC Mode (Default & Safest)
Generates a read-only data snapshot that can interact with the main website. No ports need to be opened on your machine. Ideal for standard networks and requires highly minimal setup.

### LIVE Mode (Advanced Real-Time)
This mode acts as an active API running locally on your Minecraft server. It requires you to open an internal port to allow the external Node.js Web App to fetch real-time player data.
```yaml
mode: LIVE
api-server:
  enabled: true
  port: 54793
  public-url: "http://YOUR_SERVER_IP:54793"
  access-code: "secure_random_string_123"
```
*Note: If you enable `LIVE` mode, you **must open the port** (e.g. 54793) on your server host / VPS firewall.*

---

## 5. PlaceholderAPI Integration

Use the following placeholders anywhere PlaceholderAPI is supported (HolographicDisplays, TAB plugin, Scoreboards, chat formatting):

**Market Placeholders:**
- `%bcrypto_price_<coin>%` - Absolute current price of a coin. (e.g. `%bcrypto_price_bitcoin%`)
- `%bcrypto_trend_arrow_<coin>%` - Dynamic color-coded visual arrow (↑/↓) indicating if the price is going up or down.

**Player Profile Placeholders:**
- `%bcrypto_balance_<coin>%` - The exact amount of tokens of a specific coin the player owns.
- `%bcrypto_value_total%` - The calculated total combined net worth of all crypto owned by the player, formatted to your server's fiat currency.

---

## 6. Holograms Setup

To make the server market feel alive without requiring third-party tools, bCrypto ships with a robust built-in hologram system.

1. Stand exactly where you want the hologram to spawn.
2. Type `/crypto admin hologram set bitcoin`.
3. The server will spawn a floating, auto-updating text showing Bitcoin's logo, current price, and trend arrow.
4. If you need to remove it, look directly at it and type `/crypto admin hologram remove`.
