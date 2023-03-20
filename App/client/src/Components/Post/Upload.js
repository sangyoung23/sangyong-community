import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../Style/UploadCSS";
import { useSelector } from "react-redux";

function Upload() {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인한 회원만 글을 작성할 수 있습니다.");
      navigate("/login");
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요");
    }

    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid,
    };

    axios
      .post("/api/post/submit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/");
        } else {
          alert("글 작성이 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={Title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={Content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
        <UploadButtonDiv>
          <button onClick={(e) => onSubmitHandler(e)}>제출</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
