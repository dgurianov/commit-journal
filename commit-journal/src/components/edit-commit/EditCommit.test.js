import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditCommit from './EditCommit';
import { RecoilRoot } from 'recoil';
import AxiosClient from '../backend-client/AxiosClient';
import CONST from '../CONSTANTS';

// Mock AxiosClient
jest.mock('../backend-client/AxiosClient');

const mockSetShowEdit = jest.fn();

const mockCommit = {
    'commitId': '123',
    description: 'Test commit message',
    repoId: 'repo1',
    userName: 'user1',
    tags: [{'id':'tag1'}, {'id':'tag2'}]
  };

const renderComponent = () => {
  return render(
    <RecoilRoot>
      <EditCommit originalCommit={mockCommit} setShowEdit={mockSetShowEdit} />
    </RecoilRoot>
  );
};

describe('EditCommit Component', () => {
  test('renders EditCommit component', () => {
    renderComponent();

    //Überprüfen, ob die Eingabefelder und Schaltflächen vorhanden sind
    // expect(screen.getByDisplayValue('Test commit message')).toBeInTheDocument();
    // expect(screen.getByDisplayValue('tag1')).toBeInTheDocument();
    // expect(screen.getByDisplayValue('tag2')).toBeInTheDocument();
    // expect(screen.getByText('Save')).toBeInTheDocument();
    // expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

//   test('handles save button click', async () => {
//     AxiosClient.put.mockResolvedValue({ data: {} });

//     renderComponent();

//     const saveButton = screen.getByText('Save');

//     await act(async () => {
//       fireEvent.click(saveButton);
//     });

//     // Überprüfen, ob die AxiosClient.put-Methode aufgerufen wurde
//     expect(AxiosClient.put).toHaveBeenCalledWith(`${CONST.HTTP_COMMIT_RESOURCE}/123`, {
//       commitId: '123',
//       message: 'Test commit message',
//       tags: ['tag1', 'tag2']
//     });
//   });

//   test('handles cancel button click', () => {
//     renderComponent();

//     const cancelButton = screen.getByText('Cancel');

//     fireEvent.click(cancelButton);

//     // Überprüfen, ob die setShowEdit-Methode aufgerufen wurde
//     expect(mockSetShowEdit).toHaveBeenCalledWith(null);
//   });
});