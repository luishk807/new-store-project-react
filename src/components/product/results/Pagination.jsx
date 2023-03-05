import Pagination from '@mui/lab/Pagination';
import * as T from 'prop-types';

const PaginationComp = ({
  onPageChange,
  currentPage,
  pageCount,
}) => {
  return (
      <Pagination 
        onChange={onPageChange} 
        page={currentPage} 
        count={pageCount} 
        variant="outlined" 
        size="large" 
        shape="rounded" 
      />
  )
}

PaginationComp.propTypes = {
  classes: T.object,
  onPageChange: T.func,
  currentPage: T.number,
  pageCount: T.number,
};

export default PaginationComp;