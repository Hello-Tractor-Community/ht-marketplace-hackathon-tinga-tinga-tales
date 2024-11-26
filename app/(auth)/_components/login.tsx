"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom_input";
import { Eye, EyeClosed } from "lucide-react";
import { loginAction } from "@/app/actions/auth/login";
import { toast } from "sonner";
import { useFormState } from "react-dom";

const loginFormSchema = z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(1, { message: "Password is Required" })
});

const initialState = {
    message: ""
};

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const [state, action] = useFormState(loginAction, initialState);

    const handleSubmit = (data: z.infer<typeof loginFormSchema>) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        action(formData);
    };

    if (state.message !== "") {
        toast(
            "",
            {
                description: state.message,
            }
        );
    }



return (
    <div className={"h-80 md:m-2"}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField name={"email"} render={({ field }) => (
                    <>
                        <CustomInput label={"Email"} {...field} className={""} />
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                        )}
                    </>
                )} />
                <FormField name={"password"} render={({ field }) => (
                    <div className={"relative"}>
                        <CustomInput label={"Password"} {...field} type={showPassword ? "text" : "password"} />
                        {form.formState.errors.password && (
                            <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                        )}
                        {showPassword ? (
                            <EyeClosed onClick={() => setShowPassword(false)} className={"absolute right-2 top-10"} size={20} />
                        ) : (
                            <Eye onClick={() => setShowPassword(true)} className={"absolute right-2 top-10"} size={20} />
                        )}
                    </div>
                )} />
                <div className={"flex flex-col md:flex-row md:space-x-20 md:mt-10"}>
                    <div>
                        <Link href={"/forgot_password"}>
                            <p className={"text-primary hover:underline hover:underline-offset-4"}>Forgot your password?</p>
                        </Link>
                    </div>
                    <Button
                        type={"submit"}
                        className={"w-64 md:w-80 lg:w-32 h-8 lg:h-9 px-2 md:px4 text-xs md:text-sm bg-primary hover:bg-secondary"}>Login</Button>
                </div>
            </form>
        </Form>
    </div>
);
}