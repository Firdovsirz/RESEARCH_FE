import MyUrls from "../../components/MyUrls/MyUrls";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function MyUrlsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="My Urls" />
            <div className="space-y-6">
                <ComponentCard title="My Urls">
                    <MyUrls />
                </ComponentCard>
            </div>
        </>
    );
}
