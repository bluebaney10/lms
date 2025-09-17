import { useCourseForm } from "../hooks/useCourseForm";

type Props = {
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
};

const CourseFormPopup = ({
  editingId,
  setEditingId,
  isOpen,
  onClose,
}: Props) => {
  const { form, handleChange, handleSubmit } = useCourseForm(
    editingId,
    isOpen,
    setEditingId,
    onClose
  );

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h1 className="head text-center">
          {editingId ? "Update Course" : "Add Course"}
        </h1>
        <div className="absolute right-4 top-4">
          <button className="bt-tertiary" onClick={() => onClose()}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="label" htmlFor="name">
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="input-text"
            value={form.title}
            onChange={handleChange}
          />
          <label className="label" htmlFor="email">
            Description
          </label>
          <input
            name="description"
            type="text"
            placeholder="Description"
            className="input-text"
            value={form.description}
            onChange={handleChange}
          />
          <label className="label" htmlFor="password">
            Content
          </label>
          <textarea
            name="content"
            placeholder="Content"
            className="input-text"
            value={form.content}
            onChange={handleChange}
          />
          <button type="submit" className="bt-primary">
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseFormPopup;
