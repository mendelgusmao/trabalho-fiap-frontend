import { Avatar } from "../Avatar";

import styles from "./Post.module.css";
import { Bids } from "../Bids";

export function Listing({ listing }) {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={listing.imageUrl} />
          <div className={styles.authorInfo}>
            <strong>{listing.title}</strong>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        {listing.description}
      </div>

      <Bids listingId={listing.id} />
    </article>
  );
}
