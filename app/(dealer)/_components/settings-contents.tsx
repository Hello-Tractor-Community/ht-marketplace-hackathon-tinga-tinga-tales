import {LockOpen, UserPen, UserRoundX} from "lucide-react";
import React from "react";
import {CustomInput} from "@/components/custom/custom_input";
import {Form, FormField} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import {SettingMenuProvider, useSettingMenuContext} from "@/context/settings-context";
import ContentHeader from "@/app/(dealer)/_components/content-header";

export default function SettingsContents() {


    return (
        <SettingMenuProvider>
            <div className={"flex flex-col gap-8 p-2 h-full"}>
                <ContentHeader header={"Settings"} sub={"Update your account settings"}/>
                <div className={"h-full flex flex-row gap-20 p-2"}>
                    <SettingsMenus/>
                    <SettingsPanel/>
                </div>
            </div>
        </SettingMenuProvider>
    );
}

function SettingsPanel() {
    const {selectedMenu} = useSettingMenuContext();
    return (
        <>
            <div className={"hidden xl:block w-full overflow-y-auto"}>
                {selectedMenu === "Profile" && <ProfileSettingPanel/>}
                {selectedMenu === "Password" && <PasswordSettingPanel/>}
                {selectedMenu === "Delete" && <DeleteAccountPanel/>}
            </div>

            <div className={"w-full flex flex-col gap-4 overflow-y-auto xl:hidden space-y-8"}>
                 <ProfileSettingPanel/>
                <PasswordSettingPanel/>
                <DeleteAccountPanel/>
            </div>
        </>
    );
}

function DeleteAccountPanel() {
    return (
        <div className={"w-3/4 space-y-8"}>
            <h1 className={"text-lg font-bold"}>Delete Account</h1>
            <div className={"flex flex-col space-y-4"}>
                <div className={"flex flex-col space-y-8 w-full"}>
                    <span className={"text-muted-foreground"}>Are you sure you want to delete your account?</span>
                    <span className={"text-muted-foreground"}>This action cannot be undone.</span>
                </div>
                <div className={"flex flex-col items-start md:flex-row md:space-x-20"}>
                    <button
                        className={"w-64 md:w-80 lg:w-32 h-8 lg:h-9 px-2 md:px4 text-xs md:text-sm bg-red-500 hover:bg-red-600 rounded-lg text-primary-foreground"}>Delete
                        Account
                    </button>
                </div>
            </div>
        </div>
    );
}


const changePassword = z.object({
    oldPassword: z.string().email({message: "Enter a valid email address"}),
    password: z.string().email({message: "Enter a valid email address"}),
    newPassword: z.string().email({message: "Enter a valid email address"}),
})

function PasswordSettingPanel() {
    const form = useForm<z.infer<typeof changePassword>>({

        resolver: zodResolver(changePassword),
        defaultValues: {
            password: "",
            newPassword: "",
        }
    })


    return (
        <div className={"w-3/4 space-y-8"}>
            <h1 className={"text-lg font-bold mb-2"}>Change Password</h1>
            <Form {...form}>
                <div className={"flex flex-col "}>
                    <form onSubmit={() => console.log("Hello")}
                          className={"flex flex-col space-y-4 xl:flex-row xl:space-x-4"}>
                        <div className={"flex flex-col space-y-8 w-full"}>
                            <FormField name={"password"} render={({field}) => (
                                <CustomInput {...field} label={"Old Password"} placeholder={"Your Name"}/>
                            )}/>
                            <FormField name={"password"} render={({field}) => (
                                <CustomInput {...field} label={"Password"} placeholder={"Your Name"}/>
                            )}/>
                            <FormField name={"confirmPassword"} render={({field}) => (
                                <CustomInput {...field} label={"Confirm Password"} placeholder={"Business Name"}/>

                            )}/>
                        </div>
                    </form>
                    <div className={"flex flex-col items-start md:flex-row md:space-x-20 mt-10"}>
                        <button type={"submit"}
                                className={"w-64 md:w-80 lg:w-32 h-8 lg:h-9 px-2 md:px4 text-xs md:text-sm bg-primary/80 hover:bg-primary rounded-lg text-primary-foreground"}>Update
                            Password
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

const updateProfileSchema = z.object({
    name: z.string().email({message: "Enter a valid email address"}),
    business: z.string().email({message: "Enter a valid email address"}),
    email: z.string().email({message: "Enter a valid email address"}),
    phone: z.string().email({message: "Enter a valid email address"}),
    location: z.string().email({message: "Enter a valid email address"}),
})

function ProfileSettingPanel() {

    const form = useForm<z.infer<typeof updateProfileSchema>>({

        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            email: "",
            phone: "",
        }
    })

    return (
        <div className={"space-y-8"}>
            <h1 className={"text-lg text-secondary font-bold"}>Profile Settings</h1>
            <Form {...form}>
                <div className={"flex flex-col "}>
                    <form onSubmit={() => console.log("Hello")}
                          className={"flex flex-col space-y-4 xl:flex-row xl:space-x-4"}>
                        <div className={"flex flex-col space-y-8 w-full"}>

                            <FormField name={"name"} render={({field}) => (
                                <CustomInput {...field} label={"Name"} placeholder={"Your Name"}/>

                            )}/>
                            <FormField name={"business"} render={({field}) => (
                                <CustomInput {...field} label={"Business"} placeholder={"Business Name"}/>

                            )}/>
                            <FormField name={"email"} render={({field}) => (
                                <CustomInput {...field} label={"Email"} placeholder={"Your Email"}/>

                            )}/>
                            <FormField name={"phone"} render={({field}) => (
                                <CustomInput {...field} label={"Phone"} placeholder={"Your Phone"}/>
                            )}/>
                            <FormField name={"location"} render={({field}) => (
                                <CustomInput {...field} label={"Location"} placeholder={"Your Location"}/>
                            )}/>
                        </div>
                        <div className={"flex flex-col w-full"}>
                            <span className={"text-xs text-muted-foreground mb-2"}>Your Business Permit</span>
                            <div className={""}>
                                <Image
                                    src={"/ephraim.jpeg"}
                                    alt={"Business Permit"}
                                    className={"object-contain w-full h-[500px]"}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        </div>
                    </form>

                    <div className={"flex flex-col items-end md:flex-row md:space-x-20 md:mt-10"}>
                        <div>
                            <button className={"text-primary hover:underline hover:underline-offset-4"}>Upload New
                                Business Permit
                            </button>
                        </div>
                        <button type={"submit"}
                                className={"w-64 md:w-80 lg:w-32 h-8 lg:h-9 px-2 md:px4 text-xs md:text-sm bg-primary/80 hover:bg-primary rounded-lg text-primary-foreground"}>Update
                            Profile
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}


function SettingsMenus() {
    const {setSelectedMenu} = useSettingMenuContext();
    return (
        <div className={"xl:flex flex-col gap-2 w-1/4 hidden"}>
            <SettingsMenu
                onClick={() => setSelectedMenu("Profile")}
                title={"Profile"}
                desc={"Access The General Settings"}
                icon={<UserPen className={"text-muted-foreground"}/>}/>
            <SettingsMenu
                onClick={() => setSelectedMenu("Password")}
                title={"Password"}
                desc={"Access and Change Password"}
                icon={<LockOpen className={"text-muted-foreground"}/>}/>
            <SettingsMenu
                onClick={() => setSelectedMenu("Delete")}
                title={"Delete Account"}
                desc={"Delete Your Account"}
                icon={<UserRoundX className={"text-muted-foreground"}/>}/>
        </div>
    );
}

function SettingsMenu({title, desc, icon, onClick}: {
    title: string,
    desc: string,
    icon: React.ReactNode,
    onClick?: () => void
}) {
    return (
        <div onClick={onClick}
             className={"flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary/20"}>
            <div className={"rounded-full bg-gray-100 p-2"}>
                {icon}
            </div>
            <div className={"flex flex-col"}>
                <span>{title}</span>
                <span className={"text-xs text-muted-foreground"}>{desc}</span>
            </div>
        </div>
    );
}