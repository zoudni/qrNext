
export const fetchEvents = async () => {
    try {
      const response = await fetch('/api/get-events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return await response.json(); // Directly return the parsed data
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error; // Re-throw to handle it elsewhere if needed
    }
  };
  