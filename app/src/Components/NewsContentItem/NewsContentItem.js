import React from 'react';
import './NewsContentItem.css';
import {Row, Col} from "react-bootstrap";
import ShareButton from "../ShareButton/ShareButton";
import ItemTag from "../ItemTag/ItemTag";

class NewsContentItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }


    handleItemClick() {
        window.location.href = `#/article?id=${this.props.item.id}`;
        this.props.onItemClick('details', this.props.item);
    }

    render(){
        return(
            <div className="news-item">
                <Row>
                    <Col md={3}>
                        <img src={this.props.item.image} alt="missing" className="item-image"
                            onClick={this.handleItemClick} />
                    </Col>
                    <Col md>
                        <p className="item-title italic">
                            {this.props.item.title}
                            {<ShareButton item={this.props.item}/>}
                        </p>
                        <p className="item-description" onClick={this.handleItemClick}>{this.props.item.description}</p>
                        <div>
                            <span className="item-date italic">{this.props.item.date}</span>
                            <span className="to-right">
                                <ItemTag section={this.props.item.section} />
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default NewsContentItem;
