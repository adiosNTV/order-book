"use client"

import TradingViewWidget from "@/components/TradingGraph/TradingGraph";
import { validateEvent } from "@/lib/utils/validateEvent";
import { snapShotService } from "@/services/depthSnapshot.service";
import useBuyOrderStore from "@/store/buyOrder.store";
import useSellOrderStore from "@/store/sellOrder.store";
import useSpreadStore from "@/store/spread.store";
import useUpdateIdStore from "@/store/updateId.store";
import { useEffect, useState } from "react";
import Spread from "../Spread/Spread";

const DashboardContainer = () => {

    //get store 
    const sellOrder = useSellOrderStore((state) => state.sellOrder)
    const setSellOrder = useSellOrderStore((state) => state.setSellOrder);

    const buyOrder = useBuyOrderStore((state) => state.buyOrder)
    const setBuyOrder = useBuyOrderStore((state) => state.setBuyOrder);

    const lastUpdatedId = useUpdateIdStore((state) => state.lastUpdatedId);
    const setLastUpdatedId = useUpdateIdStore((state) => state.setLastUpdatedId);

    const previousUpdateId = useUpdateIdStore((state) => state.previousUpdateId);
    const setPreviousUpdateId = useUpdateIdStore((state) => state.setPreviousUpdateId);

    const setSpread = useSpreadStore((state) => state.setSpread)

    const [buffer, setBuffer] = useState<DepthUpdateEvent[]>([]);

    useEffect(() => {

        //open websocket connection
        const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_API as string);

        socket.onopen = () => {

            //after open ws, fetch a snapshot of data
            const init = async () => {
                const { data } = await snapShotService.getSnapShot();
                setLastUpdatedId(data?.lastUpdateId);
                setSellOrder(data?.asks);
                setBuyOrder(data?.bids);
            };
            init();
        };

        socket.onmessage = (event) => {

            //for each message came from server, push it in a buffer (like a queue) to make sure we don't miss any message to update data
            const info = JSON.parse(event.data);

            setBuffer((prev) => [...prev, info.data]);

        };

        socket.onclose = () => {
        }

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        if (buffer.length === 0) return;
        //check each message in buffer to update data if that message validate
        buffer.forEach((eventToProcess, index) => {
            if (!validateEvent(eventToProcess, lastUpdatedId, previousUpdateId)) {
                return;
            }
            setPreviousUpdateId(eventToProcess.u);
            setSellOrder(eventToProcess.a);
            setBuyOrder(eventToProcess.b);

            //delete the message from start to the lastest validate message to minimal buffer 
            setBuffer(pre => [...pre.splice(0, index + 1)]);
        });
    }, [buffer, lastUpdatedId, previousUpdateId]);

    useEffect(() => {
        if (sellOrder.length < 1 || buyOrder.length < 1) {
            return
        }

        //calculate and store the spread for each time bid and ask data updated
        setSpread(buyOrder[0][0], sellOrder[0][0])
    }, [sellOrder, buyOrder])

    return (
        <div className="w-full flex flex-col-reverse h-full lg:flex-row">
            <div className="w-full hidden lg:block">
                <TradingViewWidget />
            </div>
            <Spread />
        </div>
    );
};

export default DashboardContainer;