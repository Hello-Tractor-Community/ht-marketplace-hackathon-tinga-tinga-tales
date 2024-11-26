'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { startTransition } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import React from "react";
import { useFormState } from "react-dom";
import { resendPasswordResetCodeAction, verifyPasswordResetEmailAction } from "@/app/actions/auth/verifyPasswordResetEmail";

const formSchema = z.object({
    otp: z.string().min(6, { message: "Enter a valid OTP" }).max(6, { message: "Enter a valid OTP" }),
});

const emailVerificationInitialState = {
    message: ""
};

export default function VerifyResetPasswordEmailForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    });

    const [state, action] = useFormState(verifyPasswordResetEmailAction, emailVerificationInitialState);
    if (state.message !== "") {
        toast(
            "Aw! Snap",
            {
                description: state.message,
            }
        );
    }

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('code', data.otp);
        startTransition(() => {
            action(formData);
        });
    };

    return (
        <div className={"flex flex-col items-center"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField name={"otp"} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Please enter the code sent to your email</FormLabel>
                            <FormControl>
                                <InputOTP {...field} maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            {form.formState.errors.otp && (
                                <p className="text-red-500 text-sm">{form.formState.errors.otp.message}</p>
                            )}
                        </FormItem>
                    )} />
                    <div className={"mt-10"}>
                        <ResendEmailVerificationCode />
                        <Button
                            type={"submit"}
                            className={"bg-primary/80 hover:bg-primary"}
                        >
                            Verify
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

const resendEmailInitialState = {
    message: ""
};

function ResendEmailVerificationCode() {
    const [state, action] = useFormState(resendPasswordResetCodeAction, resendEmailInitialState);

    const handleResend = () => {
        startTransition(() => {
            action();
        });
        if (state.message !== "") {
            toast(
                "",
                {
                    description: state.message,
                }
            );
        }
    };

    return (
        <div onClick={handleResend}>
            <p className={"text-sm mb-4"}>
                Didn&#39;t receive the OTP? <span
                className={"text-primary pl-2.5 cursor-pointer hover:underline hover:underline-offset-4"}>Resend OTP</span>
            </p>
        </div>
    );
}