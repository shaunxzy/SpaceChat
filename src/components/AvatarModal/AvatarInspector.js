import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useAuth } from "../../context/AuthProvider";
import { getAvatarURL, getSharedAvatarURLs, uploadAvatar } from "../../api/Avatar";
import { AvatarImage } from "./Avatar";

import { Button, UploadButton } from "./avatarButtons";


export default function AvatarInspector({ style, onShowAvatarSelector, avatarURL, onAvatarChanged }) {
    const { user } = useAuth();

    const onUpload = async (image) => {
        if (!user || !image) return;
        await uploadAvatar(user.uid, image);
        onAvatarChanged();
    };

    return (
        <Wrapper style={style}>
            <AvatarImage src={avatarURL} />

            <Button onClick={onShowAvatarSelector} >Select from default</Button>
            <UploadButton onFileSelected={onUpload}>Upload</UploadButton>
        </Wrapper>

    );
}

const Wrapper = styled.div`
width: 400px;
height: 500px;
padding: 1rem;

display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: column;
`;


