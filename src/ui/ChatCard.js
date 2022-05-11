import styled from "styled-components/macro";
import {COLORS} from "../contants/Contants";
import Icon from "./Icon";

export default function ChatCard ({ avatar, name, time, message, reverse}) {
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();


    return (
        <Card>
            <AvatarWrapper>
                <Icon color={name==="human"?COLORS.PURPLE:COLORS.BLUE} shape={"circle"} size={"medium"} img={avatar} />
            </AvatarWrapper>
            <MessageWrapper>
                <InformationWrapper>
                    <div style={{display: "block", marginRight: "0.5rem"}}>{name}</div>
                    <div style={{display: "block", fontSize: "0.7rem", fontStyle: "italic", "color": COLORS.GRAY["500"]}}>{`${date}/${month}/${year}`}</div>
                </InformationWrapper>
                <MessageBubble>
                    {message}
                </MessageBubble>
            </MessageWrapper>
        </Card>
    )
}

const Card = styled.div`
  display: flex;
  flex-direction: row;
  
  padding: 0.5rem;
`

const AvatarWrapper = styled.div`
  padding-right: 0.8rem;
`

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

const MessageWrapper = styled.div`
    
`

const MessageBubble = styled.div`
  width: fit-content;
  max-width: 500px;
  background-color: ${COLORS.LIGHTGREEN};
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
`