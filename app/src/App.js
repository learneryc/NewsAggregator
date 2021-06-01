import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import NewsContent from "./Components/NewsContent/NewsContent";
import Favorites from "./Components/Favorites/Favorites";
import Details from "./Components/Details/Details";
import NewsSearchResults from "./Components/NewsSearchResults/NewsSearchResults";
import {SourceStorage} from "./Components/NewsStorage/NewsStorage";

class App extends React.Component {
  constructor(props) {
    super(props);
    const source = SourceStorage.getSource();
    this.state = {
        section: 'home',
        source: source,
        itemId: '',
        query: '',
    };
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleSectionChange(section){
      this.setState({section: section});
  }

  handleItemClick(section, item){
      this.setState({section: section, itemId: item.id,
          source: item.source? item.source: this.state.source
      });
  }

  handleSourceChange(){
      const source = this.state.source==='guardian'? 'nytimes': 'guardian';
      SourceStorage.setSource(source);
      this.setState({source: source});
  }

  handleBookmarkClick(){
      this.setState({section: 'favorites'});
  }

  handleQuery(query){
      this.setState({section: 'search', query: query});
  }


  render() {
    const content = this.state.section==='favorites'? <Favorites onItemClick={this.handleItemClick} />:
                    this.state.section==='details'? <Details itemId={this.state.itemId} source={this.state.source} />:
                    this.state.section==='search'? <NewsSearchResults query={this.state.query} onItemClick={this.handleItemClick}/>:
                        <NewsContent section={this.state.section} source={this.state.source}
                                    onItemClick={this.handleItemClick} />;
    return (
        <>
          <NavBar section={this.state.section} onSectionClick={this.handleSectionChange}
                  source={this.state.source} onSwitchChange={this.handleSourceChange}
                  onBookmarkClick={this.handleBookmarkClick}
                  onQueryClick={this.handleQuery} />
          <div className="main-content">
              {content}
          </div>

        </>
    );
  }

};

export default App;
