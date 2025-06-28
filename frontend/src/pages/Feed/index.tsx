import { useEffect, useState } from "react";
import { Listing } from "../../components/Listing";
import {
  socket,
  setupSocketListeners,
  cleanupSocketListeners,
} from "../../services/socket";
import { api } from "../../services/api";

export function Feed() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setupSocketListeners({
      onNewBid: (data) => {
        console.log(data);
      },
    });

    api.get("/listings")
      .then((response) => {
        setListings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        setLoading(false);
      });

    return cleanupSocketListeners;
  }, []);

  return (
    <main>
      {loading ? (
        <div>🔄 Loading listings...</div>
      ) : (
        listings.map((listing) => <Listing key={listing.id} listing={listing} />)
      )}
    </main>
  );
}
