import {useState, useEffect} from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage= (file, user) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snaps) => {
            let percentage= (snaps.bytesTransferred / snaps.totalBytes) * 100;
            setProgress(percentage);
        }, (error) => {
            setError(error);
        }, async () => {
            const url= await storageRef.getDownloadURL();
            const createdAt = timestamp();
            const username = user.displayName;
            const userId = user.uid;
            const userPhoto = user.photoURL;
            collectionRef.add({ url, createdAt, username, userId, userPhoto});
            setUrl(url);
        })
    }, [file, user]);

    return {progress, error, url};
}

export default useStorage;