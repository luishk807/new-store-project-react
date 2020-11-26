import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  InputBase
} from '@material-ui/core';
import Autosuggest from 'react-autosuggest';

const styles = (theme) => ({});

const SearchBarSuggest = ({classes}) => {
  const [value, setValue] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputProps = {
    placeholder: "Type 'c'",
    value,
    onChange: onChange
  };

  const [languages, setLanguages] = useState([
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'C#',
      year: 2000
    },
    {
      name: 'C++',
      year: 1983
    },
    {
      name: 'Clojure',
      year: 2007
    },
    {
      name: 'Elm',
      year: 2012
    },
    {
      name: 'Go',
      year: 2009
    },
    {
      name: 'Haskell',
      year: 1990
    },
    {
      name: 'Java',
      year: 1995
    },
    {
      name: 'Javascript',
      year: 1995
    },
    {
      name: 'Perl',
      year: 1987
    },
    {
      name: 'PHP',
      year: 1995
    },
    {
      name: 'Python',
      year: 1991
    },
    {
      name: 'Ruby',
      year: 1995
    },
    {
      name: 'Scala',
      year: 2003
    }
  ]);
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const getSuggestions = value => {
    if (!value) {
      return;
    } 

    console.log(value,'ll')
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
    const suggestions = languages.filter(language => regex.test(language.name));
    
    // if (suggestions.length === 0) {
    //   return [
    //     { isAddNew: true }
    //   ];
    // }
    
    return suggestions;
  }


  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  const getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return value;
    }
    
    return suggestion.name;
  };

  const renderSuggestion = suggestion => {
    // if (suggestion.isAddNew) {
    //   return (
    //     <span>
    //       [+] Add new: <strong>{value}</strong>
    //     </span>
    //   );
    // }

    // return suggestion.name;
    return (
      <div>
        {/* {suggestion.name} */}
        hey
      </div>
    )
  };
  
  const onSuggestionsFetchRequested = ({ value }) => {
    const suggest = getSuggestions(value);
    setSuggestions(suggest)
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    // if (suggestion.isAddNew) {
    //   console.log('Add new:', value);
    // }
  };

  return (
    <Autosuggest 
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps} 
    />
  );
}

SearchBarSuggest.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(SearchBarSuggest);