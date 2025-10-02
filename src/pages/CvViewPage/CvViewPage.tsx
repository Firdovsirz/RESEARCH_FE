import CvView from "../../components/cvView/CvView";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function CvViewPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Cv" />
            <div className="space-y-6">
                <ComponentCard title="Cv">
                    <CvView />
                </ComponentCard>
            </div>
        </>
    );
}
