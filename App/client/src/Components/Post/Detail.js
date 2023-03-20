import axios from "axios";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostDiv, Post, BtnDiv } from "../Style/DetailCSS";
import { useSelector } from "react-redux";

import moment from "moment";
// moment 한국 시간으로 설정
import "moment/locale/ko";

function Detail(props) {
  let navigate = useNavigate();
  let params = useParams();
  const user = useSelector((state) => state.user);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까 ?")) {
      let body = {
        postNum: params.postNum,
      };

      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch(() => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do  hh:mm") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do  hh:mm");
    }
  };

  return (
    <PostDiv>
      <Post>
        <h1>{props.PostInfo.title}</h1>
        <p className="author">{props.PostInfo.author.displayName}</p>
        {props.PostInfo.image ? (
          <img
            src={`http://localhost:8080/${props.PostInfo.image}`}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}
        <p>{props.PostInfo.content}</p>
        <p className="time">
          {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
        </p>
      </Post>
      {user.uid === props.PostInfo.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${props.PostInfo.postNum}`}>
            <button className="edit">수정</button>
          </Link>
          <button className="delete" onClick={() => DeleteHandler()}>
            삭제
          </button>
        </BtnDiv>
      )}
    </PostDiv>
  );
}

export default Detail;
