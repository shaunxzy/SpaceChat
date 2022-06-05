import {useRef, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import styled from "styled-components/macro";
import {useNavigate} from "react-router-dom";


const SignupForm = () => {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value === passwordConfirmRef.current.value) {
            signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value).then(
                id => {
                    setName("")
                    setEmail("")
                    setPassword("")
                    setPasswordConfirm("")
                    navigate(`/user/${id}`)
                }
            ).catch(e => {
                console.log(e);
            })
        } else{
            alert("confirm password must match your password")
            setName("")
            setEmail("")
            setPassword("")
            setPasswordConfirm("")
        }

    }


    return (
        <Card onSubmit={handleSubmit}>
            <Title>Sign Up</Title>
            <InputWrapper>
                <p style={{lineHeight: '0px'}}>Name</p>
                <Input
                    ref={nameRef}
                    value={name}
                    onChange={() => setName(nameRef.current.value)}/>
            </InputWrapper>
            <InputWrapper>
                <p style={{lineHeight: '0px'}}>Email</p>
                <Input
                    ref={emailRef}
                    value={email}
                    onChange={() => setEmail(emailRef.current.value)}/>
            </InputWrapper>
            <InputWrapper>
                <p style={{lineHeight: '0px'}}>Password</p>
                <Input
                    type={"password"}
                    ref={passwordRef}
                    value={password}
                    onChange={() => setPassword(passwordRef.current.value)}/>
            </InputWrapper>
            <InputWrapper>
                <p style={{lineHeight: '0px'}}>Confirm password</p>
                <Input
                    type={"password"}
                    ref={passwordConfirmRef}
                    value={passwordConfirm}
                    onChange={() => setPasswordConfirm(passwordConfirmRef.current.value)}/>
            </InputWrapper>
            <ButtonWrapper>
                <SubmitButton type={'submit'}>Sign Up</SubmitButton>
                <CancelButton onClick={() => navigate('/home')}>Cancel</CancelButton>
            </ButtonWrapper>
            <AdditionalAction>
                <p style={{marginRight: 'auto'}}>Already have an account?</p>
                <a href={'/login'} style={{textDecoration: "none"}}>Login</a>
            </AdditionalAction>
        </Card>
    )
}

export default SignupForm;

const Card = styled.form`
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

const CancelButton = styled(SubmitButton)`
`

const AdditionalAction = styled.div`
  display: flex;
  flex-direction: row;
`