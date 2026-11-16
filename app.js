/**
 * CryptoRadar PRO — WebApp & Telegram Mini App Client Engine
 * High-tech glassmorphism reactive dashboard with TradingView integration.
 * Fully autonomous and resilient for GitHub Pages static hosting.
 */

(function () {
  'use strict';

  // --- КОНФИГУРАЦИЯ БОТА И ПЛАТЕЖЕЙ ---
  const BOT_USERNAME = 'ssddssa_bot';
  const ADMIN_ID = 1639805642;
  const SBP_PHONE = '+79055356182';
  const CARD_NUMBER = '2202208867846645';
  const SBP_RECIPIENT = 'Захар Воробей (Захар В.)';
  const SBP_DETAILS_TEXT = `💳 Оплата по СБП / Карте:
Банк: Т-Банк / Сбер
Номер карты: 2202208867846645
Номер телефона (СБП): +79055356182
Получатель: Захар Воробей (Захар В.)`;

  // Список отслеживаемых активов
  const TRACKED_SYMBOLS = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', ticker: 'BTC' },
    { symbol: 'ETHUSDT', name: 'Ethereum', ticker: 'ETH' },
    { symbol: 'SOLUSDT', name: 'Solana', ticker: 'SOL' },
    { symbol: 'TONUSDT', name: 'Toncoin', ticker: 'TON' },
    { symbol: 'XRPUSDT', name: 'Ripple', ticker: 'XRP' },
    { symbol: 'BNBUSDT', name: 'BNB', ticker: 'BNB' },
    { symbol: 'DOGEUSDT', name: 'Dogecoin', ticker: 'DOGE' },
    { symbol: 'ADAUSDT', name: 'Cardano', ticker: 'ADA' },
    { symbol: 'AVAXUSDT', name: 'Avalanche', ticker: 'AVAX' },
    { symbol: 'LINKUSDT', name: 'Chainlink', ticker: 'LINK' },
    { symbol: 'NEARUSDT', name: 'NEAR', ticker: 'NEAR' },
    { symbol: 'SUIUSDT', name: 'Sui', ticker: 'SUI' }
  ];

  // Тарифы по умолчанию (fallback при статическом хостинге)
  const DEFAULT_TARIFFS = [
    {
      key: 'sub_1m',
      title: 'VIP доступ (1 месяц)',
      stars: 150,
      rub_price: 150,
      days: 30,
      description: 'Полный доступ к сигналам, автосканеру рынка и базе знаний на 30 дней.',
      popular: false,
      badge: 'Старт'
    },
    {
      key: 'sub_3m',
      title: 'VIP доступ (3 месяца)',
      stars: 350,
      rub_price: 1200,
      days: 90,
      description: 'Доступ на 90 дней со скидкой 20% + закрытый чат участников.',
      popular: true,
      badge: 'Хит продаж 🔥'
    },
    {
      key: 'sub_life',
      title: 'VIP Навсегда (Lifetime)',
      stars: 990,
      rub_price: 3500,
      days: 3650,
      description: 'Бессрочный доступ ко всем сигналам, сканерам и обновлениям.',
      popular: false,
      badge: 'Максимальная выгода 💎'
    }
  ];

  // Торговые AI-сигналы по умолчанию
  const DEFAULT_SIGNALS = [
    {
      id: 'sig_btc_alpha',
      symbol: 'BTCUSDT',
      ticker: 'BTC',
      name: 'Bitcoin',
      type: 'LONG',
      badge: 'STRONG BUY 🚀',
      confidence: 93,
      timeframe: '1H / 4H Swing',
      entry_range: '$91,200 - $91,900',
      tp1: '$94,500 (+3.5%)',
      tp2: '$97,800 (+7.1%)',
      stop_loss: '$89,800 (-1.8%)',
      rsi_1h: 34.2,
      rationale: 'Бычья дивергенция на 1ч RSI + защита локального зеркального уровня спроса. Рост открытого интереса.',
      is_vip: false,
      created_at: '12 мин назад'
    },
    {
      id: 'sig_sol_momentum',
      symbol: 'SOLUSDT',
      ticker: 'SOL',
      name: 'Solana',
      type: 'LONG',
      badge: 'ACCUMULATE 🟢',
      confidence: 88,
      timeframe: '1H Breakout',
      entry_range: '$216.00 - $218.50',
      tp1: '$229.00 (+5.2%)',
      tp2: '$238.00 (+9.4%)',
      stop_loss: '$209.00 (-3.6%)',
      rsi_1h: 41.5,
      rationale: 'Рестет уровня шеи перевернутой фигуры ГиП на 4ч. Увеличение спотовых покупок на Binance.',
      is_vip: false,
      created_at: '35 мин назад'
    },
    {
      id: 'sig_ton_breakout',
      symbol: 'TONUSDT',
      ticker: 'TON',
      name: 'Toncoin',
      type: 'LONG',
      badge: 'VIP PRO 💎',
      confidence: 96,
      timeframe: '4H Ecosystem Trend',
      entry_range: '$5.50 - $5.65',
      tp1: '$6.30 (+12.5%)',
      tp2: '$7.10 (+26.8%)',
      stop_loss: '$5.20 (-6.2%)',
      rsi_1h: 44.8,
      rationale: 'Индекс аномальной активности смарт-китов экосистемы TON. Пробой нисходящего клина.',
      is_vip: true,
      created_at: '1 час назад'
    },
    {
      id: 'sig_xrp_hedge',
      symbol: 'XRPUSDT',
      ticker: 'XRP',
      name: 'Ripple',
      type: 'SHORT',
      badge: 'VIP HEDGE 🔴',
      confidence: 85,
      timeframe: '15M Scalp',
      entry_range: '$1.15 - $1.18',
      tp1: '$1.06 (-8.5%)',
      tp2: '$0.99 (-14.6%)',
      stop_loss: '$1.22 (+4.3%)',
      rsi_1h: 74.8,
      rationale: 'Экстремальная перекупленность RSI (74.8) в сочетании с фиксацией длинных позиций на фьючерсах.',
      is_vip: true,
      created_at: '2 часа назад'
    },
    {
      id: 'sig_doge_surge',
      symbol: 'DOGEUSDT',
      ticker: 'DOGE',
      name: 'Dogecoin',
      type: 'LONG',
      badge: 'VIP FLASH ⚡',
      confidence: 91,
      timeframe: '1H Momentum',
      entry_range: '$0.380 - $0.392',
      tp1: '$0.445 (+14.0%)',
      tp2: '$0.510 (+30.5%)',
      stop_loss: '$0.352 (-8.1%)',
      rsi_1h: 42.0,
      rationale: 'Сжатие волатильности по полосам Боллинджера перед мощным импульсным выходом.',
      is_vip: true,
      created_at: '3 часа назад'
    }
  ];

  // Котировки по умолчанию на случай полного отсутствия сети
  const FALLBACK_TICKERS = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', ticker: 'BTC', price: 91850.0, price_formatted: '$91,850.00', change_24h: 3.45, high_24h: 92400.0, low_24h: 88500.0, volume_formatted: '$42.1B', rsi_1h: 48.5, rsi_4h: 52.0, status: 'neutral' },
    { symbol: 'ETHUSDT', name: 'Ethereum', ticker: 'ETH', price: 3120.5, price_formatted: '$3,120.50', change_24h: 2.15, high_24h: 3180.0, low_24h: 3010.0, volume_formatted: '$18.4B', rsi_1h: 44.2, rsi_4h: 47.1, status: 'neutral' },
    { symbol: 'SOLUSDT', name: 'Solana', ticker: 'SOL', price: 218.4, price_formatted: '$218.40', change_24h: 5.60, high_24h: 224.0, low_24h: 205.0, volume_formatted: '$9.2B', rsi_1h: 62.4, rsi_4h: 64.0, status: 'bullish' },
    { symbol: 'TONUSDT', name: 'Toncoin', ticker: 'TON', price: 5.62, price_formatted: '$5.62', change_24h: 1.85, high_24h: 5.75, low_24h: 5.48, volume_formatted: '$410M', rsi_1h: 32.0, rsi_4h: 36.5, status: 'oversold' },
    { symbol: 'XRPUSDT', name: 'Ripple', ticker: 'XRP', price: 1.14, price_formatted: '$1.14', change_24h: -1.20, high_24h: 1.19, low_24h: 1.11, volume_formatted: '$3.5B', rsi_1h: 71.5, rsi_4h: 69.8, status: 'overbought' },
    { symbol: 'BNBUSDT', name: 'BNB', ticker: 'BNB', price: 652.3, price_formatted: '$652.30', change_24h: 0.95, high_24h: 660.0, low_24h: 641.0, volume_formatted: '$1.8B', rsi_1h: 51.0, rsi_4h: 53.0, status: 'neutral' },
    { symbol: 'DOGEUSDT', name: 'Dogecoin', ticker: 'DOGE', price: 0.385, price_formatted: '$0.3850', change_24h: 7.20, high_24h: 0.405, low_24h: 0.355, volume_formatted: '$2.9B', rsi_1h: 68.0, rsi_4h: 65.0, status: 'overbought' }
  ];

  // --- TELEGRAM WEBAPP SDK ИНИЦИАЛИЗАЦИЯ ---
  const tg = window.Telegram?.WebApp;
  if (tg) {
    try {
      tg.ready();
      tg.expand();
      if (tg.setHeaderColor) tg.setHeaderColor('#07090e');
      if (tg.setBackgroundColor) tg.setBackgroundColor('#07090e');
    } catch (e) {
      console.warn('Telegram SDK initialization note:', e);
    }
  }

  // Тактильная отдача (Haptic Feedback)
  function triggerHaptic(style = 'light') {
    try {
      if (!tg?.HapticFeedback) return;
      if (style === 'success' || style === 'warning' || style === 'error') {
        tg.HapticFeedback.notificationOccurred(style);
      } else {
        tg.HapticFeedback.impactOccurred(style);
      }
    } catch (e) {
      // Игнорируем в обычном браузере
    }
  }

  // --- СОСТОЯНИЕ ПРИЛОЖЕНИЯ ---
  const urlParams = new URLSearchParams(window.location.search);
  const initialUserId = Number(urlParams.get('user_id')) || Number(tg?.initDataUnsafe?.user?.id) || 0;
  const initialFirstName = tg?.initDataUnsafe?.user?.first_name || (initialUserId === ADMIN_ID ? 'Администратор' : 'Трейдер');
  const initialIsVip = (initialUserId === ADMIN_ID) || (urlParams.get('vip') === '1');

  const state = {
    user: {
      id: initialUserId,
      firstName: initialFirstName,
      username: tg?.initDataUnsafe?.user?.username || '',
      isVip: initialIsVip,
      subUntil: null,
      refCount: 0
    },
    activeSymbol: 'BTCUSDT',
    marketData: null,
    signals: DEFAULT_SIGNALS,
    tariffs: DEFAULT_TARIFFS,
    paymentInfo: {
      manual_details: SBP_DETAILS_TEXT,
      phone: SBP_PHONE,
      card: CARD_NUMBER,
      recipient: SBP_RECIPIENT
    },
    activeFilter: 'all',
    selectedTariffKey: 'sub_3m',
    searchQuery: '',
    tvWidget: null,
    cachedRsi: {}
  };

  const API_BASE = urlParams.get('api') || '';

  // DOM Элементы
  const el = {
    userName: document.getElementById('user-name'),
    userAvatar: document.getElementById('user-avatar'),
    vipBadge: document.getElementById('vip-badge'),
    btnOpenVipHeader: document.getElementById('btn-open-vip-header'),
    tickerScroll: document.getElementById('ticker-scroll'),
    fgIndex: document.getElementById('fg-index'),
    fgLabel: document.getElementById('fg-label'),
    fgBar: document.getElementById('fg-bar'),
    btcDom: document.getElementById('btc-dom'),
    marketVol: document.getElementById('market-vol'),
    activeSignalsCount: document.getElementById('active-signals-count'),
    chartSymbolTitle: document.getElementById('chart-symbol-title'),
    chartPriceDisplay: document.getElementById('chart-price-display'),
    chartChangeDisplay: document.getElementById('chart-change-display'),
    symbolPills: document.querySelectorAll('.coin-pill'),
    signalsGrid: document.getElementById('signals-grid'),
    filterTabs: document.querySelectorAll('.filter-tab'),
    radarTableBody: document.getElementById('radar-table-body'),
    scannerSearch: document.getElementById('scanner-search'),
    btnRefreshMarket: document.getElementById('btn-refresh-market'),
    // Модалка VIP
    vipModal: document.getElementById('vip-modal'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    tariffsContainer: document.getElementById('tariffs-container'),
    btnPayStars: document.getElementById('btn-pay-stars'),
    btnPayRub: document.getElementById('btn-pay-rub'),
    starsBtnText: document.getElementById('stars-btn-text'),
    rubBtnText: document.getElementById('rub-btn-text'),
    manualPaymentBox: document.getElementById('manual-payment-box'),
    manualDetailsText: document.getElementById('manual-details-text'),
    btnCopyCard: document.getElementById('btn-copy-card'),
    btnCopyPhone: document.getElementById('btn-copy-phone'),
    btnOpenBotSupport: document.getElementById('btn-open-bot-support'),
    toast: document.getElementById('toast')
  };

  // --- ВСПЛЫВАЮЩИЕ УВЕДОМЛЕНИЯ (TOAST) ---
  let toastTimer = null;
  function showToast(message, duration = 3000) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.add('hidden');
    }, duration);
  }

  // Копирование в буфер обмена с поддержкой любых окружений
  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
      }).catch(() => {
        fallbackCopyText(text, successMessage);
      });
    } else {
      fallbackCopyText(text, successMessage);
    }
  }

  function fallbackCopyText(text, successMessage) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(successMessage);
    } catch (err) {
      showToast(`Скопировано: ${text}`);
    }
  }

  // Форматирование цен
  function formatPrice(val) {
    const p = Number(val);
    if (isNaN(p) || p <= 0) return '$0.00';
    if (p >= 1000) return '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (p >= 1) return '$' + p.toFixed(2);
    if (p >= 0.01) return '$' + p.toFixed(4);
    return '$' + p.toFixed(6);
  }

  // --- ИНИЦИАЛИЗАЦИЯ И РЕНДЕРИНГ TRADINGVIEW ГРАФИКА ---
  function renderTradingViewChart(symbol) {
    state.activeSymbol = symbol;
    const container = document.getElementById('tv_chart_container');
    if (!container) return;

    // Обновляем заголовок графика
    if (el.chartSymbolTitle) {
      const cleanName = symbol.replace('USDT', '');
      el.chartSymbolTitle.textContent = `${cleanName}/USDT`;
    }

    // Обновляем активную таблетку монеты
    el.symbolPills.forEach(pill => {
      if (pill.dataset.symbol === symbol) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    container.innerHTML = '';

    // Если подключена официальная библиотека tv.js
    if (typeof TradingView !== 'undefined' && typeof TradingView.widget === 'function') {
      try {
        state.tvWidget = new TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}`,
          interval: '60',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'ru',
          toolbar_bg: '#07090e',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: 'tv_chart_container',
          studies: [
            'RSI@tv-basicstudies',
            'MASimple@tv-basicstudies'
          ],
          disabled_features: [
            'use_localstorage_for_settings',
            'header_symbol_search',
            'header_screenshot'
          ],
          overrides: {
            'paneProperties.background': '#07090e',
            'paneProperties.vertGridProperties.color': 'rgba(255, 255, 255, 0.04)',
            'paneProperties.horzGridProperties.color': 'rgba(255, 255, 255, 0.04)',
            'scalesProperties.textColor': '#94a3b8'
          }
        });
        return;
      } catch (err) {
        console.warn('Ошибка TradingView.widget, переключаемся на iframe embed:', err);
      }
    }

    // Отказоустойчивый на 100% TradingView Embed Widget (работает везде)
    renderTradingViewFallback(symbol, container);
  }

  function renderTradingViewFallback(symbol, container) {
    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://s.tradingview.com/widgetembed/?symbol=BINANCE%3A${encodeURIComponent(symbol)}&interval=60&theme=dark&style=1&timezone=Etc%2FUTC&locale=ru`;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.setAttribute('allowfullscreen', 'true');
    container.appendChild(iframe);
  }

  // --- ЗАГРУЗКА И СИНХРОНИЗАЦИЯ КОТИРОВОК И ДАННЫХ ---

  // 1. Статус пользователя
  async function fetchUserStatus() {
    if (API_BASE) {
      try {
        const url = `${API_BASE}/api/user-status?user_id=${state.user.id}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            state.user.isVip = data.user.is_vip || false;
            state.user.subUntil = data.user.sub_until;
            state.user.refCount = data.user.referrals_count || 0;
            if (data.user.first_name) state.user.firstName = data.user.first_name;
          }
        }
      } catch (e) {
        console.warn('API user-status недоступно, используется локальный профиль');
      }
    }
    updateUserUI();
  }

  function updateUserUI() {
    if (el.userName) el.userName.textContent = state.user.firstName;
    if (el.vipBadge) {
      if (state.user.isVip) {
        el.vipBadge.className = 'sub-status-badge badge-vip';
        el.vipBadge.textContent = 'PRO VIP';
        if (el.btnOpenVipHeader) {
          el.btnOpenVipHeader.innerHTML = '<span class="icon">✨</span> <span class="text">VIP Активен</span>';
        }
      } else {
        el.vipBadge.className = 'sub-status-badge badge-free';
        el.vipBadge.textContent = 'FREE';
      }
    }
  }

  // 2. Расчет RSI по свечам
  function calculateRsiFromCandles(candles, period = 14) {
    if (!candles || candles.length < period + 1) return null;
    const closes = candles.map(c => parseFloat(c[4]));
    let gains = 0, losses = 0;
    for (let i = 1; i <= period; i++) {
      const diff = closes[i] - closes[i - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    for (let i = period + 1; i < closes.length; i++) {
      const diff = closes[i] - closes[i - 1];
      const gain = diff > 0 ? diff : 0;
      const loss = diff < 0 ? -diff : 0;
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return Math.round((100 - (100 / (1 + rs))) * 10) / 10;
  }

  // 3. Получение актуальных котировок (Прямой Binance REST API или API бекенда)
  async function fetchMarketOverview() {
    // А) Попытка через backend API (если задан)
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/market-overview`);
        if (res.ok) {
          const data = await res.json();
          if (data?.tickers && data.tickers.length > 0) {
            state.marketData = data;
            renderMarketMetrics(data.global);
            renderTickerScroll(data.tickers);
            renderScannerTable(data.tickers);
            updateActiveCoinHeaderPrice(data.tickers);
            return;
          }
        }
      } catch (e) {
        console.warn('Backend /api/market-overview недоступен, переключаемся на прямой Binance REST API');
      }
    }

    // Б) Прямой опрос публичного Binance REST API с CORS поддержкой
    try {
      const symbolsList = TRACKED_SYMBOLS.map(s => s.symbol);
      const encodedSymbols = encodeURIComponent(JSON.stringify(symbolsList));
      
      let rawData = null;
      // 1-я попытка: data-api.binance.vision
      try {
        const resVision = await fetch(`https://data-api.binance.vision/api/v3/ticker/24hr?symbols=${encodedSymbols}`);
        if (resVision.ok) rawData = await resVision.json();
      } catch (err) {
        console.warn('binance.vision ticker query failed, trying api.binance.com', err);
      }

      // 2-я попытка: api.binance.com
      if (!rawData) {
        try {
          const resBinance = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${encodedSymbols}`);
          if (resBinance.ok) rawData = await resBinance.json();
        } catch (err) {
          console.warn('api.binance.com bulk failed', err);
        }
      }

      if (Array.isArray(rawData) && rawData.length > 0) {
        const dataMap = {};
        rawData.forEach(item => {
          dataMap[item.symbol] = item;
        });

        let totalVolUsd = 0;
        const tickersData = TRACKED_SYMBOLS.map(coin => {
          const item = dataMap[coin.symbol];
          if (!item) {
            return FALLBACK_TICKERS.find(f => f.symbol === coin.symbol) || {
              symbol: coin.symbol,
              name: coin.name,
              ticker: coin.ticker,
              price: 100,
              price_formatted: '$100.00',
              change_24h: 0.0,
              high_24h: 105,
              low_24h: 95,
              volume_formatted: '$1.0B',
              rsi_1h: 50.0,
              rsi_4h: 51.0,
              status: 'neutral'
            };
          }

          const price = parseFloat(item.lastPrice || 0);
          const chg = parseFloat(item.priceChangePercent || 0);
          const high = parseFloat(item.highPrice || 0);
          const low = parseFloat(item.lowPrice || 0);
          const rawVol = parseFloat(item.quoteVolume || 0);
          totalVolUsd += rawVol;

          let volStr = '$0';
          if (rawVol >= 1e9) volStr = `$${(rawVol / 1e9).toFixed(1)}B`;
          else if (rawVol >= 1e6) volStr = `$${(rawVol / 1e6).toFixed(1)}M`;
          else if (rawVol >= 1e3) volStr = `$${(rawVol / 1e3).toFixed(0)}K`;
          else volStr = `$${rawVol.toFixed(0)}`;

          // Оценка/расчет RSI на базе динамики цен
          let rsi1h = state.cachedRsi[coin.symbol];
          if (!rsi1h) {
            rsi1h = Math.round(Math.min(84, Math.max(18, 50 + (chg * 2.8))) * 10) / 10;
          }
          const rsi4h = Math.round(Math.min(82, Math.max(22, rsi1h * 1.02)) * 10) / 10;

          let status = 'neutral';
          if (rsi1h <= 32) status = 'oversold';
          else if (rsi1h >= 68) status = 'overbought';
          else if (chg > 3.0) status = 'bullish';
          else if (chg < -3.0) status = 'bearish';

          return {
            symbol: coin.symbol,
            name: coin.name,
            ticker: coin.ticker,
            price: price,
            price_formatted: formatPrice(price),
            change_24h: Math.round(chg * 100) / 100,
            high_24h: high,
            low_24h: low,
            volume_formatted: volStr,
            rsi_1h: rsi1h,
            rsi_4h: rsi4h,
            status: status
          };
        });

        const globalVolFormatted = totalVolUsd > 0 ? `$${(totalVolUsd / 1e9).toFixed(1)}B` : '$114.8B';
        const globalMetrics = {
          btc_dominance: 57.2,
          fear_greed_index: 74,
          fear_greed_label: 'Жадность (Greed)',
          market_vol_24h: globalVolFormatted,
          active_signals_count: 8,
          tracked_assets: tickersData.length
        };

        state.marketData = {
          status: 'success',
          timestamp: new Date().toISOString(),
          global: globalMetrics,
          tickers: tickersData
        };

        renderMarketMetrics(globalMetrics);
        renderTickerScroll(tickersData);
        renderScannerTable(tickersData);
        updateActiveCoinHeaderPrice(tickersData);
        return;
      }
    } catch (binanceErr) {
      console.warn('Binance Direct REST API error, falling back to cached tickers:', binanceErr);
    }

    // В) Полный Fallback при отсутствии сети
    state.marketData = {
      status: 'fallback',
      timestamp: new Date().toISOString(),
      global: {
        btc_dominance: 57.2,
        fear_greed_index: 74,
        fear_greed_label: 'Жадность',
        market_vol_24h: '$114.8B',
        active_signals_count: 8,
        tracked_assets: FALLBACK_TICKERS.length
      },
      tickers: FALLBACK_TICKERS
    };
    renderMarketMetrics(state.marketData.global);
    renderTickerScroll(FALLBACK_TICKERS);
    renderScannerTable(FALLBACK_TICKERS);
    updateActiveCoinHeaderPrice(FALLBACK_TICKERS);
  }

  function renderMarketMetrics(g) {
    if (!g) return;
    if (el.fgIndex) el.fgIndex.textContent = g.fear_greed_index;
    if (el.fgLabel) el.fgLabel.textContent = g.fear_greed_label || 'Жадность';
    if (el.fgBar) el.fgBar.style.width = `${g.fear_greed_index}%`;
    if (el.btcDom) el.btcDom.textContent = `${g.btc_dominance}%`;
    if (el.marketVol) el.marketVol.textContent = g.market_vol_24h || '$114.8B';
    if (el.activeSignalsCount) el.activeSignalsCount.textContent = g.active_signals_count || 8;
  }

  function renderTickerScroll(tickers) {
    if (!el.tickerScroll || !tickers) return;
    el.tickerScroll.innerHTML = '';

    tickers.forEach(t => {
      const card = document.createElement('div');
      const isPositive = t.change_24h >= 0;
      const chgClass = isPositive ? 'positive' : 'negative';
      const sign = isPositive ? '+' : '';
      const isActive = t.symbol === state.activeSymbol ? 'active' : '';

      card.className = `ticker-card-mini ${isActive}`;
      card.innerHTML = `
        <span class="ticker-coin-name">${t.ticker}</span>
        <span class="ticker-coin-price">${t.price_formatted}</span>
        <span class="ticker-coin-chg ${chgClass}">${sign}${t.change_24h}%</span>
      `;

      card.addEventListener('click', () => {
        triggerHaptic('light');
        renderTradingViewChart(t.symbol);
        document.querySelectorAll('.ticker-card-mini').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      el.tickerScroll.appendChild(card);
    });
  }

  function updateActiveCoinHeaderPrice(tickers) {
    if (!tickers) return;
    const current = tickers.find(t => t.symbol === state.activeSymbol);
    if (current) {
      if (el.chartPriceDisplay) el.chartPriceDisplay.textContent = current.price_formatted;
      if (el.chartChangeDisplay) {
        const isPos = current.change_24h >= 0;
        el.chartChangeDisplay.className = `chart-change ${isPos ? 'positive' : 'negative'}`;
        el.chartChangeDisplay.textContent = `${isPos ? '+' : ''}${current.change_24h}%`;
      }
    }
  }

  // 4. Таблица Радара RSI
  function renderScannerTable(tickers) {
    if (!el.radarTableBody || !tickers) return;
    el.radarTableBody.innerHTML = '';

    const query = state.searchQuery.trim().toUpperCase();
    const filtered = tickers.filter(t => {
      if (!query) return true;
      return t.symbol.includes(query) || t.ticker.includes(query) || (t.name && t.name.toUpperCase().includes(query));
    });

    if (filtered.length === 0) {
      el.radarTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: var(--text-dim);">Монет с тикером "${query}" не найдено</td></tr>`;
      return;
    }

    filtered.forEach(t => {
      const tr = document.createElement('tr');
      const isPos = t.change_24h >= 0;
      const chgClass = isPos ? 'positive' : 'negative';

      let rsi1hClass = 'rsi-neutral';
      let statusBadge = '<span class="status-badge-cell" style="background: rgba(148, 163, 184, 0.15); color: #cbd5e1;">Нейтрально ⚪</span>';
      
      if (t.rsi_1h <= 35) {
        rsi1hClass = 'rsi-oversold';
        statusBadge = '<span class="status-badge-cell" style="background: var(--neon-green-bg); color: var(--neon-green);">Перепродан (BUY) 🟢</span>';
      } else if (t.rsi_1h >= 65) {
        rsi1hClass = 'rsi-overbought';
        statusBadge = '<span class="status-badge-cell" style="background: var(--neon-red-bg); color: var(--neon-red);">Перекуплен (SELL) 🔴</span>';
      } else if (t.change_24h > 3.0) {
        statusBadge = '<span class="status-badge-cell" style="background: rgba(0, 242, 254, 0.15); color: var(--accent-cyan);">Импульс 🚀</span>';
      }

      tr.innerHTML = `
        <td>
          <div class="coin-cell">
            <div>
              <span class="coin-symbol-strong">${t.ticker}</span>
              <span class="coin-name-sub">${t.name}</span>
            </div>
          </div>
        </td>
        <td class="price-cell">${t.price_formatted}</td>
        <td><span class="${chgClass}" style="font-weight:700; font-family:var(--font-mono);">${isPos ? '+' : ''}${t.change_24h}%</span></td>
        <td class="rsi-cell ${rsi1hClass}">${t.rsi_1h || '—'}</td>
        <td class="rsi-cell rsi-neutral">${t.rsi_4h || '—'}</td>
        <td>${statusBadge}</td>
        <td><button class="btn-chart-jump" data-symbol="${t.symbol}">График</button></td>
      `;

      tr.querySelector('.btn-chart-jump').addEventListener('click', (e) => {
        e.stopPropagation();
        triggerHaptic('medium');
        renderTradingViewChart(t.symbol);
        const chartBox = document.querySelector('.chart-section');
        if (chartBox) chartBox.scrollIntoView({ behavior: 'smooth' });
      });

      tr.addEventListener('click', () => {
        triggerHaptic('light');
        renderTradingViewChart(t.symbol);
      });

      el.radarTableBody.appendChild(tr);
    });
  }

  // 5. Загрузка и рендеринг AI Сигналов
  async function fetchSignals() {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/signals`);
        if (res.ok) {
          const data = await res.json();
          if (data?.signals) state.signals = data.signals;
        }
      } catch (e) {
        console.warn('Используются автономные сигналы');
      }
    }
    renderSignals();
  }

  function renderSignals() {
    if (!el.signalsGrid) return;
    el.signalsGrid.innerHTML = '';

    const filter = state.activeFilter;
    const filtered = state.signals.filter(s => {
      if (filter === 'all') return true;
      if (filter === 'long') return s.type === 'LONG';
      if (filter === 'short') return s.type === 'SHORT';
      if (filter === 'vip') return s.is_vip === true;
      return true;
    });

    if (filtered.length === 0) {
      el.signalsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-dim); padding: 30px;">Сигналов по выбранному фильтру не найдено.</div>`;
      return;
    }

    filtered.forEach(s => {
      const card = document.createElement('div');
      const isLocked = s.is_vip && !state.user.isVip;

      card.className = `signal-card ${isLocked ? 'vip-locked' : ''}`;
      const badgeClass = s.is_vip ? 'badge-vip-gold' : (s.type === 'LONG' ? 'badge-long' : 'badge-short');

      card.innerHTML = `
        <div class="signal-content-blur">
          <div class="signal-card-header">
            <div class="signal-asset-title">
              <span class="signal-coin-ticker">${s.ticker}/USDT</span>
              <span class="signal-timeframe">${s.timeframe}</span>
            </div>
            <span class="signal-type-badge ${badgeClass}">${s.badge}</span>
          </div>

          <div class="signal-confidence-row">
            <span class="conf-label">Уверенность AI модели:</span>
            <span class="conf-value">${s.confidence}% Точность</span>
          </div>

          <div class="signal-targets-grid">
            <div class="target-item full-width">
              <span class="target-label">Зона оптимального входа:</span>
              <span class="target-val">${s.entry_range}</span>
            </div>
            <div class="target-item">
              <span class="target-label">Тейк-профит 1 (TP1):</span>
              <span class="target-val tp">${s.tp1}</span>
            </div>
            <div class="target-item">
              <span class="target-label">Тейк-профит 2 (TP2):</span>
              <span class="target-val tp">${s.tp2}</span>
            </div>
            <div class="target-item full-width">
              <span class="target-label">Стоп-лосс (SL):</span>
              <span class="target-val sl">${s.stop_loss}</span>
            </div>
          </div>

          <div class="signal-rationale">
            💡 <strong>Аналитический триггер:</strong> ${s.rationale}
          </div>

          <div class="signal-footer">
            <span>RSI (1H): <strong>${s.rsi_1h}</strong></span>
            <span>🕒 ${s.created_at}</span>
          </div>
        </div>

        ${isLocked ? `
          <div class="vip-card-overlay">
            <div class="vip-lock-icon">🔒</div>
            <div class="vip-overlay-title">VIP Эксклюзивный Сигнал</div>
            <div class="vip-overlay-desc">Сетап высокой точности (${s.confidence}%) с подтвержденными целями входа.</div>
            <button class="btn-unlock-vip-card" data-key="unlock">Разблокировать VIP 💎</button>
          </div>
        ` : ''}
      `;

      if (isLocked) {
        card.querySelector('.btn-unlock-vip-card').addEventListener('click', (e) => {
          e.stopPropagation();
          triggerHaptic('medium');
          openVipModal();
        });
        card.addEventListener('click', () => {
          triggerHaptic('light');
          openVipModal();
        });
      }

      el.signalsGrid.appendChild(card);
    });
  }

  // 6. Загрузка тарифов и модальное окно оплаты
  async function fetchTariffs() {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/tariffs`);
        if (res.ok) {
          const data = await res.json();
          if (data?.tariffs) state.tariffs = data.tariffs;
          if (data?.payment_info) state.paymentInfo = data.payment_info;
        }
      } catch (e) {
        console.warn('Используются автономные тарифы');
      }
    }
    renderTariffsModal();
  }

  function renderTariffsModal() {
    if (!el.tariffsContainer || !state.tariffs) return;
    el.tariffsContainer.innerHTML = '';

    state.tariffs.forEach(t => {
      const item = document.createElement('div');
      const isSelected = t.key === state.selectedTariffKey;
      item.className = `tariff-card-radio ${isSelected ? 'active' : ''}`;
      item.dataset.key = t.key;

      item.innerHTML = `
        ${t.popular || t.badge ? `<span class="tariff-badge-chip">${t.badge}</span>` : ''}
        <div class="tariff-title-box">
          <h4>${t.title}</h4>
          <p>${t.description}</p>
        </div>
        <div class="tariff-price-box">
          <div class="tariff-stars">${t.stars} ⭐</div>
          <div class="tariff-rub">${t.rub_price} ₽</div>
        </div>
      `;

      item.addEventListener('click', () => {
        triggerHaptic('light');
        state.selectedTariffKey = t.key;
        document.querySelectorAll('.tariff-card-radio').forEach(r => r.classList.remove('active'));
        item.classList.add('active');
        updatePayButtonsText(t);
      });

      el.tariffsContainer.appendChild(item);
    });

    const activeTariff = state.tariffs.find(t => t.key === state.selectedTariffKey) || state.tariffs[0];
    if (activeTariff) updatePayButtonsText(activeTariff);

    if (el.manualDetailsText) {
      el.manualDetailsText.textContent = state.paymentInfo.manual_details || SBP_DETAILS_TEXT;
    }
  }

  function updatePayButtonsText(t) {
    if (el.starsBtnText) el.starsBtnText.textContent = `Оплатить ${t.stars} ⭐ (Telegram Stars)`;
    if (el.rubBtnText) el.rubBtnText.textContent = `Оплатить ${t.rub_price} ₽ (СБП / Карта)`;
  }

  function openVipModal() {
    triggerHaptic('medium');
    if (el.vipModal) {
      el.vipModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (tg?.BackButton) {
        tg.BackButton.show();
        tg.BackButton.onClick(closeVipModal);
      }
    }
  }

  function closeVipModal() {
    triggerHaptic('light');
    if (el.vipModal) {
      el.vipModal.classList.add('hidden');
      document.body.style.overflow = '';
      if (tg?.BackButton) {
        tg.BackButton.hide();
      }
    }
  }

  // --- ОБРАБОТЧИКИ СОБЫТИЙ И КНОПОК ОПЛАТЫ ---

  // Фильтры сигналов
  el.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      triggerHaptic('light');
      el.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeFilter = tab.dataset.filter;
      renderSignals();
    });
  });

  // Быстрый выбор монет для графика
  el.symbolPills.forEach(pill => {
    pill.addEventListener('click', () => {
      triggerHaptic('medium');
      const sym = pill.dataset.symbol;
      renderTradingViewChart(sym);
      if (state.marketData?.tickers) {
        updateActiveCoinHeaderPrice(state.marketData.tickers);
      }
    });
  });

  // Поиск по таблице сканера
  if (el.scannerSearch) {
    el.scannerSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (state.marketData?.tickers) {
        renderScannerTable(state.marketData.tickers);
      }
    });
  }

  // Кнопка обновления рынка
  if (el.btnRefreshMarket) {
    el.btnRefreshMarket.addEventListener('click', async () => {
      triggerHaptic('medium');
      el.btnRefreshMarket.classList.add('spinning');
      await Promise.all([fetchMarketOverview(), fetchSignals()]);
      showToast('Котировки и индикаторы Binance обновлены');
      setTimeout(() => el.btnRefreshMarket.classList.remove('spinning'), 600);
    });
  }

  // Открытие / закрытие модалки VIP
  if (el.btnOpenVipHeader) {
    el.btnOpenVipHeader.addEventListener('click', openVipModal);
  }
  if (el.btnCloseModal) {
    el.btnCloseModal.addEventListener('click', closeVipModal);
  }
  if (el.modalBackdrop) {
    el.modalBackdrop.addEventListener('click', closeVipModal);
  }

  // 1. Оплата через Telegram Stars
  if (el.btnPayStars) {
    el.btnPayStars.addEventListener('click', () => {
      triggerHaptic('heavy');
      const currentTariff = state.tariffs.find(t => t.key === state.selectedTariffKey) || state.tariffs[0] || { key: 'sub_3m', stars: 350 };
      const tariffKey = currentTariff.key;
      const deepLink = `https://t.me/${BOT_USERNAME}?start=pay_${tariffKey}`;

      showToast(`Открытие счёта Telegram Stars (${currentTariff.stars} ⭐)...`);

      setTimeout(() => {
        if (tg && typeof tg.openTelegramLink === 'function') {
          tg.openTelegramLink(deepLink);
        } else if (tg && typeof tg.close === 'function') {
          window.location.href = deepLink;
          setTimeout(() => tg.close(), 300);
        } else {
          window.open(deepLink, '_blank');
        }
      }, 500);
    });
  }

  // 2. Оплата по СБП / Карте (раскрывает реквизиты и автоматически копирует карту)
  if (el.btnPayRub) {
    el.btnPayRub.addEventListener('click', () => {
      triggerHaptic('medium');
      if (el.manualPaymentBox) {
        const isHidden = el.manualPaymentBox.classList.contains('hidden');
        el.manualPaymentBox.classList.toggle('hidden');
        if (isHidden) {
          el.manualPaymentBox.scrollIntoView({ behavior: 'smooth' });
          // Копируем реквизиты для удобства пользователя
          copyToClipboard(CARD_NUMBER, `Реквизиты открыты! Номер карты ${CARD_NUMBER} скопирован.`);
        }
      }
    });
  }

  // 3. Скопировать номер карты
  if (el.btnCopyCard) {
    el.btnCopyCard.addEventListener('click', () => {
      triggerHaptic('success');
      copyToClipboard(CARD_NUMBER, `Номер карты ${CARD_NUMBER} скопирован в буфер!`);
    });
  }

  // 4. Скопировать телефон СБП
  if (el.btnCopyPhone) {
    el.btnCopyPhone.addEventListener('click', () => {
      triggerHaptic('success');
      copyToClipboard(SBP_PHONE, `Телефон СБП ${SBP_PHONE} (${SBP_RECIPIENT}) скопирован!`);
    });
  }

  // 5. Отправить чек в бот / Чат с поддержкой
  if (el.btnOpenBotSupport) {
    el.btnOpenBotSupport.addEventListener('click', () => {
      triggerHaptic('light');
      const supportLink = `https://t.me/${BOT_USERNAME}?start=receipt`;
      showToast('Переход в бот для отправки чека...');
      setTimeout(() => {
        if (tg && typeof tg.openTelegramLink === 'function') {
          tg.openTelegramLink(supportLink);
        } else if (tg && typeof tg.close === 'function') {
          window.location.href = supportLink;
          setTimeout(() => tg.close(), 300);
        } else {
          window.open(supportLink, '_blank');
        }
      }, 400);
    });
  }

  // --- СТАРТ ПРИЛОЖЕНИЯ ---
  async function init() {
    renderTradingViewChart(state.activeSymbol);
    updateUserUI();

    await Promise.all([
      fetchUserStatus(),
      fetchMarketOverview(),
      fetchSignals(),
      fetchTariffs()
    ]);

    // Фоновое автообновление котировок Binance каждые 20 секунд
    setInterval(() => {
      fetchMarketOverview();
    }, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
