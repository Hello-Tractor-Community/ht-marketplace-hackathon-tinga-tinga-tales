import FormsLayout from "@/app/(auth)/_components/formsLayout";
import VerifyEmailForm from "@/app/(auth)/_components/verifyEmailForm";
import {getCurrentSession} from "@/lib/server/sessions";
import {redirect} from "next/navigation";
import {getUserEmailVerificationRequestFromRequest} from "@/lib/server/email-verification";
import {globalGETRateLimit} from "@/lib/server/request";

export default async function VerifyEmail() {
    if (!await globalGETRateLimit()) {
        return "Too many requests";
    }
    const { user } = await getCurrentSession();
    if (user === null) {
        return redirect("/sign_in");
    }


    const verificationRequest = await getUserEmailVerificationRequestFromRequest();
    if (verificationRequest === null && user.isVerified) {
        return redirect("/");
    }

    return (
        <FormsLayout>
            <VerifyEmailForm/>
        </FormsLayout>
    );
}