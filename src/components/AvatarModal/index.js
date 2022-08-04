import React, { useState } from 'react';
import { COLORS } from "../../contants/Contants";
import styled from "styled-components/macro";
import AvatarInspector from './AvatarInspector';
import DefaultAvatarSelector from './DefaultAvatarSelector';
import { selectFromDefaultAvatar } from '../../tools/Avatar';
import { useAuth } from '../../context/AuthProvider';


export default function AvatarModal() {
    const [page, setPage] = useState("inspector"); // inspector avatar-selector
    const { user } = useAuth();

    return (
        <Centered>
            <button style={{ position: "fixed", left: 0, top: 0, display: "block" }} onClick={() => {
                if (page === "inspector") setPage("avatar-selector");
                if (page === "avatar-selector") setPage("inspector");
            }}>toggle page (debug)</button>

            <Card>
                <AvatarInspector
                    style={{ left: page === "inspector" ? 0 : "-100%" }}
                    onShowAvatarSelector={() => {
                        setPage('avatar-selector');
                    }} />

                <DefaultAvatarSelector
                    style={{ left: page === "avatar-selector" ? "-100%" : 0 }}
                    onSelected={async (imageRef) => {
                        if (!user) return;
                        await selectFromDefaultAvatar(user.uid, imageRef);
                        setPage('inspector');
                    }}
                />

                <CloseButton style={{ top: 0, right: 0, position: "absolute" }}
                    onClick={() => {
                        if (page === "avatar-selector") {
                            setPage("inspector");
                        }
                    }}
                >×</CloseButton>
            </Card>
        </Centered >
    );
}


const Card = styled.div`
width: 400px;
height: 500px;
background-color: ${COLORS.GRAY["100"]};
border: 1px solid gray;
border-radius: 10px;

overflow: hidden;
display: flex;
flex-direction: row;

position: relative;

& > * {
    transition: left 0.4s;
    flex: none;
    position: relative;
}
`;

const Centered = styled.div`
width: 100vw;
height: 100vh;

display: flex;
justify-content: center;
align-items: center;
`;

const CloseButton = styled.button`
position: absolute;
top: 0;
right: 0;

--edge-length: 3rem;
height: var(--edge-length);
width: var(--edge-length);

--left-bottom-padding: 5px;
padding-left: var(--left-bottom-padding);
padding-bottom: var(--left-bottom-padding);

border: 0;
border-radius: 0;
border-bottom-left-radius: 10px;

&:hover {
    background-color: #ddd;
}
`;