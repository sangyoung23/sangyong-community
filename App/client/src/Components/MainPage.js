import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./Post/List";

import { MainDiv, MoreBtn } from "./Style/MainPageCSS";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Mainpage() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState("최신순");
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);

  const getLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...PostList, ...response.data.postList]);
          setSkip(Skip + response.data.postList.length);
          if (response.data.postList.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostList = () => {
    setSkip(0);

    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };

    axios
      .post("/api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
          setSkip(response.data.postList.length);
          if (response.data.postList.length < 5) {
            setLoadMore(false);
          }
          if (response.data.postList.length == 0) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };

  return (
    <>
      <MainDiv>
        <DropdownButton variant="outline-secondary" title={Sort}>
          <Dropdown.Item onClick={() => setSort("최신순")}>
            최신순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("댓글순")}>
            댓글순
          </Dropdown.Item>
        </DropdownButton>
        <input
          placeholder="Search"
          type="text"
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) SearchHandler();
          }}
        />
      </MainDiv>
      <List PostList={PostList} />
      {LoadMore && (
        <MoreBtn>
          <button
            style={{ marginBottom: "10vh" }}
            onClick={() => getLoadMore()}
          >
            게시글 더 보기
          </button>
        </MoreBtn>
      )}
    </>
  );
}

export default Mainpage;
