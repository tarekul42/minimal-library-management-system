export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: { name: string; avatar?: string; bio: string };
  publishedAt: string;
  readingTime: number;
  coverImage: string;
  tags: string[];
}

const body1 = `## Why this list is different

Our librarians read every single title on this list — not just the press releases. These are the books that stayed with us long after the last page.

### The standouts

**"The Glass Cathedral" by Amara Okonkwo** — A sweeping family saga spanning three generations of a Ghanaian-British family. Okonkwo's prose is reminiscent of Chimamanda Ngozi Adichie at her best.

**"Neon Dreams" by Kai Yamamoto** — Cyberpunk meets literary fiction in this story of a Tokyo street artist who discovers her digital creations can alter reality. Dizzyingly inventive.

**"The Last Archive" by Sarah Mitchell** — In a world where books are banned, a librarian becomes the most dangerous person alive. A love letter to libraries and the people who defend them.

### Honorable mentions

- "Where the River Bends" by Thomas Keller
- "Constellations" by Priya Sharma
- "The Midnight Library" by Matt Haig (paperback release)

Visit our catalog to place holds on these titles today.`;

const body2 = `## Summer reading doesn't have to mean beach reads

While we love a good page-turner as much as anyone, summer is also the perfect time to dive into something that challenges you.

### Fiction picks

**"Pachinko" by Min Jin Lee** — An epic historical novel following a Korean family across four generations. Perfect for long afternoons.

**"The Name of the Rose" by Umberto Eco** — A medieval mystery that combines theology, semiotics, and a locked-room murder. Ideal for readers who love puzzles.

### Non-fiction picks

**"The Soul of an Octopus" by Sy Montgomery** — A fascinating exploration of consciousness through the eyes of one of Earth's most alien intelligences.

**"Braiding Sweetgrass" by Robin Wall Kimmerer** — Indigenous wisdom meets botanical science. Perfect for reading in a hammock.

### How to borrow

All titles are available in our catalog. Log in to your account to place holds or borrow instantly.`;

const body3 = `## Why you should do it

A reading challenge transforms your relationship with books. Instead of waiting for inspiration to strike, you build a habit that carries you through the year.

### Our 2026 challenge categories

1. **A book published this year** — Stay current with new releases.
2. **A book in translation** — Experience a voice from another culture.
3. **A book over 500 pages** — Commit to something substantial.
4. **A book of poetry** — Let language surprise you.
5. **A book recommended by a librarian** — Ask us in person or check our staff picks.
6. **A book from a genre you usually avoid** — Step outside your comfort zone.

### Track your progress

Use the Wishlist feature on your dashboard to save titles for each category. We'll send you a completion certificate in December.

Happy reading!`;

const body4 = `## The history

From clay tablets to parchment scrolls to printed books to e-readers — the technology of reading has evolved dramatically. But some things never change: the thrill of a new story, the comfort of a familiar passage, the joy of sharing a book with a friend.

### Digital vs. print

Both have their place. Print offers a tactile experience that screens can't replicate. Digital offers convenience and accessibility features like adjustable type size and text-to-speech.

### What we offer

At Athenaeum, we support both. Browse our physical collection at any branch, or borrow e-books instantly through our digital catalog.

### The verdict

Read whatever format makes you happy. The important thing is that you're reading.`;

const body5 = `## What is historical fiction?

Historical fiction transports readers to another time, blending real historical events with imagined characters and stories. It's one of our most popular genres.

### Why we love it

- **Perspective** — History books tell us what happened; historical fiction tells us how it felt.
- **Escape** — Immerse yourself in Ancient Rome, Victorian London, or 1920s Shanghai.
- **Empathy** — Walk in someone else's shoes across time and culture.

### Staff picks

- "The Book Thief" by Markus Zusak
- "All the Light We Cannot See" by Anthony Doerr
- "Homegoing" by Yaa Gyasi
- "Wolf Hall" by Hilary Mantel

### Start here

New to the genre? Try "The Nightingale" by Kristin Hannah for a gripping entry point.`;

const body6 = `## What is genre fiction?

Genre fiction — also called commercial fiction — is storytelling built around recognizable conventions: mysteries have clues, romances have happy endings, thrillers have ticking clocks.

### The big four

**Mystery** — Puzzles with stakes. From cozy whodunits to hardboiled noir.

**Romance** — The most profitable genre in publishing. Happily-ever-after guaranteed.

**Science fiction** — What if? Stories that explore the future and its possibilities.

**Fantasy** — Worlds beyond our own. Dragons, magic, and epic quests.

### Why genre fiction matters

Genre fiction is where new readers find their love of reading. It's also where the most innovative storytelling often happens — genre writers experiment with structure, voice, and world-building in ways that literary fiction rarely attempts.

### Our recommendation

Read across genres. Each one flexes a different reading muscle.`;

const body7 = `## Your first library card

Getting a library card at Athenaeum is free and takes less than 10 minutes. Here's how:

### Online (recommended)

1. Visit our registration page.
2. Fill out the form with your name, email, and address.
3. You'll receive a digital card immediately via email.
4. Visit any branch to collect your physical card.

### In person

Bring a valid government ID and proof of address to any Athenaeum branch. Our staff will issue your card on the spot.

### What you get

- Borrow up to 5 items at a time
- Access to our digital catalog
- Hold and reservation privileges
- Member-only events and workshops

### For kids

Children under 16 can get a card with a parent or guardian's signature. No ID required.`;

const body8 = `## What makes a great audiobook?

Not every book works as an audiobook. The best ones have:

- **A skilled narrator** — The right voice can elevate good writing into something magical.
- **Clear structure** — Non-fiction with clear chapters and sections is easier to follow.
- **Dialogue** — Books with lots of dialogue are naturally suited to audio.

### Our top narrated picks

**"Project Hail Mary" by Andy Weir** — Ray Porter's narration is widely considered the best audiobook performance of the decade.

**"Born a Crime" by Trevor Noah** — Read by the author, this memoir gains authenticity and humor from Noah's delivery.

**"Circe" by Madeline Miller** — Perdita Weeks brings Greek mythology to life with her rich, warm voice.

### Tips for new listeners

Start with a book you've already read in print. Knowing the story reduces the cognitive load of audio listening.

### Borrow from us

Our digital catalog includes hundreds of audiobooks. Log in and filter by "audiobook" to browse.`;

const body9 = `## Our secret sauce

Our librarians don't just shelve books — they read them. Every staff pick on our website has been read and reviewed by a real person.

### How staff picks work

Each month, our team nominates books they've loved. We discuss them in our monthly meeting and vote on the final selection. We aim for diversity in genre, author background, and reading level.

### Meet our contributors

- **Eleanor Whitfield** — Head Librarian. Reads everything but has a soft spot for literary fiction.
- **James Okonkwo** — Catalog Director. Our non-fiction expert.
- **Mei Tanaka** — Member Experience. Romance and YA specialist.
- **Carlos Reyes** — Engineering Lead. Science fiction and fantasy enthusiast.

### Request a recommendation

Stop by any branch and tell a librarian what you've enjoyed recently. We'll give you three personalized recommendations on the spot. It's one of our favorite things to do.`;

export const blogPosts: BlogPost[] = [
  {
    slug: "10-must-read-fiction-2026",
    title: "10 Must-Read Fiction Releases of 2026",
    excerpt: "From genre-defining debuts to long-awaited sequels, here are the fiction titles our librarians can't stop talking about.",
    body: body1,
    author: { name: "Eleanor Whitfield", bio: "Head Librarian at Athenaeum. Has recommended over 4,000 books in 22 years." },
    publishedAt: "2026-06-12",
    readingTime: 7,
    coverImage: "/images/blog-1.svg",
    tags: ["fiction", "reading-lists"],
  },
  {
    slug: "summer-reading-guide",
    title: "Summer Reading Guide: 10 Books to Pack",
    excerpt: "Whether you're heading to the beach or staying home, these books will make your summer brighter.",
    body: body2,
    author: { name: "Mei Tanaka", bio: "Member Experience lead and YA fiction enthusiast." },
    publishedAt: "2026-06-05",
    readingTime: 5,
    coverImage: "/images/blog-2.svg",
    tags: ["reading-lists", "seasonal"],
  },
  {
    slug: "reading-challenge-2026",
    title: "Start a Reading Challenge in 2026",
    excerpt: "Build a reading habit that lasts all year. Here's how to design a challenge that works for you.",
    body: body3,
    author: { name: "James Okonkwo", bio: "Catalog Director and non-fiction reader. Tracks every book he reads." },
    publishedAt: "2026-05-28",
    readingTime: 6,
    coverImage: "/images/blog-3.svg",
    tags: ["reading-tips", "challenges"],
  },
  {
    slug: "future-of-reading",
    title: "The Future of Reading: Print vs. Digital in 2026",
    excerpt: "As technology evolves, so does the way we read. Here's a look at where reading is headed.",
    body: body4,
    author: { name: "Carlos Reyes", bio: "Engineering Lead and sci-fi enthusiast. Believes the best format is the one you'll actually use." },
    publishedAt: "2026-05-15",
    readingTime: 8,
    coverImage: "/images/blog-4.svg",
    tags: ["technology", "reading-tips"],
  },
  {
    slug: "guide-to-historical-fiction",
    title: "A Beginner's Guide to Historical Fiction",
    excerpt: "Love stories from the past but don't know where to start? Our librarians have you covered.",
    body: body5,
    author: { name: "Eleanor Whitfield", bio: "Head Librarian at Athenaeum. Has recommended over 4,000 books in 22 years." },
    publishedAt: "2026-05-01",
    readingTime: 5,
    coverImage: "/images/blog-5.svg",
    tags: ["genre-guide", "historical-fiction"],
  },
  {
    slug: "why-genre-fiction-matters",
    title: "Why Genre Fiction Deserves a Place on Your Shelf",
    excerpt: "Mystery, romance, sci-fi, fantasy — genre fiction is more than just entertainment. Here's why it matters.",
    body: body6,
    author: { name: "Carlos Reyes", bio: "Engineering Lead and genre fiction advocate." },
    publishedAt: "2026-04-18",
    readingTime: 6,
    coverImage: "/images/blog-6.svg",
    tags: ["genre-guide", "reading-tips"],
  },
  {
    slug: "how-to-get-library-card",
    title: "How to Get Your First Library Card at Athenaeum",
    excerpt: "Getting a library card is fast, free, and opens the door to thousands of books. Here's how.",
    body: body7,
    author: { name: "Mei Tanaka", bio: "Member Experience lead. Loves helping new members find their way." },
    publishedAt: "2026-04-04",
    readingTime: 4,
    coverImage: "/images/blog-7.svg",
    tags: ["library-tips", "membership"],
  },
  {
    slug: "audiobook-guide",
    title: "The Ultimate Guide to Listening to Audiobooks",
    excerpt: "New to audiobooks? Here's everything you need to know — from choosing the right narrator to speed settings.",
    body: body8,
    author: { name: "James Okonkwo", bio: "Catalog Director. Listens to audiobooks during his daily commute." },
    publishedAt: "2026-03-21",
    readingTime: 7,
    coverImage: "/images/blog-8.svg",
    tags: ["audiobooks", "reading-tips"],
  },
  {
    slug: "behind-our-staff-picks",
    title: "Behind the Scenes: How We Choose Our Staff Picks",
    excerpt: "Ever wonder how a book becomes a staff pick? Our team shares the process behind the selections.",
    body: body9,
    author: { name: "Eleanor Whitfield", bio: "Head Librarian at Athenaeum." },
    publishedAt: "2026-03-07",
    readingTime: 5,
    coverImage: "/images/blog-9.svg",
    tags: ["behind-the-scenes", "staff-picks"],
  },
];

export const blogCategories = [
  { value: "all", label: "All posts" },
  { value: "reading-lists", label: "Reading lists" },
  { value: "reading-tips", label: "Reading tips" },
  { value: "genre-guide", label: "Genre guides" },
  { value: "behind-the-scenes", label: "Behind the scenes" },
];
