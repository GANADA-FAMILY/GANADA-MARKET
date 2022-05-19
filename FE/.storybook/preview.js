import { BrowserRouter } from 'react-router-dom';
import 'index.css';
import { Provider } from 'react-redux';
import store from '../src/state/Store';

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
