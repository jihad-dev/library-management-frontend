/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Filter,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

// ---------------------------------------------------------
// Redux RTK Query Imports (আপনার প্রজেক্ট অনুযায়ী পাথ চেক করে নিন)
// ---------------------------------------------------------
import {
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "../../Redux/features/admin/adminApi"; // <--- আপনার প্রজেক্টের সঠিক Path বসান
import Preloader from "../../utils/Preloader";
import { Link } from "react-router-dom";

// ---------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------
export interface Book {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: number;
  total_copies: number;
  cover_image?: string;
}

interface EditBookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedData: Partial<Book>) => Promise<void>;
  isLoading: boolean;
}

// ---------------------------------------------------------
// Edit Modal Component
// ---------------------------------------------------------
const EditBookModal: React.FC<EditBookModalProps> = ({
  book,
  isOpen,
  onClose,
  onUpdate,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: 0,
    total_copies: 1,
    cover_image: "",
  });

  React.useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        category: book.category || "",
        price: book.price || 0,
        total_copies: book.total_copies || 1,
        cover_image: book.cover_image || "",
      });
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
            <div>
              <h3 className="text-lg font-bold text-white">Edit Book</h3>
              <p className="text-xs text-slate-400">
                Update book details and stock levels
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Total Copies *
                </label>
                <input
                  type="number"
                  name="total_copies"
                  min="1"
                  required
                  value={formData.total_copies}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="cover_image"
                  value={formData.cover_image}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-colors disabled:opacity-50"
              >
                {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// ---------------------------------------------------------
// Main Component (Connected to Real API)
// ---------------------------------------------------------
const ViewAllBooks: React.FC = () => {
  // Real RTK Query Hooks
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetAllBooksQuery(undefined);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<Book | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Extract Books list from API response safely
  const booksList: Book[] = useMemo(() => {
    if (!apiResponse) return [];
    return Array.isArray(apiResponse) ? apiResponse : apiResponse.data || [];
  }, [apiResponse]);

  // Client-side search and category filtering
  const filteredBooks = useMemo(() => {
    return booksList.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [booksList, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(booksList.map((b) => b.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [booksList]);

  // Handlers
  const handleEdit = (book: Book) => {
    setSelectedBookForEdit(book);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (updatedFields: Partial<Book>) => {
    if (!selectedBookForEdit) return;

    const bookId = selectedBookForEdit._id || selectedBookForEdit.id;
    const toastId = toast.loading("Updating book in database...");

    try {
      const res = await updateBook({
        id: bookId,
        ...updatedFields,
      }).unwrap();

      toast.success(res?.message || "Book updated successfully!", {
        id: toastId,
      });
      setIsEditModalOpen(false);
      setSelectedBookForEdit(null);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Failed to update book.",
        {
          id: toastId,
        },
      );
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
      color: "#f8fafc",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting book...");
        try {
          await deleteBook(id).unwrap();
          toast.success("Book deleted successfully!", { id: toastId });
        } catch (err: any) {
          toast.error(err?.data?.message || "Failed to delete book.", {
            id: toastId,
          });
        }
      }
    });
  };

  if (isLoading) return <Preloader />;

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-rose-400">
        <p>Failed to load books data from backend server.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Library Catalog Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage books, view stock details, and update inventory settings.
          </p>
        </div>
        <Link to="/dashboard/books/add-book">
          
          <button className="flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all transform active:scale-95">
            <Plus className="w-4 h-4" /> Add New Book
          </button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Book</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Copies</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => {
                  const currentId = book._id || book.id || "";
                  return (
                    <tr
                      key={currentId}
                      className="hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-4 px-6 flex items-center gap-3">
                        {book.cover_image ? (
                          <img
                            src={book.cover_image}
                            alt={book.title}
                            className="w-10 h-12 object-cover rounded-md border border-slate-700"
                          />
                        ) : (
                          <div className="w-10 h-12 bg-slate-800 rounded-md flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-slate-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-100">
                            {book.title}
                          </p>
                          <p className="text-slate-400 text-[11px]">
                            {book.author}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px]">
                          {book.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-indigo-400 font-semibold">
                        ${book.price ? Number(book.price).toFixed(2) : "0.00"}
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        {book.total_copies}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(currentId)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal Component */}
      <EditBookModal
        book={selectedBookForEdit}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default ViewAllBooks;
