import Complaint from "../components/Complaint";

import sampleImage from "../assets/images/placeholder.jpg";

export default function Complaints() {
  return (
    <>
      <Complaint
        date="05/04/2023"
        id="a65s4dfs65854fd"
        title="This is a title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla pretium dolor sed interdum. Cras id ultricies felis, a rhoncus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In tincidunt ex eget mollis sagittis. Nulla sollicitudin nisi id interdum rutrum. Nunc in ultrices ex. Proin feugiat eros pharetra urna ornare luctus."
        image={sampleImage}
        vote={5}
        feedback="This is a sample feedback This is a sample feedback This is a sample feedback This is a sample feedback This is a sample feedback This is a sample feedbackThis is a sample feedback"
      />
      <Complaint 
        description=" This is a complaint without an image or video .Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla pretium dolor sed interdum. Cras id ultricies felis, a rhoncus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In tincidunt ex eget mollis sagittis. Nulla sollicitudin nisi id interdum rutrum. Nunc in ultrices ex. Proin feugiat eros pharetra urna ornare luctus."
      />
      <Complaint />
    </>
  );
}