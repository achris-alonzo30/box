import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { 
    Product,
    SalesSummary,
    ExpenseSummary,
    PurchaseSummary,
    ExpenseByCategorySummary,     
} from "./types";



export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!
    }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics"],
    endpoints: (build) => ({
        getDashboard: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        })
    })
});

export const { useGetDashboardQuery } = api;