import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Label from "../components/form/Label";
import Select from "../components/form/Select";
import React, { useEffect, useState } from "react";
import Button from "../components/ui/button/Button";
import TextArea from "../components/form/input/TextArea";
import Input from "../components/form/input/InputField";
import { UserPayload, UserProfile, createUserProfile, getUserProfile } from "../services/user/userService";

export default function UserCredentials() {
    const [bio, setBio] = useState("");
    const [user, setUser] = useState<UserProfile | null>();
    const [scientificName, setScientificName] = useState("");
    const [scientificDegree, setScientificDegree] = useState("");
    const [creationLoading, setCreationLoading] = useState(false);
    const [scopusUrl, setScopusUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const name = useSelector((state: RootState) => state.auth.name);
    const token = useSelector((state: RootState) => state.auth.token);
    const surname = useSelector((state: RootState) => state.auth.surname);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);
    const fatherName = useSelector((state: RootState) => state.auth.father_name);

    const scientificNameOptions = [
        { value: "Fəlsəfə doktoru (PhD)", label: "Fəlsəfə doktoru (PhD)" },
        { value: "Magistr (MSc)", label: "Magistr (MSc)" },
        { value: "Doktor (Dr.)", label: "Doktor (Dr.)" },
        { value: "Professor (Prof.)", label: "Professor (Prof.)" },
        { value: "Dosent", label: "Dosent" },
        { value: "Assist. Prof.", label: "Assist. Prof." },
        { value: "Müəllim", label: "Müəllim" },
        { value: "Tədqiqatçı", label: "Tədqiqatçı" }
    ];

    // master
    // PhD candidate
    // PhD
    // associate professor
    // professor

    // elmi derece + ad

    const handleScientificNameChange = (value: string) => {
        setScientificName(value);
    };

    const scientificDegreeOptions = [
        { value: "Bakalavr", label: "Bakalavr" },
        { value: "Magistr", label: "Magistr" },
        { value: "Doktorant", label: "Doktorant" },
        { value: "Dosent", label: "Dosent" },
        { value: "Professor", label: "Professor" }
    ]

    const handleScientificDegreeChange = (value: string) => {
        setScientificDegree(value);
    };

    useEffect(() => {
        getUserProfile(fin_kod ? fin_kod : "", token ? token : "")
            .then((res) => {
                if (typeof res === "object") {
                    setUser(res);
                    setScientificName(res.scientific_name || "");
                    setScientificDegree(res.scientific_degree_name || "");
                    setBio(res.bio || "");
                } else {
                    setUser(null);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    console.log(user);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setCreationLoading(true);
            const userPayload: UserPayload = {
                fin_kod: fin_kod ? fin_kod : "",
                scientific_degree_name: scientificDegree,
                scientific_name: scientificName,
                bio: bio,
                scopus_url: scopusUrl
            };

            const result = await createUserProfile(userPayload, token ? token : "");

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurlu",
                    text: "Məlumatlarınız uğurla saxlanıldı.",
                }).then(() => {
                    setCreationLoading(false);
                });
            } else if (result === "CONFLICT") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Sizin məlumatlarınız artıq mövcuddur.",
                }).then(() => {
                    setCreationLoading(false);
                });
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "İstifadəçi tapılmadı.",
                }).then(() => {
                    setCreationLoading(false);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Server xətası.",
                }).then(() => {
                    setCreationLoading(false);
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Xəta",
                text: "Server xətası.",
            });
        }
    }

    return (
        <form onSubmit={handleCreate}>
            {loading ? (
                <>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 mb-[20px]">
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-[20px]">
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 mb-[20px]">
                        <div className="h-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 mb-[20px]">
                        {/* <!-- Ad Soyad Ata adı --> */}
                        <div className="sm:col-span-1">
                            <Label>
                                Ad<span className="text-error-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={name ? name : ""}
                                placeholder="Ad"
                                readOnly
                            />
                        </div>
                        {/* <!-- Last Name --> */}
                        <div className="sm:col-span-1">
                            <Label>
                                Soyad<span className="text-error-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="lname"
                                name="lname"
                                value={surname ? surname : ""}
                                placeholder="Soyad"
                                readOnly
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <Label>
                                Ata adı<span className="text-error-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="fname"
                                name="fname"
                                value={fatherName ? fatherName : ""}
                                placeholder="Ata adı"
                                readOnly
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <Label>
                                Fin kod<span className="text-error-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="fname"
                                name="fname"
                                value={fin_kod ? fin_kod : ""}
                                placeholder="Ata adı"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-[20px]">
                        {/* <!-- Ad Soyad Ata adı --> */}
                        <div className="sm:col-span-1">
                            <Label>
                                Elmi ad<span className="text-error-500">*</span>
                            </Label>
                            {(user && user.scientific_name) ? (
                                <Input
                                    type="text"
                                    id="scientific_name"
                                    name="scientific_name"
                                    value={user.scientific_name}
                                    placeholder="Elmi ad"
                                    readOnly
                                />
                            ) : (
                                <Select
                                    placeholder="Elmi ad seçin"
                                    options={scientificNameOptions}
                                    onChange={handleScientificNameChange}
                                />
                            )}
                        </div>
                        <div className="sm:col-span-1">
                            <Label>
                                Elmi dərəcə<span className="text-error-500">*</span>
                            </Label>
                            {(user && user.scientific_degree_name) ? (
                                <Input
                                    type="text"
                                    id="scientific_degree_name"
                                    name="scientific_degree_name"
                                    value={user.scientific_degree_name}
                                    placeholder="Elmi dərəcə"
                                    readOnly
                                />
                            ) : (
                                <Select
                                    placeholder="Elmi dərəcə seçin"
                                    options={scientificDegreeOptions}
                                    onChange={handleScientificDegreeChange}
                                />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 mb-[20px]">
                        <div className="sm:col-span-1">
                            <Label>
                                Scopus linki<span className="text-error-500">*</span>
                            </Label>
                            <Input 
                            placeholder="Scopus"
                            value={user?.scopus}
                            onChange={(e) => setScopusUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 mb-[20px]">
                        <div className="sm:col-span-1">
                            <Label>
                                Bio<span className="text-error-500">*</span>
                            </Label>
                            <TextArea
                                value={bio ? bio : ""}
                                placeholder="Bio"
                                onChange={(value) => { setBio(value) }}
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="flex justify-end items-end">
                <Button>
                    Yadda saxla
                </Button>
            </div>
        </form>
    )
}