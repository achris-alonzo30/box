"use client";

import { notFound } from "next/navigation";
import { useGetProductsQuery } from "@/state/api";

import { Heading } from "@/components/heading";
import { DataTable } from "@/components/data-table";
import { inventoryColumns } from "./inventory-columns";

const InventoryPage = () => {
    const { data, isError, isLoading } = useGetProductsQuery();

    if (isLoading) return <p>Loading...</p>;

    if (isError || !data) return notFound();
    return (
        <section className="flex flex-col">
            <Heading name="Inventory" />
            <DataTable 
                filter=""
                data={data}
                columns={inventoryColumns}
            />
        </section>
    )
}

export default InventoryPage;