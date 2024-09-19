import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Commit from './Commit';
import { RecoilRoot } from 'recoil';
import AxiosClient from '../backend-client/AxiosClient';
import CONST from '../CONSTANTS';

// Mock AxiosClient
jest.mock('../backend-client/AxiosClient');

const mockSetShowEdit = jest.fn();

const mockCommit = {
  commitId: '123',
  description: 'Test commit message',
  repoId: 'repo1',
  tags: [{'id':'tag1'}, {'id':'tag2'}]
};

const renderComponent = () => {
  return render(
    <RecoilRoot>
      <Commit element={mockCommit} setShowEdit={mockSetShowEdit} />
    </RecoilRoot>
  );
};

describe('Commit Component', () => {
  test('renders Commit component', () => {
    renderComponent();
    // Überprüfen, ob die Commit-Nachricht und Tags vorhanden sind
    expect(screen.getByText('Test commit message')).toBeInTheDocument();
    expect(screen.getByText('+tag1')).toBeInTheDocument();
    expect(screen.getByText('+tag2')).toBeInTheDocument();
  });

  test('handles delete button click', async () => {
    AxiosClient.delete.mockResolvedValue({ data: {} });

    renderComponent();

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Überprüfen, ob die AxiosClient.delete-Methode aufgerufen wurde
    expect(AxiosClient.delete).toHaveBeenCalledWith(`${CONST.HTTP_COMMIT_RESOURCE}/123`);
  });

  test('handles edit button click', () => {
    renderComponent();

    const editButton = screen.getByRole('button', { name: /edit/i });

    fireEvent.click(editButton);

    // Überprüfen, ob die setShowEdit-Methode aufgerufen wurde
    expect(mockSetShowEdit).toHaveBeenCalledWith('123');
  });
});