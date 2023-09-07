import { ProfileLabel } from "./ProfileLabel/ProfileLabel"

export const ProfileEdit = () => {
    return (
        <form>
            <h2>Редактировать профиль</h2>
            <ProfileLabel title={'E-mail'}/>
            {/* <ProfileLabel title={'имя'}/>
            <ProfileLabel title={'пароль'}/> */}
            <button>Сохранить</button>
        </form>
    )
}