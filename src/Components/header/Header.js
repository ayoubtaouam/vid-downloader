import { Form } from "react-bootstrap";

export default function Header({ darkMode, setDarkMode }) {
    const handleChange = () => setDarkMode(!darkMode);
    return (
        <div className={`d-flex justify-content-between align-items-center p-3 ${darkMode ? "bg-danger bg-opacity-75" : "bg-danger"} text-light`}>
            <h1 className="mb-0">Any Video Downloader</h1>
            <Form.Check
                type="switch"
                id="dark-mode-switch"
                label={<i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}></i>}
                checked={darkMode}
                onChange={handleChange}
                className="ms-3"
            />
        </div>
    );
}
