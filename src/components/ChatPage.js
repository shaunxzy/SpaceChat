import Channel from "./Channel";
import ChatCard from "../ui/ChatCard";
import {GetAvatar} from "../tools/GetAvatar";
import AddButton from "../ui/AddButton";
import styled from "styled-components/macro";
import {COLORS} from "../contants/Contants";
import {useRef, useState} from "react";
import MainHeader from "./MainHeader";
import {UseMessage} from "../tools/UseMessage";
import {useAuth} from "../context/AuthProvider";

export default function ChatPage ({ chatMessaging, channel, friend, user }) {

    const messageRef = useRef("")
    const [inputValue, setInputValue] = useState("")


    //console.log(chatMessaging)

    const EnterMessage = (e) => {
        if(e.key === "Enter") {
            if (messageRef.current.value !== "") {
                console.log(`setting message in ${channel}`)
                UseMessage({user: user, message: messageRef.current.value, time: Date(), channel: channel});
            }
            setInputValue("");
        }
    }

    console.log(chatMessaging)

    return (
        <ChatPageWrapper>
            <MainHeader name={friend}/>
            <MainChatPage>
                {chatMessaging.sort((a,b) => a.time.getTime() - b.time.getTime()).map(item => <ChatCard
                    key={item.time.getTime()}
                    name={item.name}
                    avatar={GetAvatar(item.name)}
                    time={item.time}
                    message={item.message}
                    reverse={item.name === "me"}
                    style={item.style}/>)}
            </MainChatPage>
            <TypeBar>
                <TypeInput
                    placeholder={"Type..."}
                    ref={messageRef}
                    onChange={() => setInputValue(messageRef.current.value)}
                    value={inputValue}
                    onKeyUp={EnterMessage}/>
                <InputAddButton>
                    <AddButton size={"small"}/>
                </InputAddButton>
            </TypeBar>
        </ChatPageWrapper>
    )
}


const ChatPageWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-rows: 4rem 1fr;
`

const MainChatPage = styled.div`
  background-color: ${COLORS.LIGHTBLUE};
`

const TypeBar = styled.div`
  position: fixed;
  bottom: 5%;
  left: 25%;
  height: 2rem;
  overflow: hidden;
  width: 85%;
  
  filter: drop-shadow(1px 2px 3px ${COLORS.GRAY["500"]});
`

const TypeInput = styled.input`
  width: 70%;
  text-indent: 1.5rem;
  border: 1px solid ${COLORS.GRAY["500"]};
  border-radius: 8px;
  
  
  &:focus{
    outline: none;
  }
`

const InputAddButton = styled.div`
  position: absolute;
  top: -0.25rem;
  left: 0.2rem;
`