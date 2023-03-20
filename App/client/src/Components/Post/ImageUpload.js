import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

function ImageUpload(props) {
  const FileUpload = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/post/image/upload", formData).then((res) => {
      props.setImage(res.data.filePath);
    });
  };
  return (
    <div>
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
}

export default ImageUpload;
