// Utility to check if it's user's first visit
export const checkFirstVisit = () => {
    if (typeof window === 'undefined') return false;
  
    // Check both localStorage and cookies
    const hasSeenTourStorage = localStorage.getItem("hasSeenEventsTour");
  
    if (!hasSeenTourStorage) {
      return true;
    }
    else{
        return false;

    }
  
  };
  
  