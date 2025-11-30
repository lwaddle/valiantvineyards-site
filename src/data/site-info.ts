/**
 * Centralized site information
 * Edit hours, contact info, and address here to update across the entire site
 */

export const hours = {
  // Regular tasting room hours
  tastingRoom: [
    { days: "Monday – Thursday", hours: "11am – 6pm" },
    { days: "Friday – Saturday", hours: "11am – 7pm" },
    { days: "Sunday", hours: "12pm – 5pm" },
  ],
  // Optional: Add seasonal notes or closures
  note: "", // e.g., "Closed Thanksgiving & Christmas"
};

export const contact = {
  phone: "(605) 624-4500",
  email: "info@valiantvineyards.com",
};

export const address = {
  street: "1500 W. Main St",
  city: "Vermillion",
  state: "SD",
  zip: "57069",
  full: "1500 W. Main St, Vermillion, SD 57069",
  googleMapsUrl: "https://maps.google.com/?q=Valiant+Vineyards+Vermillion+SD",
};

export const social = {
  facebook: "https://www.facebook.com/ValiantVineyards",
  instagram: "https://www.instagram.com/valiantvineyards",
};
