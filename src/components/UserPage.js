import {useEffect, useState, useReducer} from "react";
import styled from "styled-components/macro"
import arrow from "../assets/utils/Arrow_white.png"
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase/customFirebase";
import { ref, onChildAdded, onChildChanged } from "firebase/database";
import Channel from "./Channel";
import SideBar from "./SideBar";
import ChatPage from "./ChatPage";
import BlankPage from "./BlankPage";
import {FetchChannel} from "../tools/FetchChannel";

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

const UserPage = () => {
    //const user = useParams()
    const { user, finishTutorial } = useAuth()

    console.log(user)

    const [firstUse, setFirstUse] = useState(user.firstUse)
    const [phase, setPhase] = useState(0)
    const [channelBook, setChannelBook] = useState([]);
    const [styleState, dispatch] = useReducer(styleDispatch,
        {openChannel: false, openChat: false, pageStyle: PAGE_STYLES["default"]});
    const [chatMessaging, setChatMessaging] = useState([]);
    const [channel, setChannel] = useState("");
    const [friend, setFriend] = useState({name: "", id: 0})



    useEffect(() => {
        if (firstUse) {
            setPhase(1)
        }
    }, [firstUse])

    //Update chat messages
    useEffect(() => {
        console.log(channel)
        if (channel !== "") {
            onChildAdded(ref(db, `channel/${channel}`), dataSnapshot => {
                const currDate = new Date(dataSnapshot.key)
                const currMessage = dataSnapshot.val().message
                const currName = dataSnapshot.val().name

                if (chatMessaging.find( item => item.time.getTime() === currDate.getTime())){
                    //console.log("same key encounter")
                } else {
                    setChatMessaging(prev => [...prev, {message: currMessage, name: currName, time: currDate, animation: true}])
                }

            })
        }

        onChildAdded(ref(db, `users/${user.uid}/channels/singular`), () => {
            FetchChannel(`users/${user.uid}/channels/singular`).then(data => {
                setChannelBook(data)
            })
        })

        onChildChanged(ref(db, `users/${user.uid}/channels/singular`), () => {
            FetchChannel(`users/${user.uid}/channels/singular`).then(data => {
                setChannelBook(data)
            })
        })
    }, [db, channel, ref, onChildAdded])

    //console.log(channelBook, styleState)
    //console.log(chatMessaging)
    //console.log(user)

    const moveToNextPhase = () => {
        if (firstUse) {
            if (phase === 0) {
                setPhase(1)
            } else if (phase === 1) {
                setPhase(2)
            } else {
                setPhase(0)
                setFirstUse(false)
                finishTutorial({id: user.uid})
            }
        }
    }

    console.log(phase)

    return (
        <PageWrapper style={styleState.pageStyle}>
            <SideBar
                styleDispatch={dispatch}
                setChannelBook={setChannelBook}
                user={user.uid}
                movePhase={moveToNextPhase}/>
            {styleState.openChannel && <Channel
                user={user.uid}
                setChannel={setChannel}
                channelBook={channelBook}
                setChatMessaging={setChatMessaging}
                setMsgRef={setMsgRef}
                styleDispatch={dispatch}
                setFriend={setFriend}
                movePhase={moveToNextPhase}/>}
            {styleState.openChat?
                <ChatPage
                    chatMessaging={chatMessaging}
                    userName={user.username}
                    channel={channel}
                    friend={friend}/>:
                <BlankPage/>}
            {phase === 1? <FirstUseGuide>
                <Arrow src={arrow}/>
                <Guide>Click channel button to expand channel lists</Guide>
            </FirstUseGuide>: phase === 2 && <FirstUseNext>
                <Arrow src={arrow} />
                <Guide>Click add button to invite your friends!</Guide>
            </FirstUseNext>}
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

const FirstUseGuide = styled.div`
  position: fixed;
  top: 0;
  left: 100px;
  width: 100%;
  height: 100%;
  
  background-color: black;
  opacity: 60%;
  
`

const Arrow = styled.img`
  position: absolute;
  top: 10%;
  left: 0.5%;
`

const Guide = styled.div`
  color: white;
  font-size: 2rem;
  padding-left: 2rem;
  
  position: absolute;
  top: 3.5%;
`

const FirstUseNext = styled(FirstUseGuide)`
  left: calc(100px + 10%);
`