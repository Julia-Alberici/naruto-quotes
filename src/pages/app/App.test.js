import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

import { rest } from 'msw';
import { setupServer } from 'msw/node'

const response = { quote:'test quote', speaker:'speaker' };

const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, ctx) =>{
    return res(ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders aplication with text, button and image', () => {
  render(<App />);

  const textEl = screen.getByText('loading speaker');
  const buttonEl = screen.getByRole('button');
  const imageEl = screen.getByRole('img');

  expect(textEl).toBeInTheDocument();
  expect(buttonEl).toBeInTheDocument();
  expect(imageEl).toBeInTheDocument();
});

test('calls api on button click and updates its text', async () =>{
  render(<App />);

  const buttonEl = screen.getByRole('button');

  fireEvent.click(buttonEl);

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
})

test('calls api on startup and renders its response', async () =>{
  render(<App />);

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
})
