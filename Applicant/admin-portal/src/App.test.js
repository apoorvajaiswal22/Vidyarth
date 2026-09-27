import { render, screen } from '@testing-library/react';
import { AuthProvider } from './context/AuthContext';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/login');
});

function renderPortal() {
  return render(
    <AuthProvider>
      <App />
    </AuthProvider>,
  );
}

test('renders officer login', () => {
  renderPortal();
  expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  expect(screen.getByLabelText('Official email')).toBeInTheDocument();
});

test('redirects an unauthenticated officer queue visit to login', async () => {
  window.history.pushState({}, '', '/queue');
  renderPortal();
  expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
});
