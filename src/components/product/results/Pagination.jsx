import Pagination from '@material-ui/lab/Pagination';
import * as T from 'prop-types';

const PaginationComp = ({
  onChange: onPageChange,
  page,
  count,
}) => {
  return (
    <Pagination
      onChange={onPageChange}
      page={page}
      count={count}
      variant="outlined"
      size="large"
      shape="rounded"
    />
  )
}

PaginationComp.propTypes = {
  classes: T.object,
  onChange: T.func,
  page: T.number,
  count: T.number,
};

export default PaginationComp;