export default function TableSorterDir(fieldIndex, sortedFieldDir) {

    if (sortedFieldDir === 'ascending') {
        return { sortedField: fieldIndex, sortedFieldDir: 'descending', headerActivity: 'arrow-down' };
      }
      else if (sortedFieldDir === 'descending') {
        return { sortedField: fieldIndex, sortedFieldDir: 'normal', headerActivity: '' };
      }
      else {
        return { sortedField: fieldIndex, sortedFieldDir: 'ascending', headerActivity: 'arrow-up' };
      }
   

}