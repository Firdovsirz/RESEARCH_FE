import { Link } from "react-router";
import Button from "../ui/button/Button";

export default function PublicHeader() {
    return (
        <header className="w-full h-[100px] flex justify-center items-center">
            <div
                className="px-[40px] w-[60%] h-[80px] flex justify-between items-center bg-blue-100/50 backdrop-blur-md rounded-[40px]"
            >
                <img
                    src="/aztu-logo.webp"
                    alt="Azerbaijan Technical University"
                    style={{ width: "100px", height: "50px" }}
                />
                <h1>AzTU Tədqiqatçılar</h1>
                <Button>
                    <Link to={"/signin"}>
                        Login
                    </Link>
                </Button>
            </div>
        </header>
    );
}