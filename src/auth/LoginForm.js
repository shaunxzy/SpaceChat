import {useRef, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {Link} from "react-router-dom";
import styled from "styled-components/macro";


const LoginPage = props => {
    const emailRef = useRef();
    const pswdRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()
    const {login} = useAuth();

    async function handleSubmit (e) {
        e.preventDefault();

        try {
            setIsLoading(true);
            await login(emailRef.current.value, pswdRef.current.value)
            setIsLoading(false);
        } catch (error) {
            setError(error.code);
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <Title>Log In</Title>
            <InputWrapper>
                <p style={{'line-height': '0px'}}>Email</p>
                <Input />
            </InputWrapper>
            <InputWrapper>
                <p style={{'line-height': '0px'}}>Password</p>
                <Input />
            </InputWrapper>
            <ButtonWrapper>
                <SubmitButton>Log In</SubmitButton>
                <SubmitButton>Cancel</SubmitButton>
            </ButtonWrapper>
            <AdditionalAction>
                <p style={{'margin-right': 'auto'}}>Don't have an account?</p>
                <a href={'/signup'} style={{'text-decoration': "none"}}>Sign Up</a>
            </AdditionalAction>
        </Card>
    )
}


export default LoginPage;

const Card = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  
  background-color: white;
  padding: 1rem 2rem;
  border: 2px solid hsla(0deg, 0%, 0%, 0.3);
  box-shadow: 4px 4px 3px hsla(0deg, 0%, 0%, 0.5);
  border-radius: 1rem;
`

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  text-shadow: 2px 2px 4px hsla(0deg, 0%, 0%, 0.2);
  user-select: none;
`

const InputWrapper = styled.div`
  display: grid;
  place-content: center;
`


const Input = styled.input`
  width: 300px;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const SubmitButton = styled.button`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  width: 100px;
  background-color: hsl(220deg,100%,50%);
  color: white;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  filter: drop-shadow(1px 2px 2px hsla(0deg, 0%, 0%, 0.6));
  transition: filter 100ms;
  
  &:active{
    transform: translateY(1px);
    filter: drop-shadow(0px 1px 1px hsla(0deg, 0%, 0%, 0.6));
    transition: transform 100ms, filter 100ms;
  }
`

const AdditionalAction = styled.div`
  display: flex;
  flex-direction: row;
`