import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ImageGrid = ({ setSelectedImg, user }) => {
    const { docs } = useFirestore('images');

    return(
        <div className="img-grid">
            {docs && docs.map( doc => (
                <motion.div className="img-wrap" key={doc.id}
                layout
                whileHover={{ opacity: 1}}
                onClick={() => setSelectedImg(doc.url)}
                >
                    <div className="img__header">
                        <div className="img__user">
                            <Avatar className="img__avatar" alt={doc.username} src={doc.userPhoto} />
                            <p>{doc.username}</p>
                        </div>
                        {user &&  user.uid === doc.userId  &&  <DeleteIcon className="img__delete"></DeleteIcon>}
                    </div>
                    <img src={doc.url} alt="uploaded pic" />
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;