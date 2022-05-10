import styled from "styled-components/macro";

const SIZES = {
    "tiny" : {"--size": "16px", "--radius": "4px"},
    "small": {"--size": "32px", "--radius": "8px"},
    "medium": {"--size": "56px", "--radius": "14px"},
    "large": {"--size": "128px", "--radius": "32px"}
}

function ShapeModifier(styles, img, shape) {
    switch (shape) {
        case "circle":
            return (
                <IconWrapper style={{...styles, "--radius": "10000px"}}>
                    {img && <CustomImg alt={"icon"} src={img}/>}
                </IconWrapper>
            )
        default:
            return (
                <IconWrapper style={{...styles}}>
                    {img && <CustomImg alt={"icon"} src={img}/>}
                </IconWrapper>
            )
    }
}

export default function Icon({img, color, size, shape}) {
    const styles = {...SIZES[size], '--color': color}

    return img === undefined? ShapeModifier(styles, undefined, shape):
                              ShapeModifier(styles, img, shape);


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

const CustomImg = styled.img`
  height: calc(var(--size) * 0.75);
  object-fit: cover;
  object-position: center;
`
