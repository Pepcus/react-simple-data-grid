import React from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';

import HeaderCustomComponent from './HeaderCustomComponent';
import ColumnFilter from './ColumnFilter';

class HeaderColumn extends React.Component {
  constructor(props) {
    super(props);
    this.MyRef = React.createRef();
    this.onResize = this.onResize.bind(this);
    this.state = {};
    this.renderFirstDiv = this.renderFirstDiv.bind(this);
    this.renderSecondDiv = this.renderSecondDiv.bind(this);
  }
  componentDidMount() {
    const { offsetWidth } = this.MyRef.current;
    this.setState({
      width: offsetWidth,
    });
    this.props.onResizeColumnWidth(this.props.columnMetaData.key, offsetWidth);
  }

  renderFirstDiv() {
    let className = '';
    if (this.props.columnMetaData.isLastColumn) {
      className = 'lastColumn';
    }
    return (
      <div
        className={`header-column cell__${this.props.columnMetaData.key} ${className}`}
        ref={this.MyRef}
        style={this.props.columnMetaData.isLastColumn ? { width: `${this.state.width}px` } : { width: `${this.state.width}px` }}>
        <div
          title={this.props.columnMetaData.label}
          className="table-heading"
          onClick={e => this.props.onClickSort(this.props.columnMetaData.key, e)}
          id={this.props.columnMetaData.key}
        >{this.props.getSortIcon()}{this.props.columnMetaData.label}
          <input
            type="checkbox"
            onChange={this.props.handleAllCheckBoxChange}
            checked={this.props.allCheckBox ? 'checked' : ''} />
        </div>
      </div>
    );
  }

  renderSecondDiv() {
    let className = '';
    if (this.props.columnMetaData.isLastColumn) {
      className = 'lastColumn';
    }
    return (
      <div
        className={`header-column cell__${this.props.columnMetaData.key} ${className}`}
        ref={this.MyRef}
        style={this.props.columnMetaData.isLastColumn ? { width: `${this.state.width}px` } : { width: `${this.state.width}px`}}>
        <div
          title={this.props.columnMetaData.label}
          className="table-heading"
          onClick={e => this.props.onClickSort(this.props.columnMetaData.key, this.props.columnMetaData.disableFilter, e)}
          id={this.props.columnMetaData.key}
        >{this.props.getSortIcon(this.props.columnMetaData.key)}{this.props.columnMetaData.label}
        </div>
        <ColumnFilter
          disableFilter={this.props.columnMetaData.disableFilter}
          selectedColumn={this.props.columnMetaData.key}
          onChange={this.props.onFilterChange}
          value={this.props.getFilterValue(this.props.columnMetaData.key)}
          key={this.props.columnMetaData.key}
        />
        <HeaderCustomComponent
          headerCustomComponent={this.props.columnMetaData.headerCustomComponent}
        />
      </div>
    );
  }
  onResize(event, {element, size}) {
    if (!this.props.columnMetaData.isLastColumn) {
      this.setState({
        width: size.width
      });
    }
    this.props.onResizeColumnWidth(this.props.columnMetaData.key, size.width);
  }
  render() {
    const {
      enableRowSelection,
      columnMetaData,
    } = this.props;

    if ((columnMetaData.key === 'grid__select-column') && (enableRowSelection)) {
      if (this.props.columnMetaData.isLastColumn) {
       return this.renderFirstDiv()
      }
      return (
        <Resizable onResize={this.onResize} width={this.state.width} >
          {this.renderFirstDiv()}
        </Resizable>
      );
    }
    if (this.props.columnMetaData.isLastColumn) {
     return this.renderSecondDiv();
    }
    return (
      <Resizable onResize={this.onResize} width={this.state.width} >
        {this.renderSecondDiv()}
      </Resizable>
    );
  }
}

HeaderColumn.propTypes = {
  handleAllCheckBoxChange: PropTypes.func,
  allCheckBox: PropTypes.bool,
  columnMetaData: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  onClickSort: PropTypes.func.isRequired,
  getSortIcon: PropTypes.func.isRequired,
  getFilterValue: PropTypes.func.isRequired,
  enableRowSelection: PropTypes.bool,
  enableAllRowSelection: PropTypes.bool,
};

HeaderColumn.defaultProps = {
  handleAllCheckBox: () => {},
  allCheckBox: false,
  columnMetaData: {},
  enableRowSelection: false,
  enableAllRowSelection: false,
};

export default HeaderColumn;
