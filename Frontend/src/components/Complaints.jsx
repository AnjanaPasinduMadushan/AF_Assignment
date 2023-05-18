// import complaintsStore from "../stores/complaintsStore";
// import Complaint from "./Complaint";
// import "../asset/Complaints.css";

// export default function Complaints() {
//   const store = complaintsStore();

//   return (
//     <div className="div1" style={{   marginLeft: '150px', marginRight: '150px' }}>
//       <h1>Complaints list</h1>
//       {store.complaints &&
//         store.complaints.map((complaint) => {
//           return <Complaint complaint={complaint} key={complaint._id} />;
//         })}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import complaintsStore from '../stores/complaintsStore';
import Complaint from './Complaint';
import '../asset/Complaints.css';

export default function Complaints() {
  const store = complaintsStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredComplaints = store.complaints ? store.complaints.filter((complaint) =>
    complaint.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="div1" style={{ marginLeft: '150px', marginRight: '150px' }}>
      <h1>Complain list</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search complaints"
      />
      {filteredComplaints.length > 0 ? (
        filteredComplaints.map((complaint) => (
          <Complaint complaint={complaint} key={complaint._id} />
        ))
      ) : (
        <p>No complaints found.</p>
      )}
    </div>
  );
}

