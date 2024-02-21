import { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import getImagesApi from 'services/galleryApi';
import * as Notify from 'services/notifications';

import ImageGalleryList from 'components/ImageGalleryList/ImageGalleryList';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const imagesPerPage = 12;

export default class ImageGallery extends Component {
  state = {
    images: [],
    totalImages: 0,
    isLoading: false,
    error: null,
    showModal: false,
    modalImage: {},
  };

  componentDidMount() {
    const { searchQuery, page } = this.props;
    if (searchQuery) {
      getImagesApi(searchQuery, page);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.searchQuery;
    const page = this.props.page;

    if (searchQuery !== prevProps.searchQuery || page !== prevProps.page) {
      try {
        this.setState({ isLoading: true });

        const response = await getImagesApi(searchQuery, page, imagesPerPage);

        if (searchQuery !== prevProps.searchQuery) {
          this.setState({
            images: response.hits,
            isLoading: false,
            totalImages: response.total,
          });
        } else {
          this.setState({
            images: [...prevState.images, ...response.hits],
            isLoading: false,
            totalImages: response.total,
          });
        }

        if (response.hits.length > 0 && response.hits.length < imagesPerPage) {
          Notify.NotificationInfo(Notify.INFO_MESSAGE);
        }

        if (!response.hits.length) {
          Notify.NotificationError(Notify.NO_FOUND_MESSAGE);
        }
      } catch (error) {
        Notify.NotificationError(`${Notify.ERROR_MESSAGE} ${error.message}`);
        this.setState({ isLoading: false });
      }
    }
    if (this.state.images.length > imagesPerPage) {
      scroll.scrollToBottom();
    } else {
      scroll.scrollToTop();
    }
  }

  onModalOpen = image => {
    this.setState(({ showModal }) => ({
      modalImage: image,
      showModal: !showModal,
    }));
  };

  onModaClose = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  render() {
    const { images, totalImages, isLoading, showModal, modalImage } =
      this.state;

    return (
      <>
        <ImageGalleryList images={images} onModalOpen={this.onModalOpen} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={this.props.loadMore} />
        )}
        {showModal && (
          <Modal onModalClose={this.onModaClose}>
            <img src={modalImage.largeImageURL} alt={modalImage.tags} />
          </Modal>
        )}
      </>
    );
  }
}
