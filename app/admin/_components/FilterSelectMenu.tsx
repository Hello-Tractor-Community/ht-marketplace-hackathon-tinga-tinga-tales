import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export function FilterSelectMenu() {
    return (
        <Select>
            <SelectTrigger className="w-[180px] dark:text-background">
                <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/*<SelectLabel>Filter By</SelectLabel>*/}
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="dealers">Dealers</SelectItem>
                    <SelectItem value="sellers">Sellers</SelectItem>
                    <SelectItem value="customers">Customer</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}