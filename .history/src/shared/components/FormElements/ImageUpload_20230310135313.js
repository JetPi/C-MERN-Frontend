import React from "react";
import useFetchHandler from "../../util/fetcher";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import Button from "./Button";

function ImageUpload(props) {
  const { isError, isLoading, sendRequest, resetter } = useFetchHandler();
  return (
    <>
      <ErrorModal error={isError} onCancel={resetter} />
      {isLoading && <LoadingSpinner />}
      <div className="form-control">
        <input
          id={props.id}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,jpeg"
        />
        <div className={`image-upload ${props.buttonStyle}`}>
            <Button/>
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
