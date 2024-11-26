'use client';
import {ClipboardCheck, PlusCircle, UserCheck} from "lucide-react";
import {redirect} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";

    const actions = [
        { id: 'add', label: 'Add Dealer/Operator', icon: PlusCircle, link: '/admin/add' },
        { id: 'approve', label: 'Approve Dealer/Operator', icon: UserCheck, link: '/admin/approvals' },
        { id: 'listing', label: 'Approve Listing', icon: ClipboardCheck, link: '/admin/approvals' },
    ]

    const actionVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.2 } },
    }

    const iconVariants = {
        initial: { rotate: 0 },
        hover: { rotate: 360, transition: { duration: 0.5 } },
    }

export default function QuickActionsCard() {

    function handleClick(action: string) {
        redirect(action)
    }

    return (
        <Card className="h-full rounded-xl bg-muted/50">
            <CardHeader>
                <CardTitle className={"text-secondary"}>Quick Actions</CardTitle>
                <CardDescription>Frequently used admin actions.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {actions.map((action) => (
                    <motion.div key={action.id} variants={actionVariants} whileHover="hover" whileTap="tap">
                        <Button
                            variant="outline"
                            className={`w-full text-secondary justify-center hover:bg-secondary/10 ${action.id === 'add' ? 'bg-secondary text-background hover:bg-secondary/90' : ''}`}
                            onClick={() => handleClick(action.link)}
                        >
                            <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                                <action.icon className="mr-2 h-4 w-4" />
                            </motion.div>
                            {action.label}
                        </Button>
                    </motion.div>
                ))}
            </CardContent>
        </Card>
    );
}