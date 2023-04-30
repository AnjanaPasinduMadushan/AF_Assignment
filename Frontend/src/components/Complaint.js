import complaintsStore from "../stores/complaintsStore";
import "../asset/Complaint.css";

export default function Complaint({ complaint }) {
  const store = complaintsStore((store) => {
    return {
      deleteComplaint: store.deleteComplaint,
      toggleUpdate: store.toggleUpdate,
    };
  });

  return (
    <div key={complaint._id}>
      <h3>{complaint.title}</h3>
      <button onClick={() => store.deleteComplaint(complaint._id)}>
        Delete Complaint
      </button>
      <button onClick={() => store.toggleUpdate(complaint)}>
        Update Complaint
      </button>
    </div>
  );
}
