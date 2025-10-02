import { Link } from 'react-router';
import Stack from '@mui/material/Stack';
import Button from '../ui/button/Button';
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import ProfileImage from "../../../public/profile-image.webp";
import { getAllUsers, UserProfile } from "../../services/user/userService";
import Skeleton from '@mui/material/Skeleton';

export default function Researchers() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [loading, setLoading] = useState(false)
    const [userLength, setUserLength] = useState<number>();

    useEffect(() => {
        setLoading(true);
        getAllUsers(start, end)
            .then((res) => {
                if (typeof res === "object") {
                    setUsers(res.users);
                    setUserLength(res.total);
                } else {
                    setUsers([]);
                    setUserLength(0);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    console.log(users);

    return (
        <>
            <div className='flex justify-between items-center'>
                {loading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} style={{ width: "calc((100% / 3) - 20px)", height: 300 }} className='flex flex-col justify-between items-center border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <div className='flex flex-col justify-center items-center h-[200px]'>
                                <Skeleton variant="circular" width={100} height={100} className='mb-[10px] rounded-[50%]' />
                                <Skeleton variant="text" width={120} height={25} />
                                <Skeleton variant="text" width={100} height={20} />
                                <Skeleton variant="text" width={140} height={20} />
                                <Skeleton variant="rectangular" width={160} height={40} className='mt-2' />
                            </div>
                            <Skeleton variant="rectangular" width="100%" height={50} />
                        </div>
                    ))
                    : users.map((user, index) => {
                        return (
                            <div key={index} style={{ width: "calc((100% / 3) - 20px)", height: 300 }} className='flex flex-col justify-between items-center border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300'>
                                <div className='flex flex-col justify-center items-center h-[200px]'>
                                    <img src={ProfileImage} alt="profile" className='w-[100px] h-[100px] rounded-[50%] mb-[10px]' />
                                    {user.name} {user.surname} {user.father_name}
                                    <p className='text-[rgba(0,0,0,0.4)]'>{user.scientific_degree_name}</p>
                                    <p className='text-[rgba(0,0,0,0.4)]'>{user.scientific_name}</p>
                                    <h2>{user.bio}</h2>
                                </div>
                                <div className='px-[10px] py-[10px] border-t border-gray-300 w-full flex justify-center items-center hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-300 rounded-bl-[10px] rounded-br-[10px]'>
                                    <Link to={"/profile"}>
                                        Profile
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center items-center'>
                <Stack spacing={2}>
                    <Pagination
                        count={userLength ? (userLength <= 5 ? 1 : Math.ceil(userLength / 5)) : 1}
                        page={Math.floor(start / (end - start)) + 1}
                        onChange={(_event, page) => {
                            const pageSize = end - start;
                            const newStart = (page - 1) * pageSize;
                            const newEnd = newStart + pageSize;
                            setStart(newStart);
                            setEnd(newEnd);
                            setLoading(true);
                            getAllUsers(newStart, newEnd)
                                .then((res) => {
                                    if (typeof res === "string") {
                                        if (res === "NO CONTENT") {
                                            setUsers([]);
                                        } else {
                                            setUsers([]);
                                        }
                                    } else if (Array.isArray(res.users)) {
                                        setUsers(res.users);
                                        setUserLength(res.total);
                                    }
                                })
                                .finally(() => {
                                    setLoading(false);
                                });
                        }}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'text.primary',
                                bgcolor: 'background.paper',
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            },
                            '& .MuiPaginationItem-root:hover': {
                                bgcolor: 'action.hover',
                            },
                        }}
                    />
                </Stack>
            </div>
        </>
    )
}
