import styled from "styled-components/macro"
import { useAuth } from "../context/AuthProvider";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import ChatPage from "./ChatPage";
import {onChildAdded, ref} from "firebase/database";
import {FetchChannelMessage} from "../api/FetchChannelMessage";
import {db} from "../firebase/customFirebase";
import {FetchVisitor} from "../api/FetchVisitor";
import {LoadChannelVisitor} from "../api/LoadInfo";

export default function Visitor() {
    const [visitor, setVisitor] = useState({})
    const { id } = useParams()
    const auth = useAuth();


    const [chatMessaging, setChatMessaging] = useState([]);
    const [channel, setChannel] = useState("");
    const navigate = useNavigate()
    // handle input message


    // Login
    useEffect(() => {
        if (auth.visitor === null){
            navigate(`/visitor/auth/${id}`)
        } else{
            FetchVisitor(`visitors/${id}`).then(v => {
                setVisitor(v);
                const ch = v.channel
                const channelId = LoadChannelVisitor(ch).channelId
                setChannel(channelId)
                console.log(`successfully set up channel ${channelId}`)

                FetchChannelMessage(channel).then(dataSnapshot => {
                    setChatMessaging(dataSnapshot.message);
                })
            })
        }

    }, [auth.visitor, id, navigate])

    console.log(`current channel is channel/${channel}`)

    //Update chat messages
    useEffect(() => {
        if (channel !== "") {
            onChildAdded(ref(db, `channel/${channel}`), () => {
                FetchChannelMessage(channel).then(dataSnapshot => {
                    setChatMessaging(dataSnapshot.message);
                })
            })
        }
    }, [channel, setChatMessaging])

    //console.log(channelBook, styleState)
    console.log(visitor);
    return (
        <PageWrapper>
            <ChatPage
                chatMessaging={chatMessaging}
                userName={visitor.name}
                channel={channel}
                friend={visitor.hostname}/>
        </PageWrapper>
    )

}

const PageWrapper = styled.div`
  height: 100vh;
  display: grid;
  
  --padding: 0.6rem;
`