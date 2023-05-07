import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

const DisplayFeeds = () => {

    const [feeds, setFeeds] = useState("")

    const {id} = useParams()

    useEffect(() => {
        const getFeeds = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8070/products/getProduct/${id}`
            );
            setFeeds(response.data.feedback);
            console.log(response.data.feedback);
          } catch (err) {
            console.log(err);
          }
        };
        getFeeds();
      }, [id]);



  return (
    <div>displayFeeds</div>
  )
}

export default DisplayFeeds