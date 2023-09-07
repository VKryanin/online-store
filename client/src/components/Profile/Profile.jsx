import React, { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Header } from "../Header/Header";

import { ProfileForm } from "./ProfileForm/ProfileForm";
import { ProfileContainer } from "./ProfileContainer/ProfileContainer";
import { ProfileEdit } from "./ProfileEdit/ProfileEdit";

export const Profile = ({ handleGetAvatar, logout, handleAddAvatar, renderComponent }) => {
    const currentUser = useContext(CurrentUserContext);
    const [image, setImage] = useState(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        renderComponent();
    }, []);

    const loadImage = (e) => {
        const img = e.target.files[0];
        setImage(img);
    };

    const handleImageClick = () => {
        imageInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAvatar({ userId: currentUser.id, img: image });
    };

    return (
        <>
            <Header loggedIn={currentUser.loggedIn} logout={logout} />
            <main className="profile">
                <div className="profile__content">
                    <div className="profile__header">
                        <ProfileContainer
                            handleImageClick={handleImageClick}
                            currentUser={currentUser}
                        />
                        <h1 className="profile__title" >
                            Привет, <br />{currentUser.name}!
                        </h1>
                        <ProfileForm
                            loadImage={loadImage}
                            handleSubmit={handleSubmit}
                            imageInputRef={imageInputRef}
                        />
                    </div>
                    < ProfileEdit/>
                </div>
                <div className="profile__basket">
                    test2
                </div>
            </main>
        </>
    );
};