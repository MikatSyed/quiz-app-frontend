"use client"
import ProfileCard from '@/components/ProfileCard/profileCard';
import { useLoggedUserQuery } from '@/redux/api/userApi';
import React from 'react';

const ProfilePage = () => {
    const { data } = useLoggedUserQuery(undefined);
    console.log(data);
    const userData = data?.data;
    console.log(userData);
    return (
        <div className='flex justify-center items-center'>
            <ProfileCard {...userData}/>
        </div>
    );
};

export default ProfilePage;