import { useEffect, useState } from "react";
import { Listing } from "../../components/Listing";
import { api } from "../../services/api";
import styles from "./Auctions.module.css";

export function Auctions() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/listings")
      .then((response) => {
        setListings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      {loading ? (
        <div>🔄 Loading listings...</div>
      ) : (
        <div className={styles.wrapper}>
          {listings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
}
