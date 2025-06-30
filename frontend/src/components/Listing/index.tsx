import { Avatar } from "../Avatar";

import styles from "./Listing.module.css";
import { Bids } from "../Bids";

export function Listing({ listing }) {
  const isFinished = listing.status === "finished";

  return (
    <article className={styles.listing}>
      <header>
        <div className={styles.product}>
          <Avatar src={listing.imageUrl} />
          <div className={styles.productInfo}>
            <strong>{listing.title}</strong>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        {listing.description}
      </div>

      <Bids listingId={listing.id} isFinished={isFinished} />
    </article>
  );
}
