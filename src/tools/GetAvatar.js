import human from "../assets/utils/human.png";
import alien from "../assets/utils/alien.png";

export const GetAvatar = (name) => {
    switch (name) {
        case "Alien":
            return alien;
        case "human":
            return human;
        case "me":
            return human;
        default:
            return human;
    }
}