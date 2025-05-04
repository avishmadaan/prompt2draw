import { CircleX } from "lucide-react";


 type NotificationProps = Notification & {
    closeNotification: () => void;
    style?: React.CSSProperties;
    message?:string,
    type?: string,
    id?:string
  };

export const Notification = ({ message, type, closeNotification, style , id}: NotificationProps) => {
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