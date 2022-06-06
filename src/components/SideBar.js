import Icon from "../ui/Icon";
import {COLORS} from "../contants/Contants";
import human from "../assets/utils/human.png";
import cup from "../assets/utils/cup.png";
import styled from "styled-components/macro";
import {FetchChannel} from "../tools/FetchChannel";


export default function SideBar ({ styleDispatch, setChannelBook, user, movePhase }) {
    return (
        <SideBarWrapper>
            <UserIconWrapper>
                <Icon color={COLORS.PURPLE} size={'medium'} shape={"circle"} img={human}/>
            </UserIconWrapper>
            <GroupSelectWrapper>
                <SingleGroup onClick={async () => {
                    await FetchChannel(`users/${user}/channels/singular`).then(
                        data => {
                            //console.log(data)
                            movePhase();
                            setChannelBook(data);
                        }
                    ).then(() => {
                        styleDispatch({type: "channel"});
                    })

                }}>
                    <Icon color={COLORS.BLUE} size={'medium'} img={cup}/>
                </SingleGroup>
            </GroupSelectWrapper>
        </SideBarWrapper>
    )
}


const SideBarWrapper = styled.div`
  border: 1px solid ${COLORS.GRAY["300"]};
  padding: var(--padding) calc(var(--padding) / 10);
  background-color: white;
  
  isolation: isolate;
  z-index: 1;
`

const UserIconWrapper = styled.div`
  border-bottom: 2px solid ${COLORS.GRAY["500"]};
  margin: 0 1rem;
  padding-bottom: var(--padding);
  display: grid;
  place-content: center;
  filter: brightness(100%);
  transition: filter 150ms ease-in-out;
  
  &:hover{
    filter: brightness(80%);
    transition: filter 100ms ease-in-out;
  }
`


const GroupSelectWrapper = styled.div`
  display: grid;
  place-content: center;
  gap: var(--padding);
  padding: var(--padding) 0 var(--padding) 0; 
  margin: 0 1rem;
  border-bottom: 2px solid  ${COLORS.GRAY["500"]};
`

const SingleGroup = styled.div`
  filter: brightness(100%);
  transition: filter 150ms ease-in-out;

  &:hover{
    filter: brightness(90%);
    transition: filter 100ms ease-in-out;
  }
  
  &:active {
    filter: brightness(80%);
    transition: filter 100ms ease-in-out;
  }
`