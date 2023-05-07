import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';

export default function SingleComment(props) {
  const commentId = props.id;
  const commentor = props.commentor;
  const commentDateTime = props.commentDateTime;
  const commentText = props.commentText;
  const refreshCommentList = props.refreshCommentList;

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState("");

  function toggleEditMode() {
    setEditText(commentText);
    setEditMode(!editMode);
  }

  // Format UNIX timestamp to "dd/mm/yyyy hh:mm:ss"
  function dateTimeString(unixTime) {
    const date = new Date(unixTime * 1);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTimeString = date.toLocaleString('en-GB', options);
    return dateTimeString;
  }

  // Pop up alert and delete comment if confirmed
  async function deleteComment(deleteId) {
    swal({
      title: "Delete Comment?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          var deleteResponse = await axios.delete(`http://localhost:8070/comment/delete/${deleteId}`);
          if (deleteResponse != null && deleteResponse.status == 200) {
            swal("Comment Deleted!", { buttons: false, timer: 800 });
            refreshCommentList();
          }
        } catch (e) {
          swal("Error", { buttons: false, timer: 1000 });
          console.log(e);
        }
      }
    });
  }

  async function updateComment(updateId) {
    const data = { commentText: editText }

    try {
      const updateRes = await axios.patch(`http://localhost:8070/comment/update/${commentId}`, data);
      if (updateRes.status == 200){
        swal("", "Comment Successfully updated!", { buttons: false, timer: 1000 });
        toggleEditMode();
        refreshCommentList();
      }
    } catch (e) {
      swal("Error", "Could not update comment. Please try again later", { buttons: fasle, timer: 1200 });
      toggleEditMode();
    }
  }

  return (
    <>
      <div className="m-2">
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <b>{commentor}</b><span className="commentDateTime" > {
                dateTimeString(commentDateTime)
              }</span>
            </div>
            <div>
              {
                !editMode ?
                  <>
                    <button className="btn btn-primary rounded-pill ms-1" onClick={() => toggleEditMode()} ><i className="fa-solid fa-marker" /></button>
                    <button className="btn btn-danger rounded-pill ms-1" onClick={() => deleteComment(commentId)}><i className="fa-solid fa-trash" /></button>
                  </>
                  : ""
              }
            </div>
          </div>
          <div>

            {!editMode
              ? <p>{commentText}</p>
              : <>
                <textarea className='form-control my-2' value={editText} onChange={(e) => setEditText(e.target.value)} />
                <div className='d-flex justify-content-end'>
                  <button className='btn btn-danger rounded-pill ms-3 px-3' onClick={() => toggleEditMode()} ><i className="fa-solid fa-xmark" /> Cancel</button>
                  <button className='btn btn-success rounded-pill ms-3 px-3' onClick={()=> updateComment(commentId)}><i className="fa-solid fa-check" /> Save</button>
                </div>
              </>
            }
          </div>
          <hr className="mb-0" />
        </div>
      </div>
    </>
  );
}