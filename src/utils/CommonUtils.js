import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';

export const addUniqueKey = (data) => {
  let id = 0;
  data.forEach((obj) => {
    obj.gridId = id.toString();
    id += 1;
  });
  return data;
};


export const isEmpty = (data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) return false;
  }
  return true;
};

export const getNoOfPages = (data = [], recordsPerPage) => {
  const pageCount = [];
  for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i += 1) {
    pageCount.push(i);
  }
  if (!pageCount.length) {
    return 1;
  }
  return pageCount.length;
};

export const paginatedData = ({ currentData, recordsPerPage, currentPage }) => {
  const dataCopy = cloneDeep(currentData);

  if (!isEmpty(dataCopy)) {
    if (recordsPerPage) {
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
      return dataCopy.slice(indexOfFirstRecord, indexOfLastRecord);
    }
    return dataCopy;
  }

  return [];
};

export const getSortedData = ({ columnName, columnType = 'string', sortOrder, data, emptyCells }) => {
  let dataCopy = cloneDeep(data);
  if (columnType === 'Number') {
    let numericValues = [];
    const emptyValues = [];
    let otherData = [];
    dataCopy.forEach((object) => {
      if (object[columnName] === '' || object[columnName] === emptyCells) {
        emptyValues.push(object);
      } else if (!isNaN(object[columnName])) {
        numericValues.push(object);
      } else {
        otherData.push(object);
      }
    });
    if (!isEmpty(numericValues)) {
      numericValues = orderBy(numericValues, columnName, sortOrder);
    }
    if (!isEmpty(otherData)) {
      otherData = orderBy(otherData, columnName, sortOrder);
    }
    if (sortOrder === 'asc') {
      dataCopy = emptyValues.concat(otherData).concat(numericValues);
    } else if (sortOrder === 'desc') {
      dataCopy = numericValues.concat(otherData).concat(emptyValues);
    }
  } else if (columnType === 'string') {
    const emptyValues = [];
    let stringValues = [];
    dataCopy.forEach((object) => {
      if (object[columnName] === '' || object[columnName] === emptyCells) {
        emptyValues.push(object);
      } else {
        stringValues.push(object);
      }
    });
    // This will replace the current string with lower case and trimmed spaces.
    const lowerCaseTrimmedColumnValue = (obj) => {
      // This will check if the value is not a number in order to avoid Number.toLowerCase errors.
      if (isNaN(obj[columnName])) {
        return obj[columnName].toLowerCase().replace(/\s+/g, '')
      }
      return obj[columnName];
    };
    if (!isEmpty(stringValues)) {
      stringValues = orderBy(stringValues, [lowerCaseTrimmedColumnValue], sortOrder);
    }
    if (sortOrder === 'asc') {
      dataCopy = emptyValues.concat(stringValues);
    } else if (sortOrder === 'desc') {
      dataCopy = stringValues.concat(emptyValues);
    }
  }
  return dataCopy;
};
