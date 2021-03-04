// import { makeStyles } from '@material-ui/core/styles'
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
import StockResults from './StockResults'
import SearchInput from '../SearchInput'
import StockImport from './StockImport'
import { searchProduct } from '../../../services/inventarioz/product'
import { getAllStocks } from '../../../services/inventarioz/stock'
import { convertDataToTableData } from '../../../utils/materialtable'

// const useStyles = makeStyles((theme) => {
//     root: {
//         padding: 0
//     }
// })

const StockHome = () => {
    // const classes = useStyles()
    const [tabValue, setTabValue] = useState("a");
    const [productResults, setProductResults] = useState({ columns: [], data: [] })
    const [stockResults, setStockResults] = useState({ columns: [], data: [] })

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

    const onStockSearchInputEnterKey = (value) => {
        const params = { skip: 0, take: 1000 }
        getAllStocks(params)
            .then(results => {
                const data = convertDataToTableData(results.data)
                setStockResults(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <TabContext value={tabValue}>
                <TabList onChange={handleTabChange} aria-label="Stock tabs">
                    <Tab label="Product Search" value="a" />
                    <Tab label="Stock Search" value="b" />
                    <Tab label="Import" value="c" />
                </TabList>
                <TabPanel value="a">
                    <div>
                    <SearchInput onSearchEnterKey={onSearchInputEnterKey} onSearchIconClick={onSearchInputEnterKey} />
                    <ProductResults data={productResults} />
                    </div>
                </TabPanel>
                <TabPanel value="b">
                    <SearchInput onSearchEnterKey={onStockSearchInputEnterKey} onSearchIconClick={onStockSearchInputEnterKey} />
                    <StockResults data={stockResults} />
                </TabPanel>
                <TabPanel value="c">
                    <StockImport />
                </TabPanel>
            </TabContext>
        </div>
    )
}

export default StockHome