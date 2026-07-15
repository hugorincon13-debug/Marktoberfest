// ─────────────────────────────────────────────────────────────
// EDIT EVERYTHING ABOUT YOUR EVENT HERE.
// This is the only file you need to change to customize the site.
// ─────────────────────────────────────────────────────────────

export const event = {
  // Who + what
  guestOfHonor: "Mark",
  shortName: "Marktoberfest",
  heroTitle: "Marktoberfest 40", // big headline at the top of the page
  subtitle: "Cabin weekend in WV", // shown under the big headline
  title: "Marktoberfest — Mark's 40th Birthday Cabin Weekend",

  // When — use ISO format: YYYY-MM-DDTHH:MM:SS
  startDate: "2026-10-16T16:00:00",
  endDate: "2026-10-18T11:00:00",
  // Friendly display strings
  dateRangeDisplay: "October 16–18, 2026",
  arrivalDisplay: "Friday from 4:00 PM",
  departureDisplay: "Sunday by 11:00 AM",

  // Where — publicLocation is shown on the page; the exact address is
  // only revealed to guests after they RSVP.
  publicLocation: "Davis, WV",
  address: "1 Hillside Road, Davis, WV 26260",
  mapsUrl: "https://maps.google.com/?q=1+Hillside+Road+Davis+WV+26260",
  // Optional embedded map (leave "" to hide). Use a Google Maps "Embed a map" src URL.
  mapEmbedUrl: "",
};

// Meals over the weekend that guests can sign up to host (cook / lead).
export const meals: { id: string; name: string; when: string }[] = [
  { id: "fri-dinner", name: "Friday Welcome Dinner", when: "Friday 6:30 PM" },
  { id: "sat-breakfast", name: "Saturday Breakfast", when: "Saturday 9:00 AM" },
  { id: "sat-dinner", name: "Saturday Dinner 🎂", when: "Saturday 7:00 PM" },
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
    name: "Fall foliage drive",
    emoji: "🍁",
    blurb:
      "Loop through Canaan Valley and the Highland Scenic byways for mile after mile of peak red-and-gold color.",
  },
];
