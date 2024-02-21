import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Section from './Section/Section';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    isLoading: true,
  };

  handleFormSubmit = searchQuery => {
    let page = this.state.page;
    if (this.state.searchQuery !== searchQuery) {
      page = 1;
    }
    this.setState({
      searchQuery: searchQuery,
      page: page,
    });
  };

  handleOnClickLoadMoreBtn = event => {
    event.preventDefault();
    const page = this.state.page + 1;
    this.setState({ page });
  };

  render() {
    return (
      <Section>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          page={this.state.page}
          loadMore={this.handleOnClickLoadMoreBtn}
        />
        <ToastContainer />
      </Section>
    );
  }
}

export default App;
