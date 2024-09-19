import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewCommitSection from './NewCommit';
import { RecoilRoot } from 'recoil';
import AxiosClient from '../backend-client/AxiosClient';
import CONST from '../CONSTANTS';

jest.mock('../backend-client/AxiosClient');

describe('NewCommitSection', () => {
    const renderComponent = () => {
        render(
            <RecoilRoot>
                <NewCommitSection  />
            </RecoilRoot>
        );
    };

    it('renders form elements correctly', () => {
        renderComponent();
        expect(screen.getByText('Commit id')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Repository/i)).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Tags')).toBeInTheDocument();
    });

    it('shows validation errors when form is submitted with empty fields', async () => {
        renderComponent();
        fireEvent.click(screen.getByText(/Add/i));
        
        await waitFor(() => {
            expect(screen.getByText(CONST.COMMITID_REQUIRED_MESSAGE)).toBeInTheDocument();
            expect(screen.getByText(CONST.USERNAME_REQUIRED_MESSAGE)).toBeInTheDocument();
            expect(screen.getByText(CONST.REPOID_REQUIRED_MESSAGE)).toBeInTheDocument();
        });
    });

    it('submits the form successfully', async () => {
        const asyncMock = AxiosClient.put.mockResolvedValue({
            data: [{
                commitId: 'commit123',
                userName: 'user123',
                repoId: 'repo123',
                description: 'This is a description',
                tags: [{ id: 'tag1' }, { id: 'tag2' }]
            }]
        });

        const { getByTestId} = render(<RecoilRoot>
            <NewCommitSection onSubmit={asyncMock} />
        </RecoilRoot>);

        fireEvent.input(getByTestId('input-commitId'), { target: { value: 'commit123' } });
        fireEvent.input(getByTestId('input-userName'), { target: { value: 'user123' } });
        fireEvent.input(getByTestId('input-repoId'), { target: { value: 'repo123' } });
        fireEvent.input(getByTestId('input-description'), { target: { value: 'This is a description' } });

        fireEvent.click(screen.getByText(/Add/i));
        
    });

        it('handles cancel button click', () => {
            renderComponent();
            fireEvent.click(screen.getByText(/Cancel/i));
        });
});