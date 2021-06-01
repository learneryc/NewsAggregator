import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import Switch from "react-switch";
import {IconContext} from "react-icons";
import {FaBookmark, FaRegBookmark} from "react-icons/all";
import ReactTooltip from 'react-tooltip';
import SearchInput from "../SearchInput/SearchInput";
import './NavBar.css'

class NavBar extends React.Component {

    render(){
        const checked = this.props.source === 'guardian'? true: false;
        const bookmark = this.props.section==='favorites'?
            <FaBookmark data-tip="Favorites" data-for="favorites" /> :
            <FaRegBookmark data-tip="Favorites" data-for="favorites"/>;
        const sourceSwitch = this.props.section==='details'
                            ||this.props.section==='favorites'
                            ||this.props.section==='search'? null:
                            (<>
                                <span className="switch-source">NYTimes</span>
                                <Switch checked={checked}
                                        onChange={(checked)=>this.props.onSwitchChange()}
                                        onColor="#4191e7"
                                        uncheckedIcon={false}
                                        checkedIcon={false} />
                                <span className="switch-source">Guardian</span>
                            </>);
        return (
            <Navbar expand="lg" bg="dark" variant="dark" className="nav-bar">
                <SearchInput onQueryClick={this.props.onQueryClick}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" activeKey={this.props.section} onSelect={this.props.onSectionClick}>
                        <Nav.Link href="#/Home" eventKey="home">Home</Nav.Link>
                        <Nav.Link href="#/World" eventKey="world">World</Nav.Link>
                        <Nav.Link href="#/Politics" eventKey="politics">Politics</Nav.Link>
                        <Nav.Link href="#/Business" eventKey="business">Business</Nav.Link>
                        <Nav.Link href="#/Technology" eventKey="technology"> Technology</Nav.Link>
                        <Nav.Link href="#/Sports" eventKey="sport">Sports</Nav.Link>
                    </Nav>
                    <Nav>
                        <ReactTooltip id="favorites" place="bottom" effect="solid" />
                        <a href="#/favorites" onClick={this.props.onBookmarkClick} className="nav-bar-bookmark-container">
                            <IconContext.Provider value={{className: "nav-bar-bookmark"}}>
                                {bookmark}
                            </IconContext.Provider>
                        </a>
                        {sourceSwitch}
                    </Nav>


                </Navbar.Collapse>
            </Navbar>
        );
    }

};

export default NavBar;
