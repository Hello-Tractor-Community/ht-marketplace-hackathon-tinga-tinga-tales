'use client';
import React, {createContext, useContext, useState} from 'react';
import {updateListing} from "@/app/admin/actions/listings-actions";
import {toast} from "sonner";
import {updateUserAction} from "@/app/admin/actions/users-actions";

interface ApprovalsContextType {
    users: User[];
    listings: Product[];
    approveListing: (listing: Product) => void;
    rejectListing: (listing: Product) => void;
    approveUser: (user: User) => void;
    rejectUser: (user: User) => void;
}

const ApprovalsContext = createContext<ApprovalsContextType | undefined>(undefined);

export const ApprovalsProvider = ({ users, listings, children }: { users: User[], listings: Product[], children: React.ReactNode }) => {
    const [currentUsers, setUsers] = useState<User[]>(users);
    const [currentListings, setListings] = useState<Product[]>(listings);

    async function approveListing(listing: Product) {
        const approvedListing = await updateListing({...listing, status: 'approved'})
        if (approvedListing) {
            const index = listings.findIndex(l => l.id === listing.id)
            const updatedListings = [...listings]
            updatedListings.splice(index, 1)
            setListings(updatedListings)
            toast.success('Listing ' + listing.name + ' has been approved')
        }
    }

    async function rejectListing(listing: Product) {
        const rejectedListing = await updateListing({...listing, status: 'archived'})
        if (rejectedListing) {
            const index = listings.findIndex(l => l.id === listing.id)
            const updatedListings = [...listings]
            updatedListings[index].status = rejectedListing.status
            setListings(updatedListings)
            toast.success('Listing ' + listing.name + ' has been rejected')
        }
    }

    async function approveUser(user: User) {
        const approvedUser = await updateUserAction({...user, status: 'Approved'})
        console.log("This ",approvedUser);
        if (approvedUser) {
            const updatedUsers = [...users]
            updatedUsers.splice(users.findIndex(u => u.id === user.id), 1)
            setUsers(updatedUsers)
            toast.success('Request from ' + user.name + ' has been approved')
        }
    }

    async function rejectUser(user: User) {
        const rejectedUser = await updateUserAction({...user, status: 'Unapproved'})
        if (rejectedUser) {
            const index = users.findIndex(u => u.id === user.id)
            const updatedUsers = [...users]
            updatedUsers[index] = rejectedUser
            setUsers(updatedUsers)
            toast.success('Request from ' + user.name + ' has been Rejected')
        }
    }


    return (
        <ApprovalsContext.Provider value={{
            users: currentUsers, listings: currentListings,
            approveListing, rejectListing,
            approveUser, rejectUser
        }}>
            {children}
        </ApprovalsContext.Provider>
    );
};

export const useApprovalsContext = () => {
    const context = useContext(ApprovalsContext);
    if (!context) {
        throw new Error('useApprovalContext must be used within a UserProvider');
    }
    return context;
};