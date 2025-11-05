import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ResearcherLayout from "../../layout/ResearcherLayout";
import ResearcherDetailsExperience from "../../components/ResearcherDetailsExperience/ResearcherDetailsExperience";

export default function ResearcherDetailsExperiencePage() {
    const location = useLocation();
    const { user } = location.state || {};
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <ResearcherLayout user={user} heading="Academic Experience">
                <ResearcherDetailsExperience user={user} />
            </ResearcherLayout>
        </>
    );
}