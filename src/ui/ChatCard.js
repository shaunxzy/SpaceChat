import styled, {keyframes, css} from "styled-components/macro";
import {COLORS} from "../contants/Contants";
import Icon from "./Icon";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  } to {
      transform: translateX(0);
    }
`

const slideInAnimation = css`
  animation: ${slideIn} 500ms backwards ease-in-out;
`

export default function ChatCard ({ avatar, name, time, message, animation}) {
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();


    //console.log(animationStyle)

    return (
        <Card animation={animation}>
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
  animation: ${props => props.animation && css`${slideIn} 100ms backwards ease-in-out`}
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