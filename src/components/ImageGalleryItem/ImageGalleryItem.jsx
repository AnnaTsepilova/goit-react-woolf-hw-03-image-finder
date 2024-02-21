import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ img, onModalOpen }) {
  return (
    <li className={css.imageGalleryItemLi}>
      <img
        className={css.imageGalleryItemImg}
        src={img.webformatURL}
        alt={img.tags}
        onClick={() => {
          onModalOpen(img);
        }}
      />
    </li>
  );
}
