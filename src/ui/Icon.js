import styled from "styled-components/macro";

const SIZES = {
    "tiny" : {"--size": "16px", "--radius": "4px"},
    "small": {"--size": "32px", "--radius": "8px"},
    "medium": {"--size": "56px", "--radius": "14px"},
    "large": {"--size": "128px", "--radius": "32px"}
}

function TypeModifier(styles, img, type, onClick) {
    if (type === 'none') {
        return (
            <IconWrapperNonClick style={{...styles}} onClick={onClick}>
                {img && <CustomImg alt={"icon"} src={img}/>}
            </IconWrapperNonClick>
        )
    } else {
        return (
            <IconWrapper style={{...styles}} onClick={onClick}>
                {img && <CustomImg alt={"icon"} src={img}/>}
            </IconWrapper>
        )
    }
}

function ShapeModifier(styles, img, shape, onClick, type) {
    switch (shape) {
        case "circle":
            return TypeModifier({...styles, "--radius": "10000px"}, img, type, onClick)
        default:
            return TypeModifier(styles, img, type, onClick);
    }
}

export default function Icon({img, color, size, shape, onClick, type}) {
    const styles = {...SIZES[size], '--color': color}

    return img === undefined? ShapeModifier(styles, undefined, shape, onClick, type):
                              ShapeModifier(styles, img, shape, onClick, type);


}

const IconWrapper = styled.button`
  width: var(--size);
  height: var(--size);
  border: none;
  background-color: var(--color);
  border-radius: calc(var(--radius) * 1.5);
  display: grid;
  place-content: center;
  overflow: hidden;
`

const IconWrapperNonClick = styled.div`
  width: var(--size);
  height: var(--size);
  border: none;
  background-color: var(--color);
  border-radius: calc(var(--radius) * 1.5);
  display: grid;
  place-content: center;
  overflow: hidden;
`

const CustomImg = styled.img`
  height: calc(var(--size) * 0.75);
  object-fit: cover;
  object-position: center;
`
