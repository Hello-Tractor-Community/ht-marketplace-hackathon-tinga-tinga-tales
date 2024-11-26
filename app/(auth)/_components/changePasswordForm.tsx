"use client";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom_input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { resetPasswordAction } from "@/app/actions/auth/reset-password";
import { toast } from "sonner";

const changePasswordSchema = z
    .object({
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

const changePasswordInitialState = {
    message: ""
};

export default function ChangePasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const [state, action] = useFormState(resetPasswordAction, changePasswordInitialState);

    if (state.message !== "") {
        toast(
            "",
            {
                description: state.message,
            }
        );
    }

    const handleSubmit = (data: z.infer<typeof changePasswordSchema>) => {
        const formData = new FormData();
        formData.append('password', data.password);
        action(formData);
    };

    return (
        <div className={"w-full max-w-md h-auto m-2 p-4"}>
            <div>
                <h1 className={"font-bold text-4xl pb-2 text-center"}>
                    Password Reset ?
                </h1>
                <p className={"text-lg text-center font-medium mb-4 text-slate-500"}>Enter your new password</p>
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField name={"password"} render={({ field }) => (
                        <div className={"relative"}>
                            <CustomInput label={"New Password"} {...field} type={showPassword ? "text" : "password"} />
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
                    <FormField name={"confirmPassword"} render={({ field }) => (
                        <div className={"relative"}>
                            <CustomInput label={"Confirm Password"} {...field} type={showConfirmPassword ? "text" : "password"} />
                            {form.formState.errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
                            )}
                            {showConfirmPassword ? (
                                <EyeClosed onClick={() => setShowConfirmPassword(false)} className={"absolute right-2 top-10"} size={20} />
                            ) : (
                                <Eye onClick={() => setShowConfirmPassword(true)} className={"absolute right-2 top-10"} size={20} />
                            )}
                        </div>
                    )} />
                    <Button type={"submit"} className={"bg-primary/80 hover:bg-primary"}>Change My Password</Button>
                </form>
            </Form>
        </div>
    );
}