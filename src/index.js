import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { getNoOfPages, addUniqueKey } from './utils/CommonUtils';
import './datagrid.css';
import './loader.css';
import DataGridSection from './components/dataGrid/DataGrid';
import TableHeader from './components/dataGrid/TableHeader';

/*
 The DataGrid component for the grid which will render - DataGridSection.
 @type {class}
*/
const checkValidation = (metaData) => {
  if (!metaData.enableAllRowSelection && metaData.enableRowSelection) {
    console.warn("'enableAllRowSelection config will not be used as enableRowSelection is set to false'");
  }
};
const formattedData = (data, columnsConfig) => {
  const allkeys = columnsConfig.map((columnConfig) => {
    const obj = { key: columnConfig.key, type: columnConfig.type };
    return obj;
  });
  return data.map((dataObj) => {
    const dataObjCopy = cloneDeep(dataObj);
    allkeys.forEach((obj) => {
      if (dataObjCopy[obj.key] === undefined || dataObjCopy[obj.key] === null) {
        dataObjCopy[obj.key] = '';
      }
      if (obj.type === 'Number' && dataObjCopy[obj.key].trim().length !== 0 && !isEmpty(dataObjCopy[obj.key]) && !isNaN(dataObjCopy[obj.key])) {
        dataObjCopy[obj.key] = parseInt(dataObjCopy[obj.key]);
      }
    });
    return dataObjCopy;
  });
};

class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: addUniqueKey(props.data),
      metaData: props.metaData,
      styles: props.styles,
      indexOfLastRecord: props.metaData.recordsPerPage - 1,
      indexOfFirstRecord: 0,
      noOfPages: getNoOfPages(props.data, props.metaData.recordsPerPage),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data) || !isEqual(nextProps.metaData, this.props.metaData)) {
      this.setState({
        data: addUniqueKey(this.props.data),
        metaData: this.props.metaData,
        styles: this.props.styles,
        indexOfLastRecord: this.props.metaData.recordsPerPage - 1,
        indexOfFirstRecord: 0,
        noOfPages: getNoOfPages(this.props.data, this.props.metaData.recordsPerPage),
      });
    }
  }
  render() {
    checkValidation(this.props.metaData);
    const tempData = formattedData(addUniqueKey(this.props.data), this.props.metaData.headerConfig);
    return (
      <DataGridSection
        getSelectedRow={this.props.getSelectedRow}
        data={tempData}
        metaData={this.props.metaData}
        styles={this.props.styles}
      />
    );
  }
}

DataGrid.propTypes = {
  getSelectedRow: PropTypes.func,
  data: PropTypes.array,
  metaData: PropTypes.object,
  styles: PropTypes.object,
};

DataGrid.defaultProps = {
  getSelectedRow: () => {},
  data: [],
  metaData: {},
  styles: {},
};

export default DataGrid;
