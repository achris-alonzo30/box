"use client";

import { DataTable } from "@/components/data-table";
import { useGetProductsQuery } from "@/state/api";
import { inventoryColumns, payments } from "./inventory-columns";



const InventoryPage = () => {
    const { data, isError, isLoading } = useGetProductsQuery();

    
    return (
        <section>
            <DataTable 
                filter=""
                data={payments}
                columns={inventoryColumns}
            />
        </section>
    )
}

export default InventoryPage;