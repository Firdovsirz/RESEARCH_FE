import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PendingUsers from "../../components/PendingUsers/PendingUsers";

export default function PendingUsersPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="Pending Users" />
            <div className="space-y-6">
                <ComponentCard title="Pending Users">
                    <PendingUsers />
                </ComponentCard>
            </div>
        </>
    );
}
