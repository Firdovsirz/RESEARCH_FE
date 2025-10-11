import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ResearchAreas from "../../components/researchAreas/ResearchAreas";

export default function ResearchAreasPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="İxtisas sahələri" />
            <div className="space-y-6">
                <ComponentCard title="İxtisas sahələri">
                    <ResearchAreas />
                </ComponentCard>
            </div>
        </>
    );
}
