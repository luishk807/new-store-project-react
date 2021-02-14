import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import MaterialTableIcons from '../common/MaterialTableIcons'
import ProductDetailPanel from './ProductDetailPanel'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    }
}));

const ProductResults = ({ data, onResultRowClick }) => {
    const router = useRouter()
    const classes = useStyles()
    const [tableColumns, setTableColumns] = useState([])
    const [tableData, setTableData] = useState([])

    const detailPanel = (rowData) => {
        return <ProductDetailPanel data={rowData} />
    }

    useEffect(() => {
        let mounted = true
        if (mounted) {
            setTableColumns(data.columns)
            setTableData(data.data)
        }

        return () => {
            mounted = false
        }
    }, [data])

    const onRowSelected = (event, rowData) => {
        console.log('onRowSelected', rowData)
    }

    const onRowClick = (event, rowData) => {
        // console.log('onRowClick', rowData)
        if (rowData) {
            if (onResultRowClick) { // If function given, will override default behavior of going to page
                onResultRowClick(rowData)
            } else {
                router.push(`/inventarioz/product/${rowData.id}`)
            }
        }
    }

    return (
        <div className={classes.root}>
            <MaterialTable 
                icons={MaterialTableIcons}
                columns={tableColumns} data={tableData}
                title="Search Results"
                detailPanel={detailPanel}
                onRowClick={onRowClick}
                onRowSelected={onRowSelected}
            />
        </div>
    )
}

ProductResults.defaultProps = {
    data: { columns: [], data: [] }
}

ProductResults.propTypes = {
    data: PropTypes.object,
    onResultRowClick: PropTypes.func
}

export default ProductResults
