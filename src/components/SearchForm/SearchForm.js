import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handelInput = e => {
    this.setState({
      searchQuery: e.currentTarget.value.toLowerCase(),
    });
  };

  handelSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      return toast.info('Enter a word to search for a picture');
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <form className={css.searchForm} onSubmit={this.handelSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <AiOutlineSearch className={css.iconSearch} />
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          value={this.state.searchQuery}
          onChange={this.handelInput}
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    );
  }
}
export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
