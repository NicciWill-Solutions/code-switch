import React from 'react';
import {PropTypes} from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import {styled} from '@mui/material/styles';

import User from './User';

const UserListWrapper = styled('div') (({theme}) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    margin: '0 auto',
    justifyContent: 'space-between',
    // hack for flexbox space-between gap in last row 💩
    "::after": {
        content: '""',
        flex: '0 0 30%',
        maxWidth: '500px',
    }
}));

const UserList = ({users, onCardClick, showDetails}) => {
    return Array.isArray(users)
    ? (<UserListWrapper>
        {
            users.map(user => {
                const userData ={
                    avatar: user.avatar,
                    email: user.email,
                    firstName: user.first_name,
                    gender: user.gender, 
                    uid: user.uid,
                    lastName: user.last_name,
                    phoneNumber: user.phone_number,
                    showDetails: showDetails === user.uid,
                }

                return <User
                    data={userData}
                    key={user.uid} 
                    onCardClick={onCardClick}
                />
            })
        }
    </UserListWrapper>)
    : <CircularProgress color='secondary' />
};

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    onCardClick: PropTypes.func.isRequired,
    showDetails: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
};

export default UserList;