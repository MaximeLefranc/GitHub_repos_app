import logo from '../../assets/images/logo-github.png';
import ReposResults from '../RepoResults';
import Message from '../Message';
import SearchBar from '../SearchBar';
import './styles.scss';

function App() {
  return (
    <div className="app">
      <img src={logo} alt="logo Github" />
      <SearchBar />
      <Message />
      <ReposResults />
    </div>
  );
}

export default App;
