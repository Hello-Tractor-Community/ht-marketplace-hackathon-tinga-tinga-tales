// Purpose: Page for resetting password after receiving a password reset code
import FormsLayout from "@/app/(auth)/_components/formsLayout";
import ChangePasswordForm from "@/app/(auth)/_components/changePasswordForm";
import {validatePasswordResetSessionRequest} from "@/lib/server/password-reset";
import {redirect} from "next/navigation";

export default async function VerificationLink() {
    const { session } = await validatePasswordResetSessionRequest();
    if (session === null) {
        return redirect("/sign_in");
    }

    return (
        <FormsLayout>
            <ChangePasswordForm/>
        </FormsLayout>
    )
}