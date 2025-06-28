import { useEffect, useState } from "react";
import styles from "./Bids.module.css";
import { api } from "../../services/api";

export function Bids({ listingId }) {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    api.get(`/listings/${listingId}/bids`)
      .then((response) => {
        setBids(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
      });
    }, []);

    return (
        <div className={styles.content}>
            {bids.map((bid, index) => (
                <div key={bid.id}>
                    {/* <div key={bid.id} className={styles.bid}> */}
                    {index === 0 && <strong>Highest Bid: </strong>}
                    {bid.bidder} @ {bid.value}
                </div>
            ))}
        </div>
    )
};
