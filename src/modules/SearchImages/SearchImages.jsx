import { Component } from 'react';

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
      this.setState(({ items }) => ({ items: [...items, ...data] }));
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

  render() {
    const { items, loading, error, search } = this.state;
    const { imagesSearch, loadMore } = this;

    return (
      <>
        <Searchbar onSubmit={imagesSearch} />
        <ImageGallery items={items} />
        {!items.length && search && <p>Images not found</p>}
        {error && <p>{error}</p>}
        {loading && <p>...Loading images</p>}
        {Boolean(items.length) && (
          <Button loadMore={loadMore}>Load more</Button>
        )}
      </>
    );
  }
}

export default SearchImages;
