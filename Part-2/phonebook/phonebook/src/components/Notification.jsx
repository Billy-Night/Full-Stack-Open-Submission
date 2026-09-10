const Notification = ({ SuccessMessage }) => {
  const NotificationStyle = {
    background: "#A8DCAB",
    color: "white",
    border: "#013220 solid 2px",
    padding: "10px",
    margin: "6px",
  };
  return (
    <div style={NotificationStyle}>
      <h1>{SuccessMessage}</h1>
    </div>
  );
};

export default Notification;
