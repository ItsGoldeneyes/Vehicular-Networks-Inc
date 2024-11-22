import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContentManagement from '../pages/ContentManagement';
import axios from 'axios';
import '@testing-library/jest-dom';

// Mock the axios module
jest.mock('axios');

// Mock the dayjs library
jest.mock('dayjs', () => ({
  format: () => '2024-11-21',
}));

describe('ContentManagement Component', () => {
  
  // Test case for initial rendering of the component and the form elements
  test('renders content management form and uploads history', () => {
    render(<ContentManagement />);

    // Check for form inputs
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Link to Website/Document:')).toBeInTheDocument();
    expect(screen.getByLabelText('Content Type:')).toBeInTheDocument();
    expect(screen.getByLabelText('Schedule Date:')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Content Upload History')).toBeInTheDocument();
  });

  // Test case for uploading content
  test('uploads content and shows success alert', async () => {
    // Mock axios post response
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<ContentManagement />);

    // Fill in the fields
    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'New Content' } });
    fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Content description' } });
    fireEvent.change(screen.getByLabelText('Link to Website/Document:'), { target: { value: 'http://example.com' } });
    fireEvent.change(screen.getByLabelText('Content Type:'), { target: { value: 'Tutorial' } });
    fireEvent.change(screen.getByLabelText('Schedule Date:'), { target: { value: '2024-12-01' } });

    // Select an admin 
    axios.get.mockResolvedValueOnce({
      data: [{ User_ID: '1', fName: 'John', lName: 'Doe' }]
    });

    fireEvent.change(screen.getByLabelText('Assign Admin'), { target: { value: '1' } });

    // Click upload button
    fireEvent.click(screen.getByText('Upload'));

    // Assert that the success alert is displayed
    await waitFor(() => expect(screen.getByText('Content added successfully')).toBeInTheDocument());

    // Check if the content fields are cleared after upload
    expect(screen.getByLabelText('Title:').value).toBe('');
    expect(screen.getByLabelText('Description:').value).toBe('');
    expect(screen.getByLabelText('Link to Website/Document:').value).toBe('');
    expect(screen.getByLabelText('Schedule Date:').value).toBe('');
  });

  // Test case for fetching content and rendering the uploaded content history
  test('fetches and displays uploaded content', async () => {
    // Mock axios get response for content uploads
    axios.get.mockResolvedValueOnce({
      data: [
        { ContentID: '1', AdminID: '1', Title: 'Tutorial 1', ContentDescription: 'Description 1', ContentType: 'Tutorial', DateUploaded: '2024-11-01', ScheduledDate: '2024-12-01', Link: 'http://tutorial1.com' }
      ]
    });

    render(<ContentManagement />);

    // Wait for the content to be displayed
    await waitFor(() => expect(screen.getByText('Tutorial 1')).toBeInTheDocument());

    // Check if the content details are displayed correctly in the table
    expect(screen.getByText('Tutorial 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
    expect(screen.getByText('2024-10-22')).toBeInTheDocument();
    expect(screen.getByText('2024-11-22')).toBeInTheDocument();
    expect(screen.getByText('http://tutorial1.com')).toBeInTheDocument();
  });

  // Test case for checking success alert display duration
  test('shows success alert and hides after 2.5 seconds', async () => {
    jest.useFakeTimers();

    render(<ContentManagement />);

    // Trigger success alert display
    fireEvent.click(screen.getByText('Upload'));

    // Check if the alert is shown
    expect(screen.getByText('Content added successfully')).toBeInTheDocument();

    jest.advanceTimersByTime(2500);

    // Check if the alert disappears
    expect(screen.queryByText('Content added successfully')).toBeNull();

    jest.useRealTimers();
  });
});
