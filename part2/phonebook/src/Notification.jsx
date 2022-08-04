const Notification = ({ message, error }) => {
  if (!message) {
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

  return <div style={error ? errorStyle : successStyle}>{message}</div>;
};

export default Notification;
