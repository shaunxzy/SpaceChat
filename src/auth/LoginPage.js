import LoginForm from "./LoginForm";
import styled from "styled-components/macro"

const LoginPage = props => {
    return (
        <Wrapper>
            <LoginForm />
        </Wrapper>
    )
}

export default LoginPage;

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  place-content: center;

  background-image: linear-gradient(
          -45deg,
  rgba(59, 114, 254, 0.77) 0%,
  rgba(96, 245, 43, 0.4774) 100%);
`