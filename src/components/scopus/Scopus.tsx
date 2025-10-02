import { useEffect, useState } from 'react';
import Label from '../form/Label';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getScopusByFinKod } from '../../services/scopus/scopusService';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Scopus() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [scopusUrl, setScopusUrl] = useState("");
    const [scopusOpen, setScopusOpen] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);
    const finKod = useSelector((state: RootState) => state.auth.fin_kod);

    const toggleScientificOpen = () => {
        setScopusOpen(prev => !prev);
    };

    useEffect(() => {
        setLoading(true);
        getScopusByFinKod(finKod ? finKod : "", token ? token : "")
            .then((res) => {
                if (res === "NOT FOUND") {
                    setScopusUrl("");
                } else if (res === "ERROR"){
                    setScopusUrl("");
                } else {
                    setScopusUrl(res);
                }
            })
            .finally(() => {setLoading(false)})
    }, []);

    return (
        <>
            <div
                style={{
                    border: scopusOpen ? "1.5px solid #22c55e" : "1px solid #ccc",
                    padding: "10px",
                    marginTop: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 10,
                    transition: "border 0.3s"
                }}
                onClick={toggleScientificOpen}
            >
                <span className="text-sm text-gray-500 dark:text-gray-400">Scopus linki</span>
                <KeyboardArrowDownIcon
                    className="text-sm text-gray-500 dark:text-gray-400"
                    style={{ transform: scopusOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
                />
            </div>

            {scopusOpen && (
                <div style={{ marginTop: "10px" }}>
                    {scopusUrl.length !== 0 ? (
                        <>
                            <div className="w-full flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex-shrink-0 w-full md:w-1/5 mb-2 md:mb-0 pr-4">
                                    <Label className="font-semibold text-gray-700">Scopus linki</Label>
                                </div>
                                <div className="w-full md:w-4/5">
                                    <Input
                                        placeholder="Scopus linki"
                                        value={scopusUrl}
                                        onChange={(e) => setScopusUrl(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* <div className="flex justify-end items-center">
                                <Label>Yeni elmi dərəcə</Label>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center ml-[20px]"
                                    onClick={() => navigate("/specialty-details/new-gco")}
                                >
                                    <AddIcon />
                                </button>
                            </div> */}
                        </>
                    ) : (
                        <div className="flex justify-center items-center">
                            <p className="bg-yellow-100 text-yellow-800 p-2 rounded-[20px] w-[200px] text-center mr-[10px]">
                                Mövcud deyil
                            </p>
                            <button
                                className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center"
                                onClick={() => navigate("/new-scopus")}
                            >
                                <AddIcon />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
