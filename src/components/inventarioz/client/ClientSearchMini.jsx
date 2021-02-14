import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useState } from 'react'
import ClientResults from '../client/ClientResults'
import SearchInput from '../SearchInput'
import { searchClient } from '../../../services/inventarioz/client'
import { convertDataToTableData } from '../../../utils/materialtable'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    }
}))

const ClientSearchMini = ({ onItemClick }) => {
    const classes = useStyles()
    const [results, setResults] = useState({ columns: [], data: [] })

    const onSearchInputEnterKey = (value) => {
        searchClient(value)
            .then(results => {
                const data = convertDataToTableData(results.data)
                setResults(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onResultRowClick = (value) => {
        if (onItemClick) {
            onItemClick(value)
        }
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <SearchInput onSearchEnterKey={onSearchInputEnterKey} onSearchIconClick={onSearchInputEnterKey} />
                </Grid>
                <Grid item xs={12}>
                    <ClientResults data={results} onResultRowClick={onResultRowClick} />
                </Grid>
            </Grid>
        </div>
    )
}

ClientSearchMini.propTypes = {
    onItemClick: PropTypes.func
}

export default ClientSearchMini
