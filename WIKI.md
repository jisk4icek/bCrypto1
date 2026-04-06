# 📚 bCrypto - Official Documentation (Wiki)

Welcome to the **bCrypto Wiki**! This documentation covers everything you need to know about setting up and configuring the ultimate cryptocurrency economy plugin for your server.

---

## 📑 Table of Contents
1. [Installation & Requirements](#1-installation--requirements)
2. [Commands & Permissions](#2-commands--permissions)
3. [Configuration Guide (`config.yml`)](#3-configuration-guide)
4. [WebServer setup (Live vs. Static)](#4-webserver-setup)
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
- `/crypto` (or `/cypher`, `/krypto`) - Opens the main player GUI for buying/selling currencies.
  - *No permission required (or `bcrypto.use` based on setup)*

### 🛡️ Admin Commands
*Requires permission: `bkrypto.admin`*
- `/crypto admin` - Opens the admin menu or lists admin subcommands.
- `/crypto admin reload` - Reloads the `config.yml` and `messages.yml`.
- `/crypto admin hologram set <coin_id>` - Places a floating hologram tracking the real-time price of a specific coin at your location.
- `/crypto admin hologram remove` - Removes the nearest bCrypto hologram.

---

## 3. Configuration Guide

The `config.yml` is split into several main modules. By default, you can enable or disable everything from mining to hacking!

```yaml
# Example snippet from config.yml
settings:
  language: "cz"
  format-currency: true
  timezone: "Europe/Prague"

modules:
  mining:
    enabled: true
  hacking:
    enabled: true
  banking:
    enabled: true
  web-terminal:
    enabled: true

market:
  fee-buy: 1.5   # Server fee automatically applied during coin purchase
  fee-sell: 1.5  # Server fee applied during coin sale
```

**Cryptocurrencies List:**
You can add or remove supported crypto coins under the `crypto-coins` list. The names must match the CoinGecko API IDs!
```yaml
fetch-interval: 1 # How often prices update (in minutes)
crypto-coins:
  - "bitcoin"
  - "ethereum"
  - "solana"
  - "dogecoin"
```

---

## 4. WebServer Setup

bCrypto offers a revolutionary way to display your server's crypto market on the web! There are two modes to choose from in `config.yml`:

### STATIC Mode (Default & Safest)
Generate a read-only data snapshot that can interact with the main website. No ports need to be opened on your machine. Ideal for standard networks.

### LIVE Mode (Advanced Real-Time)
This mode acts as an active API running locally on your Minecraft server.
```yaml
mode: LIVE
api-server:
  enabled: true
  port: 54793
  public-url: "http://YOUR_SERVER_IP:54793"
  access-code: "123456"
```
*Note: If you enable `LIVE` mode, you **must open the port** (e.g. 54793) on your server host / VPS firewall.*

---

## 5. PlaceholderAPI Integration

Use the following placeholders anywhere PlaceholderAPI is supported (HolographicDisplays, TAB plugin, Scoreboards, chat formatting):

**Market Placeholders:**
- `%bcrypto_price_<coin>%` - Current price of a coin (e.g. `%bcrypto_price_bitcoin%`)
- `%bcrypto_trend_arrow_<coin>%` - Visual arrow (↑/↓) indicating if the price is going up or down.

**Player Profile Placeholders:**
- `%bcrypto_balance_<coin>%` - How many tokens of a specific coin the player owns.
- `%bcrypto_value_total%` - The total combined net worth of all crypto owned by the player in server fiat money.

---

## 6. Holograms Setup

To make the server market feel alive without external plugins, bCrypto ships with a built-in hologram system.

1. Stand exactly where you want the hologram to spawn.
2. Type `/crypto admin hologram set bitcoin`.
3. The server will spawn a floating, auto-updating text showing Bitcoin's logo, current price, and trend arrow.
4. If you need to remove it, look at it and type `/crypto admin hologram remove`.
