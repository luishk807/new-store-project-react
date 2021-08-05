import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import MaterialTableIcons from '@/common/MaterialTableIcons'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    }
}));

const ClientResults = ({ data, onResultRowClick, title }) => {
    const router = useRouter()
    const classes = useStyles()
    const [tableColumns, setTableColumns] = useState([])
    const [tableData, setTableData] = useState([])

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
        if (rowData) {
            if (onResultRowClick) { // If function given, will override default behavior of going to page
                onResultRowClick(rowData)
            } else {
                router.push(`/inventarioz/client/${rowData.id}`)
            }
        }
    }

    return (
        <div className={classes.root}>
            <MaterialTable 
                icons={MaterialTableIcons}
                columns={tableColumns} data={tableData}
                title={ title }
                onRowClick={onRowClick}
                onRowSelected={onRowSelected}
            />
        </div>
    )
}

ClientResults.defaultProps = {
    data: { columns: [], data: [] },
    title: 'Client Search Results'
}

ClientResults.propTypes = {
    data: PropTypes.object,
    onResultRowClick: PropTypes.func,
    title: PropTypes.string
}

export default ClientResults
