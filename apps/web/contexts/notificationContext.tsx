"use client";
import { CircleX } from "lucide-react";
import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { createPortal } from "react-dom";

type Notification = {
  message: string;
  type: "positive" | "negative";
};

type NotificationInserted = {
  message: string;
  type: "positive" | "negative";
  id: string;
};

export type NotificationContextType = {
  showNotification: (notification: Notification) => void;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationInserted[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showNotification = (notification: Notification) => {
    const newNotification = { ...notification, id: uuidv4() };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
    }, 5000);
  };

  const closeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {mounted && createPortal(
        <div className="fixed top-0 left-0 w-full h-0 pointer-events-none z-[9999]">
          {notifications.map((item, index) => (
            <Notification
              key={item.id}
              {...item}
              closeNotification={() => closeNotification(item.id)}
              style={{ top: `${index * 60 + 20}px` }}
            />
          ))}
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  );
};

type NotificationProps = Notification & {
  closeNotification: () => void;
  style?: React.CSSProperties;
};

export const Notification = ({ message, type, closeNotification, style }: NotificationProps) => {
  return (
    <div
      style={style}
      className={`fixed left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white flex items-center gap-2 min-w-[200px] pointer-events-auto ${
        type === "positive" ? "bg-blue-500" : "bg-red-500"
      }`}
    >
      <span className="flex-1 text-white font-medium">{message}</span>
      <CircleX className="cursor-pointer text-white hover:text-gray-200" onClick={closeNotification} />
    </div>
  );
};

