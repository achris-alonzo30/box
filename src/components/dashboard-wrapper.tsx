import { cn } from "@/lib/utils"
import { Navbar } from "./navbar"

export const DashboardWrapper = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <main className={cn("flex w-full min-h-screen")}>
            Sidebar
            <section className={cn("flex flex-col w-full h-full py-7 px-9 md:pl-24 ")}>
                <Navbar />
                {children}
            </section>
        </main>
    )
}