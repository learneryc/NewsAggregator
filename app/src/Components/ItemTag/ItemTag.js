import {Badge} from "react-bootstrap";
import React from "react";
import './ItemTag.css';

function ItemTag(props){
    return (
        <Badge className={props.section+" item-section"}>{props.section}</Badge>
    );
}

export default ItemTag;
