import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../redux/store";
import ScopusLogo from "../../../public/scopus-logo.webp";
import ScholarLogo from "../../../public/google-scholar-logo.webp";
import WebOfScienceLogo from "../../../public/web-of-science-logo.webp";
import { getUserProfile, UserProfile } from "../../services/user/userService";

export default function UserMetaCard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

  useEffect(() => {
    setLoading(true);
    getUserProfile(fin_kod ? fin_kod : "")
      .then((res) => {
        if (typeof res === "object") {
          setUser(res);
        } else {
          setUser(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fin_kod]);
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-18 overflow-hidden border border-gray-200 rounded-[50%] dark:border-gray-800">
              {loading ? (
                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-full h-full rounded-[50%]"></div>
              ) : (
                user?.image ? (
                  <img src={user.image} alt="user" className="w-20 h-18 rounded-full" />
                ) : (
                  <img src="/profile-image.webp" alt="user" className="w-20 h-18 rounded-full" />
                )
              )}
            </div>
            <div className="order-3 xl:order-2 w-full">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto xl:mx-0"></div>
                  <div className="flex items-center justify-center gap-3 xl:justify-start">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                    {user?.name} {user?.surname} {user?.father_name}
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.scientific_degree_name}
                    </p>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.scientific_name}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.2)",
              padding: 5,
              borderRadius: "50%",
              cursor: "pointer",
              minWidth: 50,
              minHeight: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
            ) : (
              <a href={user?.scopus_url} target="_blank" rel="noreferrer">
                <img src={ScopusLogo} alt="scopus" className="rounded-full w-full h-full" />
              </a>
            )}
          </div>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.2)",
              padding: 5,
              borderRadius: "50%",
              cursor: "pointer",
              minWidth: 50,
              minHeight: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
            ) : (
              <a href={user?.webofscience_url} target="_blank" rel="noreferrer">
                <img src={WebOfScienceLogo} alt="scopus" className="rounded-full w-9 h-9" />
              </a>
            )}
          </div>
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.2)",
              padding: 5,
              borderRadius: "50%",
              cursor: "pointer",
              minWidth: 50,
              minHeight: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
            ) : (
              <a href={user?.google_scholar_url} target="_blank" rel="noreferrer">
                <img src={ScholarLogo} alt="scopus" className="rounded-full w-9 h-9" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
