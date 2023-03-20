import React from "react";
import { Link } from "react-router-dom";
import { ListDiv, ListItem } from "../Style/ListCSS";

import moment from "moment";
// moment 한국 시간으로 설정
import "moment/locale/ko";

function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do  hh:mm") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do  hh:mm");
    }
  };

  return (
    <ListDiv>
      {props.PostList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.postNum}`}>
              <h4>제목 : {post.title}</h4>
              <p>작성자 : {post.author.displayName}</p>
              <p>내용 : {post.content}</p>
              <p className="time">{SetTime(post.createdAt, post.updatedAt)}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;
