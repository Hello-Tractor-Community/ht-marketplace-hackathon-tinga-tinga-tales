'use client'

import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { CustomInput } from "@/components/custom/custom_input";
import { forgotPasswordAction } from "@/app/actions/auth/forgot-password";
import { toast } from "sonner";

const forgotPasswordScheme = z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
});

const initialState = {
    message: ""
};

export default function ForgotPasswordForm() {
    const form = useForm<z.infer<typeof forgotPasswordScheme>>({
        resolver: zodResolver(forgotPasswordScheme),
        defaultValues: {
            email: "",
        }
    });

    const [state, action] = useFormState(forgotPasswordAction, initialState);

    if (state.message === "Account does not exist") {
        toast(
            "User already exists",
            {
                description: `No user With ${form.getValues().email} Exists, Kindly signup`,
            }
        );
    }

    const handleSubmit = (data: z.infer<typeof forgotPasswordScheme>) => {
        const formData = new FormData();
        formData.append('email', data.email);
        action(formData);
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl pb-2">
                    Forgot Password?
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-medium text-slate-500">
                    No worries, we will send you reset instructions
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField name="email" render={({ field }) => (
                        <>
                            <CustomInput label={"Email"} {...field} />
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                            )}
                        </>
                    )} />
                    <div className="flex flex-row justify-between items-end">
                        <Link href="/sign_in"
                              className="group flex flex-row items-center text-primary space-x-2 hover:underline hover:underline-offset-4">
                            <ArrowLeft size={15} className={"group-hover:-translate-x-1 transition-transform"} />
                            <span className="text-sm">Back to login</span>
                        </Link>
                        <Button
                            type="submit"
                            className="bg-primary/80 hover:bg-primary">
                            Reset Password
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}