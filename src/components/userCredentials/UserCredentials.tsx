import Swal from "sweetalert2";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import Input from "../form/input/InputField";
import { RootState } from "../../redux/store";
import TextArea from "../form/input/TextArea";
import React, { useEffect, useState, useRef } from "react";
import { UserPayload, UserProfile, createUserProfile, getUserProfile, updateUserProfile, UpdatePayload } from "../../services/user/userService";

export default function UserCredentials() {
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserProfile | null>();
    const [scientificName, setScientificName] = useState("");
    const [imageBase64, setImageBase64] = useState<string>("");
    const [scientificDegree, setScientificDegree] = useState("");
    const [creationLoading, setCreationLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const name = useSelector((state: RootState) => state.auth.name);
    const surname = useSelector((state: RootState) => state.auth.surname);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);
    const fatherName = useSelector((state: RootState) => state.auth.father_name);

    const [nameState, setNameState] = useState(name || "");
    const [surnameState, setSurnameState] = useState(surname || "");
    const [fatherNameState, setFatherNameState] = useState(fatherName || "");
    const [finKodState, setFinKodState] = useState(fin_kod || "");

    const scientificNameOptions = [
        { value: "Doctor of Philosophy (PhD)", label: "Doctor of Philosophy (PhD)" },
        { value: "Master (MSc)", label: "Master (MSc)" },
        { value: "Doctor (Dr.)", label: "Doctor (Dr.)" },
        { value: "Professor (Prof.)", label: "Professor (Prof.)" },
        { value: "Associate Professor", label: "Associate Professor" },
        { value: "Teacher", label: "Teacher" },
        { value: "Researcher", label: "Researcher" }
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
        { value: "Bachelor", label: "Bachelor" },
        { value: "Master", label: "Master" },
        { value: "Doctoral student", label: "Doctoral student" },
        { value: "Associate Professor", label: "Associate Professor" },
        { value: "Professor", label: "Professor" }
    ]

    const handleScientificDegreeChange = (value: string) => {
        setScientificDegree(value);
    };

    useEffect(() => {
        getUserProfile(fin_kod ? fin_kod : "")
            .then((res) => {
                if (typeof res === "object") {
                    setUser(res);
                    setScientificName(res.scientific_name || "");
                    setScientificDegree(res.scientific_degree_name || "");
                    setBio(res.bio || "");
                    setNameState(res.name || name);
                    setSurnameState(res.surname || surname);
                    setFatherNameState(res.father_name || fatherName);
                    setFinKodState(res.fin_kod || fin_kod);
                    setImageBase64(res.profile_image || "");
                } else {
                    setUser(null);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Ensure imageBase64 is initialized with user's image when user loads (if not empty)
    useEffect(() => {
        if (user && user.image && !imageBase64) {
            setImageBase64(user.image);
        }
    }, [user]);


    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setCreationLoading(true);
            const userPayload: UserPayload = {
                fin_kod: finKodState,
                scientific_degree_name: scientificDegree,
                scientific_name: scientificName,
                bio: bio,
                profile_image: imageBase64
            };
            const result = await createUserProfile(userPayload);
            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Saved",
                    text: "User details saved successfully"
                }).then(() => setCreationLoading(false));
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected error occured. Please try again later."
                }).then(() => setCreationLoading(false));
            }
        } catch (err) {
            setCreationLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unexpected error occured. Please try again later."
            });
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setCreationLoading(true);
            const updatePayload: UpdatePayload = {
                name: nameState,
                surname: surnameState,
                father_name: fatherNameState,
                scientific_degree_name: scientificDegree,
                scientific_name: scientificName,
                bio: bio,
                image: imageBase64
            };
            const result = await updateUserProfile(finKodState, updatePayload);
            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: "User details updated successfully."
                }).then(() => {
                    setCreationLoading(false);
                    setIsEditing(false);
                });
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected error occured. Please try again later."
                }).then(() => setCreationLoading(false));
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected error occured. Please try again later."
                }).then(() => setCreationLoading(false));
            }
        } catch (err) {
            setCreationLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unexpected error occured. Please try again later."
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // File input ref for image picker
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSelectImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <form onSubmit={user ? handleUpdate : handleCreate}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 mb-[20px]">
                    <div className="sm:col-span-1 flex flex-col items-start">
                        <Label>
                            Profile image
                        </Label>
                        <div className="mb-2">
                            <img
                                src={
                                    imageBase64 ||
                                    (user && user.image) ||
                                    "/placeholder-profile.png"
                                }
                                alt="Profile image"
                                className="w-32 h-32 object-cover rounded-full border border-gray-300"
                            />
                        </div>

                        {isEditing ? (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                />
                                <Button onClick={handleSelectImageClick}>
                                    Choose Image
                                </Button>
                            </div>
                        ) : null}

                    </div>
                </div>
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
                                    Name<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={nameState}
                                    placeholder="Ad"
                                    onChange={(e) => setNameState(e.target.value)}
                                    readOnly={!isEditing}
                                />
                            </div>
                            {/* <!-- Last Name --> */}
                            <div className="sm:col-span-1">
                                <Label>
                                    Surname<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    value={surnameState}
                                    placeholder="Soyad"
                                    onChange={(e) => setSurnameState(e.target.value)}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <Label>
                                    Father name<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    value={fatherNameState}
                                    placeholder="Ata adı"
                                    onChange={(e) => setFatherNameState(e.target.value)}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <Label>
                                    Fin code<span className="text-error-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="fin_kod"
                                    name="fin_kod"
                                    value={finKodState}
                                    placeholder="Fin kod"
                                    onChange={(e) => setFinKodState(e.target.value)}
                                    readOnly={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-[20px]">
                            {/* <!-- Ad Soyad Ata adı --> */}
                            <div className="sm:col-span-1">
                                <Label>
                                    Scientific name<span className="text-error-500">*</span>
                                </Label>
                                <Select
                                    placeholder="Choose scientific name"
                                    options={scientificNameOptions}
                                    value={scientificName}
                                    onChange={handleScientificNameChange}
                                    isDisabled={!isEditing}
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <Label>
                                    Scientific degree<span className="text-error-500">*</span>
                                </Label>
                                <Select
                                    placeholder="Choose scientific degree"
                                    options={scientificDegreeOptions}
                                    value={scientificDegree}
                                    onChange={handleScientificDegreeChange}
                                    isDisabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 mb-[20px]">
                            <div className="sm:col-span-1">
                                <Label>
                                    Bio<span className="text-error-500">*</span>
                                </Label>
                                <TextArea
                                    value={bio || ""}
                                    placeholder="Bio"
                                    onChange={(value) => setBio(value)}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </>
                )}
                <div className="flex justify-end items-end">
                    {!isEditing && (
                        <div className="flex justify-end mr-[10px]">
                            <Button onClick={() => setIsEditing(true)}>Redaktə et</Button>
                        </div>
                    )}
                    <Button disabled={!isEditing}>
                        {creationLoading ? "Yadda saxlanılır" : "Yadda saxla"}
                    </Button>
                </div>
            </form>
        </>
    )
}