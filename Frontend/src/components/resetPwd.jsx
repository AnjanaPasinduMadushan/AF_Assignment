import { useState } from 'react';

const ResetPwd = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async(event) => {
    vent.preventDefault();
  try {
    const response = await fetch(`/resetPwd/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    console.log(data.msg); // Password updated successfully
  } catch (error) {
    console.error(error);
  }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPwd