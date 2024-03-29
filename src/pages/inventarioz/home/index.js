import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductHome from '@/inventarioz/product/ProductHome';
import HomeLayout from '@/inventarioz/layouts/HomeLayout';
import StockHome from '@/inventarioz/stock/StockHome';
import OrderHome from '@/inventarioz/order/OrderHome';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                  {children}
                </div>
            )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     }
// }));

const Home = (props) => {
    // const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <HomeLayout>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label={ 'Products' } {...a11yProps(0)} />
                <Tab label={ 'Stock' } {...a11yProps(1)} />
                {/* <Tab label="Orders" {...a11yProps(2)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProductHome />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <StockHome />
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
                <OrderHome />
            </TabPanel> */}
        </HomeLayout>
    );
}

export default Home
