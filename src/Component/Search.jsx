import { AutoComplete } from "antd";
import React, { Component } from "react";
import Fuse from "fuse.js";



class Search extends Component {
  state = {
    results: []
  };

   onSelect = (value)=> {
    const {history}  = this.props;
    history.push(`/detail/${value}`);
  }

  handleSearch = value => {
    const { dataSource } = this.props;
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 7,
      minMatchCharLength: 1,
      keys: ["name", "id"]
    };
    const fuse = new Fuse(dataSource, options);
    const result = fuse.search(value);
    const resultsTrimmed = result.slice(0, 5).map(elem => {
      //   return `id : ${elem.id}  name : ${elem.name}`;
      return elem.id;
    });
    console.log(resultsTrimmed);
    this.setState({
      results: !value ? [] : resultsTrimmed
    });
  };

  render() {
    const { results } = this.state;
    return (
      <>
        <span className='searchLabel'>Search By Shipment ID :</span>
        <AutoComplete
          dataSource={results}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="Eg : S1005"
        />
      </>
    );
  }
}

export default Search;
