import { Component } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

import * as Notify from 'services/Notifications';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQuery = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return Notify.NotificationWarning(Notify.EMPTY_QUERY_MESSAGE);
    }
    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbarContainer}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button className={css.searchFormButton} type="submit">
            <ImSearch style={{ width: '1.5em', height: '1.5em' }} />
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            name="searchQuery"
            autoComplete="off"
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}
