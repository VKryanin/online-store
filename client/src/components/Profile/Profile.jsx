import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";



export const Profile = () => {
    const currentUser = useContext(CurrentUserContext)

    return(
        <p>test</p>
    )
}