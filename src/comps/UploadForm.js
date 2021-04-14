import React, { useState } from 'react';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/jpeg', 'image/png'];
    
    const changeHandler= (event) => {
        const selected= event.target.files[0];

        if(selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        }else{
            setError('please select file of type (jpeg/png)');
            setFile(null);
        }
    }

    return(
        <form>
            <input type="file" onChange={changeHandler}/>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
            </div>
        </form>
    );
}

export default UploadForm;