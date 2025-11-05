import PageMeta from "../../components/common/PageMeta";
import ResearcherDetail from "../../components/reasearcherDetail/ResearcherDetail";

export default function ResearcherDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <main className="space-y-6 bg-white min-h-screen">
                <ResearcherDetail />
            </main>
        </>
    );
}