import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import ListOfTags from './ListOfTags';

const mockTags = [
  { 'id': 'tag1' },
  { 'id': 'tag2' },
  { 'id': 'tag3' }
];

const renderComponent = (tags) => {
  return render(
    <RecoilRoot>
      <ListOfTags tags={tags} />
    </RecoilRoot>
  );
};

describe('ListOfTags Component', () => {
  test('renders ListOfTags component with tags', () => {
    renderComponent(mockTags);

  });

  test('renders ListOfTags component with no tags', () => {
    renderComponent([]);

    // Überprüfen, ob keine Tags vorhanden sind
    expect(screen.queryByText('tag1')).not.toBeInTheDocument();
    expect(screen.queryByText('tag2')).not.toBeInTheDocument();
    expect(screen.queryByText('tag3')).not.toBeInTheDocument();
  });
});