"use client"

import useSellOrderStore from "@/store/sellOrder.store";
import OrderTable from "../OrderTable/OrderTable";
import useBuyOrderStore from "@/store/buyOrder.store";
import { useEffect, useState } from "react";
import useSpreadStore from "@/store/spread.store";

const Spread = () => {
    const sellOrder = useSellOrderStore((state) => state.sellOrder);
    const buyOrder = useBuyOrderStore((state) => state.buyOrder);
    const spread = useSpreadStore((state) => state.spread)

    return (
        <div className="flex flex-col justify-evenly gap-3 p-0 m-0 w-full lg:max-w-[440px]">
            <OrderTable order={sellOrder.slice(0, 9).reverse()} type="Sell" isShowHeader />
            <div>
                Spread:

                <span className={spread > 0 ? "ml-5 text-green-400 font-bold" : "ml-5 text-red-400 font-bold"}>
                    {
                        Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 10,
                            maximumFractionDigits: 20
                        }).format(spread > 0 ? spread : spread * -1)
                    }
                </span>
            </div>
            <OrderTable order={buyOrder.slice(0, 9)} type="Buy" />
        </div>
    );
}

export default Spread;