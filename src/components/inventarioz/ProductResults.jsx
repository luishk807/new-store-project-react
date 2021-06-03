import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        width: '100%'
    },
    tableRow: {
        hover: {
            color: '#a6d4fa',
            backgroundColor: '#a6d4fa'
        },
        selected: {
            color: '#81c784',
            backgroundColor: '#81c784'
        }
    }
}));

const ProductResult = ({ t, data, dataIdField, dataLinkBaseUrl, dataDisplayFields }) => {
    const router = useRouter()
    const [results, setResults] = useState(data || [])
    const classes = useStyles()

    useEffect(() => {
        let mounted = true
        if (mounted) {
            setResults(data)
        }

        return () => {
            mounted = false
        }
    }, [data])

    const onRowClick = (rowObject) => {
        if (dataIdField && dataLinkBaseUrl) {
            console.log('Need implementation', `${dataLinkBaseUrl}${rowObject[dataIdField]}`)
            // router.push(`${dataLinkBaseUrl}${rowObject[dataIdField]}`)
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>{ t('pv_category') }</TableCell>
                        <TableCell>{ t('pv_name') }</TableCell>
                        <TableCell>{ t('pv_option') }</TableCell>
                        <TableCell>{ t('pv_option_value') }</TableCell>
                        <TableCell>{ t('sku').toUpperCase() }</TableCell> */}
                        {dataDisplayFields.map((f) => {
                            <TableCell>{ f.toUpperCase() }</TableCell>
                        })}
                        <TableCell align="right">*</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {results.map((p) => (
                    <TableRow key={p[dataIdField]}
                        hover={true} 
                        className={classes.tableRow} 
                        onClick={() => { onRowClick(p) }}
                    >
                        {dataDisplayFields.map((f) => {
                            <TableCell>{ p[f] }</TableCell>
                        })}
                        <TableCell align="right">
                        <IconButton aria-label="delete" size="small" onClick={() => { }}>
                            <DeleteIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

ProductResult.propTypes = {
    // t: PropTypes.func.isRequired,
    data: PropTypes.array,
    dataIdField: PropTypes.string,
    dataLinkBaseUrl: PropTypes.string,
    dataDisplayFields: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ProductResult
