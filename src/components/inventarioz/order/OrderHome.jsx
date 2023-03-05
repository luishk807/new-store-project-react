import { makeStyles } from '@material-ui/core/styles'
import {
    Tab
} from '@material-ui/core'
import {
    TabPanel,
    TabContext,
    TabList
} from '@mui/lab'
import { useState } from 'react'

import ClientEntryFields from '@/inventarioz/client/ClientEntryFields'
import Order from './Order'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    }
}))

const OrderHome = () => {
    const classes = useStyles()
    const [tabValue, setTabValue] = useState("a");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // const onValueChange = (fields, addresses, defaultAddress) => {
    //     console.log(fields, addresses, defaultAddress)
    // }

    return (
        <div className={classes.root}>
            <TabContext value={tabValue}>
                <TabList onChange={handleTabChange} aria-label="Order tabs">
                    <Tab label="Order Test" value="a" />
                    <Tab label="dummy" value="b" />
                </TabList>
                <TabPanel value="a">
                    {/* <ClientEntryFields onValueChange={onValueChange} /> */}
                    <Order />
                </TabPanel>
            </TabContext>
        </div>
    )
}

export default OrderHome
