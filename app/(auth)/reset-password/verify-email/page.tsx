import FormsLayout from "@/app/(auth)/_components/formsLayout";
import {globalGETRateLimit} from "@/lib/server/request";
import VerifyResetPasswordEmailForm from "@/app/(auth)/_components/verifyResetPasswordEmail";
import {validatePasswordResetSessionRequest} from "@/lib/server/password-reset";
import {redirect} from "next/navigation";

export default async function VerifyEmail() {
    if (!await globalGETRateLimit()) {
        return "Too many requests";
    }

    const { session } = await validatePasswordResetSessionRequest();
    if (session === null) {
        return redirect("/sign_in");
    }

    return (
        <FormsLayout>
            <VerifyResetPasswordEmailForm/>
        </FormsLayout>
    );
}