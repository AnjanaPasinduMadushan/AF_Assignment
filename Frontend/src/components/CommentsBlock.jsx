export default function CommentsBlock() {
  return (
    <>
      <div className="input-group complaintAddComment">
        <input type="text" className="form-control commentInput shadow-none" placeholder="Add a comment..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <div className="input-group-append">
          <button className="btn commentInputBtn brown-outline-Btn" type="button">Add Comment</button>
        </div>
      </div>
    </>
  );
}