import MyWorks from "../../components/myWorks/MyWorks";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function MyWorksPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="İş məlumatlarım" />
            <div className="space-y-6">
                <ComponentCard title="İş məlumatlarım">
                    <MyWorks />
                </ComponentCard>
            </div>
        </>
    );
}
