import React from "react";
import AsyncSelect from 'react-select/async';
import './SearchInput.css'
import axios from "axios";
import debounce from "debounce-promise";

const bingKey = '6b387ecb6c604b7880b42c3c575fedd3';
const url = 'https://api.bing.microsoft.com/v7.0/Suggestions';
const header = {'Ocp-Apim-Subscription-Key': bingKey};

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: "Enter Keywords..."
        };
        this.autoSuggest = debounce(this.autoSuggest.bind(this), 300);
        this.handleQueryClick = this.handleQueryClick.bind(this);
    }

    autoSuggest(inputValue) {
        const params = {mkt: 'en-US', q: inputValue};
        return axios.get(url, {params: params, headers: header}).then((res)=>{
            const results = res.data.suggestionGroups[0].searchSuggestions;
            const options = results.map(r=>({
                value: r.displayText,
                label: r.displayText}));
            return options.concat([{value: inputValue, label: inputValue}]);
        });
    }

    handleQueryClick(query) {
        window.location.href=`#/search?q=${query.value}`;
        this.props.onQueryClick(query.value);
        this.setState({placeholder: query.value});
    }

    render(){
        return(
            <AsyncSelect className="async-select"
                         placeholder={this.state.placeholder}
                         noOptionsMessage={()=>'No Match'}
                         loadOptions={this.autoSuggest}
                         onChange={this.handleQueryClick}
                         value={null}
            />
        );
    }
};

export default SearchInput;
