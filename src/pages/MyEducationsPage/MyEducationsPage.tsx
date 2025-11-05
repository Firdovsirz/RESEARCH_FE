import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import MyEducations from "../../components/myEducations/MyEducations";

export default function MyEducationsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="My educations" />
            <div className="space-y-6">
                <ComponentCard title="My educations">
                    <MyEducations />
                </ComponentCard>
            </div>
        </>
    );
}
