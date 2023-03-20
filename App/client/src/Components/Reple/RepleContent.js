import React, { useState, useEffect, useRef } from "react";
import { RepleContentDiv, RepleUploadDiv } from "../Style/RepleCSS";
import { useSelector } from "react-redux";

import axios from "axios";

import moment from "moment";
// moment 한국 시간으로 설정
import "moment/locale/ko";

function RepleContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EditFlag, setEditFlag] = useState(false);
  const [Reple, setReple] = useState(props.reple.reple);

  const user = useSelector((state) => state.user);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));

  const SubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      uid: user.uid,
      reple: Reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
    };

    axios.post("/api/reple/edit", body).then((res) => {
      if (res.data.success) {
        alert("댓글 수정이 성공하였습니다.");
      } else {
        alert("댓글 수정이 실패하였습니다.");
      }
      return window.location.reload();
    });
  };

  const DeleteHandler = (e) => {
    e.preventDefault();

    if (window.confirm("정말로 삭제하시겠습니까 ?")) {
      let body = {
        repleId: props.reple._id,
        postId: props.reple.postId,
      };

      axios
        .post("/api/reple/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        })
        .catch(() => {
          alert("댓글 삭제에 실패하였습니다.");
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
    <div>
      <RepleContentDiv>
        <div className="author">
          <p className="displayName">{props.reple.author.displayName}</p>

          {props.reple.author.uid === user.uid && (
            <div className="modalControl">
              <span onClick={() => setModalFlag(true)}>···</span>
              {ModalFlag && (
                <div className="modalDiv" ref={ref}>
                  <p
                    onClick={() => {
                      setEditFlag(true);
                      setModalFlag(false);
                    }}
                  >
                    수정
                  </p>
                  <p className="delete" onClick={(e) => DeleteHandler(e)}>
                    삭제
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {EditFlag ? (
          <RepleUploadDiv>
            <form>
              <input
                type="text"
                value={Reple}
                onChange={(e) => {
                  setReple(e.currentTarget.value);
                }}
              />
              <button
                onClick={(e) => {
                  SubmitHandler(e);
                }}
              >
                등록
              </button>
            </form>
            <div className="cancel">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditFlag(false);
                }}
              >
                취소
              </button>
            </div>
          </RepleUploadDiv>
        ) : (
          <>
            <p>{props.reple.reple}</p>
            <p className="time">
              {SetTime(props.reple.createdAt, props.reple.updatedAt)}
            </p>
          </>
        )}
      </RepleContentDiv>
    </div>
  );
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default RepleContent;
