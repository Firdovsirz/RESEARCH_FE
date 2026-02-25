import Swal from "sweetalert2";
import { useState } from 'react';
import Label from '../form/Label';
import Button from '../ui/button/Button';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router';
import Input from "../form/input/InputField";
// import { RootState } from '../../redux/store';

export default function NewScientificDetails() {
    // const location = useLocation();
    const [duty, setDuty] = useState("");
    const [loading, setLoading] = useState(false);
    const [workPlace, setWorkPlace] = useState("");
    // const token = useSelector((state: RootState) => state.auth.token);
    // const finKod = useSelector((state: RootState) => state.auth.fin_kod);

    // create subject logic

    const createTopic = async () => {
        try {
            setLoading(true);
            // const scientificNamePayload = {
            //     fin_kod: finKod ? finKod : ""
            // };
            let result = "";
            // const result = await addScientificName(scientificNamePayload, token ? token : "");

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
                        İş yeri
                    </Label>
                    <Input
                        placeholder="İş yeri"
                        value={workPlace}
                        onChange={(e) => { setWorkPlace(e.target.value) }}
                    />
                </div>
                <div style={{
                    width: "calc((100% / 2) - 20px)"
                }}>
                    <Label>
                        Vəzifə
                    </Label>
                    <Input
                        placeholder="Vəzifə"
                        value={duty}
                        onChange={(e) => setDuty(e.target.value)}
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