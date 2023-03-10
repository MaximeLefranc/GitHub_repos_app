import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import logo from '../../assets/images/logo-github.png';
import './styles.scss';
import Faq from '../Faq';
import NotFound from '../NotFound';
import NavBar from '../NavBar';
import SearchPage from '../SearchPage';

function App() {
  // input controlé pour SearchBar
  const [search, setSearch] = useState('');
  // message pour Message
  const [message, setMessage] = useState('');
  // liste des repos pour ReposResults
  const [repos, setRepos] = useState([]);
  // etat de loading
  const [isLoading, setIsLoading] = useState(false);
  // nombre total de resultats de la derniere requete
  const [totalCount, setTotalCount] = useState(0);
  // numéro de page
  const [page, setPage] = useState(1);

  /*
  Plan d'action BONUS Router :
  - installer react-router-dom
  - englober notre app avec BrowserRouter
  - avoir une route vers /faq qui affiche un composant Faq
    qui lui meme affiche une liste de questions :
    <Route path="/faq" element={<Faq />} />
  - avoir une route vers / qui affiche la recherche
    <Route path="/" element={Tous les sous composants de la recherche} />
  - avoir une route par défaut (url *) qui va matcher si aucune des 2 autre n'a matché
    <Route path="*" element={<404 />} />
  - menu avec des Link / NavLink qui modifie l'url sans recharger de page
  */

  /*
  Plan d'action Bonus MoreButton
  - changer la requete pour charger au submit la premiere page
  - afficher un bouton si le nombre de resultats est superieur au nombre de repos affichés : si > 9
  - au clic sur ce bouton déclancher un appel api pour charger les 9 suivantes donc la page 2
  - stocker dans le state le numéro de page
  */

  // fonction qui lance la requete API et qui enregistre les resultats dans le state (dans repos)
  const fetchRepos = async () => {
    try {
      setIsLoading(true); // on demarre le loader
      const response = await axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=1&per_page=9`);
      setPage(1); // on revient à la page 1 pour le prochain rendu

      // mise à jour du state avec les nouveaux repos et le nbr de results
      setRepos(response.data.items);
      setTotalCount(response.data.total_count);
      /*
      setTotalCOunt est un "setter" renvoyé par useState
      mais attention il ne met pas à jours tout de suite
      la valeur dans le state, il programme la prochaine valeur du prochain rendu !
      */

      // mise à jour du message avec le count des repos
      setMessage(`La recherche a donné ${response.data.total_count} resultats`);
    }
    catch (e) {
      // mise à jour du message avec une erreur
      setMessage('Désolée, une erreur est survenue ...');
    }
    setIsLoading(false); // dans tous les cas on stop le loader
  };

  const fetchMoreRepo = async () => {
    console.log('charger plus ');

    try {
      setIsLoading(true); // on demarre le loader

      console.log('valeur de search', search);
      const response = await axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=${page+1}&per_page=9`);
      // je passe à la page d'après pour le prochain rendu
      setPage(page + 1);

      // mise à jour du state avec les nouveaux repos mais on veut garder les anciens
      setRepos([
        ...repos, // on met les premiers
        ...response.data.items, // on ajoute les suivants
      ]);
    }
    catch (e) {
      // mise à jour du message avec une erreur
      setMessage('Désolée, une erreur est survenue ...');
    }
    setIsLoading(false); // dans tous les cas on stop le loader
  };

  /*
  Version de fetchRepos non asynchrone avec .then et .catch
  const fetchRepos = () => {
    axios.get(`https://api.github.com/search/repositories?q=${search}`)
      .then((response) => {
        setRepos(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  */

  return (
    <div className="app">
      <img src={logo} alt="logo Github" />
      <NavBar />

      <Routes>
        <Route path="/faq" element={<Faq />} />
        <Route
          path="/"
          element={(
            <SearchPage
              search={search}
              setSearch={setSearch}
              fetchRepos={fetchRepos}
              isLoading={isLoading}
              message={message}
              repos={repos}
              totalCount={totalCount}
              fetchMoreRepo={fetchMoreRepo}
            />
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
