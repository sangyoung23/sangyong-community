import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginDiv from "../Style/UserCSS";

import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Pw, setPw] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");

  let navigate = useNavigate();
  let user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
  }, []);

  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && Pw && PWConfirm)) {
      return alert("모든 값을 채워주세요");
    }
    if (Pw != PWConfirm) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    if (!NameCheck) {
      return alert("닉네임 중복검사를 진행해 주세요");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, Pw);

    await createdUser.user.updateProfile({
      displayName: Name,
    });

    console.log(createdUser.user);
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        navigate("/login");
      } else {
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };

  const NameCheckFunc = (e) => {
    e.preventDefault();
    if (!Name) {
      return alert("닉네임을 입력해주세요");
    }
    let body = {
      displayName: Name,
    };
    axios.post("/api/user/namecheck", body).then((res) => {
      if (res.data.success) {
        if (res.data.check) {
          setNameCheck(true);
          setNameInfo("사용 가능한 닉네임입니다.");
        } else {
          setNameInfo("사용 불가능한 닉네임입니다.");
        }
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label>닉네임</label>
        <input
          type="name"
          value={Name}
          disabled={NameCheck}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        {NameInfo}
        <button onClick={(e) => NameCheckFunc(e)}>닉네임 중복검사</button>
        <label>이메일</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={Pw}
          minLength={8}
          onChange={(e) => setPw(e.currentTarget.value)}
        />
        <p className="password">비밀번호는 6글자 이상 입력해주세요</p>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={PWConfirm}
          minLength={8}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <p className="password">비밀번호는 6글자 이상 입력해주세요</p>
        <button
          style={{ marginTop: "0" }}
          disabled={Flag}
          onClick={(e) => RegisterFunc(e)}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
