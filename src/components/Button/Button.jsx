import css from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button className={css.buttonLoadMore} type="button" onClick={onClick}>
      Load more
    </button>
  );
}
