import styled from "styled-components/macro"
import { useAuth } from "../context/AuthProvider";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useReducer, useRef, useState} from "react";

import ChatPage from "./ChatPage";
import {onChildAdded, ref} from "firebase/database";
import {FetchMessage} from "../tools/FetchMessage";
import {db} from "../firebase/customFirebase";
import {FetchVisitor} from "../tools/FetchVisitor";
import {LoadChannelVisitor} from "../tools/LoadInfo";

export default function Visitor() {
    const [visitor, setVisitor] = useState({})
    const navigator = useNavigate();
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

                FetchMessage(`channel/${channelId}`).then(msg => {
                    if (msg !== undefined) {
                        console.log('found channel')
                        setChatMessaging(msg);
                    } else {
                        console.log('no channel found')
                    }
                })
            })
        }

    }, [auth.visitor, id])

    console.log(`current channel is channel/${channel}`)

    //Update chat messages
    useEffect(() => {
        if (channel !== "") {
            onChildAdded(ref(db, `channel/${channel}`), data => {
                FetchMessage(`channel/${channel}`).then(data => {
                    if (data !== null) {
                        setChatMessaging(data);
                    }
                })
            })
        }
    }, [db, channel, setChatMessaging])

    //console.log(channelBook, styleState)
    console.log(visitor);
    return (
        <PageWrapper>
            <ChatPage
                chatMessaging={chatMessaging}
                user={visitor.name}
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