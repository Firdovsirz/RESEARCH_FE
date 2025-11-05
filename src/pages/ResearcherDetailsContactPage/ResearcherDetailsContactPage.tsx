import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ResearcherLayout from "../../layout/ResearcherLayout";
import ResearcherDetailsContact from "../../components/ResearcherDetailsContact/ResearcherDetailsContact";

export default function ResearcherDetailsContactPage() {
    const location = useLocation();
    const { user } = location.state || {};
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <ResearcherLayout user={user} heading="Contact">
                <ResearcherDetailsContact user={user} />
            </ResearcherLayout>
        </>
    );
}