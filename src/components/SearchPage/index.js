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
  /* On place un effet au premier rendu du compopsant */
  useEffect(
    // le code a executer
    () => {
      // ecouter le scroll de la page = effet de bord
      const handleScroll = () => {
        // si on a scrollé + que la hauteur du body - la taille de la fenetre :
        // et qu'on est pas deja en train de loader , on declanche le load
        if (window.scrollY >= (document.body.scrollHeight - window.innerHeight) && !isLoading) {
          /*
          BUG :
          console.log(search); // '' -> valeure initiale du state
          la valeur de search ne va pas changer, car on a créé une fermeture lexicale (closure)
          avec search à '', tel qu’elle était lorsque fetchMoreRepo s’est exécutée.
          Normal d'après la doc de React : "Si vous passez un tableau vide ([]),
          les props et l’état local vus depuis l’intérieur de l’effet
          feront toujours référence à leurs valeurs initiales." 😱
          --> Donc si on utilise une donnée du state dans un useEffect
          il faut la placer dans le tableau de dependances..

          Solution : si on place search dans le tableau de dependances
          ça va placer un nouvel écouteur de scroll à chaque fois que search change
          mais ce n'est pas grave car on va l'enlever dans la fonction de nettoyage,
          celle ci sera appelée avant chaque re-rendu donc on en aura pas plusieurs en meme temps !
          */
          fetchMoreRepo();
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
        console.log('on supprime l\'ecouteur du scroll avant d\'en remettre un au prochain rendu');
        window.removeEventListener('scroll', handleScroll);
      };
    },
    // le tableau de dep : quand : au premier rendu
    // -> attention il faut bien mettre search et isLoading sinon on aura tjs les valeurs initiales
    [search, isLoading],
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
      <ReposResults repos={repos} totalCount={totalCount} fetchMoreRepo={fetchMoreRepo} />
      {isLoading && <Spinner />}
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
