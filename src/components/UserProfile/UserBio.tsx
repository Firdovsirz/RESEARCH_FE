import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { UserProfile, getUserProfile } from "../../services/user/userService";

export default function UserBio() {

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
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Bio
          </h4>
          {loading ? (
            <div className="h-4 w-full max-w-xs rounded bg-gray-300 animate-pulse dark:bg-gray-700"></div>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {user?.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
