import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import NewWorkDetails from "../../components/NewWorkDetails/NewWorkDetails";

export default function NewWorkDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Yeni elmi məlumatlar" />
            <div className="space-y-6">
                <ComponentCard title="Yeni elmi məlumatlar">
                    <NewWorkDetails />
                </ComponentCard>
            </div>
        </>
    );
}
