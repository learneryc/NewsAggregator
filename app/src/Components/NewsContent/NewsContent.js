import React from 'react';
import {NewsApi} from "../NewsApi/NewsApi";
import NewsContentItem from "../NewsContentItem/NewsContentItem";
import Loader from "../Loader/Loader";

class NewsContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            news: null,
        };


    }

    getNews(){
        NewsApi.getSectionNews(this.props.source, this.props.section).then(
            (res)=>{
                this.setState({news: res.data.results, isLoaded: true});
            }
        );
    }

    componentDidMount() {
        this.getNews();
    }

    componentDidUpdate(prevProps) {
        if (this.props.source!==prevProps.source || this.props.section!==prevProps.section) {
            this.setState({isLoaded: false});
            this.getNews();
        }
    }

    render(){

        if (this.state.isLoaded) {
            const news = this.state.news.map((item)=>
                <NewsContentItem key={item.id} item={item} onItemClick={this.props.onItemClick} />
            );
            return (
                <>{news}</>
            );
        } else {
            return (
                <Loader />
            );
        }

    }
};

export default NewsContent;
