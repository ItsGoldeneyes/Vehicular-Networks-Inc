import { render, screen, fireEvent } from '@testing-library/react';
import EditUserModal from '../components/EditUserModal';

describe('EditUserModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  const user = {
    fName: 'John',
    lName: 'Doe',
    Email: 'john.doe@example.com',
    role: 'admin',
    accessLevel: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // checks if data  is updated  properly.
  test('updates first name and last name', () => {
    render(<EditUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />);

    const firstNameInput = screen.getByDisplayValue('John');
    const lastNameInput = screen.getByDisplayValue('Doe');
    const emailInput = screen.getByDisplayValue('john.doe@example.com');

    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.change(emailInput, { target: { value: 'jane.smith@example.com' } });

    expect(firstNameInput.value).toBe('Jane');
    expect(lastNameInput.value).toBe('Smith');
    expect(emailInput.value).toBe('jane.smith@example.com');
  });


  // check if a role can be selected. 
  test('selects a different role', () => {
    render(<EditUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />);

    const roleSelect = screen.getByRole('combobox');
    fireEvent.change(roleSelect, { target: { value: 'superadmin' } });

    expect(roleSelect.value).toBe('superadmin');
  });

  // check if the new role data is saved properly
  test('checks if save function is working properly', () => {
    render(<EditUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />);

    // Update first name and role
    fireEvent.change(screen.getByDisplayValue('John'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'superadmin' } });

    // Click save button
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...user,
      fName: 'Jane',
      role: 'superadmin',
    });
  });

  // checks functionality of cancel button
  test('checks if cancel funcion is working', () => {
    render(<EditUserModal user={user} onClose={mockOnClose} onSave={mockOnSave} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
