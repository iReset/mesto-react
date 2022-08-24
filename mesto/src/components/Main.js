function Main(props) {
  return (
    <main className="main">
      <section className="profile root__profile">
        <button
          className="profile__avatar-edit button"
          type="button"
          aria-label="Изменить аватар."
          onClick={props.onEditAvatar}
        >
          <img className="profile__avatar" src="#" alt="Аватар пользователя." />
        </button>
        <div className="profile__info">
          <h1 className="profile__name"></h1>
          <p className="profile__about"></p>
          <button
            className="profile__edit-button button"
            type="button"
            aria-label="Редактировать."
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          aria-label="Добавить."
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements root__elements" aria-label="Блок с карточками мест.">
        <ul className="elements__list">
        </ul>
      </section>
    </main>
  );
}

export default Main;
