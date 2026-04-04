import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Sign Up | AzTU Research Portal"
        description="This is the Sign Up page for AzTU Research Portal"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
