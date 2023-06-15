import styled from "@emotion/styled";

const SignUpDiv = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
    gap: 10px 0;

    label {
      display: block;
      width: 30%;
      font-weight: 700;
    }
    input {
      display: block;
      width: 70%;
      border: 1px solid #ddd;
    }
    /* .btn-list {
      display: block;
      justify-content: center;
      gap: 10px;
      width: 100%;
      text-align: center;
    } */
  }
`;
export const LoginDiv = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
    gap: 10px 0;

    label {
      display: block;
      width: 30%;
      font-weight: 700;
    }
    input {
      display: block;
      width: 70%;
      border: 1px solid #ddd;
    }
    /* .btn-list {
      display: block;
      justify-content: center;
      gap: 10px;
      width: 100%;
      text-align: center;
    } */
  }
`;
export default SignUpDiv;
