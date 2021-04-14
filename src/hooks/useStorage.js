import {useState, useEffect} from 'react';
import { projectStorage } from '../firebase/config';

const useStorage= (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = projectStorage.ref(file.name);

        storageRef.put(file).on('state_changed', (snaps) => {
            let percentage= (snaps.bytesTransferred / snaps.totalBytes) * 100;
            setProgress(percentage);
        }, (error) => {
            setError(error);
        }, async () => {
            let url= await storageRef.getDownloadURL();
            setUrl(url);
        })
    }, [file]);

    return {progress, error, url};
}

export default useStorage;