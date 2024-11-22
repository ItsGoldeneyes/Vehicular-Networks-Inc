import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home'; 

// Mock components for routing tests 
jest.mock('../pages/UserManagement', () => () => <div>User Management Component</div>);
jest.mock('../pages/TicketManagement', () => () => <div>Ticket Management Component</div>);
jest.mock('../pages/RewardsManagement', () => () => <div>Rewards Management Component</div>);
jest.mock('../pages/ContentManagement', () => () => <div>Content Management Component</div>);

describe('Home Component', () => {
  test('renders the navigation links correctly', () => {
    render(<Home />); 

    // Check if the links are present in the document
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Ticket & Feedback Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Rewards Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Content Management/i)).toBeInTheDocument();
  });

  test('navigates to User page', () => {
    render(<Home />); 
    fireEvent.click(screen.getByText(/User Management/i));
    expect(screen.getByText(/User Management Component/i)).toBeInTheDocument();

  });
  
  test('navigates to Tickets page', () => {
    render(<Home />); 
    fireEvent.click(screen.getByText(/Ticket & Feedback Management/i));
    expect(screen.getByText(/Ticket Management Component/i)).toBeInTheDocument();

  });
  test('navigates to Rewards page', () => {
    render(<Home />); 
    fireEvent.click(screen.getByText(/Rewards Management/i));
    expect(screen.getByText(/Rewards Management Component/i)).toBeInTheDocument();

  });

  test('navigates to Content page', () => {
    render(<Home />); 
    fireEvent.click(screen.getByText(/Content Management/i));
    expect(screen.getByText(/Content Management Component/i)).toBeInTheDocument();

  });
 
});
