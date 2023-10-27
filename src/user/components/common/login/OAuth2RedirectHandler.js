import React from 'react';
import { ACCESS_TOKEN } from './';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogin } from '../../../../redux/user/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const OAuth2RedirectHandler = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const getUrlParameter = (name) => {
        name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    const user = useSelector((state) => state.user.flag);
    const dispatch = useDispatch();

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        dispatch(userLogin());
        navigate("/", { state: { from: location } });
        return null;
    } else {
        navigate("/", { state: { from: location, error: error } });
        return null;
    }
};

export default OAuth2RedirectHandler;