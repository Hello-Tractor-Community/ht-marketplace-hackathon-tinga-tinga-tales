'use client';
import React, {createContext, startTransition, useContext, useState} from 'react';
import {toast} from "sonner";
import {banUserAction, deleteUserAction, getUsersAction, updateUserAction} from "@/app/admin/actions/users-actions";

interface UsersContextType {
    users: User[];
    selectedUser: User | null;
    isDetailView: boolean;
    totalPages: number;
    updateUser: (user: User) => void;
    cancelUpdate: () => void;
    deleteUser: (user: User) => void;
    banUser: (user: User) => void;
    fetchUsers: (page: number) => void;
    openDetailView: (user: User) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ users, pages, children }: { users: User[], pages: number, children: React.ReactNode }) => {
    const [currentUsers, setUsers] = useState<User[]>(users);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDetailView, setIsDetailView] = useState(false);
    const [totalPages, setTotalPages] = useState(pages);

    async function fetchUsers(page: number) {
        startTransition(async () => {
            const {data, totalPages} = await getUsersAction( page, 12);
            setUsers(data);
            setTotalPages(totalPages);
        });
    }

    async function updateUser(user: User) {
        const updatedUser = await updateUserAction(user)
        console.log("This ", updatedUser);
        if (updatedUser) {
            const newUsers = currentUsers.map(u => u.id === user.id ? updatedUser : u)
            setUsers(newUsers)
            toast(
                "User updated",
                {
                    description: `User ${user.name} has been updated`,
                    className: "bg-green-500"
                }
            )
        }
    }

    async function banUser(user: User) {
        const bannedUser = await banUserAction(user.id)
        console.log(bannedUser);
        if (bannedUser) {
            const newUsers = currentUsers.map(u => u.id === user.id ? bannedUser : u)
            setUsers(newUsers)
            toast(
                "User banned",
                {
                    description: `User ${user.name} has been banned`,
                    className: "bg-green-500"
                }
            )
        }
    }

    async function deleteUser(user: User) {
        const deletedUser = await deleteUserAction(user.id)
        console.log(deletedUser);
        if (deletedUser) {
            const newUsers = currentUsers.filter(u => u.id !== user.id)
            if (selectedUser?.id === deletedUser.id) {
                setSelectedUser(null)
                setIsDetailView(false)
            }
            setUsers(newUsers)
            toast(
                "User deleted",
                {
                    description: `User ${user.name} has been deleted`,
                    className: "bg-green-500"
                }
            )
        }
    }

    function cancelUpdate() {
        setIsDetailView(false)
        setSelectedUser(null)
    }

    function openDetailView(user: User) {
        setIsDetailView(true)
        setSelectedUser(user)
    }


    return (
        <UsersContext.Provider value={{
            users: currentUsers,
            selectedUser,
            isDetailView,
            totalPages,
            updateUser,
            banUser,
            cancelUpdate,
            deleteUser,
            fetchUsers,
            openDetailView,
        }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsersContext = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsersContext must be used within a UserProvider');
    }
    return context;
};