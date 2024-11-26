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
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="spare-parts">Parts</SelectItem>
                    <SelectItem value="new-tractors">New Tractors</SelectItem>
                    <SelectItem value="agr-implements">Agr-implements</SelectItem>
                    <SelectItem value="second-hand-tractors">Secondhand Tractors</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export function SortSelectMenu() {
    return (
        <Select>
            <SelectTrigger className="w-[180px] dark:text-background">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/*<SelectLabel>Filter By</SelectLabel>*/}
                    <SelectItem value="priceAZ">Price High - Low</SelectItem>
                    <SelectItem value="priceZA">Price Low - High</SelectItem>
                    <SelectItem value="nameAZ">Name A-z</SelectItem>
                    <SelectItem value="nameZA">Name Z-A</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}