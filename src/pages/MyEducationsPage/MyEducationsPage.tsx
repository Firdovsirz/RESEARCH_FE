import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import MyEducations from "../../components/myEducations/MyEducations";

export default function MyEducationsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Təhsil məlumatlarım" />
            <div className="space-y-6">
                <ComponentCard title="Təhsil məlumatlarım">
                    <MyEducations />
                </ComponentCard>
            </div>
        </>
    );
}
