import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'quiz';
  read: boolean;
  createdAt: Date;
  link: string;
}

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{notification.title}</h3>
          <p className="text-gray-600">{notification.message}</p>
          <a href={notification.link} className="text-blue-500 hover:underline">
            Mehr anzeigen
          </a>
          <p className="text-sm text-gray-400 mt-1">
            {format(notification.createdAt, 'PPp', { locale: de })}
          </p>
        </div>
        <div className="flex space-x-2">
          {!notification.read && (
            <button
              data-testid="mark-read-button"
              className="text-green-500 hover:text-green-600"
              onClick={() => onRead(notification.id)}
              type="button"
            >
              ✓
            </button>
          )}
          <button
            data-testid="delete-button"
            className="text-red-500 hover:text-red-600"
            onClick={() => onDelete(notification.id)}
            type="button"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onRead,
  onDelete,
}) => {
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={onRead}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Keine Benachrichtigungen</p>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NotificationDropdownProps extends NotificationListProps {
  onReadAll: () => void;
  onDeleteAll: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onRead,
  onDelete,
  onReadAll,
  onDeleteAll,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Benachrichtigungen</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <button
            onClick={onReadAll}
            className="text-sm text-blue-500 hover:text-blue-600"
            type="button"
          >
            Alle als gelesen markieren
          </button>
          <button
            onClick={onDeleteAll}
            className="text-sm text-red-500 hover:text-red-600"
            type="button"
          >
            Alle löschen
          </button>
        </div>
        <NotificationList
          notifications={notifications}
          onRead={onRead}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};
 