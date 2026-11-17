# 🚀 CryptoRadar PRO — Telegram Mini App (TMA) Terminal

Профессиональный терминал мониторинга криптовалютного рынка, интерактивных графиков TradingView и AI-радара торговых сетапов, оптимизированный для работы внутри **Telegram Mini Apps (TMA)** и как автономное Progressive Web App (PWA).

🌐 **Live Demo (GitHub Pages):** [https://sppoti.github.io/cryptoradar-tma/](https://sppoti.github.io/cryptoradar-tma/)

---

## ⚡ Ключевые возможности

- 📈 **TradingView Charts:** Встроенный полнофункциональный график котировок Binance с автоматическим выбором таймфрейма, индикатором RSI и скользящими средними.
- 🔴 **Binance Live Feed:** Мгновенное автообновление котировок и объемов торгов топовых активов (BTC, ETH, SOL, TON, XRP, BNB, DOGE, AVAX, LINK, SUI) через публичный CORS-friendly Binance REST API (`data-api.binance.vision`).
- 🚨 **Радар RSI & Аномалий:** Определение зон перекупленности (RSI > 68) и перепроданности (RSI < 32) для своевременного входа в сделки.
- 🎯 **AI Торговые сигналы:** Скоринг сетапов LONG/SHORT с точками оптимального входа, целями TP1/TP2, Stop-Loss и аналитическим обоснованием.
- 💎 **Интеграция оплат VIP-доступа:**
  - Оплата в **Telegram Stars (⭐)** через Telegram Bot API и deep links.
  - Оплата по **СБП / Карте (₽)** с мгновенным копированием реквизитов и переходом в бот для отправки чека.
- 📱 **Telegram Haptic Feedback & Native UI:** Адаптивный дизайн в стиле glassmorphism с поддержкой жестов, темной темы Telegram и тактильного отклика.

---

## 📂 Структура репозитория

```
cryptoradar-tma/
├── index.html       # Главная разметка терминала и модальных окон оплаты
├── style.css        # Премиальные Monochrome OLED Black glass-карточки, HUD-сетка и адаптивная верстка
├── app.js           # Реактивное ядро: котировки Binance, TradingView, расчет RSI, Stars/СБП
└── README.md        # Документация проекта
```

---

## 🤖 Интеграция с Telegram Ботом

- **Бот:** [@ssddssa_bot](https://t.me/ssddssa_bot)
- **Команда меню:** `🚀 Терминал PRO`
- **Deep Link Оплаты Stars:** `https://t.me/ssddssa_bot?start=pay_<tariff_key>`
- **Deep Link Отправки Чека СБП:** `https://t.me/ssddssa_bot?start=receipt`
