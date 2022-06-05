import ChatCard from "../ui/ChatCard";
import {GetAvatar} from "../tools/GetAvatar";
import AddButton from "../ui/AddButton";
import styled from "styled-components/macro";
import {COLORS} from "../contants/Contants";
import {useEffect, useRef, useState} from "react";
import MainHeader from "./MainHeader";
import {UseMessage} from "../tools/UseMessage";

export default function ChatPage ({ chatMessaging, channel, friend, user }) {

    const messageRef = useRef("")
    const chatPageRef = useRef()
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

    //console.log(chatMessaging)
    useEffect(() => {
        chatPageRef.current.scrollTop = chatPageRef.current.scrollHeight
        //console.log('page change')
    }, [chatPageRef.current, chatMessaging])


    return (
        <ChatPageWrapper>
            <MainHeader name={friend}/>
            <MainChatPage ref={chatPageRef}>
                {chatMessaging.sort((a,b) => a.time.getTime() - b.time.getTime()).map(item => <ChatCard
                    key={item.time.getTime()}
                    name={item.name}
                    avatar={GetAvatar(item.name === friend? "Alien":"human")}
                    time={item.time}
                    message={item.message}
                    reverse={item.name === "me"}
                    style={item.style}
                    animation={item.animation}
                    color={item.name === friend? "blue":"purple"}/>)}
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
  height: 100%;
  grid-template-rows: 4rem 1.5fr 0.1fr;
  overflow: hidden;
`

const MainChatPage = styled.div`
  background-color: ${COLORS.LIGHTBLUE};
  overflow-y: scroll;
`

const TypeBar = styled.div`
  overflow: hidden;
  width: 100%;
  
  filter: drop-shadow(1px 2px 3px ${COLORS.GRAY["500"]});
`

const TypeInput = styled.input`
  width: 100%;
  height: 100%;
  text-indent: 1.8rem;
  border: 1px solid ${COLORS.GRAY["500"]};
  border-radius: 8px;
  
  
  &:focus{
    outline: none;
  }
`

const InputAddButton = styled.div`
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
`