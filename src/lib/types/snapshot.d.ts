type Order = [string, string];

type NumberOrder = [number, number]

interface OrderBook {
    lastUpdateId: number;
    bids: Order[];
    asks: Order[];
}