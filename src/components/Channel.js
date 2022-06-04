import SearchBar from "../ui/SearchBar";
import ChannelCard from "../ui/ChannelCard";
import {GetAvatar} from "../tools/GetAvatar";
import AddButton from "../ui/AddButton";
import {FetchMessage} from "../tools/FetchMessage";
import {ref} from "firebase/database";
import {db} from "../firebase/customFirebase";
import styled from "styled-components/macro";
import {COLORS} from "../contants/Contants";
import {useState} from "react";
import InviteModal from "./InviteModal";

export default function Channel ({ user, channelBook, setChannel, setMsgRef, setChatMessaging, styleDispatch, setFriend }) {

    const [addModal, setAddModal] = useState(false);
    const open = () => {setAddModal(true)};
    const close = () => {setAddModal(false)};

    // display chat page of a certain channel
    const RetrieveChatBook = async ( {type, channel, friend} ) => {

        setFriend(friend)
        setMsgRef(ref(db, `channel/${channel}`))
        FetchMessage(`channel/${channel}`).then(data => {
            //console.log(data)
            setChatMessaging(data);
        }).then(data =>
            setChannel(channel))

        styleDispatch({type: "chat"});
    }

    //console.log(channelBook)


    return (
        <ChannelWrapper>
            <SearchBar />
            <ChannelCardWrapper>
                {channelBook.map(item =>
                    <ChannelCard
                        key={item.channelId}
                        name={item.name}
                        avatar={GetAvatar(item.name)}
                        state={item.state}
                        click={() => RetrieveChatBook({type: 'singular', channel: item.channelId, friend:item.name})}/>)}
            </ChannelCardWrapper>
            <AddButtonWrapper>
                <AddButton size={"medium"} onClick={open}/>
            </AddButtonWrapper>
            <InviteModal open={open} close={close} showDialog={addModal} user={user}/>
        </ChannelWrapper>
    )
}

const ChannelWrapper = styled.div`
    border: 1px solid ${COLORS.GRAY["300"]};
    padding: 1rem 1rem;
`

const ChannelCardWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
`

const AddButtonWrapper = styled.div`
  display: grid;
  place-content: center;
  padding: var(--padding);
`