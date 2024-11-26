import LoginForm from "@/app/(auth)/_components/login";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import SignupForm from "@/app/(auth)/_components/signup";
import FormsLayout from "@/app/(auth)/_components/formsLayout";
import {getCurrentSession} from "@/lib/server/sessions";
import {redirect} from "next/navigation";
import Link from "next/link";


export default async function SignInPage() {
    const {session, user} = await getCurrentSession();
    if (session !== null) {
        if (!user.is_verified) {
            return redirect("/verify_email");
        }
        return redirect("/");
    }

    return (
        <FormsLayout>
            <div>
                <Tabs defaultValue="login">
                    <TabsList className={"w-full bg-transparent mb-6"}>
                        <TabsTrigger
                            className={"data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-[10px] data-[state=active]:text-primary ring-offset-transparent data-[state=active]:shadow-none text-4xl text-secondary/60 font-bold"}
                            value="login">Login</TabsTrigger>
                        <TabsTrigger
                            className={"data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-[10px] data-[state=active]:text-primary ring-offset-transparent data-[state=active]:shadow-none text-4xl text-secondary/60 font-bold"}
                            value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm/>
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignupForm/>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="flex flex-col space-y-4 justify-center mt-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                    </div>
                </div>
                <Link href={"/sign_in/google"}>
                    <div className="h-11 flex space-x-3 items-center justify-center border border-secondary">
                        <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                            <path
                                fill="currentColor"
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            />
                        </svg>
                        continue with Google
                    </div>
                </Link>
            </div>
        </FormsLayout>
    );
}