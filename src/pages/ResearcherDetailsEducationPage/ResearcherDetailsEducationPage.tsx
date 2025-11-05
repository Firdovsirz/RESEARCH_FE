import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ResearcherLayout from "../../layout/ResearcherLayout";
import ResearcherDetailsEducation from "../../components/ResearcherDetailsEducation/ResearcherDetailsEducation";

export default function ResearcherDetailsEducationPage() {
    const location = useLocation();
    const { user } = location.state || {};

    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <ResearcherLayout user={user} heading="Education">
                <ResearcherDetailsEducation user={user} />
            </ResearcherLayout>
        </>
    );
}