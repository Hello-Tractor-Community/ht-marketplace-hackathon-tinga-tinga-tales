import * as React from "react"
import { cn } from "@/lib/utils"
import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";



interface CustomInputProps extends React.ComponentProps<"input"> {
    label: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input
                        {...props}
                        ref={ref}
                        className={cn(
                            "rounded-none border border-secondary border-b-[1px] border-t-0 border-l-0 border-r-0 ring-0 shadow-none focus-visible:ring-0",
                            className
                        )}
                    />
                </FormControl>
            </FormItem>
        )
    }
)
CustomInput.displayName = "CustomInput"

export { CustomInput }