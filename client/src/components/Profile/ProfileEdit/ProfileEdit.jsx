import { useState } from "react";
import { ProfileLabel } from "./ProfileLabel/ProfileLabel";

export const ProfileEdit = ({ updateUser }) => {
    const [formType, setFormType] = useState(null);
    const [userData, setUserData] = useState({})
    function handleSubmit(e) {
        e.preventDefault();
        console.log({ ...userData });
        updateUser({ ...userData})
    }

    const handleItem = (type) => {
        if (formType === type) {
            setFormType(null);
        } else {
            setFormType(type);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h2 className="profileEdit">Редактировать профиль</h2>
            <ul className="profileEdit__list">
                <li className="profileEdit__item" onClick={() => handleItem("email")}>
                    Изменить почту
                </li>
                <li className="profileEdit__item" onClick={() => handleItem("name")}>
                    Изменить имя
                </li>
                <li
                    className="profileEdit__item"
                    onClick={() => handleItem("password")}
                >
                    Изменить пароль
                </li>
            </ul>
            <div className={`profileLabel ${formType ? "show" : ""}`}>
                {formType && <ProfileLabel
                    name={formType}
                    title={formType}
                    value={userData || ''}
                    onChange={handleInputChange} />}
            </div>
            <button onClick={e => {
                handleSubmit(e)
            }} >Сохранить</button>
        </form>
    );
};
