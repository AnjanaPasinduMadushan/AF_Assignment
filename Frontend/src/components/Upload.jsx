// import React, { useState } from 'react';
// import axios from 'axios';

// function Upload() {
//  const [file, setFile] = useState(null);

//  const handleFileInputChange = (event) => {
//    setFile(event.target.files[0]);
//  };

//  const handleFileUpload = () => { 
//    const formData = new FormData();
//    formData.append('file', file);

//    fetch('http://localhost:8070/upload', {  
//      method: 'POST',
//      body: formData,
//    })
//      .then((response) => response.text())
//      .then((result) => console.log(result))
//      .catch((error) => console.log(error));
//  };



//   return (
//    <div>
//    <h1>Attach documents</h1> 
//       <input type="file" onChange={handleFileInputChange} />
//       <button
//   onClick={handleFileUpload}
//   style={{
//     backgroundColor: 'blue',
//     color: 'white',
//     borderRadius: '5px',
//     padding: '10px 20px',
//     border: 'none',
//     fontSize: '16px',
//     cursor: 'pointer',
//   }}
// >
//   Upload & Submit
// </button>

//       (pdf, doc, docx, xls, xlsx, txt, zip, rar, mp3, mp4, wma, flv, avi, jpg, jpeg, png formats)
//     </div>

    

//   );
// }

// export default Upload;
import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/zip',
    'application/x-rar-compressed',
    'audio/mp3',
    'video/mp4',
    'audio/x-ms-wma',
    'video/x-flv',
    'video/x-msvideo',
    'image/jpeg',
    'image/png',
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (allowedFileTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= maxFileSize) {
          setFile(selectedFile);
          setError(null);
        } else {
          setError('File size exceeds the maximum allowed size of 10MB.');
        }
      } else {
        setError('Invalid file type. Only PDF, Word, Excel, Text, Zip, Audio, Video, and Image formats are allowed.');
      }
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('http://localhost:8070/upload', formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError('Please select a file to upload.');
    }
  };

  return (
    <div>
      <h1>Attach documents</h1>
      <input type="file" onChange={handleFileInputChange} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button
        onClick={handleFileUpload}
        style={{
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: '5px',
          padding: '10px 20px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Upload & Submit
      </button>
      <p>(pdf, doc, docx, xls, xlsx, txt, zip, rar, mp3, mp4, wma, flv, avi, jpg, jpeg, png formats)</p>
    </div>
  );
}

export default Upload;
