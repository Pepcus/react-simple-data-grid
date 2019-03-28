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

    ArrayOfObjects = [
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
    ArrayConfig = {
         headerConfig: [
               {
                 'label': 'First Name',
                 'key': 'firstName',
                 'type': 'string',
               },
               {
                 'label': 'Last Name',
                 'key': 'lastName',
                 'type': 'string',
               },
               {
                 'label': 'Company',
                 'key': 'company',
                 'type': 'string',
               },
               {
                 'label': 'Employed',
                 'key': 'employed',
                 'type': 'string',
                 'disableFilter': true,
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
           'globalSearch': false,
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
         exportFileName: `FileName-${new Date()}.csv`,
         loaderColor: '#a69fa8',
     }


######  Styles json will override default styling.
	
    styles = {
      gridWrapper: {
          'width': 'auto',
      },
    }
### Demo
#####  [Live Demo](http://google.com)
