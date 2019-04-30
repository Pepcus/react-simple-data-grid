##### Install

###### With npm installed, run...

```
$ npm install --save simple-react-data-grid
```

##### Usage

    import DataGrid from 'simple-react-data-grid';
    
   <DataGrid data={ArrayOfObjects} metaData={ArrayConfig} styles={'styles')} />
	
    ------------------------------------------------------------------------------
	data = json data to be rendered.
	metaData = json data with values to be shown as column config.
	

##### Example for data and metaData

    data = [
      {
        'firstName': 'Roseann',
        'lastName': 'Parker',
        'company': 'Zaggles',
        'employed': 'No',
      },
      {
        'firstName': 'Ford',
        'lastName': 'Knox',
        'company': 'Coriander',
        'employed': 'Yes',
      },
      {
        'firstName': 'Graves',
        'lastName': 'Randolph',
        'company': 'Supremia',
        'employed': 'No',
      },
      {
        'firstName': 'Sears',
        'lastName': 'Jackson',
        'company': 'Netagy',
        'employed': 'No',
      },
      {
        'firstName': 'Bernard',
        'lastName': 'Barrett',
        'company': 'Cubix',
        'employed': 'No',
      },
    ]

###### Sample Metadata.
    metaData = {
         headerConfig: [
    {
      'label': 'First Name',
      'key': 'firstName',
      'type': 'string',
      'emptyCells': '',
    },
    {
      'label': 'Last Name',
      'key': 'lastName',
      'type': 'string',
      'emptyCells': '',
    },
    {
      'label': 'Company',
      'key': 'company',
      'type': 'string',
      'emptyCells': '',
    },
    {
      'label': 'Employed',
      'key': 'employed',
      'type': 'string',
      'disableFilter': true,
      'emptyCells': '',
    },
    {
      'label': 'Edit Information',
      'key': 'edit',
      'disableFilter': true,
      'excludeFromExport': true,
      'columnCustomComponent': 'checkBox',
    },
  ],
  topDrawer: {
    'pagination': false,
    'globalSearch': true,
    'clearButton': true,
    'exportButton': true,
    'totalRecords': false,
  },
  bottomDrawer: {
    'pagination': true,
    'globalSearch': true,
    'clearButton': false,
    'exportButton': false,
    'totalRecords': true,
  },
  enableRowSelection: true,
  enableAllRowSelection: true,
  recordsPerPage: 25,
  drawerPosition: 'top',
  includeAllInGlobalFilter: false,
  includeGlobalFilter: true,
  exportFileName: `FileName-${new Date()}.csv`, // For Demo
  loaderColor: '#a69fa8',
     }

Information of features from 'simple-react-data-grid':
 data:- The array which contains column information.
        It contains array of objects of columns.
        Object represents the information of each row.
        Object properties example:-
         'firstName': key of that particular column.
         'Roseann': The information which is represented in that cell.
 metaData:- metaData object contains information form representation of 'simple-react-data. It is an object.
		headerConfig: It is an array of objects of each column representation information.
			Objects contains multiple properties listed below:
                 'label': It represents the label of a particular column header.
                 'key': It represents the key of that particular column which is used for mapping row data.
                 'type': It represents the type of data to be present in that column. It should be 'string' or 'Number'.   
                 'emptyCells': It represents the empty cell value. If data is not available in that particular cell of the column, the default value given for emptyCells will be pre-populated.  
                 'disableFilter': Used to disable the filter for a particular column.
                 'excludeFromExport': Will decide if a particular column should be removed from csv or not.
          topDrawer: This object represents the information of which feature will present in the top drawer.
          bottomDrawer: This object represents the information of which feature will present in the bottom drawer.
          topDrawer and bottomDrawer contains some properties listed below:
                 'pagination': It should be boolean & represent pagination is enabled or disabled.
                 'globalSearch': It should be boolean & represent globalSearch is enabled or disabled. 
                 'clearButton': It should be boolean & represent clearButton is enabled or disabled. 
                 'exportButton': It should be boolean and its functionality is to export the grid data into CSV file, represent exportButton is enabled or disabled.    
                 'totalRecords': It should be boolean & represent totalRecords is enabled or disabled.
          Properties present in metadata object are listed below:
                 enableRowSelection: It should be boolean and it represents the column header will contain all checked button or not.
                                     Which select all row.
                 enableAllRowSelection: It should be boolean and it represents the checkbox column present or not.
                                     Which select each row individually. 
                 recordsPerPage: It represents the number of records per page.
                 includeAllInGlobalFilter: It should be boolean and it represents global filter will be contained 'All' option or not.
                 includeGlobalFilter: It should be boolean and it represents the grid contained global filter or not.  
                 exportFileName: It will give the name to CVS download file.
                 loaderColor: It will represent the color of all check loader.
 -----------------------------------------------------------------------------------------------------------------------------------------------
getSelectedRow: It is call back function which is given to grid and this return the selected/checked row data.