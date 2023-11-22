import * as React from 'react';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useState} from 'react';
import {defaultTheme} from "../assets/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        flexWrap: 'wrap',
        [defaultTheme.breakpoints.down('sm')]: {
            margin: theme.spacing(0.3),
            padding: '4px',
        },
        '&.Mui-disabled': {
            border: 0,

        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

const filterOptions = {
    levels: [
        {value: 'basic', label: 'basic'},
        {value: 'middle', label: 'middle'},
        {value: 'advanced', label: 'advanced'},
    ],
    categories: [
        {value: 'react', label: 'react'},
        {value: 'javascript', label: 'javascript'},
        {value: 'data structure', label: 'data structure'},
        /*{value: 'html', label: 'html', disabled: true},*/
    ],
    labels: [
        {value: 'frontend', label: 'frontend'},
        {value: 'backend', label: 'backend'},
    ],
};

const ToggleButtonFilterGroup = ({value, onChange, options, ariaLabel}) => {
    return (
        <StyledToggleButtonGroup size="small" value={value} onChange={onChange} aria-label={ariaLabel}>
            {options.map((option) => (
                <ToggleButton key={option.value} value={option.value} aria-label={option.label}
                              disabled={option.disabled} sx={{margin:0}}>
                    {option.label}
                </ToggleButton>
            ))}
        </StyledToggleButtonGroup>
    );
};

const FilterButtonGroup = ({changeFilter}) => {
    const [filters, setFilters] = useState({
        levels: [],
        categories: [],
        labels: [],
    });

    const handleFilter = (filterType, newValue, filter) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: newValue,
        }));

        changeFilter(filterType, filter);
    };

    const filterTypes = Object.entries(filterOptions);

    return (
        <Paper id={'filter button group'}
               elevation={0}
               sx={{
                   display: 'flex',
                   flexWrap: 'wrap',
                   justifyContent: 'center',
               }}
        >
            {filterTypes.map(([filterType, options], index) => (
                <React.Fragment key={filterType}>
                    <ToggleButtonFilterGroup
                        value={filters[filterType]}
                        onChange={(e, newValue) => handleFilter(filterType, newValue, e.target.value)}
                        options={options}
                        ariaLabel={`filtration by ${filterType}`}
                    />
                    {index < filterTypes.length - 1 && (
                        <Divider flexItem orientation="vertical" sx={{ mx: 0.3, my: 1, }} />
                    )}
                </React.Fragment>
            ))}
        </Paper>
    );
};

export default FilterButtonGroup;