import PageMeta from "../../components/common/PageMeta";
import MyArticles from "../../components/myArticles/MyArticles";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function MyArticlesPage() {
    return (
        <>
            <PageMeta
                title="AzTU Researchers Dashboard"
                description="Azerbaijan Technical University researchers Dashboard"
            />
            <PageBreadcrumb pageTitle="My articles" />
            <div className="space-y-6">
                <ComponentCard title="My articles">
                    <MyArticles />
                </ComponentCard>
            </div>
        </>
    );
}
