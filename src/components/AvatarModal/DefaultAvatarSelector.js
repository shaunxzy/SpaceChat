import React, { useEffect, useState } from 'react';
import styled from "styled-components/macro";
import { getSharedAvatarURLs } from '../../api/Avatar';


export default function DefaultAvatarSelector({ style, onDismiss, onSelected }) {

    const [avatarURLs, setAvatarURLs] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        getSharedAvatarURLs().then((urls) => {
            setAvatarURLs(urls);
        });
    }, []);

    return (
        <Wrapper style={style}>
            <GridWrapper>
                <AvatarGrid >{
                    avatarURLs.map(({ url }, i) => {
                        return <AvatarImage
                            key={url}
                            src={url}
                            style={selectedIndex === i ? { boxShadow: '0 0 0 2px white, 0 0 0 5px gray' } : {}}
                            onClick={() => { setSelectedIndex(i); }} />;
                    })
                }</AvatarGrid>
            </GridWrapper>

            <ConfirmButton>
                <button onClick={() => {
                    if (avatarURLs.length === 0) return;
                    if (selectedIndex && selectedIndex < avatarURLs.length) {
                        onSelected(avatarURLs[selectedIndex].ref);
                    }
                }}>Confirm</button>
            </ConfirmButton>

        </Wrapper>
    );
}

const AvatarImage = styled.img`
--length: 100px;
width: 100%;
// height: 100%;

border: 0;
border-radius: 999px;

aspect-ratio: 1;
`;

const Wrapper = styled.div`
width: 400px;
height: 500px;
min-height: 0px;
`;

const GridWrapper = styled.div`
--padding-lr: 2rem;
padding-left: var(--padding-lr);
padding-right: var(--padding-lr);

height: 100%;
width: 100%;
overflow-y: scroll;
`;

const AvatarGrid = styled.div`
padding-top: 3rem;
padding-bottom: 7rem;

display: grid;
// justify-content: space-evenly;
// align-items: center;
grid-template-columns: repeat(3, 1fr);
grid-gap: 1rem;

&:first-child:before {
    height: 3rem;
}
`;

const ConfirmButton = styled.div`
width: 100%;
height: 5rem;

position: absolute;
bottom: 0;

display: flex;
justify-content: center;
aligh-items: center;

& button {
    height: 3rem;
    width: 80%;

    border: 0;
    border-radius: 999px;
    background-color: #eee;
}
`;

