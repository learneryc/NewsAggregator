import React from "react";
import './ShareButton.css';
import {Col, Modal, Row} from "react-bootstrap";
import {MdShare} from "react-icons/all";
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon} from "react-share";


class ShareButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    handleShowModal(val) {
        this.setState({showModal: val});
    }

    render(){
        return (
            <>
            <Modal show={this.state.showModal} onHide={()=>this.handleShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-share-title">{this.props.item.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-share-body">
                    <p className="modal-share-text">Share via</p>
                    <Row>
                        <Col><FacebookShareButton url={this.props.item.url} hashtag='#CSCI571_NewsApp'>
                            <FacebookIcon size={50} round={true} />
                        </FacebookShareButton></Col>

                        <Col><TwitterShareButton url={this.props.item.url} hashtags={['CSCI571_NewsApp']}>
                            <TwitterIcon size={50} round={true} />
                        </TwitterShareButton></Col>

                        <Col><EmailShareButton url={this.props.item.url} subject='CSCI571_NewsApp'>
                            <EmailIcon size={50} round={true} />
                        </EmailShareButton></Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <MdShare className="item-share" onClick={()=>this.handleShowModal(true)}/>

            </>
        );
    }
};

export default ShareButton;
