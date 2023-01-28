import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

class SearchImages extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
  };

  render() {
    const { items, loading, error } = this.state;

    return (
      <>
        <Searchbar />
        <ul>
          <ImageGalleryItem items={items} />
        </ul>
      </>
    );
  }
}

export default SearchImages;
