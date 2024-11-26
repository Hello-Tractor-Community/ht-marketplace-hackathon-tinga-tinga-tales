"use client";
import { logoutAction } from "@/app/actions/auth/logout";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { toast } from "sonner";
import {useFormState} from "react-dom";
import {Tractor} from "lucide-react";

const initialState = {
    message: ""
};

export default function Logout() {
    const [state, action] = useFormState(logoutAction, initialState);


    const handleLogout = () => {
        React.startTransition(() => {
            action();
        });
        if (state.message === "") {
            toast(
                "Logout Successful",
                {
                    description: "You have been logged out",
                }
            );
        } else {
            toast(
                "Logout Failed",
                {
                    description: state.message,
                }
            );
        }
    };

    return (
        <div>
            <Button
                onClick={handleLogout}
                className={"bg-secondary/70 hover:bg-secondary"}>
                <Tractor className="h-6 w-6 transform scale-x-[-1] "/>
                <span >Logout</span>
            </Button>
        </div>
    );
}