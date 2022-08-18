import SearchBar from "../ui/SearchBar";
import ChannelCard from "../ui/ChannelCard";
import {GetAvatar} from "../api/GetAvatar";
import AddButton from "../ui/AddButton";
import {FetchChannelMessage} from "../api/FetchChannelMessage";
import styled, {keyframes} from "styled-components/macro";
import {COLORS} from "../contants/Contants";
import {useState} from "react";
import InviteModal from "./InviteModal";

export default function Channel ({ user,
                                     channelBook,
                                     setChannel,
                                     setChatMessaging,
                                     styleDispatch,
                                     setFriend,
                                     movePhase }) {

    const [addModal, setAddModal] = useState(false);
    const open = () => {
        movePhase();
        setAddModal(true)};
    const close = () => {setAddModal(false)};

    // display chat page of a certain channel
    const RetrieveChatBook = ( {channel, friend, friendId} ) => {

        setFriend({name: friend, id: friendId})
        FetchChannelMessage(channel).then(dataSnapshot => {
            //console.log(data)

            setChatMessaging(dataSnapshot.message);
        }).then(() =>
            setChannel(channel))

        styleDispatch({type: "chat"});
    }

    //console.log(channelBook)
    const compareFunc = (a, b) => {

        if (a.timeStamp === undefined) {
            if (b.timeStamp === undefined) {
                return 0
            } else {
                return 1
            }
        } else {
            if (b.timeStamp === undefined) {
                return -1
            } else {
                return b.timeStamp.milisec - a.timeStamp.milisec
            }
        }
    }

    return (
        <ChannelWrapper>
            <SearchBar />
            <ChannelCardWrapper>
                {channelBook.sort(compareFunc).map(item =>
                    <ChannelCard
                        key={item.channelId}
                        name={item.name}
                        avatar={GetAvatar("Alien")}
                        state={item.state}
                        click={() => RetrieveChatBook(
                            {channel: item.channelId, friend:item.name, friendId: item.id})}/>)}
            </ChannelCardWrapper>
            <AddButtonWrapper>
                <AddButton size={"medium"} onClick={open}/>
            </AddButtonWrapper>
            <InviteModal open={open} close={close} showDialog={addModal} user={user}/>
        </ChannelWrapper>
    )
}

const slide_in = keyframes`
  from {
    transform: translateX(-100%);  
  } to {
    transform: translateX(0);
    }
`

//animation: ${slide_in} 250ms backwards ease-in-out;

const ChannelWrapper = styled.div`
    border: 1px solid ${COLORS.GRAY["300"]};
    padding: 1rem 1rem;
    overflow: hidden;
    
    animation: ${slide_in} 200ms backwards ease-in-out;
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