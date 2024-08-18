"use client"

import useBuyOrderStore from "@/store/buyOrder.store";
import useSellOrderStore from "@/store/sellOrder.store";
import useSpreadStore from "@/store/spread.store";
import OrderTable from "../OrderTable/OrderTable";

const Spread = () => {
    const sellOrder = useSellOrderStore((state) => state.sellOrder);
    const buyOrder = useBuyOrderStore((state) => state.buyOrder);
    const spread = useSpreadStore((state) => state.spread)

    return (
        <div className="flex flex-col justify-start gap-2 p-0 m-0 w-full lg:max-w-[500px]">
            <h1 className="font-bold text-[24px]">ORDER BOOK</h1>
            <OrderTable order={sellOrder.slice(0, 10).reverse()} type="Ask" isShowHeader />
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
            <OrderTable order={buyOrder.slice(0, 10)} type="Bid" />
        </div>
    );
}

export default Spread;