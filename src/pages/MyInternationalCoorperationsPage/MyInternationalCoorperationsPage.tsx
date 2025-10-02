import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import MyInternationalCoorperations from "../../components/myInternationalCoorperations/MyInternationalCoorperations";

export default function MyInternationalCoorperationsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Beynəlxalq əlaqələrim" />
            <div className="space-y-6">
                <ComponentCard title="Beynəlxalq əlaqələrim">
                    <MyInternationalCoorperations />
                </ComponentCard>
            </div>
        </>
    );
}
