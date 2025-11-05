import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserCredentials from "../../components/userCredentials/UserCredentials";

export default function UserCredentialsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="Personal details" />
            <div className="space-y-6">
                <ComponentCard title="Personal details">
                    <UserCredentials />
                </ComponentCard>
            </div>
        </>
    );
}
