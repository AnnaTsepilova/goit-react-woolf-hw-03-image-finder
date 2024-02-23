import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';

import getImagesApi from 'services/galleryApi';
import * as Notify from 'services/notifications';

import Section from './Section/Section';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGalleryList from './ImageGalleryList/ImageGalleryList';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const imagesPerPage = 12;
class App extends Component {
  state = {
    searchQuery: '',
    page: 1,

    images: [],
    totalImages: 0,
    isLoading: false,
    error: null,
    showModal: false,
    modalImage: {},
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.addImages();
    }
  }

  addImages = async () => {
    const searchQuery = this.state.searchQuery;
    const page = this.state.page;

    try {
      this.setState({ isLoading: true });

      const response = await getImagesApi(searchQuery, page, imagesPerPage);

      if (searchQuery !== this.state.searchQuery) {
        this.setState({
          images: response.hits,
          isLoading: false,
          totalImages: response.total,
        });
      } else {
        this.setState(state => ({
          images: [...state.images, ...response.hits],
          isLoading: false,
          totalImages: response.total,
        }));
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
    } finally {
      this.setState({ isLoading: false });
    }

    if (this.state.images.length > imagesPerPage - 1) {
      scroll.scrollToBottom();
    } else {
      scroll.scrollToTop();
    }
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      Notify.NotificationInfo(Notify.ALREADY_SHOWN_MESSAGE);
      return;
    }
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
    });
  };

  handleOnClickLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

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
      <Section>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGalleryList images={images} onModalOpen={this.onModalOpen} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalImages && !isLoading && (
          <Button onClick={this.handleOnClickLoadMoreBtn} />
        )}
        {showModal && (
          <Modal onModalClose={this.onModaClose}>
            <img src={modalImage.largeImageURL} alt={modalImage.tags} />
          </Modal>
        )}
        <ToastContainer />
      </Section>
    );
  }
}

export default App;
