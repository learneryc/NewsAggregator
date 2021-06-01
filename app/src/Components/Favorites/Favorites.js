import React from 'react';
import {NewsStorage} from "../NewsStorage/NewsStorage";
import NewsGrid from "../NewsGrid/NewsGrid";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
        };
        this.removeBookmark = this.removeBookmark.bind(this);
    }

    removeBookmark(item) {
        NewsStorage.removeItem(item);
        this.getFavorites();
        toast.error(`Removed - ${item.title}`);
    }

    getFavorites() {
        const favorites = NewsStorage.getItems();
        this.setState({favorites: favorites});
    }

    componentDidMount() {
        this.getFavorites();
    }

    render(){
        return (
            <div>
                <NewsGrid items={this.state.favorites}
                          onItemClick={this.props.onItemClick}
                          onItemRemove={this.removeBookmark}
                          section='Favorites' message='You have no saved articles'/>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    transition={Slide} />
            </div>
        );
    }
};

export default Favorites;
