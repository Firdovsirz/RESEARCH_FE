import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { UserProfile, getUserProfile } from "../../services/user/userService";

export default function UserInfoCard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

  useEffect(() => {
    setLoading(true);
    getUserProfile(fin_kod ? fin_kod : "", token ? token : "")
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
  }, [fin_kod, token]);
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Şəxsi məlumatlar
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Name
              </p>
              {loading ? (
                <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {auth.name}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Surname
              </p>
              {loading ? (
                <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {auth.surname}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Father name
              </p>
              {loading ? (
                <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {auth.father_name}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email
              </p>
              {loading ? (
                <div className="h-5 w-36 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {auth.email}
                </p>
              )}
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Scientific name
              </p>
              {loading ? (
                <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.scientific_name}
                </p>
              )}
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Scientific degree
              </p>
              {loading ? (
                <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.scientific_degree_name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
