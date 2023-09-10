// props'un obje olarak geldiğini ve
// içinde data olduğunu bildiğimizden
// props'u dağıtıp direkt data'ya erişiyoruz

const BookCard = ({ data, handleModal, handleRead, handleEditModal }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border shadow rounded p-3 mt-5">
      <div>
        <h5
          // isRead değeri true ise üzerini çiz
          className={data.isRead ? "text-decoration-line-through" : ""}
        >
          {data.title}
        </h5>

        <p>{new Date(data.date).toLocaleString()}</p>
      </div>

      <div className="btn-group">
        <button onClick={() => handleModal(data.id)} className="btn btn-danger">
          Delete
        </button>
        <button
          onClick={() => handleEditModal(data)}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button onClick={() => handleRead(data)} className="btn btn-success">
          {data.isRead ? "Read" : "Unread"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
