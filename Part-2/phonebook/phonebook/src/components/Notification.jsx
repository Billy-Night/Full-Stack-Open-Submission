const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const notificationStyle = {
    background: notification.success ? "green" : "red",
    color: "white",
    border: "#013220 solid 2px",
    padding: "10px",
    margin: "6px",
  };

  return (
    <div style={notificationStyle}>
      <h1>{notification.message}</h1>
    </div>
  );
};

export default Notification;
