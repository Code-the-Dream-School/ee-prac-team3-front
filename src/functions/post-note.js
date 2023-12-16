import { port } from 'App';
import { useState } from 'react';

const useSubmit = (note) => {
  const [isLoading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const postNote = async (note) => {
    setLoading(true);
    try {
      await fetch(`${port}/api/v1/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(note),
      });
      setResponse({
        success: true,
        message: `The note is added`,
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
  return { isLoading, response, postNote };
};

export default useSubmit;
