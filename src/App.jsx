import { useState } from "react";
import { v4 as getPass } from "uuid";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    // kitap ismine erişme
    const title = e.target[0].value;

    // kitap ismini doğrulama
    if (!title) {
      toast.warn("Please enter a book title...", { autoClose: 2000 });
      return;
    }

    // kitap objesi oluşturma
    const newBook = {
      id: getPass(),
      title,
      date: new Date(),
      isRead: false,
    };

    // oluşturulan objeyi kitaplar dizisine aktarma
    setBooks([newBook, ...books]);

    // inputu temizle
    e.target[0].value = "";

    // bildirim verme
    toast.success("Book added successfully", { autoClose: 2500 });
  };

  // silme modal'ı için fonksiyon
  const handleModal = (id) => {
    // silinecek elemanın id'sini state'e aktarma
    setDeleteId(id);

    // modal'ı açar
    setShowDelete(true);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // id'sini bildiğimiz elemanı diziden çıkarma
    const filtred = books.filter((book) => book.id !== deleteId);

    // state'i günceller
    setBooks(filtred);

    // modal'ı kapat
    setShowDelete(false);

    // bildirim verme
    toast.error("Book deleted successfully", { autoClose: 2500 });
  };

  // okundu işleminde çalışır
  const handleRead = (editItem) => {
    // okundu değerini tersine çevirme
    const updated = { ...editItem, isRead: !editItem.isRead };

    //! diziden bir elemanı güncelleme
    //! 1. yöntem
    // state'in kopyasını alma
    const clone = [...books];

    // düzenlenecek elemanın sırasını bulma
    const index = books.findIndex((book) => book.id === updated.id);

    // clone diziyi güncelleme
    clone[index] = updated;

    //! 2. yöntem
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );

    // state'i günceller
    setBooks(newBooks);
  };

  // edit modal işlemler
  const handleEditModal = (item) => {
    // modal'ı açar
    setShowEdit(true);
    // düzenlenecek elemanı state'e aktarma
    setEditingItem(item);
  };

  // elemanı düzenleme
  const updateItem = () => {
    // kitaplar dizisini dön eleman:
    // düzenlenecek eleman değilse onu olduğu gibi yeni dizye aktar
    // düzenlenicek olansa güncel halini diziye aktar
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );

    // state'i güncelleme
    setBooks(newBooks);

    // modal'ı kapatır
    setShowEdit(false);

    // bildirim verme
    toast.info("Book title edited", { autoClose: 2000 });
  };

  return (
    <div className="App">
      <header className="bg-dark text-light py-2 fs-5 text-center">
        <h1>Book Worm</h1>
      </header>
      <main className="container">
        {/* form */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4 p-4">
          <input
            className="form-control shadow"
            type="text"
            placeholder="Please enter a book title..."
          />
          <button className="btn btn-warning shadow">Add</button>
        </form>

        {/* kitaplar dizisi boşsa */}
        {books.length === 0 && (
          <h4 className="mt-5 text-center">No book added yet</h4>
        )}

        {/* kitaplar dizisi doluysa */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            data={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </main>

      {/* Modallar */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}

      {showEdit && (
        <EditModal
          editingItem={editingItem}
          setShowEdit={setShowEdit}
          setEditingItem={setEditingItem}
          updateItem={updateItem}
        />
      )}

      {/* bildirimler için */}
      <ToastContainer />
    </div>
  );
}

export default App;
