import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { projectFirestore } from '../firebase/config';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageGrid = ({ setSelectedImg, user }) => {
    const { docs } = useFirestore('images');

    const deleteHandler = (id) => {
        projectFirestore.collection('images').doc(id).delete()
        .catch(error => console.log(error));
    }

    const incLike = (id) => {
        if(user){
            projectFirestore.collection('images').doc(id).update({
                likes: firebase.firestore.FieldValue.increment(1),
                likedBy: firebase.firestore.FieldValue.arrayUnion({id: user.uid, username: user.displayName})
            });
        }else{
            toast.error("please login to like the post", {position: 'top-center'});
        } 
    }

    const decLike= (id) => {
        projectFirestore.collection('images').doc(id).update({
                likes: firebase.firestore.FieldValue.increment(-1),
                likedBy: firebase.firestore.FieldValue.arrayRemove({id: user.uid, username: user.displayName})
        });
    }

    return(
        <div className="img-grid">
            {docs && docs.map( doc => (
                <motion.div className="img-wrap" key={doc.id}
                layout
                whileHover={{ opacity: 1}}
                >
                    <div className="img__header">
                        <div className="img__user">
                            <Avatar className="img__avatar" alt={doc.username} src={doc.userPhoto} />
                            <p>{doc.username}</p>
                        </div>
                        {user &&  user.uid === doc.userId  &&  <DeleteIcon className="img__delete" onClick={() => deleteHandler(doc.id)}></DeleteIcon>}
                    </div>
                    <img onClick={() => setSelectedImg(doc.url)} src={doc.url} alt="uploaded pic" />
                    <div className="img__footer">
                        {
                            user && doc.likedBy.some( u => u.id === user.uid) ? 
                            <FavoriteIcon onClick={() => decLike(doc.id)} style={{color: 'red', paddingRight: '5px'}}></FavoriteIcon>
                            :
                            <FavoriteBorderIcon onClick={() => incLike(doc.id)} style={{ paddingRight: '5px'}}></FavoriteBorderIcon>
                            
                        }
                        <h4>{doc.likes} likes</h4>
                    </div>
                    
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;