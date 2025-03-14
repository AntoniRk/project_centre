export const setupPerformanceObserver = (callback: (entries: PerformanceEntryList) => void) => {
    if (typeof PerformanceObserver === 'undefined') {
      console.warn('PerformanceObserver not supported');
      return {
        disconnect: () => {}
      };
    }
    
    const observer = new PerformanceObserver(list => {
      callback(list.getEntries());
    });
    
    // Observe different types of performance entries
    try {
      observer.observe({ entryTypes: ['measure', 'resource', 'paint'] });
    } catch (e) {
      console.warn('Error setting up PerformanceObserver:', e);
    }
    
    return observer;
  };