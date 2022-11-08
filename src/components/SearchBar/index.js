import PropTypes from 'prop-types';
import { Input, Form, Segment } from 'semantic-ui-react';

function SearchBar({ search, setSearch }) {
  return (
    <Form>
      <Segment>
        <Input
          fluid
          icon="search"
          placeholder="Search..."
          iconPosition="left"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Segment>
    </Form>
  );
}

SearchBar.propTypes = {
  // la valeur de l'input depuis le state de App
  search: PropTypes.string.isRequired,
  // la fonction pour modifier cette valeur dans le state de App
  setSearch: PropTypes.func.isRequired,
};

export default SearchBar;
