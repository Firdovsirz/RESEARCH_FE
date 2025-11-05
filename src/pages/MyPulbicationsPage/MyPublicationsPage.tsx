import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import MyPublications from "../../components/myPublications/MyPublications";

export default function MyPublicationsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="My Publications" />
            <div className="space-y-6">
                <ComponentCard title="My Publications">
                    <MyPublications />
                </ComponentCard>
            </div>
        </>
    );
}
