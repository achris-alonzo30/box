"use client";

import Image from "next/image"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

export const Sidebar = () => {
    return (
        <aside className="">
            <nav className="flex gap-3 justify-between lg:justify-normal items-center pt-8">
                <Image
                    width={32}
                    height={32}
                    src="/logo.svg"
                    alt="Box word for website logo"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => { }}
                >
                    <Menu className="size-4" />
                    <span className="sr-only">Menu</span>
                </Button>
            </nav>

            <hr className="w-full border border-solid border-l border-gray-300 mx-3" />
            <nav className="flex-1 flex-grow mt-8">
                {/* Links */}
            </nav>

            <footer className="mt-auto">
                <p className="text-center text-xs text-zinc-500">
                    &copy; {new Date().getFullYear()} box.
                </p>
            </footer>
        </aside>
    )
}