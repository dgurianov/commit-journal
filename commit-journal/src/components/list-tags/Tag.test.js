import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import Tag from './Tag';
import { commitsFilterState } from '../../state/cjournalState';

const renderComponent = (tagname, initialState = new Set()) => {
  return render(
    <RecoilRoot initializeState={({ set }) => set(commitsFilterState, initialState)}>
      <Tag tagname={tagname} />
    </RecoilRoot>
  );
};

describe('Tag Component', () => {
  test('renders Tag component', () => {
    renderComponent('test-tag');

    // Überprüfen, ob die Schaltfläche mit dem Tag-Namen vorhanden ist
    expect(screen.getByText('+test-tag')).toBeInTheDocument();
  });

  test('toggles tag filter on click', () => {
    renderComponent('test-tag');

    const button = screen.getByText('+test-tag');

    // Überprüfen, ob die Schaltfläche die richtige Klasse hat
    expect(button).toHaveClass('btn-outline-primary');

    // Simulieren Sie einen Klick auf die Schaltfläche
    fireEvent.click(button);

    // Überprüfen, ob die Schaltfläche die Klasse geändert hat
    expect(button).toHaveClass('btn-outline-danger');

    // Simulieren Sie einen weiteren Klick auf die Schaltfläche
    fireEvent.click(button);

    // Überprüfen, ob die Schaltfläche die Klasse wieder geändert hat
    expect(button).toHaveClass('btn-outline-primary');
  });

  test('initializes with correct filter state', () => {
    renderComponent('test-tag', new Set(['test-tag']));

    const button = screen.getByText('+test-tag');

    // Überprüfen, ob die Schaltfläche die richtige Klasse hat
    expect(button).toHaveClass('btn-outline-danger');
  });
});