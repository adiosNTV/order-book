// TradingViewWidget.jsx
"use client"
import { memo, useEffect, useRef } from 'react';

function TradingViewWidget() {
    const container = useRef<HTMLDivElement>(null);

    // a widget to display trading graph
    // from: https://www.tradingview.com

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "timezone": "Asia/Ho_Chi_Minh",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "hide_top_toolbar": true,
          "range": "1D",
          "allow_symbol_change": false,
          "save_image": false,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`;
            container.current?.appendChild(script);

            return () => {
                container.current?.removeChild(script);
            };
        },
        []
    );

    return (
        <div className="tradingview-widget-container px-3" ref={container} style={{ height: "100%", width: "100%" }}></div>
    );
}

export default memo(TradingViewWidget);
