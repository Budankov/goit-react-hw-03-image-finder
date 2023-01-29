import { Component } from 'react';

import Modal from 'shared/components/Modal/Modal';
import ImageModal from './ImageModal/ImageModal';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from '../../shared/components/Button/Button';
import { getImages } from '../../shared/services/pixabey-api';

import './search-images.module.scss';

class SearchImages extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPage: '',
    showModal: false,
    imageModal: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await getImages(search, page);
      this.setState(({ items, totalPage }) => ({
        items: [...items, ...data.hits],
        totalPage: data.total,
      }));
    } catch (error) {
      this.state({ error: error.massage });
    } finally {
      this.setState({ loading: false });
    }
  }

  imagesSearch = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImageModal = ({ largeImageURL, tags }) => {
    this.setState({
      imageModal: {
        largeImageURL,
        tags,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imageModal: null,
    });
  };

  render() {
    const { items, loading, error, search, totalPage, showModal, imageModal } =
      this.state;
    const { imagesSearch, loadMore, showImageModal, closeModal } = this;

    return (
      <>
        <Searchbar onSubmit={imagesSearch} />
        <ImageGallery items={items} showImageModal={showImageModal} />
        {!items.length && search && <p>Images not found</p>}
        {error && <p>{error}</p>}
        {loading && <p>...Loading images</p>}
        {Boolean(items.length !== totalPage) && (
          <Button loadMore={loadMore}>Load more</Button>
        )}
        {showModal && (
          <Modal closeModal={closeModal}>
            <ImageModal {...imageModal} />
          </Modal>
        )}
      </>
    );
  }
}

export default SearchImages;
