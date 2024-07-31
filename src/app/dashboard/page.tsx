"use client";

import { CardPopularProducts } from "./card-popular-products";
import { CardSalesSummary } from "./card-sales-summary";

const Dashboard = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
            <CardPopularProducts />
            <CardSalesSummary />
            <article className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1">

            </article>
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