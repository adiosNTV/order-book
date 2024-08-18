interface DepthUpdateEvent {
    e: string;     // Event type
    E: number;     // Event time
    s: string;     // Symbol
    U: number;     // First update ID in event
    u: number;     // Final update ID in event
    b: Order[];   // Bids to be updated: Array of [Price, Quantity]
    a: Order[];   // Asks to be updated: Array of [Price, Quantity]
}