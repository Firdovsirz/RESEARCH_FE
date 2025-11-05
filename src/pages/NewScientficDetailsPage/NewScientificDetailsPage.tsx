import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import NewScientificDetails from "../../components/NewScientificDetails/NewScientificDetails";

export default function NewScientificDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="New scientific details" />
            <div className="space-y-6">
                <ComponentCard title="New scientific details">
                    <NewScientificDetails />
                </ComponentCard>
            </div>
        </>
    );
}
