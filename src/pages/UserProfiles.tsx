import PageMeta from "../components/common/PageMeta";
import UserBio from "../components/UserProfile/UserBio";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="User Profiles | AzTU Research Portal"
        description="This is the User Profiles page for AzTU Research Portal"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserBio />
          <UserInfoCard />
        </div>
      </div>
    </>
  );
}
