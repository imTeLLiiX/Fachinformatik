import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationItem, NotificationList, NotificationDropdown } from '../Notification';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <button className={className} {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<Record<string, never>>) => <>{children}</>,
}));

// Sample notification data
const sampleNotification = {
  id: '1',
  title: 'Test Notification',
  message: 'This is a test notification',
  type: 'achievement' as const,
  read: false,
  createdAt: new Date('2024-03-20T10:30:00'),
  link: '/test-link',
};

const sampleNotifications = [
  sampleNotification,
  {
    id: '2',
    title: 'Another Notification',
    message: 'This is another test notification',
    type: 'quiz' as const,
    read: true,
    createdAt: new Date('2024-03-19T15:45:00'),
    link: '/another-link',
  },
];

describe('NotificationItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notification with correct content', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    
    render(
      <NotificationItem
        notification={sampleNotification}
        onRead={onRead}
        onDelete={onDelete}
      />
    );
    
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('This is a test notification')).toBeInTheDocument();
    expect(screen.getByText('Mehr anzeigen')).toBeInTheDocument();
    expect(screen.getByTestId('mark-read-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });
  
  it('calls onRead when read button is clicked', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    
    render(
      <NotificationItem
        notification={sampleNotification}
        onRead={onRead}
        onDelete={onDelete}
      />
    );
    
    const readButton = screen.getByTestId('mark-read-button');
    fireEvent.click(readButton);
    expect(onRead).toHaveBeenCalledWith('1');
  });
  
  it('calls onDelete when delete button is clicked', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    
    render(
      <NotificationItem
        notification={sampleNotification}
        onRead={onRead}
        onDelete={onDelete}
      />
    );
    
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
  
  it('does not show read button for already read notifications', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    
    render(
      <NotificationItem
        notification={{ ...sampleNotification, read: true }}
        onRead={onRead}
        onDelete={onDelete}
      />
    );
    
    expect(screen.queryByTestId('mark-read-button')).not.toBeInTheDocument();
  });
});

describe('NotificationList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all notifications', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    
    render(
      <NotificationList
        notifications={sampleNotifications}
        onRead={onRead}
        onDelete={onDelete}
      />
    );
    
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('Another Notification')).toBeInTheDocument();
  });
  
  it('shows empty state when no notifications', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    
    render(
      <NotificationList
        notifications={[]}
        onRead={onRead}
        onDelete={onDelete}
      />
    );
    
    expect(screen.getByText('Keine Benachrichtigungen')).toBeInTheDocument();
  });
});

describe('NotificationDropdown Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dropdown when isOpen is true', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    const onReadAll = jest.fn();
    const onDeleteAll = jest.fn();
    const onClose = jest.fn();
    
    render(
      <NotificationDropdown
        notifications={sampleNotifications}
        onRead={onRead}
        onDelete={onDelete}
        onReadAll={onReadAll}
        onDeleteAll={onDeleteAll}
        isOpen={true}
        onClose={onClose}
      />
    );
    
    expect(screen.getByText('Benachrichtigungen')).toBeInTheDocument();
    expect(screen.getByText('Alle als gelesen markieren')).toBeInTheDocument();
    expect(screen.getByText('Alle löschen')).toBeInTheDocument();
  });
  
  it('does not render dropdown when isOpen is false', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    const onReadAll = jest.fn();
    const onDeleteAll = jest.fn();
    const onClose = jest.fn();
    
    render(
      <NotificationDropdown
        notifications={sampleNotifications}
        onRead={onRead}
        onDelete={onDelete}
        onReadAll={onReadAll}
        onDeleteAll={onDeleteAll}
        isOpen={false}
        onClose={onClose}
      />
    );
    
    expect(screen.queryByText('Benachrichtigungen')).not.toBeInTheDocument();
  });
  
  it('calls onClose when overlay is clicked', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    const onReadAll = jest.fn();
    const onDeleteAll = jest.fn();
    const onClose = jest.fn();
    
    render(
      <NotificationDropdown
        notifications={sampleNotifications}
        onRead={onRead}
        onDelete={onDelete}
        onReadAll={onReadAll}
        onDeleteAll={onDeleteAll}
        isOpen={true}
        onClose={onClose}
      />
    );
    
    const overlay = screen.getByTestId('notification-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });
  
  it('calls onReadAll when "Alle als gelesen markieren" is clicked', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    const onReadAll = jest.fn();
    const onDeleteAll = jest.fn();
    const onClose = jest.fn();
    
    render(
      <NotificationDropdown
        notifications={sampleNotifications}
        onRead={onRead}
        onDelete={onDelete}
        onReadAll={onReadAll}
        onDeleteAll={onDeleteAll}
        isOpen={true}
        onClose={onClose}
      />
    );
    
    const readAllButton = screen.getByRole('button', { name: 'Alle als gelesen markieren' });
    fireEvent.click(readAllButton);
    expect(onReadAll).toHaveBeenCalled();
  });
  
  it('calls onDeleteAll when "Alle löschen" is clicked', () => {
    const onRead = jest.fn();
    const onDelete = jest.fn();
    const onReadAll = jest.fn();
    const onDeleteAll = jest.fn();
    const onClose = jest.fn();
    
    render(
      <NotificationDropdown
        notifications={sampleNotifications}
        onRead={onRead}
        onDelete={onDelete}
        onReadAll={onReadAll}
        onDeleteAll={onDeleteAll}
        isOpen={true}
        onClose={onClose}
      />
    );
    
    const deleteAllButton = screen.getByRole('button', { name: 'Alle löschen' });
    fireEvent.click(deleteAllButton);
    expect(onDeleteAll).toHaveBeenCalled();
  });
}); 