import {Nav, Navbar} from "react-bootstrap";

const renderNavLink = links => {
    return links.map(item => {
        return (
            <Nav.Link href={item.link} key={item.name}>{item.name}</Nav.Link>
        )
    })
}

const Header = props => {
    const navlinks = renderNavLink(props.links);

    return (<Navbar bg={"dark"} variant={"dark"}>
        <Nav style={{fontSize: "20px"}} className={"ps-2"}>
            <Nav.Link href={"/"}>
                紫羊秘讯
            </Nav.Link>
        </Nav>
        <Navbar.Collapse className={"justify-content-end pe-4"}>
            <Nav className={"justify-content-end"}>
                {navlinks}
            </Nav>
        </Navbar.Collapse>
    </Navbar>)
}

export default Header;