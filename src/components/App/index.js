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

function App() {
  // input controlé pour SearchBar
  const [search, setSearch] = useState('');

  // message pour Message
  const [message, setMessage] = useState('');

  // liste des repos pour ReposResults
  const [repos, setRepos] = useState([]);

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

  // fonction qui lance la requete API et qui enregistre les resultats dans le state (dans repos)
  const fetchRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${search}`);

      // mise à jour du state avec les nouveaux repos
      setRepos(response.data.items);

      // mise à jour du message avec le count des repos
      setMessage(`La recherche a donné ${response.data.total_count} resultats`);
    }
    catch (e) {
      // mise à jour du message avec une erreur
      setMessage('Désolée, une erreur est survenue ...');
    }
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
              />
              {(message !== '') && <Message message={message} />}
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
