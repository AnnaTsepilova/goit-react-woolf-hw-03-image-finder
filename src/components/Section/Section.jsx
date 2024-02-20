import css from './Section.module.css';

export default function Section({ children }) {
  return <main className={css.container}>{children}</main>;
}
