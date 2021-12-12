import { storage } from ".";

export function getImage(setImage, path) {
    if (path) {
        let imageRef = storage.ref().child(String(path));
        imageRef.getDownloadURL().then((url) => {
            setImage(url);
        }).catch((err) => {
            setImage(null);
        });
    } else {
        setImage(null);
    }
}

export function getAudio(setAudio, path) {
    if (path) {
        let imageRef = storage.ref().child(String(path));
        imageRef.getDownloadURL().then((url) => {
            setAudio(url);
        }).catch((err) => {
            setAudio(null);
        });
    } else {
        setAudio(null);
    }
}