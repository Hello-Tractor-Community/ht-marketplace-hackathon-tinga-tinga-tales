// 'use client'
//
// import {useState} from 'react'
// import {ArrowLeft, ChevronDown, ChevronUp, MoreHorizontal, Search, Package} from 'lucide-react'
// import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
// import {Badge} from "@/components/ui/badge"
// import {Button} from "@/components/ui/button"
// import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
// import {Input} from "@/components/ui/input"
// import {Label} from "@/components/ui/label"
// // import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
// import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
// import {Textarea} from "@/components/ui/textarea"
// import {ScrollArea} from "@/components/ui/scroll-area";
// import {useListingsContext} from "@/app/admin/context/approvals-context";
// import {deleteListing} from "@/app/admin/actions/listings-actions";
// import {useToast} from "@/hooks/use-toast";
//
//
// type SortKey = 'id' | 'name' | 'owner' | 'status' | 'price' | 'category'
//
// export default function ListingsPanel() {
//     const [searchTerm, setSearchTerm] = useState('')
//     const [selectedListing, setSelectedListing] = useState<Product>()
//     const [isDetailView, setIsDetailView] = useState(false)
//     const [sortKey, setSortKey] = useState<SortKey>('name')
//     const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
//     const {listings, } = useListingsContext()
//     const { toast } = useToast()
//
//     const handleListingSelect = (listing: Product) => {
//         setSelectedListing(listing)
//         setIsDetailView(true)
//     }
//     const handleBackToList = () => {
//         setIsDetailView(false)
//         setSelectedListing(undefined)
//     }
//     const handleSort = (key: SortKey) => {
//         if (sortKey === key) {
//             setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
//         } else {
//             setSortKey(key)
//             setSortOrder('asc')
//         }
//     }
//     const sortedListings = [...listings].sort((a, b) => {
//         if (a[sortKey]! < b[sortKey]!) return sortOrder === 'asc' ? -1 : 1
//         if (a[sortKey]! > b[sortKey]!) return sortOrder === 'asc' ? 1 : -1
//         return 0
//     })
//     const SortIcon = ({columnKey}: { columnKey: SortKey }) => {
//         if (sortKey !== columnKey) return null
//         return sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4"/> : <ChevronDown className="ml-2 h-4 w-4"/>
//     }
//
//
//     async function handleDeleteListing(id: string) {
//         const deletedListing = await deleteListing(id)
//         if (deletedListing) {
//             const index = listings.findIndex((listing) => listing.id === id)
//             listings.splice(index, 1)
//             setSelectedListing(undefined)
//             setIsDetailView(false)
//             toast({
//                 variant: "destructive",
//                 title: "User banned",
//                 description: `Listing ${id} has been banned`,
//             })
//
//         }
//     }
//
//     return (
//         <div className={"p-2 h-full overflow-y-hidden"}>
//             <Card className="w-full h-full ">
//                 <CardHeader>
//                     <CardTitle className={"text-secondary text-4xl"}>Listings Panel</CardTitle>
//                     <CardDescription>Manage and view product listings</CardDescription>
//                 </CardHeader>
//                 <CardContent className={"h-[calc(100%-8rem)]"}>
//                     <div className="flex flex-col xl:flex-row h-full">
//                         <div className={`flex-grow ${isDetailView ? 'hidden xl:block' : ''}`}>
//                             <div className="mb-4 flex justify-between items-center">
//                                 <div className="relative w-64">
//                                     <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
//                                     <Input
//                                         placeholder="Search listings..."
//                                         className="pl-8"
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                     />
//                                 </div>
//                                 <Button variant="outline">
//                                     Add Listing
//                                     <ChevronDown className="ml-2 h-4 w-4"/>
//                                 </Button>
//                             </div>
//                             <ScrollArea className={"h-[calc(100%-2rem)] "}>
//                                 <Table>
//                                     <TableHeader>
//                                         <TableRow>
//                                             <TableHead onClick={() => handleSort('id')} className="cursor-pointer">
//                                                 Id <SortIcon columnKey="id"/>
//                                             </TableHead>
//                                             <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
//                                                 Name <SortIcon columnKey="name"/>
//                                             </TableHead>
//                                             <TableHead onClick={() => handleSort('owner')} className="cursor-pointer">
//                                                 Owner <SortIcon columnKey="owner"/>
//                                             </TableHead>
//                                             <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
//                                                 Status <SortIcon columnKey="status"/>
//                                             </TableHead>
//                                             <TableHead onClick={() => handleSort('price')} className="cursor-pointer">
//                                                 Price <SortIcon columnKey="price"/>
//                                             </TableHead>
//                                             <TableHead onClick={() => handleSort('category')}
//                                                        className="cursor-pointer">
//                                                 Category <SortIcon columnKey="category"/>
//                                             </TableHead>
//                                             {/*<TableHead onClick={() => handleSort('quantity')}*/}
//                                             {/*           className="cursor-pointer">*/}
//                                             {/*    Quantity <SortIcon columnKey="quantity"/>*/}
//                                             {/*</TableHead>*/}
//                                             <TableHead className="text-right">Actions</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {sortedListings.map((listing) => (
//                                             <TableRow key={listing.id}>
//                                                 <TableCell className="font-medium">{listing.id}</TableCell>
//                                                 <TableCell className="font-medium">{listing.name}</TableCell>
//                                                 <TableCell>{listing.owner?.email}</TableCell>
//                                                 <TableCell>
//                                                     <Badge
//                                                         variant={listing.status === 'approved' ? 'default' : listing.status === 'unapproved' ? 'secondary': 'destructive' }>
//                                                         {listing.status}
//                                                     </Badge>
//                                                 </TableCell>
//                                                 <TableCell>${listing.price.toFixed(2)}</TableCell>
//                                                 <TableCell>{listing.category.name}</TableCell>
//                                                 <TableCell className="text-right">
//                                                     <DropdownMenu>
//                                                         <DropdownMenuTrigger asChild>
//                                                             <Button variant="ghost" className="h-8 w-8 p-0">
//                                                                 <span className="sr-only">Open menu</span>
//                                                                 <MoreHorizontal className="h-4 w-4"/>
//                                                             </Button>
//                                                         </DropdownMenuTrigger>
//                                                         <DropdownMenuContent align="end">
//                                                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                                             <DropdownMenuItem
//                                                                 onClick={() => handleListingSelect(listing)}>View
//                                                                 details</DropdownMenuItem>
//                                                             <DropdownMenuItem>Edit listing</DropdownMenuItem>
//                                                             <DropdownMenuSeparator/>
//                                                             <DropdownMenuItem>Delete listing</DropdownMenuItem>
//                                                         </DropdownMenuContent>
//                                                     </DropdownMenu>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </ScrollArea>
//                         </div>
//                         {isDetailView && (
//                             <DetailView
//                                 onDelete={handleDeleteListing}
//                                 isDetailView={isDetailView}
//                                 selectedListing={selectedListing!}
//                                 handleBackToList={handleBackToList}/>
//                         )}
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }
//
// function DetailView({selectedListing, handleBackToList, isDetailView, onDelete } : {
//     selectedListing: Product,
//     handleBackToList: () => void,
//     isDetailView: boolean
//     onDelete: (id: string) => void
// }) {
//     return (
//         <div
//             className={`mt-4 h-full xl:mt-0 xl:ml-6 xl:w-1/3 ${isDetailView ? 'block' : 'hidden xl:block'}`}>
//             <Card className={"h-full"}>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle>Listing Details</CardTitle>
//                     <Button variant="ghost" size="sm" onClick={handleBackToList} className="xl:hidden">
//                         <ArrowLeft className="mr-2 h-4 w-4"/>
//                         Back to List
//                     </Button>
//                 </CardHeader>
//                 <ScrollArea className={"h-[calc(100%-4rem)] p-2"}>
//                     <CardContent>
//                         {selectedListing && (
//                             <div className="space-y-4">
//                                 <div className="flex items-center space-x-4">
//                                     <Avatar className="h-16 w-16">
//                                         <AvatarImage src="/placeholder-product.jpg" alt={selectedListing.name}/>
//                                         <AvatarFallback>
//                                             <Package className="h-16 w-16"/>
//                                         </AvatarFallback>
//                                     </Avatar>
//                                     <div>
//                                         <h3 className="text-lg font-medium">{selectedListing.name}</h3>
//                                         <p className="text-sm text-muted-foreground">ID: {selectedListing.id}</p>
//                                     </div>
//                                 </div>
//                                 <div className="grid gap-4">
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="seller">Owner</Label>
//                                         <Input className={"cursor-default"} id="seller" value={selectedListing.owner!.email} readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="status">Status</Label>
//                                         <Input className={"cursor-default"} id="seller" value={selectedListing.status} readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="description">Description</Label>
//                                         <Textarea className={"cursor-default"} defaultValue={selectedListing.description} id="description" readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="price">Price</Label>
//                                         <Input className={"cursor-default"} id="price" value={selectedListing.price} readOnly/>
//                                     </div>
//                                     {/*<div className="grid gap-2">*/}
//                                     {/*    <Label htmlFor="quantity">Quantity in Stock</Label>*/}
//                                     {/*    <Input [id]="quantity" type="number" value={selectedListing.quantity}/>*/}
//                                     {/*</div>*/}
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="category">Category</Label>
//                                         <Input className={"cursor-default"} id="category" value={selectedListing.category.name} readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="subcategory">Subcategory</Label>
//                                         <Input className={"cursor-default"} id="subcategory" value={selectedListing.sub_category?.name} readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="brand">Brand</Label>
//                                         <Input className={"cursor-default"} id="brand" value={selectedListing.brand.name} readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="model">Model</Label>
//                                         <Input className={"cursor-default"} id="model" value={selectedListing.model} readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="year">Year</Label>
//                                         <Input className={"cursor-default"} id="year" value={selectedListing.year === null ? undefined : selectedListing.year } readOnly/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="usedTime">Used Time</Label>
//                                         <Input className={"cursor-default"} readOnly id="usedTime" value={selectedListing.used_time === null ? undefined : selectedListing.used_time}/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="history">History</Label>
//                                         <Textarea className={"cursor-default"} readOnly id="history" value={selectedListing.history === null ? undefined : selectedListing.history}/>
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="location">Location</Label>
//                                         <Input className={"cursor-default"} readOnly id="location" value={selectedListing.location}/>
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <Button onClick={() => onDelete(selectedListing.id)}>Remove Listing</Button>
//                                 </div>
//                             </div>
//                         )}
//                     </CardContent>
//                 </ScrollArea>
//             </Card>
//         </div>
//     );
// }