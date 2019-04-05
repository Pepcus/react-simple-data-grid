import React from 'react';
import PropTypes from 'prop-types';

import HeaderCustomComponent from './HeaderCustomComponent';
import ColumnFilter from './ColumnFilter';

const HeaderColumn = ({ allCheckBox, handleAllCheckBoxChange, enableRowSelection, columnMetaData, onClickSort, getSortIcon, onFilterChange, getFilterValue }) => {
  if ((columnMetaData.key === 'grid__select-column') && (enableRowSelection)) {
    return (
      <div className={`header-column cell__${columnMetaData.key}`}>
        <div
          title={columnMetaData.label}
          className="table-heading"
          onClick={e => onClickSort(columnMetaData.key, columnMetaData.type, columnMetaData.emptyCells, e)}
          id={columnMetaData.key}
        >{getSortIcon()}{columnMetaData.label}
          <input type="checkbox" onChange={handleAllCheckBoxChange} checked={allCheckBox ? 'checked' : ''} />
        </div>
      </div>
    );
  }
  return (
    <div className={`header-column cell__${columnMetaData.key}`}>
      <div
        title={columnMetaData.label}
        className="table-heading"
        onClick={e => onClickSort(columnMetaData.key, columnMetaData.disableFilter, columnMetaData.type, columnMetaData.emptyCells, e)}
        id={columnMetaData.key}
      >{getSortIcon(columnMetaData.key)}{columnMetaData.label}
      </div>
      <ColumnFilter
        disableFilter={columnMetaData.disableFilter}
        selectedColumn={columnMetaData.key}
        onChange={onFilterChange}
        value={getFilterValue(columnMetaData.key)}
        key={columnMetaData.key}
      />
      <HeaderCustomComponent
        headerCustomComponent={columnMetaData.headerCustomComponent}
      />
    </div>
  );

};

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
