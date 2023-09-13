import React, { useRef, useEffect, useState } from 'react';
import editAvatar from '../../../image/edit_avatar.svg';
import pepe from '../../../image/pepe.jpg'

export const ProfileForm = ({ handleAddAvatar, currentUser }) => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const [image, setImage] = useState();

    useEffect(() => {
        if (image) {
            buttonRef.current.click();
        }
    }, [image]);

    const handleImage = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAvatar({ userId: currentUser.id, img: image });
    };

    return (
        <div className="profile__header">
            <div className='profile__wrapper'>
                <img
                    className="profile__avatar"
                    src={currentUser.avatar ? `${process.env.REACT_APP_API_URL}/${currentUser.avatar}` : pepe}
                    alt="Аватар пользователя"
                />
                <div onClick={handleImage} className='profile__overlay'>
                    <img src={editAvatar} alt="Редактировать изображение" />
                </div>
            </div>
            <h1 className="profile__title">
                Привет, <br />{currentUser.name}!
            </h1>
            <form className="profile__form" onSubmit={handleSubmit}>
                <input
                    className="createItem__input"
                    title="img"
                    name="img"
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                />
                <button
                    className="createItem__button"
                    type="submit"
                    onClick={handleSubmit}
                    ref={buttonRef}
                >
                    Изменить
                </button>
            </form>
        </div>
    );
};