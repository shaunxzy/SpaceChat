import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState, useReducer} from "react";
import styled from "styled-components/macro"

import { useAuth } from "../context/AuthProvider";
import { auth, db } from "../firebase/customFirebase";
import { ref, set, get, child, onChildAdded } from "firebase/database";
import { FetchMessage } from "../tools/FetchMessage";
import Channel from "./Channel";
import SideBar from "./SideBar";
import ChatPage from "./ChatPage";
import BlankPage from "./BlankPage";
import {FetchChannel} from "../tools/FetchChannel";

const DUMMY_CHANNEL = [
    {name: "alien", channelId: "123"}
]

const DUMMY_CHATBOOK = [
    {name: "me", message: "hello", time: new Date('December 17, 1995 03:24:00')},
    {name: "alien", message: "First Contact Protocol Initiated", time: new Date('December 17, 1995 03:24:50')},
    {name: "alien", message: "Friend Mod Activated", time: new Date('December 17, 1995 03:25:10')},
    {name: "alien", message: "hello", time: new Date('December 17, 1995 03:26:10')},
]

const PAGE_STYLES = {
    "default": { gridTemplateColumns: "100px 1fr" },
    "pageShow": { gridTemplateColumns: "100px 0.2fr 1fr" }
}

const styleDispatch = (state, action) => {
    switch (action.type) {
        case "channel":
            return {...state, openChannel: !state.openChannel, pageStyle:
                    state.openChannel?PAGE_STYLES["default"]:PAGE_STYLES["pageShow"]}
        case "chat":
            return {...state, openChat: true}
        default:
            return state;
    }

}

const UserPage = props => {
    //const user = useParams()
    const {id} = useParams()
    const { user } = useAuth()

    //console.log(user)

    const [channelBook, setChannelBook] = useState([]);
    const [styleState, dispatch] = useReducer(styleDispatch,
        {openChannel: false, openChat: false, pageStyle: PAGE_STYLES["default"]});
    const [chatMessaging, setChatMessaging] = useState([]);
    const [msgRef, setMsgRef] = useState(undefined);
    const [channel, setChannel] = useState("");
    const [friend, setFriend] = useState("")

    const navigate = useNavigate();


    //Update chat messages
    useEffect(() => {
        console.log(`channel/${channel}`)
        console.log(user)
        if (channel !== "") {
            onChildAdded(ref(db, `channel/${channel}`), data => {
                FetchMessage(`channel/${channel}`).then(data => {
                    if (data !== undefined) {
                        setChatMessaging(data);
                    }
                })
            })
        }

        onChildAdded(ref(db, `users/${user.uid}/channels/singular`), data => {
            FetchChannel(`users/${user.uid}/channels/singular`).then(data => {
                console.log(data)
                setChannelBook(data)
            })
        })
        console.log(user)
    }, [db, channel, ref, onChildAdded])

    //console.log(channelBook, styleState)
    //console.log(chatMessaging)
    console.log(user)

    return (
        <PageWrapper style={styleState.pageStyle}>
            <SideBar
                styleDispatch={dispatch}
                setChannelBook={setChannelBook}
                user={user.uid}/>
            {styleState.openChannel && <Channel
                user={user.uid}
                setChannel={setChannel}
                channelBook={channelBook}
                setChatMessaging={setChatMessaging}
                setMsgRef={setMsgRef}
                styleDispatch={dispatch}
                setFriend={setFriend}/>}
            {styleState.openChat?
                <ChatPage
                    chatMessaging={chatMessaging}
                    user={user.username}
                    channel={channel}
                    friend={friend}/>:
                <BlankPage/>}
        </PageWrapper>
    )

}

//
export default UserPage;

const PageWrapper = styled.div`
  height: 100vh;
  display: grid;
  
  --padding: 0.6rem;
`
