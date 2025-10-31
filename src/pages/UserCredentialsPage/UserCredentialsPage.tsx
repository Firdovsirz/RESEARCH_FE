import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserCredentials from "../../components/userCredentials/UserCredentials";

export default function UserCredentialsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Profil məlumatları" />
            <div className="space-y-6">
                <ComponentCard title="Profil məlumatları">
                    <UserCredentials />
                </ComponentCard>
            </div>
        </>
    );
}
