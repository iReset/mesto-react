import Header from './Header';

function App() {
  return (
    <>
      <Header />

      <main className="main">
        <section className="profile root__profile">
          <button className="profile__avatar-edit button" type="button" aria-label="Изменить аватар.">
            <img className="profile__avatar" src="#" alt="Аватар пользователя." />
          </button>
          <div className="profile__info">
            <h1 className="profile__name"></h1>
            <p className="profile__about"></p>
            <button className="profile__edit-button button" type="button" aria-label="Редактировать."></button>
          </div>
          <button className="profile__add-button button" type="button" aria-label="Добавить."></button>
        </section>

        <section className="elements root__elements" aria-label="Блок с карточками мест.">
          <ul className="elements__list">
          </ul>
        </section>
      </main>

      <footer className="footer  root__footer">
        <p className="footer__copyright">2022&nbsp;Mesto&nbsp;Russia</p>
      </footer>

      <div className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="Закрыть форму ввода."></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="popup__form  popup__avatar" id="avatar-edit" name="avatar_edit">
            <fieldset className="popup__fieldset">
              <input className="popup__input popup__input_type_link" type="url" id="avatar_link" name="avatar_link" value=""
                placeholder="Ссылка на аватар" required />
              <span className="popup__input-error" id="avatar_link-error" hidden></span>
              <button className="popup__save-button button" type="submit">Сохранить</button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="Закрыть форму ввода."></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="popup__form  popup__profile" id="profile-edit" name="profile_edit">
            <fieldset className="popup__fieldset">
              <input className="popup__input popup__input_type_name" type="text" id="name" name="name" value=""
                placeholder="Имя" required minLength="2" maxLength="40" />
              <span className="popup__input-error" id="name-error" hidden></span>
              <input className="popup__input popup__input_type_about" type="text" id="about" name="about" value=""
                placeholder="О себе" required minLength="2" maxLength="200" />
              <span className="popup__input-error" id="about-error" hidden></span>
              <button className="popup__save-button button" type="submit">Сохранить</button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="popup popup_type_add-card">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="Закрыть форму ввода."></button>
          <h2 className="popup__title">Новое место</h2>
          <form className="popup__form  popup__card" id="add-card" name="add_card">
            <fieldset className="popup__fieldset">
              <input className="popup__input popup__input_type_title" type="text" id="title" name="title" value=""
                placeholder="Название" required minLength="2" maxLength="30" />
              <span className="popup__input-error" id="title-error" hidden></span>
              <input className="popup__input popup__input_type_link" type="url" id="link" name="link" value=""
                placeholder="Ссылка на картинку" required />
              <span className="popup__input-error" id="link-error" hidden></span>
              <button className="popup__save-button button" type="submit">Сохранить</button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="popup popup_type_open-image">
        <figure className="popup__container popup__container_type_image">
          <div className="popup__image-block">
            <button className="popup__close-button button" type="button" aria-label="Закрыть изображение."></button>
            <img className="popup__image" src="#" alt="" />
          </div>
          <figcaption className="popup__caption"></figcaption>
        </figure>
      </div>

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="Закрыть окно подтверждения."></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="popup__form  popup__confirm" id="confirm" name="confirm">
            <button className="popup__save-button button" type="submit">Да</button>
          </form>
        </div>
      </div>

      <template id="element">
        <li className="element">
          <div className="element__image-container">
            <img className="element__image" src="#" alt="" />
          </div>
          <button className="element__remove-button button" type="button" aria-label="Удалить."></button>
          <div className="element__info">
            <h2 className="element__caption"></h2>
            <div className="element__like">
              <button className="element__like-button button" type="button" aria-label="Нравится."></button>
              <p className="element__like-quantity"></p>
            </div>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
