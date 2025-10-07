import PageMeta from "../../components/common/PageMeta";
import ResearcherDetail from "../../components/reasearcherDetail/ResearcherDetail";

export default function ResearcherDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU Tədqiqatçılar bazası"
                description="AzTU Tədqiqatçılar bazası AzTU olan tədqiqatçılar və onlar haqqında məlumatları özündə saxlayır."
            />
            <main className="space-y-6 bg-white min-h-screen">
                <ResearcherDetail />
            </main>
        </>
    );
}