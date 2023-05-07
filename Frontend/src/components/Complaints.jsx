import complaintsStore from "../stores/complaintsStore";
import Complaint from "./Complaint";
import "../asset/Complaints.css";

export default function Complaints() {
  const store = complaintsStore();

  return (
    <div className="div1" style={{   marginLeft: '150px', marginRight: '150px' }}>
      <h2>Complaints list:</h2>
      {store.complaints &&
        store.complaints.map((complaint) => {


          
          return <Complaint complaint={complaint} key={complaint._id} />;
        })}



    
    </div>
  );
}
