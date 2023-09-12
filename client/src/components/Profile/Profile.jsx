import React, { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Header } from "../Header/Header";
import { ProfileEdit } from "./ProfileEdit/ProfileEdit";
import { ProfileForm } from "./ProfileForm/ProfileForm";

export const Profile = ({ handleGetAvatar, logout, handleAddAvatar, renderComponent }) => {
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        renderComponent();
    }, []);

    return (
        <>
            <Header loggedIn={currentUser.loggedIn} logout={logout} />
            <main className="profile">
                <div className="profile__content">
                    < ProfileForm handleAddAvatar={handleAddAvatar} currentUser={currentUser} />
                    <ProfileEdit />
                </div>
                <div className="profile__basket">test2</div>
            </main>
        </>
    );
};