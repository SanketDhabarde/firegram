import React , { useState, useEffect }from 'react';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import UploadForm from './comps/UploadForm';
import { auth } from './firebase/config';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [user, setUser] = useState(null);

  var provider = new firebase.auth.GoogleAuthProvider();

  useEffect(()=> {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null);
      }
    })

    return () => {
      unSubscribe();
    }
  },[user]);
  
  const signIn = () => {
     auth.signInWithPopup(provider)
    .catch((error) => {
      toast.error(error.message, {position: 'top-center'});
    });
  }
  return (
    <div className="App">
      <div className="title">
        <div className="App__header"> 
          <h1>FireGram</h1>
         { !user ? <Button onClick={signIn}>sign in with google</Button> : <Button onClick={() => auth.signOut()}>Logout</Button>} 
        </div>
       
        <h2>Your Pictures</h2>
        <p>make your photo gallery with realtime database.</p>
      </div>
      {user && <UploadForm user={user}/>}
      <ImageGrid setSelectedImg={setSelectedImg} user={user}/>
      { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
    </div>
  );
}

export default App;
