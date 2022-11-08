import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Message from '../Message';
import ReposResults from '../RepoResults';
import SearchBar from '../SearchBar';
import Spinner from '../Spinner';

function SearchPage({
  search, setSearch, fetchRepos, isLoading,
  message, repos, totalCount, fetchMoreRepo,
}) {
  useEffect(
    // le code a executer
    () => {
      // ecouter le scroll de la page = effet de bord
      const handleScroll = () => {
        // si on a scrollé + que la hauteur du body - la taille de la fenetre - une petite marge:
        // on declanche le load
        if (window.scrollY >= (document.body.scrollHeight - window.innerHeight - 200)) {
          console.log('on pourrait relancer le fetch', search);
          // fetchMoreRepo();
        }
      };
      // ici on pose un eventlistener = un effet de bord
      // ça serait bien de pouvoir l'enlever quand le composant est démonté
      console.log('on pose un ecouteur du scroll au premier montage du composant SearchPage');
      window.addEventListener('scroll', handleScroll);

      /* le retour de useEffect doit etre une callback
      et cette callback sera executée avant le demontage du composant :
      c'est util pour nettoyer des effets de bord */
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    // le tableau de dep : quand : au premier rendu
    [],
  );

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        fetchRepos={fetchRepos}
        isLoading={isLoading}
      />
      {/* affichages conditionnels :
      - on affiche <Message> que si message vaut non chaine vide
      - on affiche <Spinner> que si isLoading vaut vrai
      */}
      {(message !== '') && <Message message={message} />}
      {isLoading && <Spinner />}
      <ReposResults repos={repos} totalCount={totalCount} fetchMoreRepo={fetchMoreRepo} />
    </>
  );
}

SearchPage.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  fetchRepos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  fetchMoreRepo: PropTypes.func.isRequired,
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default SearchPage;
