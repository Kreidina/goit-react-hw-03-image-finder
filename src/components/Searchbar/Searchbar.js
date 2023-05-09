import PropTypes from 'prop-types';

import css from './Searchbar.module.css';
import SearchForm from 'components/SearchForm/SearchForm';

export const Searchbar = ({ onSubmit }) => {
  return (
    <>
      <header className={css.searchbar}>
        <SearchForm onSubmit={onSubmit} />
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
