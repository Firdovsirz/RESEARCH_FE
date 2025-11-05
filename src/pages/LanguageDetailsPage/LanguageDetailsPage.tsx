import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import LanguageDetails from "../../components/languageDetails/LanguageDetails";

export default function LanguageDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="Language details" />
            <div className="space-y-6">
                <ComponentCard title="Language details">
                    <LanguageDetails />
                </ComponentCard>
            </div>
        </>
    );
}
