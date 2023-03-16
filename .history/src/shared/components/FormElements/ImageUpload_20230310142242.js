import React, {useRef, useState} from "react";
import useFetchHandler from "../../util/fetcher";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import Button from "./Button";
import './ImageUpload.css'

function ImageUpload(props) {
  const { isError, isLoading, sendRequest, resetter } = useFetchHandler();
  const [image, setImage] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)
  
  const filePickerRef = useRef()

  function pickedHandler(event){
    if(event.target.files && event.target.files.lenght === 1){
        const pickedFile = event.target.files[0]
        setIsValid(true)
    }
    console.log(event.target.files)
  }

  function pickImageHandler() {
    filePickerRef.current.click()
  }
  return (
    <>
      <ErrorModal error={isError} onCancel={resetter} />
      {isLoading && <LoadingSpinner />}
      <div className="form-control">
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.buttonStyle}`}>
            <div className="image-upload__preview">
                <img src="" alt="Preview" />
            </div>
            <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
      </div>
    </>
  );
}

export default ImageUpload;