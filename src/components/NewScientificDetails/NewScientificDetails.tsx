import Swal from "sweetalert2";
import { useState } from 'react';
import Label from '../form/Label';
import Select from '../form/Select';
import Button from '../ui/button/Button';
import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router';
import { RootState } from '../../redux/store';
import { addScientificName } from "../../services/scientificDetails/scientificDetailsService";

export default function NewScientificDetails() {
    // const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const [_, setSelectedDegree] = useState("");
    const [selectedNameCode, setSelectedNameCode] = useState("");
    const [selectedDegreeCode, setSelectedDegreeCode] = useState("");
    const finKod = useSelector((state: RootState) => state.auth.fin_kod);

    const scientificDegreeOptions = [
        {
            value: "1",
            label: "Bakalavr"
        }, {
            value: "2",
            label: "Magistr"
        }, {
            value: "3",
            label: "Fəlsəfə doktoru"
        }, {
            value: "4",
            label: "Doktorantura"
        }
    ];
    const handleDegreeChange = (value: string) => {
        setSelectedDegreeCode(value);
        const selected = scientificDegreeOptions.find(opt => opt.value === value);
        if (selected) {
            setSelectedDegree(selected.label);
        }
    }
    const handleNameChange = (value: string) => {
        setSelectedNameCode(value);
        const selected = scientificNameOptions.find(opt => opt.value === value);
        if (selected) {
            setSelectedName(selected.label);
        }
    };

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
                    text: "Yeni elmi ad uğurla əlavə edildi!"
                }).then(() => {
                    setLoading(false);
                });
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Fənn tapılmadı!"
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
                       Elmi ad
                    </Label>
                    <Select
                        placeholder='Mövzu tipi'
                        options={scientificNameOptions}
                        onChange={handleNameChange}
                    />
                </div>
                <div style={{
                    width: "calc((100% / 2) - 20px)"
                }}>
                    <Label>
                        Elmi dərəcə
                    </Label>
                    <Select
                        placeholder='Mövzu tipi'
                        options={scientificDegreeOptions}
                        onChange={handleDegreeChange}
                    />
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