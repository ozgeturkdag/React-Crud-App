const DeleteModal = (props) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Do you want to delete it?</h5>
        <button
          onClick={() => props.setShowDelete(false)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button onClick={() => props.handleDelete()} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
