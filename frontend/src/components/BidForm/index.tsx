import { useState } from "react";
import styles from "./BidForm.module.css";
import { api } from "../../services/api";

export function BidForm({ listingId, bidValueSuggestion }) {
  const [value, setValue] = useState(bidValueSuggestion);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      await api.post(`/listings/${listingId}/bids`, {
        value: parseFloat(value),
        bidder: 'You',
      });
      setValue("");
    } catch (err) {
      let errors;

      if (err.response?.data.errors) {
        errors = err.response.data.errors.map(error => `${error.message} (${error.path[0]})`);
      }

      if (err.response?.data.error) {
        errors = [err.response.data.error];
      }

      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={styles.bidForm} onSubmit={handleSubmit}>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Your bid (R$)"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={loading}
          required
          className={styles.input}
        />
        <button type="submit" disabled={loading || !value} className={styles.button}>
          {loading ? "Sending..." : "Bid!"}
        </button>
      </form>
      {errors &&
        <div className={styles.error}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>  
          ))}
        </div>
      }
    </>
  );
}
