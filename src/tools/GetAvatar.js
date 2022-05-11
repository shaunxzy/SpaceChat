import human from "../assets/utils/human.png";
import alien from "../assets/utils/alien.png";

export const GetAvatar = (name) => {
    switch (name) {
        case "alien":
            console.log("return alien")
            return alien;
        case "human":
            console.log("return human")
            return human;
        default:
            console.log("return none")
            return undefined;
    }
}