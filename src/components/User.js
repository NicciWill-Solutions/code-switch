import React from 'react';
import {PropTypes} from 'prop-types';
import {styled} from '@mui/material/styles';

import DEFAULT_AVATAR from '../images/sadRobot.png';

const UserCard = styled('div') (({theme}) => ({
    alignSelf: 'flex-start', // keeps other cards on row from resizing with clicked card
    backgroundColor: theme.card.almostWhite,
    boxShadow: `0.3em 0.3em 1em rgba(0,0,0,0.185);`,
    color: theme.card.gray,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: '30%',
    maxWidth: '30%',
    padding: '20px 0',
    borderRadius: theme.root.borderRadius,
    marginBottom: '30px',
    cursor: theme.root.cursor,
    [theme.breakpoints.down('md')]: {
        minWidth: '48%',
        maxWidth: '48%',
    }
}));

const UserDetails = styled('div') (({theme}) => ({
    backgroundColor: theme.card.lightGray,
    color: theme.card.gray,
    margin: '20px 10px 0',
    fontSize: '.75rem',
    border: `2px solid ${theme.card.white}`,
    borderRadius: theme.root.borderRadius,
}));

const Avatar = styled('img') (({theme}) => ({
    width: '50px',
    height: '50px',
    border: `3px solid ${theme.root.teal}`,
    borderRadius: '50%',
    background: theme.card.lightGray,
    margin: '0 auto 20px',
}));

const handleImgError = ({currentTarget}) => {
    currentTarget.onError = null;
    currentTarget.src = DEFAULT_AVATAR;
};

const User = ({data, onCardClick}) => {
    const {avatar, email, firstName, lastName, gender, phoneNumber, showDetails, uid} = data;
    let pronoun;
    if (gender === 'Male') {
        pronoun = 'his'
    } else if (gender === 'Female') {
        pronoun = 'her'
    } else {
        pronoun = 'their'
    }
    
    return (
        <UserCard onClick={(e) => onCardClick(e, uid)}>
            <Avatar
                src={avatar}
                alt={`${firstName} ${lastName}`}
                onError={(e) => handleImgError(e)}
            />
            <div className={'userFirstName'}>{firstName}</div>
            <div className={'userLastName'}>{lastName}</div>
            {
                showDetails && <UserDetails>
                    <h3>Email: <a
                            href={`mailto:${email}`}
                            target="_blank"
                            rel="noreferrer"
                            className={email}
                        >
                            {email}
                        </a>
                    </h3>
                    <h3>Phone: {phoneNumber}</h3>
                    <h3>Gender: {gender}</h3>
                </UserDetails>
            }
            <h5 className={'cardHelp'}>Click anywhere on the card to see {pronoun} information.</h5>
        </UserCard>
    )
}

User.propTypes = {
    data: PropTypes.shape({
        avatar: PropTypes.string,
        email: PropTypes.string,
        firstName: PropTypes.string,
        gender: PropTypes.string,
        uid: PropTypes.string.isRequired,
        lastName: PropTypes.string,
        phoneNumber: PropTypes.string,
        showDetails: PropTypes.bool,
    }).isRequired,
    onCardClick: PropTypes.func.isRequired,
}

export default User;