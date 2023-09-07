export const ProfileForm = ({handleSubmit, loadImage, imageInputRef}) => {
    return (
        <form
            className="profile__form"
            onSubmit={handleSubmit}
        >
            <input
                className="createItem__input"
                title="img"
                name="img"
                type="file"
                onChange={loadImage}
                ref={imageInputRef}
            />
            <button
                className="createItem__button"
                type="submit"
                onClick={handleSubmit}
            >
            </button>
        </form>
    )
}