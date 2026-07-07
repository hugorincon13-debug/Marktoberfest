// ─────────────────────────────────────────────────────────────
// EDIT EVERYTHING ABOUT YOUR EVENT HERE.
// This is the only file you need to change to customize the site.
// ─────────────────────────────────────────────────────────────

export const event = {
  // Who + what
  guestOfHonor: "Mark",
  title: "Mark's 40th Birthday Cabin Weekend",
  tagline: "Two nights in the mountains. Good people, campfires, and cake.",

  // When — use ISO format: YYYY-MM-DDTHH:MM:SS
  startDate: "2026-09-18T16:00:00",
  endDate: "2026-09-20T11:00:00",
  // Friendly display strings
  dateRangeDisplay: "September 18–20, 2026",
  arrivalDisplay: "Friday from 4:00 PM",
  departureDisplay: "Sunday by 11:00 AM",

  // Where
  cabinName: "Whispering Pines Cabin",
  address: "1234 Mountain Road, Big Bear Lake, CA 92315",
  // Paste a Google Maps share link (used for the "Get Directions" button)
  mapsUrl: "https://maps.google.com/?q=Big+Bear+Lake+CA",
  // Optional embedded map (leave "" to hide). Use a Google Maps "Embed a map" src URL.
  mapEmbedUrl: "",

  // Logistics
  wifiNetwork: "PineCabin_Guest",
  wifiPassword: "s3ttheask",
  costPerPerson: "$85",
  costNote: "Covers the cabin for both nights, split evenly. Venmo @your-handle.",

  // Contact for the hosts
  hostName: "Jordan & Sam",
  hostEmail: "hosts@example.com",
  hostPhone: "(555) 123-4567",

  // Fun extras (set to "" to hide)
  spotifyPlaylistUrl: "https://open.spotify.com/", // collaborative playlist
  photoAlbumUrl: "", // shared Google Photos / iCloud album link

  // RSVP deadline (ISO) — shown as a friendly nudge
  rsvpDeadline: "2026-08-15",
  rsvpDeadlineDisplay: "August 15, 2026",
};

// The weekend schedule. Add/remove/reorder freely.
export const schedule: { day: string; items: { time: string; title: string; note?: string }[] }[] = [
  {
    day: "Friday",
    items: [
      { time: "4:00 PM", title: "Arrival & check-in", note: "Grab a bunk, drop your bags." },
      { time: "6:30 PM", title: "Welcome dinner", note: "Chili + cornbread. Veggie option too." },
      { time: "8:30 PM", title: "Campfire & s'mores", note: "Bring an instrument if you've got one." },
    ],
  },
  {
    day: "Saturday",
    items: [
      { time: "9:00 AM", title: "Big pancake breakfast" },
      { time: "11:00 AM", title: "Lake hike", note: "~4 miles, easy. Optional." },
      { time: "3:00 PM", title: "Lawn games & lake time" },
      { time: "7:00 PM", title: "Birthday dinner + cake", note: "The main event 🎂" },
      { time: "9:30 PM", title: "Bonfire & stargazing" },
    ],
  },
  {
    day: "Sunday",
    items: [
      { time: "9:00 AM", title: "Lazy brunch" },
      { time: "11:00 AM", title: "Pack up & head home", note: "Coordinate carpools for the drive back." },
    ],
  },
];

// Potluck meals people can sign up to bring food for.
// The `slots` are a gentle suggestion of what's still needed for each meal —
// they're shown as prompts, but guests can bring anything.
export const meals: { id: string; name: string; when: string; slots: string[] }[] = [
  {
    id: "fri-dinner",
    name: "Friday Welcome Dinner",
    when: "Friday 6:30 PM",
    slots: ["Main / chili", "Cornbread", "Salad", "Drinks", "Dessert"],
  },
  {
    id: "sat-breakfast",
    name: "Saturday Pancake Breakfast",
    when: "Saturday 9:00 AM",
    slots: ["Pancake mix / batter", "Syrup & toppings", "Fruit", "Coffee", "Bacon / protein"],
  },
  {
    id: "sat-dinner",
    name: "Saturday Birthday Dinner 🎂",
    when: "Saturday 7:00 PM",
    slots: ["Main dish", "Side", "Salad", "Bread", "Drinks", "The cake (hosts)"],
  },
  {
    id: "sun-brunch",
    name: "Sunday Brunch",
    when: "Sunday 9:00 AM",
    slots: ["Eggs / breakfast bake", "Pastries", "Fruit", "Juice / mimosas"],
  },
  {
    id: "anytime",
    name: "Snacks & Anytime",
    when: "All weekend",
    slots: ["Chips & dip", "Trail mix", "S'mores supplies", "Beer / wine", "Non-alcoholic drinks"],
  },
];

export const potluckCategories = [
  "Main",
  "Side",
  "Salad",
  "Bread",
  "Dessert",
  "Snack",
  "Drinks",
  "Other",
] as const;

// Suggested packing list. Edit to taste.
export const packingList: string[] = [
  "Warm layers & a jacket (nights get cold)",
  "Sleeping bag or bedding (confirm with hosts)",
  "Hiking shoes",
  "Swimsuit & towel",
  "Reusable water bottle",
  "Headlamp or flashlight",
  "Sunscreen & bug spray",
  "A snack or drink to share",
  "Board games / cards",
  "Camera",
];

// Frequently asked questions.
export const faqs: { q: string; a: string }[] = [
  {
    q: "Can I bring a plus-one?",
    a: "Space is limited — please note your plus-one in the RSVP form so we can plan sleeping arrangements.",
  },
  {
    q: "Are kids or pets welcome?",
    a: "The cabin is pet-friendly, but let us know in your RSVP so we can confirm. Kids welcome!",
  },
  {
    q: "What if I can only come for one night?",
    a: "Totally fine — mention it in the notes field of your RSVP and we'll sort out logistics.",
  },
  {
    q: "How do I chip in for the cabin?",
    a: event.costNote,
  },
];
