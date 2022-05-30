import SearchBar from "../ui/SearchBar";
import Icon from "../ui/Icon";
import {COLORS} from "../contants/Contants";
import settings from "../assets/utils/settings.png";
import styled from "styled-components/macro";

export default function MainHeader ({ name }) {
    return (
        <HeaderWrapper>
            <h1 style={{display: 'block', marginRight: 'auto'}}>{name}</h1>
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
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
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