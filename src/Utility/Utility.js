export default function triggerDownload(url, contentDisposition) {
    const match = contentDisposition?.match(/filename="?(.+?)"?$/);
    const filename = match ? match[1] : 'video.mp4';
    console.log(filename);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}