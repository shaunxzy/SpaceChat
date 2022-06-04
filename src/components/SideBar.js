import Icon from "../ui/Icon";
import {COLORS} from "../contants/Contants";
import human from "../assets/utils/human.png";
import cup from "../assets/utils/cup.png";
import styled from "styled-components/macro";
import {FetchChannel} from "../tools/FetchChannel";


export default function SideBar ({ styleDispatch, setChannelBook, user }) {
    return (
        <SideBarWrapper>
            <UserIconWrapper>
                <Icon color={COLORS.PURPLE} size={'medium'} shape={"circle"} img={human}/>
            </UserIconWrapper>
            <GroupSelectWrapper>
                <SingleGroup onClick={async () => {
                    await FetchChannel(`users/${user}/channels/singular`).then(
                        data => {
                            setChannelBook(data);
                        }
                    ).then(value => {
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
`

const UserIconWrapper = styled.div`
  border-bottom: 2px solid ${COLORS.GRAY["500"]};
  margin: 0 1rem;
  padding-bottom: var(--padding);
  display: grid;
  place-content: center;
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
  
`

const AddButtonWrapper = styled.div`
  display: grid;
  place-content: center;
  padding: var(--padding);
`


const MultiGroup = styled.div`

`