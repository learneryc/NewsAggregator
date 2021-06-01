import React from "react";
import {NewsApi} from "../NewsApi/NewsApi";
import Loader from "../Loader/Loader";
import NewsGrid from "../NewsGrid/NewsGrid";

class NewsSearchResults extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            results: '',
            isLoaded: false,
        };
    }

    getSearchResults(query){
        NewsApi.getSearchResults(query).then((res)=>{
            this.setState({results: res.data.results, isLoaded: true});
        });
    }

    componentDidMount() {
        this.getSearchResults(this.props.query);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.query !== prevProps.query) {
            this.setState({isLoaded: false});
            this.getSearchResults(this.props.query);
        }
    }

    render(){
        if (this.state.isLoaded) {
            return (
                <NewsGrid items={this.state.results}
                          onItemClick={this.props.onItemClick}
                          section='Results' message='No Results'/>
            );
        } else {
            return <Loader />;
        }

    }
};

export default NewsSearchResults;
