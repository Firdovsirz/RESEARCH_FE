import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import LanguageDetails from "../../components/languageDetails/LanguageDetails";

export default function LanguageDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <PageBreadcrumb pageTitle="Dil məlumatlarım" />
            <div className="space-y-6">
                <ComponentCard title="Dil məlumatlarım">
                    <LanguageDetails />
                </ComponentCard>
            </div>
        </>
    );
}
