"use client";

import { CardPopularProducts } from "./card-popular-products";
import { CardPurchaseSummary } from "./card-purchase-summar";
import { CardSalesSummary } from "./card-sales-summary";

const Dashboard = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
            <CardPopularProducts />
            <CardSalesSummary />
            <CardPurchaseSummary />
            <article className="row-span-3">

            </article>
            <article className="md:row-span-1 xl:row-span-2">

            </article>
            <article className="md:row-span-1 xl:row-span-2">

            </article>
            <article className="md:row-span-1 xl:row-span-2">

            </article>
        </section>
    )
}

export default Dashboard;