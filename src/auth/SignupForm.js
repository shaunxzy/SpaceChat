import {useReducer, useRef, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import styled from "styled-components/macro";

const initForm = {emailValid: true, pswdValid: true, confirmValid: true, valid: false}

const formReducer = (state, action) => {
    switch (action.type){
        case "SET_EMAIL":
            return {...state, emailValid: action.value, valid: state.pswdValid && state.confirmValid && action.value}
        case "SET_PSWD":
            return {...state, pswdValid: action.value, valid: state.emailValid && state.confirmValid && action.value}
        case "SET_CONFIRM":
            return {...state, confirmValid: action.value, valid: state.pswdValid && state.emailValid && action.value}
        default:
            return state;
    }
}


const SignupForm = props => {
    const emailRef = useRef();
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef();
    const {signup, currentUser} = useAuth();
    const [error, setError] = useState('');
    const [formValid, dispatchForm] = useReducer(formReducer, initForm)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setIsLoading(true);
            signup(emailRef.current.value, passwordRef.current.value)
            setIsLoading(false);
        } catch (e) {
            setError(e.code);
            setIsLoading(false);
        }

    }

    //console.log(PasswordValidation(passwordRef.current.value));

    return (
        <Card>
            <Title>Sign Up</Title>
            <InputWrapper>
                <p style={{'line-height': '0px'}}>Email</p>
                <Input ref={emailRef}/>
            </InputWrapper>
            <InputWrapper>
                <p style={{'line-height': '0px'}}>Password</p>
                <Input ref={passwordRef}/>
            </InputWrapper>
            <InputWrapper>
                <p style={{'line-height': '0px'}}>Confirm password</p>
                <Input ref={passwordConfirmRef}/>
            </InputWrapper>
            <ButtonWrapper>
                <SubmitButton>Sign Up</SubmitButton>
                <SubmitButton>Cancel</SubmitButton>
            </ButtonWrapper>
            <AdditionalAction>
                <p style={{'margin-right': 'auto'}}>Already have an account?</p>
                <a href={'/login'} style={{'text-decoration': "none"}}>Login</a>
            </AdditionalAction>
        </Card>
    )
}

export default SignupForm;

const Card = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  
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
  width: 120px;
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

const ValididtyCheck = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  height: 200px;
  
`