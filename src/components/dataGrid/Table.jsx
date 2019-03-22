import React, { Component } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import { filterData, getFilterData } from '../.././utils/filterData';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableDrawer from './TableDrawer';
import TableFooter from './TableFooter';
import { paginatedData, getNoOfPages } from '../.././utils/CommonUtils';
import '../../datagrid.css';

/**
 * The Table component for the grid which will render -
 * TableDrawer, TableHeader, TableBody and TableFooter.
 * It will also handle the search, sort, filter and pagination functionality for the grid.
 *
 * @type {class}
 */
class Table extends Component {
  constructor(props) {
    const {
      data,
      metaData,
    } = props;
    super(props);
    this.state = {
      allCheckBox: false,
      currentPage: 1,
      recordsPerPage: metaData.recordsPerPage,
      appliedFilter: {},
      originalData: data,
      currentData: data,
      originalMetaData: metaData,
      currentMetaData: metaData,
      sort: {
        sortOrder: '',
        columnName: '',
      },
      customWidth: {},
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onPagination = this.onPagination.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.handleReRenderButtonClick = this.handleReRenderButtonClick.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.setSortObject = this.setSortObject.bind(this);
    this.handleAllCheckBoxChange = this.handleAllCheckBoxChange.bind(this);
    this.handleSingleCheckBoxChange = this.handleSingleCheckBoxChange.bind(this);
    this.onResizeColumnWidth = this.onResizeColumnWidth.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data) || !isEqual(nextProps.metaData, this.props.metaData)) {
      let temporaryData = filterData(this.state.appliedFilter, nextProps.data);
      temporaryData = orderBy(temporaryData, this.state.sort.columnName, this.state.sort.sortOrder);
      this.setState({
        originalData: nextProps.data,
        currentData: temporaryData,
        originalMetaData: nextProps.metaData,
        currentMetaData: nextProps.metaData,
        recordsPerPage: nextProps.metaData.recordsPerPage,
      });
    }
  }
  setSortObject(columnName, sortOrder) {
    this.setState({
      sort: {
        ...this.state.sort,
        columnName,
        sortOrder,
      },
    });
  }
  handleAllCheckBoxChange() {
    let selectedRows = [];
    const temporaryAllCheck = !this.state.allCheckBox;
    if (temporaryAllCheck) {
      selectedRows = this.state.currentData.map(currentDataObj => (
        { ...currentDataObj, isChecked: true }
      ));
      this.setState({
        allCheckBox: temporaryAllCheck,
      });
    } else if (!temporaryAllCheck) {
      selectedRows = this.state.currentData.map(currentDataObj => (
        { ...currentDataObj, isChecked: false }
      ));
      this.setState({
        allCheckBox: temporaryAllCheck,
      });
    }
    this.props.getSelectedRow(selectedRows);
  }

  handleSingleCheckBoxChange(event, data) {
    const selectedRows = [];
    if (event.target.checked) {
      selectedRows.push({ ...data, isChecked: true });
    } else if (!event.target.checked) {
      selectedRows.push({ ...data, isChecked: false });
    }
    this.props.getSelectedRow(selectedRows);
  }

  renderTableBody() {
    const { currentData, recordsPerPage, currentPage } = this.state;
    const tableRowsData = paginatedData({ currentData, recordsPerPage, currentPage });
    if (isEmpty(currentData)) {
      return (
        <div className="render-message">
          No Results Found.
        </div>
      );
    }
    return (
      <TableBody
        handleSingleCheckBoxChange={this.handleSingleCheckBoxChange}
        tableData={tableRowsData}
        currentMetaData={this.state.currentMetaData}
        styles={this.props.styles}
        customWidth={this.state.customWidth}
      />
    );
  }

  handleReRenderButtonClick() {
    this.setState({
      appliedFilter: {},
      currentData: this.state.originalData,
      sort: {
        sortOrder: '',
        columnName: '',
      },
    });
  }

  onFilterChange(inputValue) {
    let { appliedFilter } = this.state;
    appliedFilter = {
      ...appliedFilter,
      [inputValue.selectedColumn]: inputValue.searchString,
    };
    let temporaryData = orderBy(this.state.originalData, this.state.sort.columnName, this.state.sort.sortOrder)
    this.setState({
      appliedFilter,
      currentData: filterData(appliedFilter, temporaryData),
      currentPage: 1,
    });
  }

  onSearch(searchInput) {
    const searchData = getFilterData(searchInput, this.state.originalData);
    this.setState({
      currentData: searchData,
      currentPage: 1,
    });
  }

  onSort(columnId) {
    if (this.state.sort.sortOrder === 'asc') {
      const sortedData = orderBy(this.state.currentData, [columnId], ['desc']);
      this.setState({
        currentData: sortedData,
        sort: { ...this.state.sort, sortOrder: 'desc' },
      });

    } else {
      const sortedData = orderBy(this.state.currentData, [columnId], ['asc']);
      this.setState({
        currentData: sortedData,
        sort: { ...this.state.sort, sortOrder: 'asc' },
      });
    }
  }

  onPagination(value) {
    let { currentPage } = this.state;
    const noOfPages = getNoOfPages(this.state.currentData, this.state.originalMetaData.recordsPerPage);
    if (value === 'lastPage' && currentPage < noOfPages) {
      currentPage = noOfPages;
    }
    if (value === 'firstPage') {
      currentPage = 1;
    }
    if (value === 'increment' && currentPage < noOfPages) {
      currentPage += 1;
    } else if (value === 'decrement' && currentPage > 1) {
      currentPage -= 1;
    }
    this.setState({
      currentPage,
    });
  }

  renderTableDrawer(currentData, positions, drawerPosition) {
    return (
      <div className={`table-drawer table-drawer__${drawerPosition}`}>
        <TableDrawer
          positions={positions}
          currentData={currentData}
          currentMetaData={this.state.currentMetaData}
          styles={this.props.styles}
          onPagination={this.onPagination}
          onSearch={this.onSearch}
          onSort={this.onSort}
          currentPage={this.state.currentPage}
          recordsPerPage={this.state.recordsPerPage}
          handleReRenderButtonClick={this.handleReRenderButtonClick}
        />
      </div>
    );
  }

  onResizeColumnWidth(id, width){
    this.setState((prevState) => ({
      customWidth: {
        ...prevState.customWidth,
        [id]: width,
      }
    }));
  }

  render() {
    return (
      <div className="table">
        {this.renderTableDrawer(this.state.currentData, this.state.currentMetaData.topDrawer, 'top')}
        <div className="render-table" style={this.props.styles.gridTable}>
          <TableHeader
            allCheckBox={this.state.allCheckBox}
            handleAllCheckBoxChange={this.handleAllCheckBoxChange}
            sort={this.state.sort}
            setSortObject={this.setSortObject}
            currentMetaData={this.state.currentMetaData}
            styles={this.props.styles}
            onSort={this.onSort}
            onSearch={this.onSearch}
            onFilterChange={this.onFilterChange}
            appliedFilter={this.state.appliedFilter}
            onResizeColumnWidth={this.onResizeColumnWidth}
          />
          {this.renderTableBody()}
        </div>
        <TableFooter
          originalData={this.state.originalData}
          currentMetaData={this.state.currentMetaData}
          styles={this.props.styles}
        />
        {this.renderTableDrawer(this.state.currentData, this.state.currentMetaData.bottomDrawer, 'bottom')}
      </div>
    );
  }

}

Table.propTypes = {
  getSelectedRow: PropTypes.func,
  data: PropTypes.array,
  metaData: PropTypes.object,
  styles: PropTypes.object,
};

Table.defaultProps = {
  getSelectedRow: () => {},
  data: [],
  metaData: {},
  styles: {},
};

export default Table;
