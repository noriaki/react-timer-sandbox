import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

// enzyme setup
configure({ adapter: new Adapter() });

// error handling
const logAndExit: (err: unknown) => void = (err) => {
  if (err instanceof Error) {
    console.error(err);
  }
  process.exit(1);
};
process.on('unhandledRejection', logAndExit);
