import PageMeta from "../../components/common/PageMeta";
import NewScopus from "../../components/NewScopus/NewScopus";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function NewScopusPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="Yeni scopus linki" />
            <div className="space-y-6">
                <ComponentCard title="Yeni scopus linki">
                    <NewScopus />
                </ComponentCard>
            </div>
        </>
    );
}
