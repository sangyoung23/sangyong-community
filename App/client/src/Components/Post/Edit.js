import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../Style/UploadCSS";

function Edit() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState(PostInfo.image);

  let params = useParams();

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요");
    }

    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
      image: Image,
    };

    axios
      .post("/api/post/edit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정이 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
  }, [PostInfo]);

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={Title || ""}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={Content || ""}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
        <UploadButtonDiv>
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            취소
          </button>
          <button onClick={(e) => onSubmitHandler(e)}>제출</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Edit;
