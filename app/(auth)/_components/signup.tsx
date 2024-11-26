"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom_input";
import { Eye, EyeClosed } from "lucide-react";
import { signupUser } from "@/app/actions/auth/signup";
import { toast } from "sonner";
import { useFormState } from "react-dom";

const formSchema = z
    .object({
        fullName: z.string().min(3, { message: "Full name must be at least 3 characters long" }),
        phone: z.string().min(10, { message: "Phone number must be at least 10 characters long" }),
        email: z.string().email({ message: "Enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
        confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Passwords do not match",
            });
        }
    });

const initialState = {
    message: ""
};

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [state, action] = useFormState(signupUser, initialState);

    if (state.message === "User already exists") {
        toast(
            "User already exists",
            {
                description: `User With ${form.getValues().email} Already Exists`,
            }
        );
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('password', data.password);
        action(formData);
    };

    return (
        <div className={"m-2"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                    <FormField name={"fullName"} render={({ field }) => (
                        <>
                            <CustomInput label={"Full Name"} {...field} />
                            {form.formState.errors.fullName && (
                                <p className="text-red-500 text-sm">{form.formState.errors.fullName.message}</p>
                            )}
                        </>
                    )} />
                    <FormField name={"phone"} render={({ field }) => (
                        <>
                            <CustomInput label={"Phone Number"} {...field} />
                            {form.formState.errors.phone && (
                                <p className={"text-red-500 text-sm"}>{form.formState.errors.phone.message}</p>
                            )}
                        </>
                    )} />
                    <FormField name={"email"} render={({ field }) => (
                        <>
                            <CustomInput label={"Email"} {...field} />
                            {form.formState.errors.email && (
                                <p className={"text-red-500 text-sm"}>{form.formState.errors.email.message}</p>
                            )}
                        </>
                    )} />
                    <FormField name={"password"} render={({ field }) => (
                        <div className={"relative"}>
                            <CustomInput label={"Password"} {...field} type={showPassword ? "text" : "password"} />
                            {form.formState.errors.password && (
                                <p className={"text-red-500 text-sm"}>{form.formState.errors.password.message}</p>
                            )}
                            {showPassword ? (
                                <EyeClosed onClick={() => setShowPassword(false)} className={"absolute right-2 top-10"} size={20} />
                            ) : (
                                <Eye onClick={() => setShowPassword(true)} className={"absolute right-2 top-10"} size={20} />
                            )}
                        </div>
                    )} />
                    <FormField name={"confirmPassword"} render={({ field }) => (
                        <div className={"relative"}>
                            <CustomInput label={"Confirm Password"} {...field} type={showConfirmPassword ? "text" : "password"} />
                            {form.formState.errors.confirmPassword && (
                                <p className={"text-red-500 text-sm"}>{form.formState.errors.confirmPassword.message}</p>
                            )}
                            {showConfirmPassword ? (
                                <EyeClosed onClick={() => setShowConfirmPassword(false)} className={"absolute right-2 top-10"} size={20} />
                            ) : (
                                <Eye onClick={() => setShowConfirmPassword(true)} className={"absolute right-2 top-10"} size={20} />
                            )}
                        </div>
                    )} />
                    <div className={"flex flex-row space-x-20 mt-10"}>
                        <Button
                            type={"submit"}
                            size={"lg"}
                            className={"bg-primary/80 hover:bg-primary"}>Sign Up</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}