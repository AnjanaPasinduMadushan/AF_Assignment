import complaintsStore from "../stores/complaintsStore";
import '../asset/CreateForm.css';
export default function CreateForm() {
  const complaintStore = complaintsStore();

  if (complaintStore.updateForm._id) return <></>;

  return (
    <div>
      <h2>Create new Complaint</h2>
      <form onSubmit={complaintStore.createComplaint}>
        <input
          onChange={complaintStore.updateCreateFormField}
          value={complaintStore.createForm.title}
          name="title"
        />
        <textarea
          onChange={complaintStore.updateCreateFormField}
          value={complaintStore.createForm.body}
          name="body"
        />
        <button type="submit" >Create Complaint</button>
      </form>
    </div>
  );
}
