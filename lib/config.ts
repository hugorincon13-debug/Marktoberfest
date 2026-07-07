// ─────────────────────────────────────────────────────────────
// EDIT EVERYTHING ABOUT YOUR EVENT HERE.
// This is the only file you need to change to customize the site.
// ─────────────────────────────────────────────────────────────

export const event = {
  // Who + what
  guestOfHonor: "Mark",
  shortName: "Marktoberfest",
  title: "Marktoberfest — Mark's 40th Birthday Cabin Weekend",
  tagline: "Two nights in the mountains for Mark's 40th. Bring your stein. 🍺",

  // When — use ISO format: YYYY-MM-DDTHH:MM:SS
  startDate: "2026-10-16T16:00:00",
  endDate: "2026-10-18T11:00:00",
  // Friendly display strings
  dateRangeDisplay: "October 16–18, 2026",
  arrivalDisplay: "Friday from 4:00 PM",
  departureDisplay: "Sunday by 11:00 AM",

  // Where
  address: "1 Hillside Road, Davis, WV 26260",
  // Paste a Google Maps share link (used for the "Get Directions" button)
  mapsUrl: "https://maps.google.com/?q=1+Hillside+Road+Davis+WV+26260",
  // Optional embedded map (leave "" to hide). Use a Google Maps "Embed a map" src URL.
  mapEmbedUrl: "",
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
      { time: "10:30 AM", title: "Blackwater Falls hike", note: "Falls boardwalk + Lindy Point. Easy, ~2 miles." },
      { time: "3:00 PM", title: "Explore Thomas / brewery crawl", note: "Galleries, coffee, and a Marktoberfest pint 🍺" },
      { time: "7:00 PM", title: "Birthday dinner + cake", note: "The main event 🎂" },
      { time: "9:30 PM", title: "Bonfire under the stars" },
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

// Meals over the weekend that guests can sign up to host (cook / lead).
export const meals: { id: string; name: string; when: string }[] = [
  { id: "fri-dinner", name: "Friday Welcome Dinner", when: "Friday 6:30 PM" },
  { id: "sat-breakfast", name: "Saturday Breakfast", when: "Saturday 9:00 AM" },
  { id: "sat-dinner", name: "Saturday Birthday Dinner 🎂", when: "Saturday 7:00 PM" },
  { id: "sun-brunch", name: "Sunday Brunch", when: "Sunday 9:00 AM" },
];

// Seasonal things to do around Davis & Thomas, WV — peak fall foliage in mid-October.
export const activities: { name: string; emoji: string; blurb: string; url?: string }[] = [
  {
    name: "Blackwater Falls State Park",
    emoji: "🍂",
    blurb:
      "The 57-ft namesake falls are a short boardwalk from the lot, framed by peak foliage. Catch Lindy Point at sunset and the little Elakala Falls on the way.",
    url: "https://wvstateparks.com/park/blackwater-falls-state-park/",
  },
  {
    name: "Dolly Sods Wilderness",
    emoji: "🏔️",
    blurb:
      "Otherworldly high-elevation plains with windswept spruce and blazing-red huckleberry. About 30 minutes out — go early, dress warm.",
    url: "https://www.fs.usda.gov/recarea/mnf/recarea/?recid=7001",
  },
  {
    name: "Canaan Valley scenic chairlift",
    emoji: "🚡",
    blurb: "Ride the lift up at Canaan Valley Resort for panoramic views over the valley's autumn colors.",
    url: "https://canaanresort.com/",
  },
  {
    name: "Blackwater Canyon Rail Trail",
    emoji: "🚲",
    blurb: "Easy crushed-limestone trail from Thomas along the canyon rim — perfect for a morning walk or bike ride.",
  },
  {
    name: "Downtown Thomas",
    emoji: "🎸",
    blurb:
      "A tiny arts town: galleries on Front Street, live music at the Purple Fiddle, and coffee at TipTop.",
    url: "https://www.thepurplefiddle.com/",
  },
  {
    name: "Marktoberfest brewery crawl",
    emoji: "🍺",
    blurb:
      "Stumptown Ales in Davis and Mountain State Brewing in Thomas — fittingly on-theme for the birthday boy.",
    url: "https://www.stumptownales.com/",
  },
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
];
