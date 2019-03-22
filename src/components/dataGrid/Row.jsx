import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowCell from './RowCell';
import '../.././datagrid.css';
/**
* The Row component for the grid which will render - RenderRow.
* @type {class}
*/
class Row extends Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
  }
  renderRows({ data, currentMetaData, styles, customWidth }) {
    return (
      <div className="table-row" style={styles.gridTableRow}>
        {currentMetaData.headerConfig.map((columnMetaData) => {
          styles={
            ...styles,
            width: customWidth[columnMetaData.key],
          }
        if (columnMetaData.customComponent) {
          const CustomComponent = columnMetaData.customComponent;
          return (
            <RowCell
              isCustomComponent
              styles={styles}
              key={columnMetaData.key}
              cellId={columnMetaData.key}
            >
              <CustomComponent rowData={data} />
            </RowCell>
          );
        } else if (columnMetaData.key === 'grid__select-column') {
          return (
            <RowCell
              styles={styles}
              key={columnMetaData.key}
              cellId={columnMetaData.key}
              title={data[columnMetaData.key]}
            >
              {data[columnMetaData.key]}
              <input
                type="checkbox"
                onChange={(e) => this.props.handleSingleCheckBoxChange(e, data)}
                name={data.id}
                checked={data.isChecked ? 'checked' : ''}
              />
            </RowCell>
          );
        }
        return (
          <RowCell
            styles={styles}
            key={columnMetaData.key}
            cellId={columnMetaData.key}
            title={data[columnMetaData.key]}
          >
            {data[columnMetaData.key]}
          </RowCell>
        );
      })}
      </div>
    );
  }

  render() {
    const { data, currentMetaData, styles, customWidth } = this.props;
    return (
      <div className="table-body-row">
        {this.renderRows({ data, currentMetaData, styles, customWidth })}
      </div>
    );
  }
}

Row.propTypes = {
  handleSingleCheckBoxChange: PropTypes.func,
  data: PropTypes.object,
  currentMetaData: PropTypes.object,
  styles: PropTypes.object,
};

Row.defaultProps = {
  handleSingleCheckBoxChange: () => {},
  data: [],
  currentMetaData: {},
  styles: {},
};

export default Row;
