import { useState } from 'react';

import logo from '../../assets/images/logo-github.png';
import ReposResults from '../RepoResults';
import Message from '../Message';
import SearchBar from '../SearchBar';
import './styles.scss';
import axios from 'axios';
import Faq from '../Faq';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../NotFound';
import NavBar from '../NavBar';
import Spinner from '../Spinner';

function App() {
  // input controlé pour SearchBar
  const [search, setSearch] = useState('');

  // message pour Message
  const [message, setMessage] = useState('');

  // liste des repos pour ReposResults
  const [repos, setRepos] = useState([]);

  // etat de loading
  const [isLoading, setIsLoading] = useState(false);

  /*
  Plan d'action BONUS Router :
  x installer react-router-dom

  x englober notre app avec BrowserRouter

  x avoir une route vers /faq qui affiche un composant Faq
    qui lui meme affiche une liste de questions :
    <Route path="/faq" element={<Faq />} />

  x avoir une route vers / qui affiche la recherche
    <Route path="/" element={Tous les sous composants de la recherche} />

  x avoir une route par défaut (url *) qui va matcher si aucune des 2 autre n'a matché
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

      // mise à jour du state avec les nouveaux repos
      setRepos(response.data.items);

      // mise à jour du message avec le count des repos
      setMessage(`La recherche a donné ${response.data.total_count} resultats`);
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
              <ReposResults repos={repos} />
            </>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
