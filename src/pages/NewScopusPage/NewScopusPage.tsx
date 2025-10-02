import PageMeta from "../../components/common/PageMeta";
import NewScopus from "../../components/NewScopus/NewScopus";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function NewScopusPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
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
