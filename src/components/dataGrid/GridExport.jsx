import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { IoMdDownload } from 'react-icons/io';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
/*
 The ExportFile component for the grid which will render - EXPORT download. .
 * @type {class}
* */
class GridExport extends Component {
  constructor(props) {
    super(props);
  }
  renderCSVLinkClassName() {
    if (isEmpty(this.props.currentData)) {
      return 'disable-export-link';
    }
    return 'link';
  }
  render() {
    const filterHeader = this.props.currentMetaData.headerConfig.filter(obj => obj.excludeFromExport !== true);
    const header = filterHeader.map(item =>
      ({ label: item.label, key: item.key, disable: item.disable }),
    );
    return (
      <CSVLink
        filename={this.props.currentMetaData.exportFileName}
        headers={header}
        data={this.props.currentData}
        title="Export"
        asyncOnClick={true}
        className={this.renderCSVLinkClassName()}
        onClick={() => { if (this.props.fileDownloadMessagePopup) { return this.props.fileDownloadMessagePopup(true); } }}
      >
        <IoMdDownload />
      </CSVLink>
    );
  }
}
export default GridExport;
GridExport.propTypes = {
  fileDownloadMessagePopup: PropTypes.func,
  currentData: PropTypes.array,
  currentMetaData: PropTypes.object,
};
GridExport.defaultProps = {
  currentData: [],
  currentMetaData: {},
  fileDownloadMessagePopup: () => {},
};
