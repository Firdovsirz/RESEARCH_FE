import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ResearcherLayout from "../../layout/ResearcherLayout";
import ResearcherDetailsArea from "../../components/ResearcherDetailsArea/ResearcherDetailsArea";

export default function ResearcherDetailsAreasPage() {
    const location = useLocation();
    const { user } = location.state || {};
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <ResearcherLayout user={user} heading="Research Areas">
                <ResearcherDetailsArea user={user} />
            </ResearcherLayout>
        </>
    );
}