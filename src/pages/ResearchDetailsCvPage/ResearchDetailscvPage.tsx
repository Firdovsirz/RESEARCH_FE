import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import ResearcherLayout from "../../layout/ResearcherLayout";
import ResearchDetailsCv from "../../components/ResearcherDetailsCv/ResearchDetailsCv";

export default function ResearchDetailsCvPage() {
    const location = useLocation();
    const { user } = location.state || {};
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <ResearcherLayout user={user} heading="Cv">
                <ResearchDetailsCv user={user} />
            </ResearcherLayout>
        </>
    );
}