import PageMeta from "../../components/common/PageMeta";
import Researchers from "../../components/researchers/Researchers";

export default function ResearchersPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <main className="space-y-6 bg-white min-h-screen">
                <Researchers />
            </main>
        </>
    );
}