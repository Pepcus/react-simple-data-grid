import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import '../.././datagrid.css';

/*
* The DataGridSection component for the grid which will render - Table .
 * @type {class}
 * */
const formattedMetaData = (metaData) => {
  const data = [];
  if (metaData.enableAllRowSelection) {
    data.push({ 'label': '', 'key': 'grid__select-column', 'type': 'string', 'disableFilter': true, 'excludeFromExport': true});
    metaData.headerConfig.forEach((obj) => {
      data.push(obj);
    });
    return { ...metaData, headerConfig: data };
  }
  return metaData;
};

class DataGridSection extends Component {
  render() {
    const style = this.props.styles ? this.props.styles.gridWrapper : null;
    return (
      <div className="data-grid" style={style}>
        <div className="content" style={style}>
          <Table
            getSelectedRow={this.props.getSelectedRow}
            data={this.props.data}
            metaData={formattedMetaData(this.props.metaData)}
            styles={this.props.styles}
            fileDownloadMessagePopup={this.props.fileDownloadMessagePopup}
          />
        </div>
      </div>
    );
  }
}
DataGridSection.propTypes = {
  getSelectedRow: PropTypes.func,
  fileDownloadMessagePopup: PropTypes.func,
  data: PropTypes.array,
  metaData: PropTypes.object,
  styles: PropTypes.object,
};
DataGridSection.defaultProps = {
  getSelectedRow: () => {},
  fileDownloadMessagePopup: () => {},
  data: [],
  metaData: {},
  styles: {},
};
export default DataGridSection;
