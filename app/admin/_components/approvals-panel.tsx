'use client'

import {Check, Info, X} from 'lucide-react'
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useApprovalsContext} from "@/app/admin/context/approvals-context";


export function SellerApprovalsTable() {
    const {users, approveUser, rejectUser} = useApprovalsContext()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.phone}</TableCell>
                        <TableCell>{request.role}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{request.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <div className="flex group items-center mr-2">
                                            <Info className="mr-2 h-4 w-4 cursor-pointer"/>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80">
                                        <div className="space-y-2">
                                            <div className="flex justify-between space-x-4">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder-avatar.jpg"/>
                                                    <AvatarFallback>
                                                        {request.name[0]}{request.name[1]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">{request.name}</h4>
                                                    <p className="text-sm">{request.email}</p>
                                                    <p className="text-sm">{request.phone}</p>
                                                </div>
                                            </div>
                                            {request.dealer && (
                                                <div>
                                                    <h5 className="text-sm font-semibold">Business Permit</h5>
                                                    {/*<Image width={50} height={50} src={request.dealer.business_permit_image} alt="Business Permit" className="w-full h-auto" />*/}
                                                    <p className="text-sm">{request.dealer.description}</p>
                                                    <p className="text-sm">{request.dealer.location}</p>
                                                </div>
                                            )}
                                            {request.seller && (
                                                <div>
                                                    <h5 className="text-sm font-semibold">Seller Details</h5>
                                                    <p className="text-sm">{request.seller.description}</p>
                                                    <p className="text-sm">{request.seller.location}</p>
                                                </div>
                                            )}
                                            {request.operator && (
                                                <div>
                                                    <h5 className="text-sm font-semibold">Operator Details</h5>
                                                    <p className="text-sm">{request.operator.description}</p>
                                                    <p className="text-sm">{request.operator.location}</p>
                                                    <p className="text-sm">{request.operator.rate_card}</p>
                                                    <p className="text-sm">{request.operator.experience}</p>
                                                    <div>
                                                        <h5 className="text-sm font-semibold">Certifications</h5>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {request.operator.certifications.map(certification => (
                                                                <div key={certification.name}
                                                                     className="flex items-center space-x-2">
                                                                    {/*<Image width={50} height={50} src={certification.certification_image} alt={certification.name} className="w-8 h-8" />*/}
                                                                    <p className="text-sm">{certification.name}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                                <Button
                                    onClick={() => approveUser(request)}
                                    size="sm"
                                    variant="default">
                                    <Check className="mr-2 h-4 w-4"/>
                                    Approve
                                </Button>
                                <Button
                                    onClick={() => rejectUser(request)}
                                    size="sm"
                                    variant="destructive">
                                    <X className="mr-2 h-4 w-4"/>
                                    Reject
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export function ListingApprovalsTable() {
    const {listings, approveListing, rejectListing} = useApprovalsContext()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listings.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.owner?.name}</TableCell>
                        <TableCell>{request.price}</TableCell>
                        <TableCell>{request.category?.name}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{request.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <div className="flex group items-center mr-2">
                                            <Info className="mr-2 h-4 w-4 cursor-pointer"/>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80">
                                        <div className="space-y-2">
                                            <div className="flex justify-between space-x-4">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder-avatar.jpg"/>
                                                    <AvatarFallback>
                                                        {request.owner?.name[0]}{request.owner?.name[1]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">{request.name}</h4>
                                                    <p className="text-sm">{request.category?.name}</p>
                                                    <p className="text-sm">{request.description}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-semibold"></h5>
                                                {/*<Image width={50} height={50} src={request.dealer.business_permit_image} alt="Business Permit" className="w-full h-auto" />*/}
                                                <p className="text-sm">{request.used_time}</p>
                                                <p className="text-sm">{request.location}</p>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                                <Button
                                    onClick={() => approveListing(request)}
                                    size="sm" variant="default"
                                        className={"bg-secondary/90 hover:bg-secondary"}>
                                    <Check className="mr-2 h-4 w-4"/>
                                    Approve
                                </Button>
                                <Button
                                    onClick={() => rejectListing(request)}
                                    size="sm" variant="destructive"
                                        className={"opacity-70 hover:opacity-100"}>
                                    <X className="mr-2 h-4 w-4"/>
                                    Reject
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

