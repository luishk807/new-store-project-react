import { makeStyles } from '@material-ui/core/styles'
import {
    Tab
} from '@material-ui/core'
import {
    TabPanel,
    TabContext,
    TabList
} from '@material-ui/lab'
import { useState } from 'react'
import ProductResults from './ProductResults'
import SearchInput from '../SearchInput'
import { searchProduct } from '../../../services/inventarioz/product'

const useStyles = makeStyles((theme) => {
    root: {
        padding: 0
    }
})

const StockHome = () => {
    const classes = useStyles()
    const [tabValue, setTabValue] = useState("a");
    const [productResults, setProductResults] = useState({ columns: [], data: [] })

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onSearchInputEnterKey = (value) => {
        searchProduct(value)
            .then(results => {
                const data = convertDataToTableData(results.data)
                setProductResults(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const convertDataToTableData = (dataArray) => {
        const columns = []
        const data = []
        dataArray.forEach((d, i) => {
            if (i === 0) { // Only once
                for (let prop in d) {
                    columns.push({ title: prop, field: prop })
                }
            }
            data.push({ key: i, ...d})
        })
        return { columns: columns, data: data }
    }

    return (
        <div className={classes.root}>
            <TabContext value={tabValue}>
                <TabList onChange={handleTabChange} aria-label="Stock tabs">
                    <Tab label="Product Search" value="a" />
                    {/* <Tab label="Something B" value="b" /> */}
                </TabList>
                <TabPanel value="a">
                    <SearchInput onSearchEnterKey={onSearchInputEnterKey} onSearchIconClick={onSearchInputEnterKey} />
                    <ProductResults data={productResults} />
                </TabPanel>
                {/* <TabPanel value="b">
                    <div>SOMETHING</div>
                </TabPanel> */}
            </TabContext>
        </div>
    )
}

export default StockHome