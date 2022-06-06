import SignupForm from "./SignupForm";
import styled from "styled-components/macro";

const SignupPage = () => {
    return (
        <Wrapper>
            <SignupForm />
        </Wrapper>
    )
}

export default SignupPage;

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  place-content: center;

  background-image: linear-gradient(
          -45deg,
  rgba(59, 114, 254, 0.77) 0%,
  rgba(96, 245, 43, 0.4774) 100%);
`