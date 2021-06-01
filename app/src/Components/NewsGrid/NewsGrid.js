import React from "react";
import {Row, Col} from "react-bootstrap";
import NewsGirdItem from "../NewsGridItem/NewsGirdItem";
import './NewsGrid.css'



class NewsGrid extends React.Component{
    render(){
        if (this.props.items.length===0) {
            return (
                <p className="grid-message">{this.props.message}</p>
            );
        } else {
            const items = this.props.items.map((item)=>
                <Col md={3} key={item.id}><NewsGirdItem item={item} onItemClick={this.props.onItemClick}
                                                        onItemRemove={this.props.onItemRemove} /></Col>
            );
            return (
                <div className="grid-content">
                    <p className="grid-title">{this.props.section}</p>
                    <Row >
                        {items}
                    </Row>
                </div>
            );
        }
    }
};

export default NewsGrid;
