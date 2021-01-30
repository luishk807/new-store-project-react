import PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { useState } from 'react'
// import { searchProduct } from '../../services/inventarioz/product'

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
        },
    }
}))

const SearchInput = ({ onSearchEnterKey, onSearchIconClick }) => {

    const [query, setQuery] = useState('')
    const classes = useStyles()

    const onSearchChange = (event) => {
        setQuery(event.target.value)
    }

    const onSearchKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            if (onSearchEnterKey) {
                onSearchEnterKey(query)
            }
            // searchProduct(query).then(result => {
            //     console.log('result from search', result)
            // }).catch(err => {
            //     console.log(err)
            // })
        }
    }

    const searchClick = () => {
        if (onSearchIconClick) {
            onSearchIconClick(query)
        }
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon onClick={searchClick} />
            </div>
            <InputBase
            placeholder={ 'Search...'}
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={onSearchChange}
            onKeyUp={onSearchKeyUp}
            />
        </div>
    )
}

SearchInput.propTypes = {
    // t: PropTypes.func.isRequired,
    onSearchEnterKey: PropTypes.func,
    onSearchIconClick: PropTypes.func
}

export default SearchInput
