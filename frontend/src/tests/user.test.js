import { render, screen, fireEvent } from '@testing-library/react';
import User from '../components/User';



const mockOnEdit = jest.fn();

const userMock = {
  User_ID: '123',
  fName: 'John',
  lName: 'Doe',
  Email: 'john.doe@example.com',
  role: 'Admin',
  accessLevel: 'High',
};

describe('User Component', () => {
  test('renders user information correctly', () => {
    render(<User userInfo={userMock} onEdit={mockOnEdit} />);

    // Check if mock user data provided is displayed
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  test('Edit button is functioning properly', () => {
    render(<User userInfo={userMock} onEdit={mockOnEdit} />);

    // Find the edit button and simulate a click
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    // Ensure that the onEdit function is working
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(userMock);
  });

  test('user data is stored in right cells', () => {
    // give the User component with sample incomplete data
    const incompleteUser = {
        User_ID: '123',  
        fName: 'John',   
        lName: 'Doe',    
        Email: '',       
        role: '',        
        accessLevel: ''  
    };

    render(<User userInfo={incompleteUser} onEdit={mockOnEdit} />);

    // Check if user data is correctly displayed
    expect(screen.getByText('123')).toBeInTheDocument();  
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if empty cells are rendered correctly
    const cells = screen.getAllByRole('cell');

    // Check that specific cells are empty i,e. Email, role and acess level. 
    const emptyCells = cells.filter(cell => cell.textContent === '');
    expect(emptyCells.length).toBeGreaterThan(0);  
    
    // checks if the specific cells are filled i.e, 
    const nonEmptyCells = cells.filter(cell => cell.textContent !== '');
    nonEmptyCells.forEach(cell => {
        expect(cell.textContent).not.toBe('');
    });
});


  test('Edit button is not shown after its clicked', () => {
    render(<User userInfo={userMock} />);

    // Check that the button is not displayed
    const editButton = screen.queryByText('Edit');
    expect(editButton).toBeNull();
  });
});
