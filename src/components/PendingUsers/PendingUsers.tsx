import { useEffect, useState } from "react"
import {
    Table,
    TableCell,
    TableBody,
    TableHeader,
    TableRow
} from "../ui/table"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPendingUsers, PendingUser } from "../../services/auth/authService";

export default function PendingUsers() {
    const [users, setUsers] = useState<PendingUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        setLoading(true);
        getPendingUsers(token ? token : "")
            .then((res) => {
                if (Array.isArray(res)) {
                    setUsers(res);
                } else {
                    setUsers([]);
                }
            })
            .finally(() => setLoading(false));
    }, [token]);

    const skeletonRows = Array.from({ length: 5 });

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader>
                        <TableRow>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Name, Surname, Father name
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Email
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Birth date
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Registration date
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Approve
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Reject
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {loading
                            ? skeletonRows.map((_, idx) => (
                                <TableRow key={idx} className="animate-pulse">
                                    <TableCell className="py-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    </TableCell>
                                </TableRow>
                            ))
                            : users.map((user) => (
                                <TableRow key={user.id} className="">
                                    <TableCell className="py-3">
                                        {user.name} {user.surname} {user.father_name}
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {user.birth_date
                                            ? new Date(user.birth_date).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div className="bg-red-500 cursor-pointer flex justify-center items-center w-8 h-8 rounded-[5px]">
                                            <DeleteIcon sx={{ fontSize: 20, color: "#fff" }} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div className="bg-green-500 cursor-pointer flex justify-center items-center w-8 h-8 rounded-[5px]">
                                            <DoneIcon sx={{ fontSize: 20, color: "#fff" }} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
