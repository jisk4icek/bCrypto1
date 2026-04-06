# 🌍 Localizing bCrypto (Multi-Language Setup)

Welcome to the Multi-Language documentation! By default, bCrypto dynamically supports generating translation files based on the `language` variable set in your `config.yml`.

Supported out-of-the-box language configurations:
- `en` (English)
- `cz` (Czech)
- `de` (German)
- `pl` (Polish)

---

## ⚙️ How to Switch Languages

Switching languages in bCrypto is extremely simple and can be done dynamically without fully restarting your server!

1. Open `plugins/bCrypto/config.yml`.
2. Locate the global settings block at the top.
3. Change the `language` variable to the short-code of your desired language.
   ```yaml
   settings:
     language: "de" # Examples: en, cz, de, pl
   ```
4. In-game or from the console, type `/crypto admin reload`.
5. The plugin will instantly read the new language selected.
   - *If the file (e.g. `messages_de.yml`) does not yet exist locally in your folder, the plugin will automatically generate the native pre-translated file and switch to it immediately!*

---

## 🛠️ Creating Custom Languages

What if you want to support Spanish (`sp`) or French (`fr`)? You can easily create your own translation files from scratch!

1. In `config.yml`, set the `language` string to your custom language code (e.g. `sp`).
   ```yaml
   settings:
     language: "sp"
   ```
2. Type `/crypto admin reload`.
3. Because the plugin does not ship with a native `messages_sp.yml`, you will see a warning in the console:
   ```txt
   [WARNING] Language file messages_sp.yml not found! Falling back to English (messages_en.yml).
   ```
   *The plugin will automatically generate the fallback `messages_en.yml` for you if missing.*
4. Now, simply navigate to your `plugins/bCrypto/` folder.
5. Create a new file manually named exactly `messages_sp.yml`.
6. Copy the contents of `messages_en.yml` into your new `messages_sp.yml` and translate the strings exactly as you want them! 
7. Save the file and type `/crypto admin reload` inside Minecraft one more time.

Your custom language file has now been successfully loaded!

---

## 🎨 Formatting Guide (MiniMessage)

All strings in bCrypto support **MiniMessage**, which is a powerful formatting engine. Unlike Legacy ampersand color codes (`&a`, `&c`), MiniMessage allows modern XML-like tags, RGB Hex colors, and sophisticated gradients.

- **Colors:** `<red>`, `<green>`, `<#00FFAA>`
- **Gradients:** `<gradient:#FF0000:#00FF00>Text that shifts from red to green</gradient>`
- **Hover/Click:** `<click:run_command:'/krypto confirm'><hover:show_text:'Click me'>[BUTTON]</hover></click>`

**Important Variables / Placeholders**
Do not remove bracketed `{variables}` when translating! E.g. `{cost}`, `{fee}`, `{amount}` must stay precisely as they are written in the original file, otherwise data insertion will break.
