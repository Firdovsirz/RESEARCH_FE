import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import MyInternationalCoorperations from "../../components/myInternationalCoorperations/MyInternationalCoorperations";

export default function MyInternationalCoorperationsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="International coorperations" />
            <div className="space-y-6">
                <ComponentCard title="International coorperations">
                    <MyInternationalCoorperations />
                </ComponentCard>
            </div>
        </>
    );
}
