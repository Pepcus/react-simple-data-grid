import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';

export const addUniqueKey = (data) => {
  let id = 0;
  data.forEach((obj) => {
    obj.id = id.toString();
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

export const getSortedData = ({ columnName, columnType, sortOrder, data }) => {
  let temporaryData = cloneDeep(data);
  if (columnType === 'Number') {
    let stringContained = [];
    let numberContained = [];
    temporaryData.forEach((object) => {
      if (isNaN(object[columnName])) {
        stringContained.push(object);
      } else if (!isNaN(object[columnName])) {
        numberContained.push(object);
      }
    });
    if (!isEmpty(stringContained)) {
       stringContained = orderBy(stringContained, columnName, sortOrder);
    }
    if (!isEmpty(numberContained)) {
       numberContained = orderBy(numberContained, columnName, sortOrder);
    }
    if (sortOrder === 'asc') {
      temporaryData = stringContained.concat(numberContained);
    } else if (sortOrder === 'desc') {
      temporaryData = numberContained.concat(stringContained);
    }
  } else if (columnType === 'string') {
    temporaryData = orderBy(temporaryData, columnName, sortOrder);
  }
  return temporaryData;
};