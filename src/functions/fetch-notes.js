import { port } from 'App';

const fetchNotes = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  try {
    const FetchResponse = await fetch(`${port}/api/v1/notes`, options);
    const result = await FetchResponse.json();
    return result.notes;
  } catch (error) {
    console.log(error);
  }
};
export default fetchNotes;
