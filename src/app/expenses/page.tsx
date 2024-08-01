"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { useGetExpensesByCategoryQuery } from "@/state/api";

import { Calendar as CalendarIcon } from "lucide-react";

import {
    Select,
    SelectItem,
    SelectLabel,
    SelectValue,
    SelectGroup,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ExpenseByCategorySummary } from "@/state/types";

type AggregatedDataItemProps = {
    name: string;
    color?: string;
    amount: number;
}

type AggregatedDataProps = {
    [category: string]: AggregatedDataItemProps
}

const ExpensesPage = () => {
    const [active, setActive] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const { data, isError, isLoading } = useGetExpensesByCategoryQuery();

    const expenses = useMemo(() => data ?? [], [data]);


    const aggregatedData = useMemo(() => {
        const filtered: AggregatedDataProps = expenses.filter(
            (data: ExpenseByCategorySummary) => {
                const matchesCategory = selectedCategory === "All" || data.category === selectedCategory;
                const dataDate = new Date(data.date);
                const matchesDate = !startDate || !endDate || (dataDate >= startDate && dataDate <= endDate);
                return matchesCategory && matchesDate;
            }
        ).reduce((acc: AggregatedDataProps, data: ExpenseByCategorySummary) => {
            const amount = parseInt(data.amount);
            if (!acc[data.category]) {
                acc[data.category] = {
                    name: data.category,
                    amount: 0
                };
                acc[data.category].color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                acc[data.category].amount += amount
            }
            return acc;
        }, {});

        return Object.values(filtered);
    }, [expenses, selectedCategory, startDate, endDate]);

    // TODO: Create Loading page
    if (isLoading) return <p>Loading...</p>;

    // TODO: Create Error page
    if (isError || !data) return notFound();

    const classNames = {
        label: "block text-sm font-medium"
    }

    return (
        <section>
            <header className="mb-5">
                <Heading name="Expenses" />
                <p className="text-sm text-muted-foreground">A visual representation of expenses over time.</p>
            </header>

            <article className="flex flex-col md:flex-row justify-between gap-4">
                <aside className="w-full md:1/3 shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Filter by Category & Date
                    </h3>
                    <div className="space-y-4">
                        <fieldset>
                            <div>
                                <Label>Category</Label>
                                <Select
                                    defaultValue="All"
                                    onValueChange={(value) => setSelectedCategory(value)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            <SelectItem value="All">All</SelectItem>
                                            <SelectItem value="Office">Office</SelectItem>
                                            <SelectItem value="Professional">Professional</SelectItem>
                                            <SelectItem value="Salaries">Salaries</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </fieldset>
                    </div>
                </aside>

                <aside className="flex-grow shadow rounded-lg p-4 md:p-6">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={aggregatedData}
                                cx="50%"
                                cy="50%"
                                label
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="amount"
                                onMouseEnter={(_, index) => setActive(index)}
                            >
                                {aggregatedData.map((
                                    entry: AggregatedDataItemProps, 
                                    index: number
                                ) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        fillOpacity={active === index ? 1 : 0.6}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </aside>
            </article>
        </section>
    )
}

export default ExpensesPage;