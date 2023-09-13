export const ProfileLabel = ({ title, onChange, value, name }) => {
    
    return (
        <label className="profile__label">
            <span className="profile__span">Изменить {title}</span>
            <input className="profile__input"
            type={name}
            name={name} 
            value={value.title} 
            onChange={onChange} 
            placeholder={`Изменить ${title}`} />
            <span className='profile__input-error'></span>
        </label>
    )
}