import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';

import UserList from './components/UserList';
import './App.css';

const theme = createTheme({
  breakpoints: {
    sm: 600,
    md: 900,
    lg: 1200,
  },
  root: {
    teal: '#008080',
    borderRadius: '4px',
    textAlign: 'center',
    darkGray: '#2f2f2f',
    error: '#ff0000',
    cursor: 'pointer'
  },
  card: {
    gray: '#7b7c80',
    white: '#fff',
    lightGray: '#d4d4d4',
    almostWhite: '#f5f5f5'
  }
});

const AppWrapper = styled('div') (({theme}) => ({
  color: theme.root.darkGray,
  fontFamily: 'Roboto, sans-serif',
  textAlign: theme.root.textAlign,
  width: '60%',
  margin: '60px auto',
}));

const FormButton = styled('button') (({theme}) => ({
  background: theme.root.teal,
  color: theme.card.white,
  padding: '5px 10px',
  marginLeft: '10px',
  border: `1px solid ${theme.card.white}`,
  cursor: theme.root.cursor
}));

const ErrorMessage = styled('div') (({theme}) => ({
  color: theme.root.error,
  fontWeight: 'bold',
}));

const App = () => {
  const [userList, setUserList] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [numberOfUsers, setNumberOfUsers] = useState(10);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fetchNewUsers, setFetchNewUsers] = useState(true);

  const handleCardClick = (e, id) => {
    id === showDetails
      ? setShowDetails(false) // toggle closed
      : setShowDetails(id);   // open different user
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumberOfUsers(e.target[0].value);
    setFetchNewUsers(true);
  };

  const fetchUsers = (size) => {
    axios
      .get(`https://random-data-api.com/api/users/random_user?size=${size}`)
      .then(response => setUserList(response.data))
      .catch(error => setErrorMsg({text: 'Sorry, there was a problem with your request. Please try again.', error}));
  };

  useEffect(() => {
    setUserList(null);
    setErrorMsg(null);
    if (fetchNewUsers) {
      fetchUsers(numberOfUsers);
      setFetchNewUsers(false);
    }
  }, [numberOfUsers, fetchNewUsers]);

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <h1>User List</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="numberOfUsers">Number of Users to Show: </label>
          <select id="numberOfUsers" className='selectUsers'>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <FormButton type="submit">Show New Set of Users</FormButton>
        </form>
        {errorMsg 
          ? <ErrorMessage>{errorMsg.text}</ErrorMessage>
          : <UserList
            users={userList}
            onCardClick={handleCardClick}
            showDetails={showDetails}
          />
        }
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
