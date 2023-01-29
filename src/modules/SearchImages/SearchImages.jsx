import { Component } from 'react';

import Modal from 'shared/components/Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import ImageModal from './ImageModal/ImageModal';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageNotFound from './ImageNotFound/ImageNotFound';
import Button from '../../shared/components/Button/Button';
import Loader from 'shared/components/Loader/Loader';
import { getImages } from '../../shared/services/pixabey-api';

import './search-images.module.scss';

class SearchImages extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalHits: 0,
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
      //   console.log(data);
      const { hits, totalHits } = data;
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits,
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
    const { items, loading, error, search, totalHits, showModal, imageModal } =
      this.state;
    const { imagesSearch, loadMore, showImageModal, closeModal } = this;

    return (
      <>
        <Searchbar onSubmit={imagesSearch} />
        <ImageGallery items={items} showImageModal={showImageModal} />
        {!items.length && search && <ImageNotFound />}
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {items.length > 0 && items.length < totalHits && (
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
