import React, {useRef} from "react";
import useFetchHandler from "../../util/fetcher";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import Button from "./Button";

function ImageUpload(props) {
  const { isError, isLoading, sendRequest, resetter } = useFetchHandler();
  const filePickerRef = useRef()

  function pickedHandler(event){

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
        <div className={`image-upload ${{...props.buttonStyle}}`}>
            <div className="image-upload__preview">
                <img src="" alt="Preview" />
            </div>
            <Button type="button" onClick={pickImageHandler}></Button>
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
