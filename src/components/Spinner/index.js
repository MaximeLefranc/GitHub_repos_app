import {
  Dimmer, Loader, Segment, Image,
} from 'semantic-ui-react';

function Spinner() {
  return (
    <Segment>
      <Dimmer inverted active>
        <Loader inverted />
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
}

export default Spinner;
