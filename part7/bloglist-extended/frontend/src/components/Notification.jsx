import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === "") {
    return null;
  }

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  };

  const errorStyle = { ...successStyle, color: "red" };

  return (
    <div
      className="notification"
      style={notification.error ? errorStyle : successStyle}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
