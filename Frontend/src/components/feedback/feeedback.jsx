import React ,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function AdminFeedback() {
    
    const [feed,setFeedback] = useState({
        commentorId: "",
        complaintId: "",
        feedback:"",
    
     });
        const handleChangeText = (name, value) => {
            setFeedback({...feed, [name]: value.target.value});
        }

    useEffect(() => {
        const getFeedback = async () => {
        const res = await axios.get(`http://localhost:8070/feedback/getAll`);
            setFeedback(res.data);
            console.log(res.data);
            };
            getFeedback();
        }, []);

        const navigate = useNavigate();

return(
    <Container>
        <div>
{feed.length>0 && feed.map((feedbacks, key)=>(

    
        <Card  key={key} 
        className="my-3">
      <Card.Header>{feedbacks.commentorId}</Card.Header>
      <Card.Body>
        <Card.Title>{feedbacks.complaintId}</Card.Title>
        <Card.Text>
          {feedbacks.feedback}
        </Card.Text>
      </Card.Body>
     
    </Card>
    
    ))}
     
    </div>



    </Container>
)

}

export default AdminFeedback;