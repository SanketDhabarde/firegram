import React from 'react';
import { motion } from 'framer-motion';

const Modal = ( { selectedImg , setSelectedImg}) => {

    const clickHandler = (event) => {
        
        if(event.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    return (
        <motion.div className="backdrop" onClick={clickHandler}
        initial={{opacity: 0}}
        animate={{opacity: 1 }}
        >
            <img src={selectedImg} alt="enlarge pic"/>
        </motion.div>
    )
}

export default Modal;