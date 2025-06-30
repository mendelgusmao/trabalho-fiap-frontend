import { useEffect, useState } from "react";
import styles from "./Bids.module.css";
import { api } from "../../services/api";
import { setupSocketListeners, cleanupSocketListeners } from "../../services/socket";

export function Bids({ listingId }) {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    setupSocketListeners({
      bidCreated: (bids) => {
        for (let bid of bids) {
          if (bid.listingId === listingId) {
            setBids(bids);
          }
        }
      },
    });

    api.get(`/listings/${listingId}/bids`)
      .then((response) => {
        setBids(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
      });

      return cleanupSocketListeners;
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
