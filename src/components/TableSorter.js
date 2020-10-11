export default function TableSorter(tableData, sortingDirection, sortedField) {

    let sortedData = tableData;

    if (sortedField !== null) {
        sortedData.sort((a, b) => {
          if (a[sortedField] < b[sortedField]) {
            if (sortingDirection === 'ascending') {
              return -1;
            }
            else if (sortingDirection === 'descending') {
              return 1;
            }
            else {
              return 0;
            }
          }
          if (a[sortedField] > b[sortedField]) {
            if (sortingDirection === 'ascending') {
              return 1;
            }
            else if (sortingDirection === 'descending') {
              return -1;
            }
            else {
              return 0;
            }
          }
          return 0;
        });
      }
   
    return sortedData;
}