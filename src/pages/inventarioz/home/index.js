import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { withTranslation } from '../../../../i18n'
import ProductHome from '../../../components/inventarioz/product/ProductHome'
import HomeLayout from '../../../components/inventarioz/layouts/HomeLayout'
import StockHome from '../../../components/inventarioz/Stock/StockHome'

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
    const { t } = props;
    // const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <HomeLayout>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label={ t('tabs_products') } {...a11yProps(0)} />
                <Tab label={ t('tabs_stock') } {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProductHome />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <StockHome />
            </TabPanel>
        </HomeLayout>
    );
}

Home.getInitialProps = async () => ({
    namespacesRequired: ['home']
})

export default withTranslation('home')(Home)
