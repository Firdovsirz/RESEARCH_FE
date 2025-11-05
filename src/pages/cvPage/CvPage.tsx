import Cv from "../../components/cv/Cv";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function CvPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="Resume" />
            <div className="space-y-6">
                <ComponentCard title="Resume">
                    <Cv />
                </ComponentCard>
            </div>
        </>
    );
}
