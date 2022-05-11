import styled from "styled-components/macro"
import Icon from "./Icon";
import {COLORS} from "../contants/Contants"

const getColorFromState = (state) => {
    switch (state){
        case "online":
            return COLORS.GREEN
        default:
            return COLORS.Orange
    }

}

export default function ChannelCard ({ avatar, name, state, click }) {
    return (
        <Card onClick={click}>
            <AvatarWrapper>
                <Icon size={"small"} shape={"circle"} img={avatar} color={COLORS.BLUE} type={"none"}/>
            </AvatarWrapper>
            <StateWrapper style={{"--color": getColorFromState(state)}}></StateWrapper>
            <Name>{name}</Name>
        </Card>
    );
}

const Card = styled.button`
  width: 95%;
  margin: auto;
  background-color: ${COLORS.GRAY["200"]};
  overflow: hidden;
  position: relative;
  padding: 0.5rem 0.5rem;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AvatarWrapper = styled.div`
  display: grid;
  place-content: center;
`

const StateWrapper = styled.div`
  height: 8px;
  width: 8px;
  background-color: var(--color);
  border-radius: 1000px;
  
  position: absolute;
  top: 63%;
  left: 14%;
  
`

const Name = styled.div`
  margin-left: 1rem;
`