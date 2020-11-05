import React, { useState, useEffect } from "react"
import { Form, Button,Jumbotron, ListGroup, Alert  } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory, Link } from "react-router-dom"
import MenuBar from "./MenuBar";
import firebase from "firebase/app"
import { log } from "util";


export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [file, setFile] = useState('');
  const [fileUrl, setFileUrl] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [filesList, setFilesList] = useState();
  //Storage ref for firebase
  const storageRef = firebase.storage().ref();

  //Handelling Logout 
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  //Updating the file to upload
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  }

//Uploading the file in file state
  const handleSubmit = async (e) => {
    //Checking if the user has already chosen a file
    if(!file) 
      setUploadError(true);

    const fileRef = storageRef.child('semester1/'+file.name);
  
    await fileRef.put(file).then(() => {
      setUploadSuccess(true) 
  })
  .catch(e =>{
    setUploadError(true)
  })
}
//Fetching files from db to the DOM
    const fetchFiles = async ()=>{
        var listRef = storageRef.child('semester1');

        // Find all the prefixes and items
        await listRef.listAll().then(function(res) {
          res.items.forEach(item=>{
            //setFilesList([...filesList,item])
            console.log(item);
          })
        }).catch(function(error) {
     
        });
    }
    useEffect(()=>{
      fetchFiles();
      console.log(filesList)
    },[])
    
    //Upload success message
    const UploadsuccessAlert = uploadSuccess== true ?  <Alert variant="success" className="mt-3">
                                          File has been uploaded successfully!
                                        </Alert>
                                        :
                                        null
                                                  
     const UploadErrorAlert = uploadError == true ?  <Alert variant="danger" className="mt-3">
                                                            Error! Please try again.
                                                          </Alert>
                                                          :
                                                          null
  /*  const handleDelete = ()=>{
        // Create a reference to the file to delete
        const fileRef = storageRef.child('semester1')

        // Delete the file
        fileRef.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
    }       */   
    
    /* MUST MAKE LIST FILES COMPONENT PASSING LIST FILES AS PROPS */
  return (
    
    <>
      <MenuBar/>
      <div className="courseList">
        <h1 className="mb-5 mt-5">List of courses</h1>
        <div className="semester">
            <h3 className="text-primary">Semester 1</h3>
            <Jumbotron className="mt-5">
                <h1>Upload Your Files</h1>
                <p>
                  You can upload your files here
                </p>
                  <Form className="mt-3">
                    <Form.Group>
                      <Form.Control type="file" onChange={handleOnChange}></Form.Control>
                    </Form.Group>
                  </Form>

                  <Button variant="primary" onClick={handleSubmit}>Upload</Button>
                  {UploadsuccessAlert}
                  {UploadErrorAlert}
            </Jumbotron>
            <ListGroup className="mb-3">
               
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Cras justo odio
                  <Button variant="danger">Delete</Button>
                </ListGroup.Item>
            </ListGroup>
        </div>
  <br/>
      
      </div>
    </>
  )
}
