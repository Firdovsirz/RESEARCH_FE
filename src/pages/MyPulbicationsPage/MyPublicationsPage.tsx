import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import MyPublications from "../../components/myPublications/MyPublications";

export default function MyPublicationsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Nəşrlərim" />
            <div className="space-y-6">
                <ComponentCard title="Nəşrlərim">
                    <MyPublications />
                </ComponentCard>
            </div>
        </>
    );
}
