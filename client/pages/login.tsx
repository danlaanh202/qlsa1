import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { handleLogin } from "../utils/api";

import Head from "next/head";
import { useRouter } from "next/router";
const StyledLoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLoginForm = styled.form`
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    input {
      padding: 8px;
      border: 1px solid #dcdfe6;
      margin: 8px 0;
      width: 100%;
    }
  }
  .submit-btn {
    margin-top: 20px;
    background: #1f28af;
    color: white;
    padding: 12px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
  }
`;
const Login = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });

  const onSubmitHandler = async (data: any) => {
    try {
      await handleLogin(data.username, data.password);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <StyledLoginContainer>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <StyledLoginForm
        onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
      >
        <div className="title">Đăng nhập</div>
        <div className="input-container">
          <label htmlFor="username">Tên đăng nhập</label>
          <input type="text" id="username" {...register("username")} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Mật khẩu</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <button className="submit-btn" type="submit">
          Đăng nhập
        </button>
      </StyledLoginForm>
    </StyledLoginContainer>
  );
};

export default Login;
