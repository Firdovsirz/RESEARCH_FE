import { useState } from 'react';
import Label from '../form/Label';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function ScientificDetails() {
    const [scientificDegree, setScientificDegree] = useState("");
    const [scientificOpen, setScientificOpen] = useState(false);
    const navigate = useNavigate();

    const toggleScientificOpen = () => {
        setScientificOpen(prev => !prev);
    };

    return (
        <>
            <div
                style={{
                    border: scientificOpen ? "1.5px solid #22c55e" : "1px solid #ccc",
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
                <span className="text-sm text-gray-500 dark:text-gray-400">Elmi məlumatlar</span>
                <KeyboardArrowDownIcon
                    className="text-sm text-gray-500 dark:text-gray-400"
                    style={{ transform: scientificOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
                />
            </div>

            {scientificOpen && (
                <div style={{ marginTop: "10px" }}>
                    {scientificDegree.length !== 0 ? (
                        <>
                            <div className="w-full flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex-shrink-0 w-full md:w-1/5 mb-2 md:mb-0 pr-4">
                                    <Label className="font-semibold text-gray-700">Elmi dərəcə</Label>
                                </div>
                                <div className="w-full md:w-4/5">
                                    <Input
                                        placeholder="Elmi Dərəcə"
                                        value={scientificDegree}
                                        onChange={(e) => setScientificDegree(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end items-center">
                                <Label>Yeni elmi dərəcə</Label>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center ml-[20px]"
                                    onClick={() => navigate("/specialty-details/new-gco")}
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center">
                            <p className="bg-yellow-100 text-yellow-800 p-2 rounded-[20px] w-[200px] text-center mr-[10px]">
                                Mövcud deyil
                            </p>
                            <button
                                className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center"
                                onClick={() => navigate("/new-scientific-details")}
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
