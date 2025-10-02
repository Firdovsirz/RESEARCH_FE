import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../util/apiClient";

export default function CvView() {
    const location = useLocation();
    const state = location.state as { cv?: string };
    const cvUrl = `${API_BASE_URL}/${state.cv}`;

    if (!cvUrl) {
        return <div>No CV provided</div>;
    }


    console.log(`cv: ${cvUrl}`);

    return (
        <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
            <iframe
                src={cvUrl}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    overflow: "hidden",
                }}
                title="CV Viewer"
            />
        </div>
    );
}