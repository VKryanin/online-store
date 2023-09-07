import editAvatar from '../../../image/edit_avatar.svg';
import pepe from '../../../image/pepe.jpg'

export const ProfileContainer = ({handleImageClick, currentUser}) => {
    return (
        <div
            className="profile__avatar-container"
            onClick={handleImageClick}
        >
            {currentUser.avatar
                ? <img
                    className="profile__avatar"
                    src={`${process.env.REACT_APP_API_URL}/${currentUser.avatar}`}
                    alt="Аватар пользователя"
                />
                : <img
                    className="profile__avatar"
                    src={pepe}
                    alt="Стандарный аватар"
                />
            }
            <div className="profile__avatar-overlay">
                <img
                    src={editAvatar}
                    alt="Изменить аватар"
                />
            </div>
        </div>
    )
}