'use client';
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import * as React from "react";

export default function ThemeToggle() {
    const {setTheme, theme} = useTheme()

    return (
        <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            variant="outline">
            <span className="sr-only">Toggle Theme</span>
            {
                theme === "dark" ? <Sun className="h-6 w-6"/> : <Moon className="h-6 w-6"/>
            }
        </Button>
    )
}