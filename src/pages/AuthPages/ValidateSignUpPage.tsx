import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
// import SignInForm from "../../components/auth/SignInForm";
import ValidateSignUp from "../../components/auth/ValidateSignUp";

export default function ValidateSignUpPage() {
  return (
    <>
      <PageMeta
        title="Validate Sign Up | AzTU Research Portal"
        description="This is the Validate Sign Up page for AzTU Research Portal"
      />
      <AuthLayout>
        <ValidateSignUp />
      </AuthLayout>
    </>
  );
}
