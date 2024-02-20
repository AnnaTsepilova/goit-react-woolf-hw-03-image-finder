import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Section from './Section/Section';
import Searchbar from './Searchbar/Searchbar';
class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
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

  render() {
    return (
      <Section>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />
      </Section>
    );
  }
}

export default App;
