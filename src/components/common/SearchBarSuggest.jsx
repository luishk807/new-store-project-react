import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  InputBase
} from '@material-ui/core';
import Autosuggest from 'react-autosuggest';

const styles = (theme) => ({});

const SearchBarSuggest = ({classes}) => {
  const [suggestion, setSuggestion] = useState({
    value: '',
    suggestions: []
  });
  const [inputProps, setInputProps] = useState({});

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
  ]);
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const getSuggestions = value => {
    console.log("vakye", value)
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }


  const onChange = (event, { newValue, method }) => {
    setSuggestion({
      ...suggestion,
      value: newValue,
    });
  };

  const getSuggestionValue = suggestion => suggestion.name;

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
        {suggestion.name}
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

  useEffect(() => {
    setInputProps({
      placeholder: "Type 'c'",
      value: suggestion.value,
      onChange: onChange
    });
  }, []);

  return inputProps && (
    <Autosuggest 
      suggestions={suggestion.suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}

SearchBarSuggest.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(SearchBarSuggest);