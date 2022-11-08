import logo from '../../assets/images/logo-github.png';
import ReposResults from '../RepoResults';
import Message from '../Message';
import SearchBar from '../SearchBar';
import './styles.scss';

function App() {
  const message = "Coucou";

  return (
    <div className="app">
      <img src={logo} alt="logo Github" />
      <SearchBar />
      <Message message={message} />
      <ReposResults />
    </div>
  );
}

export default App;
