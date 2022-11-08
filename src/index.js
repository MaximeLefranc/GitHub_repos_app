import 'semantic-ui-css/semantic.min.css';
import { createRoot } from 'react-dom/client';
import App from 'src/components/App';
import { BrowserRouter } from 'react-router-dom';

const rootReactElement = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root'));

root.render(rootReactElement);
