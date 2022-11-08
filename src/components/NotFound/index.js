import { Message } from 'semantic-ui-react';

function NotFound() {
  return (
    <Message>
      <Message.Header>404</Message.Header>
      <p>
        Cette page n'existe pas !
      </p>
    </Message>
  );
}

export default NotFound;
