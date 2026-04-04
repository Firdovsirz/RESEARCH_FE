import Swal from "sweetalert2";
import { useState } from 'react';
import Label from '../form/Label';
// import Select from '../form/Select';
import Button from '../ui/button/Button';
import { useSelector } from 'react-redux';
import {
    // useLocation,
    useNavigate } from 'react-router';
import { RootState } from '../../redux/store';
import { addScientificName } from "../../services/scientificDetails/scientificDetailsService";
import Input from "../form/input/InputField";

export default function NewScopus() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [scopusUrl, setScopusUrl] = useState("");
    const [selectedName, setSelectedName] = useState("");
    // const [seletecdDegree, setSelectedDegree] = useState("");
    const [selectedNameCode, setSelectedNameCode] = useState("");
    const [selectedDegreeCode, setSelectedDegreeCode] = useState("");
    // const [hoursPerWeek, setHoursPerWeek] = useState<number>();
    const finKod = useSelector((state: RootState) => state.auth.fin_kod);
    
    // create subject logic

    const createTopic = async () => {
        try {
            setLoading(true);
            const scientificNamePayload = {
                fin_kod: finKod ? finKod : "",
                scientific_name: selectedName ? selectedName : "",
                scientific_code: +selectedNameCode ? +selectedNameCode : 0,
            };
            const result = await addScientificName(scientificNamePayload);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurla əlavə olundu",
                    text: "Scopus linki uğurla əlavə edildi!"
                }).then(() => {
                    setLoading(false);
                    navigate("/user-credentials");
                });
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Fin kod tapılmadı!"
                }).then(() => {
                    setLoading(false);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Gözlənilməz xəta baş verdi!"
                }).then(() => {
                    setLoading(false);
                });
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "Xəta",
                text: "Gözlənilməz xəta baş verdi!"
            }).then(() => {
                setLoading(false);
            });
        }
    }
    return (
        <>
            <div className="flex justify-between items-center w-full">
                <div style={{
                    width: "calc((100% / 2) - 20px)"
                }}>
                    <Label>
                        Scopus linki
                    </Label>
                    <Input placeholder="Scopus linki" value={scopusUrl} onChange={(e) => { setScopusUrl(e.target.value) }} />
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <Button disabled={loading} onClick={createTopic}>
                    {loading ? "Əlavə edilir" : "Əlavə et"}
                </Button>
            </div>
        </>
    )
}