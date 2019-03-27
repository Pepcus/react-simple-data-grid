import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import HeaderColumn from './HeaderColumn';
import '../.././datagrid.css';
/*
 *The TableHeader component for the grid which will render - HeaderColumn.
 * It will also handle the renderSortIcon, onClickSort, onSort, functionality for the grid.
 * @type {class}
*/

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: props.sort.sortOrder,
      columnKey: props.sort.columnName,
    };
    this.onClickSort = this.onClickSort.bind(this);
    this.getSortIcon = this.getSortIcon.bind(this);
    this.getFilterValue = this.getFilterValue.bind(this);
    this.setSortObject = this.setSortObject.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.sort.sortOrder.trim().length) {
      this.setState({
        sortOrder: '',
      });

    }
  }

  setSortObject(columnName) {
    this.props.setSortObject(columnName, this.state.sortOrder);
  }

  onClickSort(columnName, disableFilter) {
    if (!disableFilter) {
      this.setState({
        columnKey: columnName,
        sortOrder: this.state.sortOrder = (this.state.sortOrder === 'asc') ? 'desc' : 'asc',
      });
      this.props.onSort(columnName);
      this.setSortObject(columnName);
    }
  }
  getSortIcon(eachColumnKey) {
    if (eachColumnKey === this.state.columnKey && this.state.sortOrder === 'desc') {
      return (
        <span className="sort-order-up">
          <FaArrowUp />
        </span>
      );
    } else if (eachColumnKey === this.state.columnKey && this.state.sortOrder === 'asc') {
      return (
        <span className="sort-order-down">
          <FaArrowDown />
        </span>
      );
    }
    return null;
  }

  getFilterValue(columnName) {
    return this.props.appliedFilter[columnName];
  }

  renderHeaderColumns() {
    return this.props.currentMetaData.headerConfig.map(
      columnMetaDataHeader => (
        <HeaderColumn
          allCheckBox={this.props.allCheckBox}
          handleAllCheckBoxChange={this.props.handleAllCheckBoxChange}
          enableRowSelection={this.props.currentMetaData.enableRowSelection}
          columnMetaData={columnMetaDataHeader}
          key={columnMetaDataHeader.key}
          onClickSort={this.onClickSort}
          getSortIcon={this.getSortIcon}
          onFilterChange={this.props.onFilterChange}
          getFilterValue={this.getFilterValue}
          onResizeColumnWidth={this.props.onResizeColumnWidth}
          resizeColumnWidth={this.props.currentMetaData.resizeColumnWidth}
        />
      ));
  }
  render() {
    if (isEmpty(this.props.currentMetaData.headerConfig)) {
      return null;
    }
    return (
      <div className="table-head">
        {this.renderHeaderColumns()}
      </div>
    );
  }
}

TableHeader.propTypes = {
  handleAllCheckBoxChange: PropTypes.func,
  handleAllCheckBox: PropTypes.func,
  onResizeColumnWidth: PropTypes.func,
  allCheckBox: PropTypes.bool,
  setSortObject: PropTypes.func.isRequired,
  currentMetaData: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  appliedFilter: PropTypes.object,
  sort: PropTypes.object,
};

TableHeader.defaultProps = {
  handleAllCheckBoxChange: () => {},
  handleAllCheckBox: () => {},
  onResizeColumnWidth: () => {},
  allCheckBox: false,
  currentMetaData: [],
  appliedFilter: {},
  sort: {},
};

export default TableHeader;
