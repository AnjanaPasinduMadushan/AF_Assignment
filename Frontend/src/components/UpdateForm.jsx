import complaintsStore from "../stores/complaintsStore";

export default function UpdateForm() {
  const store = complaintsStore();

  if (!store.updateForm._id) return <></>;

  return (
    <div>
      <h2>Update Complaint</h2>
      <form onSubmit={store.updateComplaint}>
        <input
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.title}
          name="title"
        />
        <textarea
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.body}
          name="body"
        />
        <button type="submit">Update Complaint</button>
      </form>
    </div>
  );
}
