import { PlaceHolderImages } from './placeholder-images';

export type User = {
  name: string;
  avatarId: string;
};

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
};

export type Dispensary = {
  id: string;
  name: string;
  imageId: string;
  rating: number;
  distance: number;
  address: string;
  reviews: Review[];
};

const users: { [key: string]: User } = {
  'user-1': { name: 'Alex G.', avatarId: 'avatar-1' },
  'user-2': { name: 'Brenda M.', avatarId: 'avatar-2' },
  'user-3': { name: 'Casey L.', avatarId: 'avatar-3' },
  'user-4': { name: 'Dana R.', avatarId: 'avatar-4' },
};

export const allDispensaries: Dispensary[] = [
  {
    id: 'disp-1',
    name: 'Green Leaf Wellness',
    imageId: 'dispensary-1',
    rating: 4.8,
    distance: 0.5,
    address: '123 High St, San Francisco, CA',
    reviews: [
      {
        id: 'rev-1',
        user: users['user-1'],
        rating: 5,
        comment: "Absolutely the best selection in town. The staff are incredibly knowledgeable and friendly. Highly recommend the 'Northern Lights' strain!",
      },
      {
        id: 'rev-2',
        user: users['user-2'],
        rating: 4,
        comment: "Great place, very clean and modern. A bit pricey, but the quality is undeniable. The online ordering system is a breeze to use.",
      },
    ],
  },
  {
    id: 'disp-2',
    name: 'The Herbalist',
    imageId: 'dispensary-2',
    rating: 4.5,
    distance: 1.2,
    address: '456 Oak Ave, San Francisco, CA',
    reviews: [
      {
        id: 'rev-3',
        user: users['user-3'],
        rating: 5,
        comment: "My go-to spot! They have amazing deals on Tuesdays. The staff always remembers me and gives great recommendations. It feels like a community here.",
      },
      {
        id: 'rev-4',
        user: users['user-4'],
        rating: 4,
        comment: "Solid choice, but parking can be a nightmare. I love their edible selection, especially the gummies. Wish they had more CBD options.",
      },
    ],
  },
  {
    id: 'disp-3',
    name: 'Cloud Nine Cannabis',
    imageId: 'dispensary-3',
    rating: 4.2,
    distance: 2.1,
    address: '789 Pine Ln, San Francisco, CA',
    reviews: [
      {
        id: 'rev-5',
        user: users['user-1'],
        rating: 4,
        comment: "Cool vibe and decor. The product is good, but service can be slow during peak hours. Worth a visit if you're not in a hurry.",
      },
      {
        id: 'rev-6',
        user: users['user-2'],
        rating: 4,
        comment: "They have some really unique strains you can't find elsewhere. The prices are fair. I'll be back to try more of their top-shelf stuff.",
      },
    ],
  },
  {
    id: 'disp-4',
    name: 'Bloom Room',
    imageId: 'dispensary-4',
    rating: 4.9,
    distance: 3.5,
    address: '101 Maple Rd, San Francisco, CA',
    reviews: [
      {
        id: 'rev-7',
        user: users['user-3'],
        rating: 5,
        comment: "Exceptional service and premium quality. It's a bit of a drive for me, but totally worth it. The ambiance is so relaxing and upscale.",
      },
      {
        id: 'rev-8',
        user: users['user-4'],
        rating: 5,
        comment: "A truly top-tier experience from start to finish. The budtenders are masters of their craft. You get what you pay for, and here, that's excellence.",
      },
    ],
  },
  {
    id: 'disp-5',
    name: 'Urban Pharm',
    imageId: 'dispensary-5',
    rating: 4.0,
    distance: 0.8,
    address: '222 Downtown Ave, San Francisco, CA',
    reviews: [
      {
        id: 'rev-9',
        user: users['user-1'],
        rating: 4,
        comment: "Convenient location and decent prices. It gets the job done. Can be crowded, but the line moves fast. Good for a quick in-and-out trip.",
      },
      {
        id: 'rev-10',
        user: users['user-3'],
        rating: 4,
        comment: "I appreciate their loyalty program. The selection is vast, almost overwhelming. Staff was helpful in navigating the options.",
      },
    ],
  },
    {
    id: 'disp-6',
    name: 'The Green Cross',
    imageId: 'dispensary-6',
    rating: 4.6,
    distance: 4.0,
    address: '333 Suburbia Pl, San Francisco, CA',
    reviews: [
      {
        id: 'rev-11',
        user: users['user-2'],
        rating: 5,
        comment: "Fantastic customer service and a very welcoming atmosphere for newcomers. They took the time to explain everything to me without making me feel rushed.",
      },
      {
        id: 'rev-12',
        user: users['user-4'],
        rating: 4,
        comment: "Their delivery service is super reliable. The product is always fresh. A little far from me, but delivery makes it a non-issue.",
      },
    ],
  },
];
