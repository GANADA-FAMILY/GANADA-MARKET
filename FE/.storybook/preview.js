import { BrowserRouter } from 'react-router-dom';
import 'index.css';

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
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
