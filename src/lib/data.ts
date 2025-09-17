import type { Topic } from './types';

export const topics: Topic[] = [
  {
    id: '1',
    title: 'Should renewable energy be subsidized by the government?',
    description: 'A debate on the economic and environmental implications of subsidizing renewable energy sources like solar and wind power versus traditional fossil fuels.',
    category: 'Environment',
    scope: 'country',
    country: 'USA',
    votes: { for: 1204, against: 843 },
    createdAt: '2024-07-20T10:00:00Z',
    author: {
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    },
    comments: [
      { id: 'c1', text: 'Subsidies are crucial for accelerating the transition to clean energy.', author: { name: 'EcoWarrior', avatarUrl: 'https://picsum.photos/seed/c-avatar1/40/40' }, createdAt: '2024-07-20T11:00:00Z', votes: { for: 42, against: 5 }, replies: [
        { id: 'r1', text: 'I agree! We need to invest in our future.', author: { name: 'FutureNow', avatarUrl: 'https://picsum.photos/seed/r-avatar1/40/40'}, createdAt: '2024-07-20T11:30:00Z', votes: { for: 15, against: 1 } }
      ]},
      { id: 'c2', text: 'The market should decide, not the government.', author: { name: 'FreeMarketFan', avatarUrl: 'https://picsum.photos/seed/c-avatar2/40/40' }, createdAt: '2024-07-20T12:30:00Z', votes: { for: 18, against: 25 } }
    ]
  },
  {
    id: '2',
    title: 'Is a four-day work week the future of employment?',
    description: 'Exploring the pros and cons of transitioning to a four-day work week, considering productivity, employee well-being, and business impact.',
    category: 'Lifestyle',
    scope: 'global',
    votes: { for: 2567, against: 1233 },
    createdAt: '2024-07-22T14:30:00Z',
    author: {
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    },
    comments: [
       { id: 'c3', text: 'More time for family and personal projects sounds amazing!', author: { name: 'LifeLover', avatarUrl: 'https://picsum.photos/seed/c-avatar3/40/40' }, createdAt: '2024-07-22T15:00:00Z', votes: { for: 88, against: 3 } }
    ]
  },
  {
    id: '3',
    title: 'Should AI development be more heavily regulated?',
    description: 'A discussion on the ethical considerations and potential risks of advanced artificial intelligence, and whether stricter regulations are needed.',
    category: 'Technology',
    scope: 'global',
    votes: { for: 1892, against: 1950 },
    createdAt: '2024-07-21T09:00:00Z',
    author: {
      name: 'Alex Ray',
      avatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    },
    comments: []
  },
  {
    id: '4',
    title: 'Mandatory term limits for all elected officials.',
    description: 'A proposal for implementing mandatory term limits for all levels of government to reduce corruption and increase accountability.',
    category: 'Politics',
    scope: 'country',
    country: 'Canada',
    votes: { for: 3012, against: 754 },
    createdAt: '2024-07-19T18:00:00Z',
    author: {
      name: 'Sarah Chen',
      avatarUrl: 'https://picsum.photos/seed/avatar4/40/40',
    },
    comments: [
      { id: 'c4', text: 'This is a no-brainer. Power corrupts.', author: { name: 'Voter1', avatarUrl: 'https://picsum.photos/seed/c-avatar4/40/40' }, createdAt: '2024-07-19T19:00:00Z', votes: { for: 152, against: 12 } },
      { id: 'c5', text: 'Experience is valuable. Term limits would remove good politicians too.', author: { name: 'GovtGeek', avatarUrl: 'https://picsum.photos/seed/c-avatar5/40/40' }, createdAt: '2024-07-19T20:15:00Z', votes: { for: 67, against: 98 } }
    ]
  },
  {
    id: '5',
    title: 'Should plastic packaging be banned globally?',
    description: 'Examining the feasibility and impact of a worldwide ban on single-use plastic packaging to combat pollution.',
    category: 'Environment',
    scope: 'global',
    votes: { for: 980, against: 320 },
    createdAt: '2024-07-23T11:00:00Z',
    author: {
      name: 'Mike Johnson',
      avatarUrl: 'https://picsum.photos/seed/avatar5/40/40',
    },
    comments: []
  },
  {
    id: '6',
    title: 'Is universal basic income a viable economic strategy?',
    description: 'Analyzing the potential benefits and drawbacks of implementing a universal basic income (UBI) for all citizens.',
    category: 'Politics',
    scope: 'country',
    country: 'Germany',
    votes: { for: 1543, against: 1689 },
    createdAt: '2024-07-24T08:20:00Z',
    author: {
      name: 'Emily White',
      avatarUrl: 'https://picsum.photos/seed/avatar6/40/40',
    },
    comments: [
       { id: 'c6', text: 'UBI could unlock so much human potential!', author: { name: 'Futurist', avatarUrl: 'https://picsum.photos/seed/c-avatar6/40/40' }, createdAt: '2024-07-24T09:00:00Z', votes: { for: 120, against: 45 } }
    ]
  },
];
