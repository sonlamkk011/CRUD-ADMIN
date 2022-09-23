import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setAccountInfo, setIsAdmin } from '../../Features/connectionSlice';
import { message } from 'antd';
import { fetchUserInformation } from '../../service/UserInformation/userInformation';

function GetUserInfo() {
    const dispatch = useDispatch();

    useEffect(() => {
        getUserInformation();
    }, []);

    const getUserInformation = async () => {
        const response = await fetchUserInformation();
        if (response) {
            if (response.status === 200) {
                dispatch(setAccountInfo(response.data));
                if (response.data.accountRole === "ADMIN") {
                    dispatch(setIsAdmin(true));
                } else {
                    location.assign("/account");
                }
            } else {
                message.error(response.data);
            }
        } else {
            message.error("Get user information failed");
        }
    };

    return (
        <></>
    )
}

export default GetUserInfo