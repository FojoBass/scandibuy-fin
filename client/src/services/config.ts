const baseUrl = 'https://scandibuyserver.vercel.app/graphql';

const fetchFunc = async <R, T = undefined>(
  query: string,
  variables?: T,
  signal?: AbortSignal | null
) => {
  try {
    const body = JSON.stringify({
      query,
      variables,
    });

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(
        (result.errors as { message: string }[])
          .map((error) => error.message)
          .join(', ')
      );
    }

    return result.data as R;
  } catch (error) {
    console.error('Error in fetchFunc:', error);
    throw error;
  }
};

export default fetchFunc;
