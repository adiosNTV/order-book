export function validateEvent(event: DepthUpdateEvent, lastUpdateId: number, previousEventU: number): boolean {
    const { U, u } = event;
    // Drop any event where 'u' is <= lastUpdateId
    if (u <= lastUpdateId) {
        return false;
    }

    // The first processed event should have U <= lastUpdateId + 1 AND u >= lastUpdateId + 1
    if (previousEventU === -1 && U <= lastUpdateId + 1 && u >= lastUpdateId + 1) {
        return true;
    }
    // While listening to the stream, each new event's U should be equal to the previous event's u + 1
    if (U === previousEventU + 1) {
        return true;
    }
    return false
}