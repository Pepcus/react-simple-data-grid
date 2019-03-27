import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEmpty } from '../../utils/CommonUtils';
import Pagination from './Pagination';
import Search from './Search';
import '../.././datagrid.css';
import GridExport from './GridExport';

/*
*  The TableDrawer component for the grid which will render -
*  renderPagination, FaArrowLeft, FaArrowRight and Search.
* It will also handle the onPageDecrement,
* onPageIncrement and pagination functionality for the grid.
* @type {class}
*/

class TableDrawer extends Component {
  constructor(props) {
    super(props);
    this.onSort = this.onSort.bind(this);
  }
  onSort(columnId) {
    this.props.onSort(columnId);
  }
  renderSearch() {
    if (this.props.positions.globalSearch) {
      return (
        <Search
          position={this.props.positions}
          currentMetaData={this.props.currentMetaData}
          onSearch={this.props.onSearch}
          handleReRenderButtonClick={this.props.handleReRenderButtonClick}
        />
      );
    }
    return null;
  }
  renderPagination() {
    if (this.props.positions.pagination) {
      return (
        <Pagination
          currentData={this.props.currentData}
          onPagination={this.props.onPagination}
          currentPage={this.props.currentPage}
          recordsPerPage={this.props.recordsPerPage}
        />
      );
    }
    return null;
}
  renderExportButton() {
    if (this.props.positions.exportButton) {
      return (
          <GridExport
            currentMetaData={this.props.currentMetaData}
            currentData={this.props.currentData}
            onClick={this.props.fileDownloadMessagePopup}
            fileDownloadMessagePopup={this.props.fileDownloadMessagePopup}
        />
      );
    }
    return null;
  }
  dataLength() {
    if (this.props.positions.totalRecords) {
      return (
        <div className="table-footer-cell">
          Total Records: {this.props.currentData.length}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="total-record-row" style={this.props.styles.gridTableRow}>
        <div className="wrapper-pagination-search">
          {this.renderPagination()}
          {this.renderSearch()}
          <div className="grid-export">
            {this.renderExportButton()}
          </div>
          {this.dataLength()}
        </div>
      </div>
    );
  }
}

TableDrawer.propTypes = {
  handleReRenderButtonClick: PropTypes.func.isRequired,
  currentData: PropTypes.array,
  currentMetaData: PropTypes.object,
  styles: PropTypes.object,
  onPagination: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  recordsPerPage: PropTypes.number,
  positions: PropTypes.object,
  fileDownloadMessagePopup: PropTypes.func,
};

TableDrawer.defaultProps = {
  currentData: [],
  currentMetaData: {},
  styles: {},
  currentPage: 0,
  recordsPerPage: 0,
  positions: {},
  fileDownloadMessagePopup: () => {},
};

export default TableDrawer;
