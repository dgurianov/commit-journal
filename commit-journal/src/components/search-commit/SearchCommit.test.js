import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchCommit from './SearchCommit.js';

describe('SearchCommit Component', () => {

  /**
   * @jest-environment jsdom
  */
  test('renders SearchCommit component', () => {
    render(<SearchCommit />);
    
    // Überprüfen, ob das Eingabefeld und die Schaltflächen vorhanden sind
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('handles search and reset button clicks', () => {
    render(<SearchCommit />);
    
    const input = screen.getByTestId('search-text');
    const searchButton = screen.getByText('Search');
    const resetButton = screen.queryByText('Reset');

    // Überprüfen, ob das Reset-Button nicht vorhanden ist
    expect(resetButton).not.toBeInTheDocument();

    // Geben Sie einen Suchbegriff ein und klicken Sie auf die Suchschaltfläche
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    // Überprüfen, ob das Reset-Button jetzt vorhanden ist
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });
});