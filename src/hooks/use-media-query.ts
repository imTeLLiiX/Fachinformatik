import { useState, useEffect } from 'react';

/**
 * Hook für Media Queries
 * @param query Die Media Query als String
 * @returns Boolean, der angibt, ob die Media Query zutrifft
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Prüfe, ob window verfügbar ist (für SSR)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Initialer Wert
      setMatches(media.matches);
      
      // Event Listener für Änderungen
      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
      media.addEventListener('change', listener);
      
      // Cleanup
      return () => media.removeEventListener('change', listener);
    }
    
    return undefined;
  }, [query]);

  return matches;
} 