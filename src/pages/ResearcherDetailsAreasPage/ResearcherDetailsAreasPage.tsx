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
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <ResearcherLayout user={user} heading="Research Areas">
                <ResearcherDetailsArea user={user} />
            </ResearcherLayout>
        </>
    );
}