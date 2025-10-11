import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ResearcherLayout from "../../layout/ResearcherLayout";
import ResearcherDetailsExperience from "../../components/ResearcherDetailsExperience/ResearcherDetailsEcxperience";

export default function ResearcherDetailsExperiencePage() {
    const location = useLocation();
    const { user } = location.state || {};
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <ResearcherLayout user={user} heading="Academic Experience">
                <ResearcherDetailsExperience user={user} />
            </ResearcherLayout>
        </>
    );
}