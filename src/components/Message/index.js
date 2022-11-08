import { Message as MessageSemantic } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function Message({ message }) {
  return (
    <MessageSemantic> {message} </MessageSemantic>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
