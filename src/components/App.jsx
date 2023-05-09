import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import picturesApi from './services/apiImg';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImg: [],
    total: 0,
    error: null,
  };

  componentDidUpdate = (_, prevState) => {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchPictures(searchQuery, page);
    }
  };

  fetchPictures = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const pictures = await picturesApi.fetchPictures(query, page);

      if (pictures.totalHits === 0) {
        return toast.info(`Nothing was found for ${query}. Try something else`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...pictures.hits],
        total: pictures.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      console.log(error.message);
      return toast.error('An error occurred on the server. Try again later');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onFormSubmit = imgName => {
    this.setState({ searchQuery: imgName, page: 1, images: [], total: 0 });
  };

  clickLearnMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  onOpenkModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const { images } = this.state;
    const src = e.target.src;
    images.find(img => {
      if (img.webformatURL === src) {
        this.setState({ showModal: true, largeImg: img });
        return img;
      }
      return null;
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      largeImg: [],
    });
  };

  render() {
    const { images, isLoading, showModal, largeImg, total } = this.state;
    const totalPage = total / images.length;
    const showButton = totalPage > 1 && total !== images.length;

    return (
      <div className="app">
        <Searchbar onSubmit={this.onFormSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} onClick={this.onOpenkModal} />
        )}
        {isLoading && (
          <ThreeDots
            height="90"
            width="90"
            color="#3f51b5"
            wrapperStyle={{ justifyContent: 'center', marginTop: '10px' }}
          />
        )}
        {showButton && !isLoading && <Button onClick={this.clickLearnMore} />}
        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={largeImg.largeImageURL} alt={largeImg.tags} />
          </Modal>
        )}
        <ToastContainer autoClose={2000} theme={'colored'} />
      </div>
    );
  }
}

export default App;
