import { createContext, useState, useContext } from "react";

export const ListingContext = createContext(null);

export function ListingProvider({ children }) {
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <ListingContext.Provider value={{ selectedListing, setSelectedListing }}>
      {children}
    </ListingContext.Provider>
  );
}

export function useListing() {
  return useContext(ListingContext);
}
