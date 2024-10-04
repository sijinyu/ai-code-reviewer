export const lintCode = async (code: string) => {
  const response = await fetch('/api/review/lint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Failed to lint the code');
  }

  return response.json();
};
