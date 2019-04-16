import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTrash } from 'react-icons/fa';

import upperFirst from 'lodash/upperFirst';

/*
* The Search component for the grid which will
* handle the onSearch and searchOptions functionality for the grid.
* @type {class}
*/

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selectedColumn: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }
  handleSelectChange(event) {
    this.setState({
      selectedColumn: event.target.value,
    });
  }

  onClickSearch() {
    const searchInput = {
      searchString: this.state.inputValue,
      selectedColumn: this.state.selectedColumn,
    };
    this.props.onSearch(searchInput);
  }
  /* TODO
   "For sorting logic there is a replacement for another logic".
   */
  addAllOption() {
    if (this.props.currentMetaData.includeAllInGlobalFilter) {
      return (
        <option value="all" key="all"> All</option>
      );
    }
    return null;
  }
  renderClearButton() {
    if (this.props.position.clearButton) {
      return (
        <button className="clearFilterButton" onClick={this.props.handleReRenderButtonClick}>
          <FaTrash className="data-grid-icon" />
          Clear
        </button>
      );
    }
    return null;
  }
  addOptions() {
    const Options = ({ currentMetaData }) => (
      <option value={currentMetaData.key}>
        {upperFirst(currentMetaData.label.toLowerCase())}
      </option>
    );
    /* TODO
    "Need to fix this."
    * */
    return this.props.currentMetaData.headerConfig.map(
      (optionMetaData) => {
        if (!optionMetaData) {
          return null;
        }
        if (!optionMetaData.disableFilter) {
          return (
            <Options
              currentMetaData={optionMetaData}
              key={optionMetaData.label}
            />
          );
        }
        return null;
      });
  }
  render() {
    if (this.props.currentMetaData.includeGlobalFilter) {
      return (
        <div className="search-bar">
          <select className="search-input-bar" onChange={this.handleSelectChange} value={this.state.selectedColumn}>
            <option />
            {this.addAllOption()}
            {this.addOptions()}
          </select>
          <label className="input-grid-label">
            <input className="search-input" type="text" onChange={this.handleInputChange} />
            <div
              className="search"
              onClick={this.onClickSearch}
            >
              <FaSearch/>
            </div>
          </label>
          {this.renderClearButton()}
        </div>

      );
    }
    return null;
  }
}

Search.propTypes = {
  currentMetaData: PropTypes.object,
  onSearch: PropTypes.func.isRequired,
  handleReRenderButtonClick: PropTypes.func.isRequired,
  position: PropTypes.object,
};

Search.defaultProps = {
  currentMetaData: {},
  position: {},
};

export default Search;
