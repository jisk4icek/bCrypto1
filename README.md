# 📈 bCrypto - Premium Cryptocurrency Plugin

![Version](https://img.shields.io/badge/version-2.0--PREMIUM-blue) 
![API](https://img.shields.io/badge/API-1.21-brightgreen)
![Status](https://img.shields.io/badge/status-active-success)

Welcome to the official repository for **bCrypto**. This workspace currently serves as our bug tracker, feature request hub, source code for the Web Interface, and the central entry point for our project.

> **Note:** The bCrypto server plugin is currently Closed Source, however, the Web Interface source code is open and available in this repository! You can find the plugin download link on our SpigotMC Page.

---

## 🌟 Why bCrypto?
Bring a real-world cryptocurrency market directly to your server! **bCrypto** is a state-of-the-art economy plugin that dynamically fetches real-world crypto prices via live APIs and seamlessly intertwines them with your server's economy. Allow your players to trade, monitor interactive charts, and build their crypto-empire.

### ✨ Core Features
*   **📈 Real-Time API Data:** Cryptocurrency prices dynamically mirror real-world market shifts.
*   **🖥️ Premium User Interface (GUI):** A highly polished and customizable menu for tracking portfolios and trading.
*   **📊 InteractiveBoard Support:** Unique price trend visualizations rendered beautifully directly on maps in-game!
*   **✨ Live Holograms:** Generate floating texts detailing the current exchange rates that automatically update.
*   **🌐 Full WebServer Integration:** An interactive web portal for players to track server market data externally.

---

## 🐞 Bug Reports & Feature Requests

**GitHub is our sole and primary communication channel.** We do not use Discord. All support, tracking, and feature discussions happen exclusively through GitHub Issues to keep development organized and transparent.

### How to get support or report a bug:
1. Navigate to the **Issues** tab.
2. Check if the same issue has already been reported.
3. Click `New Issue` and briefly describe your problem or idea.
4. Provide the necessary info:
   * Server version (e.g., *Paper 1.21*)
   * bCrypto plugin version
   * Console logs (via Pastebin)

---

## 📚 Official Wiki & Documentation

Our technical document contains everything you need to properly set up the plugin, configure holograms, and use Placeholders. Detailed settings are documented in the **[Wiki](WIKI.md)**.

*What you'll find:*
- Detailed structure of `config.yml` and `messages.yml`
- Web-Server Configuration 
- Hologram Setup Guide
- Complete PlaceholderAPI variable list

👉 **[Read the Full Documentation (WIKI.md)](WIKI.md)**

---

## 🗺️ Development Roadmap

We are constantly improving bCrypto. Here is our vision for the near future:

- [x] **v2.0 PRE-RELEASE** - Refactored Live API Fetching, native InteractiveBoard support added.
- [ ] **Web Interface Launch** - The web portal (source included here) is currently in a beta testing phase. Future updates will focus on fully operationalizing the framework for broad public usage.
- [ ] **v2.1** - Hardware Wallets (physical in-game items securely storing player's crypto balances).
- [ ] **v2.2** - Crypto Staking integration (players can lock their assets for X days for a percentage yield).
- [ ] **v2.3 (New Feature!)** - 🐋 **Crypto Whales Leaderboard** - A globally tracked realtime hologram podium showcasing the top 10 richest crypto holders on the server.
- [ ] **v3.0** - P2P Crypto Market (secure direct peer-to-peer crypto transactions offline between players).

---

## 💻 Web Interface Source Code
Inside this repository, you will find the `web-interface/` directory. This is the Next.js / React application designed to link directly to your Minecraft Server's bCrypto SQLite/MySQL Database. Anyone is free to explore, host, and modify the web dashboard!
