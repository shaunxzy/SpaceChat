import {Route, Routes, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components/macro"
import {COLORS} from "../../contants/Contants";
import { getMessaging, onMessage } from "firebase/messaging";

import SearchBar from "../../ui/SearchBar";
import PlusButton from "../../ui/PlusButton";
import ChannelCard from "../../ui/ChannelCard";
import Icon from "../../ui/Icon";
import ChatCard from "../../ui/ChatCard";

import human from "../../assets/utils/human.png";
import alien from "../../assets/utils/alien.png";
import radar from "../../assets/utils/radar.png";
import cup from "../../assets/utils/cup.png";
import emoji from "../../assets/utils/emoji.png"
import settings from "../../assets/utils/settings.png"

import { UseMessage } from "../../tools/UseMessage"
import { useAuth } from "../../context/AuthProvider";
import { auth, db } from "../../firebase/customFirebase";
import { ref, set, get, child } from "firebase/database";
import { LoadMessage } from "../../tools/LoadMessage";
import { GetAvatar } from "../../tools/GetAvatar";

const DUMMY_CHANNEL = [
    {name: "alien", state: "offline", avatar: alien}
]

const DUMMY_CHATBOOK = [
    {name: "me", message: "hello", time: new Date('December 17, 1995 03:24:00')},
    {name: "alien", message: "First Contact Protocol Initiated", time: new Date('December 17, 1995 03:24:50')},
    {name: "alien", message: "Friend Mod Activated", time: new Date('December 17, 1995 03:25:10')},
    {name: "alien", message: "hello", time: new Date('December 17, 1995 03:26:10')},
]

const UserPage = props => {
    //const user = useParams()

    const user = "me";

    const messageRef = useRef();

    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [chatMessaging, setChatMessaging] = useState([]);
    const myAuth = useAuth();

    const EnterMessage = (e) => {
        if(e.key === "Enter") {
            UseMessage({usr: 'me', message: messageRef.current.value});
            setInputValue("");
        }
    }

    const RetrieveChatBook = ( {type, channel} ) => {
        const dbRef = ref(db)
        console.log("retrieving...");
        get(child(dbRef, `users/${user}/channels/${type}/${channel}`)).then(snapshot => {
            if (snapshot.exists()) {
                const messageString = snapshot.val();
                const messageMap = LoadMessage(messageString);
                setChatMessaging(messageMap);
                //console.log(LoadMessage(messageString));
            } else {
                console.log("No data available")
            }
        }).catch(e => {
            console.error(e);
        })
    }

    useEffect(() => {
        myAuth.login("zyxuxmu@gmail.com", "123123");




    }, [])

    return (
        <PageWrapper>
            <SideBarWrapper>
                <UserIconWrapper>
                    <Icon color={COLORS.PURPLE} size={'medium'} shape={"circle"} img={human}/>
                </UserIconWrapper>
                <GroupSelectWrapper>
                    <SingleGroup>
                        <Icon color={COLORS.BLUE} size={'medium'} img={cup}/>
                    </SingleGroup>
                    <MultiGroup>
                        <Icon color={COLORS.GREEN} size={'medium'} img={radar}/>
                    </MultiGroup>
                </GroupSelectWrapper>
                <PlusButtonWrapper>
                    <PlusButton size={"medium"}/>
                </PlusButtonWrapper>
            </SideBarWrapper>
            <ChannelWrapper>
                <SearchBar />
                {DUMMY_CHANNEL.map(item =>
                    <ChannelCard
                        key={item.name}
                        name={item.name}
                        avatar={GetAvatar(item.name)}
                        state={item.state}
                        click={() => RetrieveChatBook({type: 'singular', channel: item.name})}/>)}
                <PlusButtonWrapper>
                    <PlusButton size={"medium"} />
                </PlusButtonWrapper>
            </ChannelWrapper>
            <ChatPageWrapper>
                <MainHeader>
                    <h1 style={{display: 'block', marginRight: 'auto'}}>Stranger</h1>
                    <UtilsBar>
                        <SearchBar />
                        <Settings>
                            <Icon
                                color={COLORS.WHITE}
                                img={settings}
                                shape={"circle"}
                                size={"small"} />
                        </Settings>
                    </UtilsBar>
                </MainHeader>
                <ChatPage>
                    {chatMessaging.map(item => <ChatCard
                        key={item.time}
                        name={item.name}
                        avatar={GetAvatar(item.name)}
                        time={item.time}
                        message={item.message}
                        reverse={item.name === "me"}/>)}
                </ChatPage>
                <TypeBar>
                    <TypeInput
                        placeholder={"Type..."}
                        ref={messageRef}
                        value={inputValue}
                        onKeyPress={EnterMessage}
                        onChange={() => setInputValue(messageRef.current.value)}/>
                    <AddButtonWrapper>
                        <PlusButton size={"small"}/>
                    </AddButtonWrapper>
                    <EmojiButtonWrapper>
                        <Icon color={"none"} size={"small"} img={emoji} shape={"circle"} />
                    </EmojiButtonWrapper>
                </TypeBar>
            </ChatPageWrapper>
        </PageWrapper>
    )

}

export default UserPage;

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.5fr 8fr;
  height: 100vh;
  
  --padding: 0.6rem;
  
`

const SideBarWrapper = styled.div`
  border: 1px solid ${COLORS.GRAY["300"]};
  padding: var(--padding) calc(var(--padding) / 10);
`

const UserIconWrapper = styled.div`
  border-bottom: 2px solid ${COLORS.GRAY["500"]};
  margin: 0 1rem;
  padding-bottom: var(--padding);
  display: grid;
  place-content: center;
`

const ChannelWrapper = styled.div`
    border: 1px solid ${COLORS.GRAY["300"]};
`

const ChannelCardWrapper = styled.div`
  display: grid;
  place-content: center;
  grid-template-rows: 1fr;
`

const GroupSelectWrapper = styled.div`
  display: grid;
  place-content: center;
  gap: var(--padding);
  padding: var(--padding) 0 var(--padding) 0; 
  margin: 0 1rem;
  border-bottom: 2px solid  ${COLORS.GRAY["500"]};
`

const SingleGroup = styled.div`
  
`

const PlusButtonWrapper = styled.div`
  display: grid;
  place-content: center;
  padding: var(--padding);
`


const MultiGroup = styled.div`

`

const ChatPageWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-rows: 4rem 1fr;
`

const MainHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 1rem;
  background-color: ${COLORS.GRAY["100"]};
  
  border-bottom: 1px solid  ${COLORS.GRAY["300"]};
`

const UtilsBar = styled.div`
  display: flex;
  position: relative;
  padding-right: 4rem;
  flex-direction: row;
  justify-content: space-between;
`

const Settings = styled.div`
  position: absolute;
  right: 0;
  top: 0.8rem;
  display: grid;
  place-content: center;
  margin: 0 1rem;
  
  transition: transform 500ms ease-in-out;
  
  &:hover {
    transform: rotate(90deg);
    transition: transform 250ms ease-in-out;
  }
`

const ChatPage = styled.div`
  background-color: ${COLORS.LIGHTBLUE};
`

const TypeBar = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  height: 2rem;
  overflow: hidden;
  width: 85%;
  
  filter: drop-shadow(1px 2px 3px ${COLORS.GRAY["500"]});
`

const TypeInput = styled.input`
  width: 100%;
  text-indent: 1.5rem;
  border: 1px solid ${COLORS.GRAY["500"]};
  border-radius: 8px;
  
  &:focus{
    outline: none;
  }
`

const AddButtonWrapper = styled.div`
  position: absolute;
  top: -0.25rem;
  left: 0.2rem;
`

const EmojiButtonWrapper = styled.div`
  position: absolute;
  top: -0.125rem;
  right: 0.2rem;
  
`