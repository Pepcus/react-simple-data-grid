import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../.././datagrid.css';

/* The RowCell component for the grid which will render - RenderRowCell.
* The RenderRowCell render each cell data.
* @type {class}
* */

class RowCell extends Component {

  render() {
    const { children, title, styles, cellId } = this.props;
    return (
      <div className={`row cell__${cellId}`} style={{width: `${styles.width}px`}}>
        <div
          className="table-cell"
          title={title}
          style={styles.gridTableCell}
        >
          {children}
        </div>
      </div>
    );
  }
}

RowCell.propTypes = {
  cellId: PropTypes.string,
  styles: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RowCell.defaultProps = {
  styles: {},
  children: '',
  title: '',
  cellId: '',
};

export default RowCell;
