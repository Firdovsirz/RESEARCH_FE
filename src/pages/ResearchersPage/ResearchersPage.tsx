import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Researchers from "../../components/researchers/Researchers";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function ResearchersPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Tədqiqatçılar" />
            <div className="space-y-6">
                <ComponentCard title="Tədqiqatçılar">
                    <Researchers />
                </ComponentCard>
            </div>
        </>
    );
}
