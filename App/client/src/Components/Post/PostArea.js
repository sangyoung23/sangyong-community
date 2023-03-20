import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Detail from "./Detail";
import RepleArea from "../Reple/RepleArea";
import Spinner from "react-bootstrap/Spinner";
import { SpinnerDiv } from "../Style/DetailCSS";

function PostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  let params = useParams();

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

  return (
    <div>
      {Flag ? (
        <>
          <Detail PostInfo={PostInfo} />
          <RepleArea postId={PostInfo._id} />
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
}

export default PostArea;
