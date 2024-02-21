import css from './ImageGalleryList.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGalleryList({ images, onModalOpen }) {
  return (
    <ul className={css.imageGalleryContainer}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          img={image}
          onModalOpen={onModalOpen}
        />
      ))}
    </ul>
  );
}
