import PropTypes from 'prop-types';
import { Input, Form, Segment } from 'semantic-ui-react';

function SearchBar({
  search, setSearch, fetchRepos, isLoading,
}) {
  return (
    <Form
      onSubmit={() => {
        // ici pas besoin de prevent default car le composant Form de semantic iu le fait deja
        // on lance l'appel API pour enregistrer dans le state les repos
        fetchRepos();
      }}
    >
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
          loading={isLoading}
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
  // la fonction pour enregistrer dans le state les repos de la recherche
  fetchRepos: PropTypes.func.isRequired,
  // le booleen qui indique si on est en etat de loading
  isLoading: PropTypes.bool.isRequired,
};

export default SearchBar;
