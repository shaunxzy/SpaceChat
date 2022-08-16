import {DialogOverlay, DialogContent} from "@reach/dialog";
import styled, {keyframes} from "styled-components/macro"
import {useRef, useState} from "react";
import {COLORS} from "../contants/Contants";
import "@reach/dialog/styles.css"
import inviteIcon from "../assets/utils/inviteIcon.png"
import { RegisterVisitor } from "../api/RegisterVisitor";
import {useAuth} from "../context/AuthProvider";

export default function InviteModal ( { showDialog, close }) {

    const nameRef = useRef("");
    const passwordRef = useRef("");
    const copyButtonWrapper = useRef("")



    const [displayState, setDisplayState] = useState({display: "landing"});
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visitor, setVisitor] = useState({link: "", password: ""})
    const [copySuccess, setCopySuccess] = useState(false)

    //console.log(user)
    const { user } = useAuth();

    const handleSubmit = () => {
        console.log(user.username)
        RegisterVisitor({host: user.uid, hostname: user.username, name: name, password: password}).then(visitor => {
            setVisitor(visitor);
        })

        setName("")
        setPassword("")
        setDisplayState({display: "invite"})
    }

    const closeDialog = () => {
        close();
        setDisplayState({display: "landing"});
        setCopySuccess(false);
    }

    return (
        <DialogOverlay
            isOpen={showDialog}
            onDismiss={closeDialog}
            style={{
                background: "hsla(0.00,0.00%,90%, 0.9)",
                position: "fixed",
                height: "100vh"}}>
            <ModalWrapper aria-label={'invite friend'}>
                <Header>
                    <CloseButton onClick={closeDialog}>X</CloseButton>
                </Header>
                {displayState.display === "landing" &&
                <LandingWrapper>
                    <InviteWrapper onClick={() => setDisplayState({display: "form"})}>
                        <InviteImg alt={"invite your friend"} src={inviteIcon}/>
                        <p style={{position: "absolute",
                            bottom: "2%",
                            left: "25%",
                            fontSize: "2rem",
                            color: COLORS.GRAY["500"]}}>Invite you friend</p>
                    </InviteWrapper>
                </LandingWrapper>}
                {displayState.display === "form" && <InviteForm>
                    <InputWrapper>
                        <label htmlFor={'name'}>Name</label>
                        <input className={'name'}
                               ref={nameRef}
                               value={name}
                               onChange={() => setName(nameRef.current.value)}/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor={'password'}>Password</label>
                        <input className={'password'}
                               value={password}
                               ref={passwordRef}
                               onChange={() => setPassword(passwordRef.current.value)}/>
                    </InputWrapper>
                    <ButtonWrapper>
                        <ActionButton
                            onClick={closeDialog}>Cancel</ActionButton>
                        <ActionButton
                            onClick={handleSubmit}>Invite</ActionButton>
                    </ButtonWrapper>
                </InviteForm>}
                {displayState.display === "invite" &&
                <InviteResult>
                    <p>Link Created! Copy the following link and send it to your friend</p>
                    <p>https://spacechat.net/{visitor.link}</p>
                    <p>Your friend need the following password to get access</p>
                    <p>Password: {visitor.password}</p>
                    <CopyButtonWrapper ref={copyButtonWrapper}>
                        <CopyButton onClick={() => {

                            navigator.clipboard.writeText(`https://spacechat.net/{visitor.link}`);
                            setCopySuccess(true);
                        }}>Copy{copySuccess && <CopySuccessPopup>Copy Succeeds!</CopySuccessPopup>}</CopyButton>
                    </CopyButtonWrapper>
                </InviteResult>}
            </ModalWrapper>
        </DialogOverlay>
    )
}

const fadeAway = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

const ModalWrapper = styled(DialogContent)`
  height: 40%;
  width: 35%;
  border-radius: 1rem;
  padding: 0;
  display: grid;
  grid-template-rows: 0.08fr 1fr;
`



const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem 0;
  border-bottom: 1px solid ${COLORS.GRAY["500"]};
`

const CloseButton = styled.button`
  margin-right: 1%;
  
  background-color: white;
  border: none;
  font-weight: 500;
  
`

const LandingWrapper = styled.div`
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: stretch;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
`

const InviteWrapper = styled.button`
  width: 100%;
  height: 100%;
  position: relative;
  
  border: none;
  background-color: white;
  transition: filter 500ms;

  &:hover{
    filter: brightness(85%);
    transition: filter 250ms;
  }
`

const InviteImg = styled.img`
  height: 90%;
  object-fit: cover;
`

const InviteForm = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 4rem;


`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ActionButton = styled.button`
  border: none;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${COLORS.LIGHTBLACK};
  transition: opacity 100ms;
  
  &:hover{
    opacity: 85%;
    transition: opacity 100ms;
  }
`

const InviteResult = styled.div`
    padding: 0.5rem 1rem;
`

const CopyButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CopyButton = styled(ActionButton)`

`

const CopySuccessPopup = styled.div`
  position: fixed;
  color: white;
  opacity: 0;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${COLORS.LIGHTBLACK};
  left: 42.5%;
  top: 25%;
  pointer-events: none;
  animation: ${fadeAway} 800ms forwards;
  
  ${CopyButton}:active & {
    animation: ${fadeIn} 1ms forwards;
  }
`






