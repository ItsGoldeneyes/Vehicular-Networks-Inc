import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TicketManagement from '../pages/TicketManagement';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('TicketManagement Component', () => {


  // test if data for admin and ticket is displayed.
  test('displays admins and tickets', async () => {
    const mockAdmins = [
      { User_ID: 1, fName: 'John', lName: 'Doe', role: 'admin' },
      { User_ID: 2, fName: 'Jane', lName: 'Smith', role: 'superadmin' },
    ];
    const mockTickets = [
      { Ticket_ID: 1, TicketDescription: 'Issue with login', Status: 'Open', Submitter_ID: '1', Admin_ID: '2', Date_created: '2024-11-22', Date_resolved: null, TicketPriority: 'High', Feedback: '' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockAdmins }); // Mock fetching admins
    axios.get.mockResolvedValueOnce({ data: mockTickets }); // Mock fetching tickets

    render(<TicketManagement />);

    await waitFor(() => screen.getByText('Ticket & Feedback Management'));

    // Check if admin names are displayed in the select options
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check if ticket is rendered in the table
    expect(screen.getByText('Issue with login')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
  });


  //test to check if tickets are updated successfully
  test('updates ticket', async () => {
    const mockTicket = { Ticket_ID: 1, TicketDescription: 'Issue with login', Status: 'Open', Admin_ID: '1' };
    const mockResponse = { data: { ...mockTicket, Status: 'In Progress' } };

    axios.put.mockResolvedValueOnce(mockResponse);

    render(<TicketManagement />);
    
    // Select status from dropdown and click the button
    const statusSelect = screen.getByDisplayValue('Open');
    fireEvent.change(statusSelect, { target: { value: 'In Progress' } });
    
    const setStatusButton = screen.getByText('Set Status');
    fireEvent.click(setStatusButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `http://localhost:5000/api/tickets/${mockTicket.Ticket_ID}`,
        expect.objectContaining({
          Status: 'In Progress',
        })
      );
    });

    // Check if status is updated in the table
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

 // test to check if tickets are assigned to addmin
  test('assign ticket', async () => {
    const mockTicket = { Ticket_ID: 1, TicketDescription: 'Issue with login', Status: 'Open' };
    const mockAdmin = { User_ID: '1', fName: 'John', lName: 'Doe' };

    axios.put.mockResolvedValueOnce({ data: { ...mockTicket, Admin_ID: mockAdmin.User_ID } });

    render(<TicketManagement />);

    // Select admin from dropdown and click the button
    const adminSelect = screen.getByLabelText(/Assign Admin/i);
    fireEvent.change(adminSelect, { target: { value: mockAdmin.User_ID } });

    const assignButton = screen.getByText('Assign');
    fireEvent.click(assignButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `http://localhost:5000/api/tickets/${mockTicket.Ticket_ID}`,
        expect.objectContaining({
          Admin_ID: mockAdmin.User_ID,
        })
      );
    });
  });


});
