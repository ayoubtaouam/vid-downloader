import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import triggerDownload from "../../Utility/Utility";
import Spinner from 'react-bootstrap/Spinner';
import FormatModal from "../modal/FormatModal";

export default function SearchBar({darkMode}) {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formats, setFormats] = useState([]);
    const [videoTitle, setVideoTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    let isUrlEmpty = !url;

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 4000);
            return () => clearTimeout(timer);
        }
        if (error) {
            const fadeTimer = setTimeout(() => setFadeOut(true), 6000);
            const removeTimer = setTimeout(() => {
                setError('');
                setFadeOut(false);
            }, 6600);
            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(removeTimer);
            }
        }
    }, [showAlert, error]);

    const handleChange = ({target}) => {
        setUrl(target.value);
    }

    const handleClickinfo = async () => {
        setIsLoading(true);
        setError('');
        try {
          const response = await fetch('http://localhost:8080/api/info', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ url })
          });
          if (!response.ok) {
            throw new Error("Failed to fetch video info");
          }
          const data = await response.json();
          setVideoTitle(data.title);
          setFormats(data.formats);
          setThumbnail(data.thumbnail);
          setShowModal(true);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      

    const handleClickDownload = async (format) => {
        setShowModal(false);
        setIsLoading(true);
        setShowAlert(false);
        setError('');
        try {    
            const response = await fetch('http://localhost:8080/api/download', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({url, formatId: format.formatId, videoTitle, extension: format.ext})});
            if (response.ok) {
                const contentDisposition = response.headers.get("Content-Disposition");
                console.log(contentDisposition);
                const video = await response.blob();
                console.log("Blob size: " + video.size);
                const url = URL.createObjectURL(video);
                setShowAlert(true);
                triggerDownload(url, contentDisposition);
                setUrl('');
            } else {
                if (response.status === 400) {
                    throw new Error("Invalid URL. Please chack and try again.");
                } else {
                    throw new Error("Server Error. Please try again later.");
                }
            }
        } catch(error) {
            console.log(error.message);
            setError(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <FormatModal
                show={showModal}
                onHide={() => setShowModal(false)}
                formats={formats}
                onSelectFormat={handleClickDownload}
                videoTitle={videoTitle}
                thumbnail={thumbnail}
            />

            <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                <InputGroup size="lg" className="p-5 w-50">
                    <Form.Control value={url} type="text" placeholder="Enter link here" onChange={handleChange} disabled={isLoading} className="custom-input" />
                    <Button disabled={isUrlEmpty || isLoading} variant="danger" onClick={handleClickinfo}>
                        {isLoading ? <Spinner size="sm" animation="border" /> : "Download"}
                    </Button>
                </InputGroup>
            </div>
            <div className={`d-flex justify-content-center text-dark ${fadeOut ? 'fade-out' : ''}`}>
                {error && (
                    <div className="error fs-3">
                        {error}
                    </div>
                )}
                {isLoading && (
                    <div className={`fs-3 ${darkMode ? "text-light" : "text-dark"} fade-in`}>
                        We are making your file ready <Spinner size="sm" animation="grow" /><Spinner size="sm" animation="grow" /><Spinner size="sm" animation="grow" />
                    </div>
                )}
                {showAlert && (
                    <div className={`fs-3 ${darkMode ? "text-light" : "text-dark"} fade-in`}>
                        Download will start now, thanks for waiting 😊
                    </div>
                )}
            </div>
        </>
    );
}