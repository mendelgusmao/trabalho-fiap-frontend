import { useEffect, useState } from "react";
import styles from "./Bids.module.css";
import { api } from "../../services/api";
import { setupSocketListeners, cleanupSocketListeners } from "../../services/socket";
import { BidForm } from "../BidForm";

export function Bids({ listingId, isFinished }) {
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

    const bidClassName = (bid, isHighest) => {
      let className = styles.bidItem;

      if (isHighest) {
        className += ` ${styles.highestBid}`;
      }

      if (isFinished && isHighest) { 
        className += ` ${styles.finished}`;
      }

      return className;
    };

    const formatBidDate = (dateString: string) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);

      if (diffSec < 60) return "Now";
      if (diffMin < 60) return `${diffMin} min ago`;
      if (diffHour < 24) return `${diffHour} hour ago`;

      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const formatBidValue = (value: number) => {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    }

    const bidValueSuggestion = bids.length > 0 ? Math.max(...bids.map(bid => bid.value)) + 1 : 1;

    return (
      <>
      {isFinished && (
      <div className={styles.finishedBidMessage}>
        Auction finished for this item!
      </div>   
      )}
   
      <ul className={styles.bidsList}>
        {bids.map((bid, index) => (
          <li
            key={bid.id}
            className={bidClassName(bid, index === 0)}
          >
            <span className={styles.bidder}>{bid.bidder}</span>
            <span className={styles.amount}>{formatBidValue(bid.value)}</span>
            <span className={styles.time}>{formatBidDate(bid.createdAt)}</span>
          </li>
        ))}
      </ul>

      {!isFinished && (
        <BidForm listingId={listingId} bidValueSuggestion={bidValueSuggestion} />
      )}
      </>
    )
};
