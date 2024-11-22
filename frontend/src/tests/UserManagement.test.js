import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserManagement from '../pages/UserManagement';
import axios from 'axios';

// Mock the axios calls
jest.mock('axios');

describe('UserManagement Component', () => {
  const mockUsers = [
    {
      User_ID: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      role: "User",
      accessLevel: "1",
    },
    {
      User_ID: 2,
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      role: "Admin",
      accessLevel: "2",
    },
  ];

  beforeEach(() => {
    // Mock the GET request to fetch users
    axios.get.mockResolvedValueOnce({ data: mockUsers });
    // Mock the PUT request to update user info
    axios.put.mockResolvedValueOnce({ data: {} });
  });

  // check if user list is updated correctly
  it('user list', async () => {
    render(<UserManagement />);

    // Wait for the users to be loaded
    await waitFor(() => screen.getByText('John Doe'));

    // Check if the users are displayed correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
 
  // check if modal is opened when edit putton is clicked
  it('opens modal' , async () => {
    render(<UserManagement />);

    // Wait for the users to be loaded
    await waitFor(() => screen.getByText('John Doe'));

    // Simulate clicking the "Edit" button for John Doe
    fireEvent.click(screen.getByText('Edit'));

    // Check if the modal is displayed
    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });


  // check if modal is closed when edit button is clicked
  it('modal closed', async () => {
    render(<UserManagement />);

    // Wait for the users to be loaded
    await waitFor(() => screen.getByText('John Doe'));

    // Simulate clicking the "Edit" button
    fireEvent.click(screen.getByText('Edit'));

    // Simulate clicking the "Close" button in the modal
    fireEvent.click(screen.getByText('Close'));

    // Check if the modal is no longer in the document
    expect(screen.queryByText('Edit User')).toBeNull();
  });

  
});
