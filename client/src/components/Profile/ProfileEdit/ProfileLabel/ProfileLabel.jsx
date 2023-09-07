export const ProfileLabel = ({ title }) => {
    return (
        <label className="profile__label">
            <span className="profile__span">Изменить {title}</span>
            <input className="profile__input" type="text" placeholder={`Изменить ${title}`} />
            <span className='profile__input-error'></span>
        </label>
    )
}