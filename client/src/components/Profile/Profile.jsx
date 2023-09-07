import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Header } from "../Header/Header";



export const Profile = ({ handleGetAvatar, logout, handleAddAvatar }) => {
    const currentUser = useContext(CurrentUserContext)
    const [image, setImage] = useState()
    const [avatar, setAvatar] = useState()
    const loadImage = (e) => {
        const img = e.target.files[0]
        setImage(img)
    }

    useEffect(() => {
        setAvatar(handleGetAvatar())
    }, [])

    const handleSubmit = (e) => {
        console.log({ 'userId': currentUser, 'img': image });
        e.preventDefault();
        handleAddAvatar({ 'userId': currentUser.id, 'img': image })
    }
    return (
        <>
            <Header loggedIn={currentUser.loggedIn} logout={logout} />
            <main>
                <div>
                    <h1>Профиль {currentUser.name}</h1>

                    <form onSubmit={handleSubmit}>
                        <input
                            className="createItem__input"
                            title="img"
                            name='img'
                            type='file'
                            onChange={loadImage}
                        />
                        <button
                            className="createItem__button"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Add
                        </button>
                    </form>
                    {currentUser.avatar && <img src={`${process.env.REACT_APP_API_URL}/${currentUser.avatar}`} alt="" />}
                </div>
            </main>
        </>
    )
}