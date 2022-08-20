import styled from "styled-components"
import {COLORS} from "../contants/Contants";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {useAuth} from "../context/AuthProvider";

export default function VisitorAuth() {
    const { id } = useParams()
    const { loginVisitor, visitor  } = useAuth();

    const passwordRef = useRef("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const handleSubmit = async e => {
        e.preventDefault();

        await loginVisitor({id: id, password: password}).then(tempVisitor => {
            console.log(`host is ${tempVisitor.hostname}`)
            console.log(tempVisitor)
            if (tempVisitor) {
                foo(`visitors/${id}/channel/${tempVisitor.host}`,
                    tempVisitor.hostname,
                    `users/${tempVisitor.host}/channels/singular/${id}`,
                    tempVisitor.name).then(data => {
                    navigate(`/visitor/${id}`)
                })


            } else {
                console.log("wrong password");
            }
        })

    }

    return (
        <AuthWrapper>
            <InputWrapper onSubmit={handleSubmit}>
                <HeaderWrapper>Visitor Authentication</HeaderWrapper>
                <AuthInput
                    placeholder={'please type in your password'}
                    ref={passwordRef}
                    type={"password"}
                    value={password}
                    onChange={() => setPassword(passwordRef.current.value)}/>
                <SubmitButton type={"submit"}>Submit</SubmitButton>
            </InputWrapper>
        </AuthWrapper>

    )
}

const AuthWrapper = styled.div`
  display: grid;
  height: 100vh;
  place-content: center;

  background-image: linear-gradient(
          -45deg,
          rgba(59, 114, 254, 0.77) 0%,
          rgba(96, 245, 43, 0.4774) 100%);
`

const InputWrapper = styled.form`
  width: 500px;
  height: 200px;
  
  border-radius: 1rem;
  background-color: white;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  padding: 1rem 2rem;
`

const HeaderWrapper = styled.h1`
  text-align: center;
`

const AuthInput = styled.input`
  display: inline-block;
  margin: 1rem;
`

const SubmitButton = styled.button`
  display: block;
  margin: auto auto;
  width: 5.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  
  background-color: ${COLORS.LIGHTBLACK};
  color: white;
  
  &:hover {
    filter: brightness(120%);
    transition: filter 250ms;
  }
`

