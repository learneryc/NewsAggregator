import React from 'react';
import {NewsApi} from "../NewsApi/NewsApi";
import Loader from "../Loader/Loader";
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon} from "react-share";
import {IconContext} from "react-icons";
import {FaBookmark, FaRegBookmark, MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/all";
import './Details.css'
import ReactTooltip from "react-tooltip";
import CommentBox from "../CommentBox/CommentBox";
import {NewsStorage} from "../NewsStorage/NewsStorage";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            isLoaded: false,
            isFolded: true,
            isBookmarked: false,
        };
        this.handleFoldClick = this.handleFoldClick.bind(this);
        this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    }

    getArticle() {
        NewsApi.getArticle(this.props.source, this.props.itemId).then((res)=>{
            const item = res.data.results;
            item.source = this.props.source;
            const isBookmarked = NewsStorage.findItem(item)===-1? false: true;
            this.setState({isLoaded: true, item: item, isBookmarked: isBookmarked});
        });
    }

    componentDidMount() {
        this.getArticle();
    }

    handleFoldClick() {
        this.setState({isFolded: !this.state.isFolded});
    }

    handleBookmarkClick() {
        if (this.state.isBookmarked) {
            NewsStorage.removeItem(this.state.item);
            toast.error(`Removed - ${this.state.item.title}`);
        }
        else {
            NewsStorage.addItem(this.state.item);
            toast.success(`Added - ${this.state.item.title}`);
        }

        this.setState({isBookmarked: !this.state.isBookmarked});
    }

    render(){
        if (this.state.isLoaded) {
            const item = this.state.item;
            const description = <p className={this.state.isFolded? 'folded-description': ''}>{item.description}</p>;
            const foldButton = this.state.isFolded?
                <MdKeyboardArrowDown size='2em' color='gray' className="description-button" onClick={this.handleFoldClick}/>:
                <MdKeyboardArrowUp size='2em' color='gray' className="description-button" onClick={this.handleFoldClick}/>;
            const bookmark = this.state.isBookmarked? <FaBookmark /> : <FaRegBookmark />;
            return (
                <div>
                    <div className="news-item">
                        <h4 className="italic">{item.title}</h4>
                        <div>
                            <span className="italic">{item.date}</span>
                            <div className="details-info">
                                <ReactTooltip id="facebook" place="top" effect="solid" />
                                <ReactTooltip id="twitter" place="top" effect="solid" />
                                <ReactTooltip id="email" place="top" effect="solid" />
                                <ReactTooltip id="bookmark" place="top" effect="solid" />
                                <FacebookShareButton url={item.url} hashtag='#CSCI571_NewsApp'
                                                     data-tip="Facebook" data-for="facebook" >
                                    <FacebookIcon size={30} round={true} />
                                </FacebookShareButton>

                                <TwitterShareButton url={item.url} hashtags={['CSCI571_NewsApp']}
                                                    data-tip="Twitter" data-for="twitter" >
                                    <TwitterIcon size={30} round={true} />
                                </TwitterShareButton>

                                <EmailShareButton url={item.url} subject='CSCI571_NewsApp'
                                                  data-tip="Email" data-for="email" >
                                    <EmailIcon size={30} round={true} />
                                </EmailShareButton>

                                <span data-tip="Bookmark" data-for="bookmark" className="details-bookmark"
                                      onClick={this.handleBookmarkClick}>
                                    <IconContext.Provider value={{size: '1.4em'}}>
                                        {bookmark}
                                    </IconContext.Provider>
                                </span>

                                <ToastContainer
                                    position="top-center"
                                    autoClose={3000}
                                    hideProgressBar
                                    transition={Slide} />

                            </div>
                        </div>
                        <img src={item.image} alt="missing" className="details-image" />
                        {description}
                        <div className="description-button-container">
                            {foldButton}
                        </div>
                    </div>
                    <CommentBox id={item.id} />
                </div>
            );
        } else {
            return (
                <Loader />
            );
        }
    }
};

export default Details;
