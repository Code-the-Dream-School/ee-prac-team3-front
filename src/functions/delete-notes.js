import { useState } from 'react';
import { port } from 'App';

const useDelete = (ids) => {
  const [isLoading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);
  const deleteNotes = async (ids) => {
    setLoading(true);
    try {
      await fetch(`${port}/api/v1/notes?ids=${ids}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setResponse({
        success: true,
        message: `Deleted`,
      });
    } catch (err) {
      setResponse({
        success: false,
        message: 'Something went wrong, please try again later!',
      });
    } finally {
      setLoading(false);
    }
  };
  return { isLoading, response, deleteNotes };
};

export default useDelete;
