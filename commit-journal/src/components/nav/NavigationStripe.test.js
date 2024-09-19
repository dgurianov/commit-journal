import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { navBarState } from '../../state/cjournalState';
import NavigationStripe from './NavigationStripe';

const renderComponent = (initialState) => {
  return render(
    <RecoilRoot initializeState={({ set }) => set(navBarState, initialState)}>
      <NavigationStripe />
    </RecoilRoot>
  );
};

describe('NavigationStripe Component', () => {
  test('renders NavigationStripe component with buttons', () => {
    renderComponent({ search: '', add: '' });

    // Überprüfen, ob die Buttons vorhanden sind
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('handleOnclick sets search to active', () => {
    renderComponent({ search: '', add: '' });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Überprüfen, ob der search-Button die Klasse "active" hat
    expect(searchButton).toHaveClass('active');
    // Überprüfen, ob der add-Button die Klasse "active" nicht hat
    expect(screen.getByText('Add')).not.toHaveClass('active');
  });

  test('handleOnclick sets add to active', () => {
    renderComponent({ search: '', add: '' });

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    // Überprüfen, ob der add-Button die Klasse "active" hat
    expect(addButton).toHaveClass('active');
    // Überprüfen, ob der search-Button die Klasse "active" nicht hat
    expect(screen.getByText('Search')).not.toHaveClass('active');
  });
});