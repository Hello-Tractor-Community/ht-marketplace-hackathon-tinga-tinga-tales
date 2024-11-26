'use client';

import {useState} from 'react'
import {ChevronDown, ChevronUp, MoreHorizontal} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge";
import {useUsersContext} from "@/app/admin/context/users-context";


type SortKey = 'id' | 'name' | 'email' | 'role' | 'status';


export default function UsersTable() {

    const {users, deleteUser, openDetailView, banUser} = useUsersContext();


    const [sortKey, setSortKey] = useState<SortKey>('name')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortOrder('asc')
        }
    }
    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
        return 0
    })
    const SortIcon = ({columnKey}: { columnKey: SortKey }) => {
        if (sortKey !== columnKey) return null
        return sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4"/> : <ChevronDown className="ml-2 h-4 w-4"/>
    }


    return (

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead onClick={() => handleSort('id')}
                               className="cursor-pointer">
                        Id <SortIcon columnKey="id"/>
                    </TableHead>
                    <TableHead onClick={() => handleSort('name')}
                               className="cursor-pointer">
                        Name <SortIcon columnKey="name"/>
                    </TableHead>
                    <TableHead onClick={() => handleSort('email')}
                               className="cursor-pointer">
                        Email <SortIcon columnKey="email"/>
                    </TableHead>
                    <TableHead onClick={() => handleSort('role')}
                               className="cursor-pointer">
                        Role <SortIcon columnKey="role"/>
                    </TableHead>
                    <TableHead onClick={() => handleSort('status')}
                               className="cursor-pointer">
                        Status <SortIcon columnKey="status"/>
                    </TableHead>
                    <TableHead
                        className="cursor-pointer">
                        Phone
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            <Badge
                                variant={user.status === 'Unapproved' ? 'secondary' : user.status === 'Approved' ? 'default' : 'destructive'}>
                                {user.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() => openDetailView(user)}>
                                        Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => banUser(user)}
                                    >
                                        Ban User
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => deleteUser(user)}>
                                        Delete User
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    );
}