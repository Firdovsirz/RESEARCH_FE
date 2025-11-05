import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ResearchAreas from "../../components/researchAreas/ResearchAreas";

export default function ResearchAreasPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="Research areas" />
            <div className="space-y-6">
                <ComponentCard title="Research areas">
                    <ResearchAreas />
                </ComponentCard>
            </div>
        </>
    );
}
