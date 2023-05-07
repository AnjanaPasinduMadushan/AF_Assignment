import React from 'react';
import Post from './Post';
import '../asset/Interface.css';
const Feed = () => {
  const posts = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in turpis euismod, pulvinar magna nec, aliquam lacus.',
      timestamp: '2 hours ago',
      image: 'https://picsum.photos/id/1/400/400',
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      timestamp: '3 hours ago',
      image: null,
    },
  ];

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post
          key={post.id}
          name={post.name}
          avatar={post.avatar}
          content={post.content}
          timestamp={post.timestamp}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default Feed;
