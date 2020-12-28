import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b0bec5'
        },
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});

export default theme
