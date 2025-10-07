import MyUrls from "../../components/MyUrls/MyUrls";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function MyUrlsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Linklərim" />
            <div className="space-y-6">
                <ComponentCard title="Linklərim">
                    <MyUrls />
                </ComponentCard>
            </div>
        </>
    );
}
