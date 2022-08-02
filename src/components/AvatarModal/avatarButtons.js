import { useRef } from "react";
import styled from "styled-components";

const buttonStyle = `
height: 3rem;
width: 15rem;
--padding-lr: 1.5rem;
padding-left: var(--padding-lr);
padding-right: var(--padding-lr);
border-radius: 10px;
border: 1px solid gray;
border: 0;

&:hover {
    background-color: #ddd;
}
`;
export const Button = styled.button([buttonStyle]);

export function UploadButton({ children, onFileSelected }) {
    const uploadButton = useRef(null);
    return (<>
        <Button onClick={() => { uploadButton.current?.click(); }}>{children}</Button>
        <input type="file" accept="image/*" ref={uploadButton} style={{ display: "none" }}
            onChange={(e) => {
                const files = e.target.files;
                if (files.length === 0) return;

                const imageFile = files[0];
                if (onFileSelected) onFileSelected(imageFile);
            }}
        />
    </>);
}

