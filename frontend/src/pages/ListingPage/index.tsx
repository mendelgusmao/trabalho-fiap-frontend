import { useNavigate } from "react-router-dom";
import { useListing } from "../../context/ListingContext";
import { Listing } from "../../components/Listing";
import { useEffect } from "react";

export function ListingPage() {
  const { selectedListing } = useListing();
  const navigate = useNavigate();

  console.log(selectedListing);

  useEffect(() => {
    if (!selectedListing) {
      navigate("/");
    }
  }, [selectedListing, navigate]);

  return <div>{selectedListing && <Listing listing={selectedListing} />}</div>;
}
