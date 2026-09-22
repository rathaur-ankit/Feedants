export const userData = {
  name: 'Aryan Sharma',
  username: '@aryan_dancer24',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPyEghipDY2H3PU-RCFSh1KfCnHFGT1-hM6DKy-TFJ6d2qKYKN9zzz2nm9b9kJ8aUnAZONCk8hP6W6dLsryZwvrGeSCeuof8u54w0cOFgid5EfpXUaAW3wrLyIXrVE1ijTAEujE90IX77BhqkqagFO7q3I68uEWiVCIOy-mPdCFV-OJprz0Ha_5TfD5KYlglLJwaD6K_WZKnpdnAZD08CSNIoUqsPzuVKa7tNJpDwTGy3pjbevtVY0',
  isVerified: true,
  tags: ['Verified Creator', 'Kathak Enthusiast'],
  stats: {
    contestsJoined: 12,
    podiumsWon: 3,
    totalEarnings: '₹4,850',
  },
  wallet: {
    balance: '₹1,250',
    status: 'Available',
  },
  referralLink: 'feedants.com/r/aryan921',
  referralFullLink: 'https://feedants.com/r/referral123',
} as const;

export const activeRegistration = {
  title: 'Feedants Classical Dance',
  deadline: '30 Aug, 11:55 PM',
  status: 'Registered' as const,
} as const;

export const megaContest = {
  title: 'Feedants Classical Dance Championship 2026',
  description: 'National jury adjudication, verified certificates & live grand finale showcase.',
  prizePool: '₹50,000',
  endsIn: '2 days',
} as const;

export const categories = [
  { id: '1', emoji: '🌟', label: 'All', isActive: true },
  { id: '2', emoji: '💃', label: 'Classical Dance', isActive: false },
  { id: '3', emoji: '🎤', label: 'Singing', isActive: false },
  { id: '4', emoji: '🎨', label: 'Art & Painting', isActive: false },
  { id: '5', emoji: '🎭', label: 'Acting', isActive: false },
  { id: '6', emoji: '📸', label: 'Photography', isActive: false },
] as const;

export const competitions = [
  {
    id: '1',
    title: 'Bollywood Fusion Dance League',
    tags: [{ label: 'Hot', type: 'hot' as const }, { label: 'Dance', type: 'default' as const }, { label: 'Solo / Duet', type: 'default' as const }],
    prizePool: '₹25,000',
    judge: {
      name: 'Geeta Kapoor',
      role: 'Head Adjudicator',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4ybeS0RVsqRzTLofBaBZ99e1t7h0uhp9nSBWmzt7spLf3hb_iH_2A7PGv5SorOy_EhVY_DQVBc6TqBNAFxRxFXwMgQMZ_Ay93e9HzeVcUOos8jSOoQsXbBzHfecqkRJBCaOqlZnfDzu_HBUCHGEVPGO93P6l4LQuT0WmrMQdgTFqjIP1Z9vNTKlOklxiF260SOpdOsIylqJ1lOmp-mjuL5LiFf5LThT6RJFEIFM0wryYSvTuuKgIl',
    },
    spotsLeft: 45,
    totalSpots: 100,
    enrolled: 55,
    entryFee: '₹149',
    urgency: 'normal' as const,
  },
  {
    id: '2',
    title: 'Carnatic Vocal Solo Trophy',
    tags: [{ label: 'Fast Filling', type: 'fast' as const }, { label: 'Music', type: 'default' as const }, { label: 'Classical', type: 'default' as const }],
    prizePool: '₹10,000',
    judge: {
      name: 'R. Venkat',
      role: 'Carnatic Maestro',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbqp72nsiftOG3-9e85tJX3oOoO2lt3aYpaw92ulF3fVHLqjJPrDZ_a2xQZGF8PuhBdbpOjJjHdwmPLikcvlI4vdHE4KuoRp23wtauw9yuCaeHIiSN2wU_Q0yUDuRu-tw27YwUvDOi9ZURjaQrEY4hEwS84y917CneI64xqJST7SH8dzv5zm-mzLjbWa6fR2z7vUehHU2p4s6tEQLEzZmPU7ohGA1vkC9DPzUVTSWgx2RBGMFYVpIW',
    },
    spotsLeft: 12,
    totalSpots: 30,
    enrolled: 18,
    entryFee: '₹99',
    urgency: 'critical' as const,
  },
  {
    id: '3',
    title: 'Feedants Classical Dance Championship 2026',
    tags: [{ label: 'Mega Contest', type: 'hot' as const }, { label: 'Classical Dance', type: 'default' as const }, { label: 'National', type: 'default' as const }],
    prizePool: '₹50,000',
    judge: {
      name: 'Manju Dubey',
      role: 'Kathak Maestro • 12+ Yrs',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY4QbGoeX6pKPC72-szD4GUaZbyOiHro4IRFThC-RuvsM4cmKlQzCkMa5oD9nNIKzTjmzw-jeY6Vj61okf6mSK0kEK97-S095lvbDeqVmW11slqOmrQD35g5Zf95MJGOj-S9-gdbQivA7WzaePQnBdMJVtIYgO1imHxrudx0LJ6xAP3597wwn-n8CKdoq1o_6pUHUFb89fQZJJWMn4ZrStv-ybdvPjAWEYLhJTImEzTX_h_ST0n8kH',
    },
    spotsLeft: 19,
    totalSpots: 20,
    enrolled: 1,
    entryFee: '₹99',
    urgency: 'critical' as const,
  },
  {
    id: '4',
    title: 'National Canvas & Digital Art League',
    tags: [{ label: 'Hot', type: 'hot' as const }, { label: 'Art & Painting', type: 'default' as const }, { label: 'Digital / Oil', type: 'default' as const }],
    prizePool: '₹15,000',
    judge: {
      name: 'Ananya Roy',
      role: 'Lead Visual Artist',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCjzeGz7hsLd3IItk15TSREWuhzah2tRvJRP2I54h_AhDIwQ70fu5Tdzh1VRiQS6FatDd5-FbY4DinO1ZbLsEJbOW9DfcEJ0cMi6OR-jH76QS4vh9tzi0AelZ--PMZvwYqdqKXaY1YVfIW5WvIug9eAtwCHuGbQ2ZxX6_103rkQLwaAGs8utuR332W-JbTf4722d986rPyP2VYRJ47zRepVrtfEZk3E4EmdNtn4S-zuhWnc39Kt859',
    },
    spotsLeft: 35,
    totalSpots: 50,
    enrolled: 15,
    entryFee: '₹129',
    urgency: 'normal' as const,
  },
  {
    id: '5',
    title: 'Monologue & Street Play Drama Arena',
    tags: [{ label: 'Fast Filling', type: 'fast' as const }, { label: 'Acting', type: 'default' as const }, { label: 'Solo Act', type: 'default' as const }],
    prizePool: '₹20,000',
    judge: {
      name: 'Vikramaditya Sen',
      role: 'National Theatre Director',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYe7mPFtgyZ4y2RENUoZmkgV1CR4flRWD02HOk7kzbJjSYUpnxolitkdiyIn418jj7OKmkQ53CoTWXXHOMFa75bl5SAH5Wm_kSy2lHDF311m1Vr7Oz5k4mmZ2pvpTVtdami-n_1prTkbFicWh_7oSWWcRQhmkaVgY7r8p4rPAaGEeOeDIuMdh5lwvndrQdQUdEko8ub_eG7gayfCd5NEkH-t9AdSqdOpEdMa0AR6Oxv49hkuFW-4lO',
    },
    spotsLeft: 8,
    totalSpots: 25,
    enrolled: 17,
    entryFee: '₹199',
    urgency: 'critical' as const,
  },
  {
    id: '6',
    title: 'Monsoon Moods Photography Trophy',
    tags: [{ label: 'Open Now', type: 'default' as const }, { label: 'Photography', type: 'default' as const }, { label: 'Landscape', type: 'default' as const }],
    prizePool: '₹12,000',
    judge: {
      name: 'Kabir Rao',
      role: 'Editorial Photojournalist',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAirhivGasGMSN_A6y9bPhSY3xK7u66G1LI1TuRN6Tb-5HxG8tInffU8SzAj7hzPBmDkg7dhVpXC6LnZEu07Hnb5q98FGJD15QWjtn2m-J1qUhCYh6-rNMbioSJVzv7rA8H-p2FP8A2OPGAJByYmF1ymRSM1ccRRTJHpF3e2hfwHR-62bRYVNRuUgKz3vw9-fJ6S7LVWmVedjMGNiRuhpw-aUx4rUeUPDfkwxIcapaeyT4dLFKQKshO',
    },
    spotsLeft: 42,
    totalSpots: 60,
    enrolled: 18,
    entryFee: '₹79',
    urgency: 'normal' as const,
  },
] as const;

export const champions = [
  { id: '1', name: 'Riya Shah', prize: 'Won ₹15,000', place: '🥇 1st Place', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCjzeGz7hsLd3IItk15TSREWuhzah2tRvJRP2I54h_AhDIwQ70fu5Tdzh1VRiQS6FatDd5-FbY4DinO1ZbLsEJbOW9DfcEJ0cMi6OR-jH76QS4vh9tzi0AelZ--PMZvwYqdqKXaY1YVfIW5WvIug9eAtwCHuGbQ2ZxX6_103rkQLwaAGs8utuR332W-JbTf4722d986rPyP2VYRJ47zRepVrtfEZk3E4EmdNtn4S-zuhWnc39Kt859' },
  { id: '2', name: 'Aarav Mehta', prize: 'Won ₹8,000', place: '🥈 2nd Place', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjhSeupYfyq1KYlfubPfNh1I4Xsu-qAGaIUShZrrGAP6D1u9wNRf2BS2JtBUxrz26eXfmgx0Xy4yv00BJ0u8KqAT1MhLlNjz4kPuDXw1lLQeMnnfP9C-n1d57kpw9Nfve4pR_ZJXkYEz8IMzKzFOnzUKoX9Tp6LRfzd4HZBAc_CJWex4EgbDGhB-NaSo3B8ek3nBI7-vHU3K6QPVJCp7ALSZVu8HPVgdUeQ3iVaE6uFmlD148JMEIc' },
  { id: '3', name: 'Neha Verma', prize: 'Won ₹5,000', place: '🥉 3rd Place', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAORSgx45RDgyfd6aI5bOFMst-4DAQVH3gWab6QKYw0_xHAHiWZEhr4zATotRert1I_mmhL2PCy_GQM2tEWmrzCXMpKysBDEh-Nq9hGKexdC6eQeAtlHhTUqro3YEz7GYc6lAnCgnYaeB0CHHEgAk5cARh2el0ojWz96vjPMkxPdsRe_yxBjAkrt1dRWv6_cvq6vCxnB6gXGHIZgMpP_cVwZHW2BD_00uZixI7zwiqRjQUMKV_scQVY' },
] as const;

export const exploreCategories = [
  { id: '1', icon: 'body', title: 'Classical Dance', subtitle: 'Kathak, Odissi, Bharatnatyam', liveCount: 14 },
  { id: '2', icon: 'walk', title: 'Contemporary', subtitle: 'Lyrical, Hip Hop, Urban', liveCount: 8 },
  { id: '3', icon: 'mic', title: 'Vocal Music', subtitle: 'Hindustani, Sufi & Pop', liveCount: 19 },
  { id: '4', icon: 'musical-notes', title: 'Instrumental', subtitle: 'Flute, Tabla, Violin, Guitar', liveCount: 11 },
  { id: '5', icon: 'color-palette', title: 'Sketch & Digital Art', subtitle: 'Portraits, 2D Animation', liveCount: 6 },
  { id: '6', icon: 'book', title: 'Poetry & Spoken', subtitle: 'Kavita, Shayaris, Slam', liveCount: 9 },
] as const;

export const leaderboard = [
  { id: '1', rank: 2, name: 'Aarav M.', points: '2,420 pts', wins: '4 Won', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYe7mPFtgyZ4y2RENUoZmkgV1CR4flRWD02HOk7kzbJjSYUpnxolitkdiyIn418jj7OKmkQ53CoTWXXHOMFa75bl5SAH5Wm_kSy2lHDF311m1Vr7Oz5k4mmZ2pvpTVtdami-n_1prTkbFicWh_7oSWWcRQhmkaVgY7r8p4rPAaGEeOeDIuMdh5lwvndrQdQUdEko8ub_eG7gayfCd5NEkH-t9AdSqdOpEdMa0AR6Oxv49hkuFW-4lO' },
  { id: '2', rank: 1, name: 'Riya Shah', points: '3,150 pts', wins: '7 Won', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAb8NIbYpNlfBcBaN3JWwOz_hVJxVWoj0yO8GM0sbQXoVILOhLubykW-qK7rpp7Fy23WY-3Z80_M658ouRZ0fdMRshcyHdnHv21IZr-P2OmfBlw7T-aSsHmzLfITHUVt6tRaxwPAYrDyAxpf2TX2DnP2Doyn55DT4drBHJPXvT_FEBQGjd6cDrRm6gdkQWKHFLK59xH_fsAh7DL8djUbzG-xwWmCOhx3OtINXMa3zKkX1dzzpjTQ0j' },
  { id: '3', rank: 3, name: 'Ishita C.', points: '2,180 pts', wins: '3 Won', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2bOKxFcjKHROmnHMpd6FIqpLKhbzWsPqskmkKGYyITs5Z_TfV4YcuOFr9qxEo8arhjZLNWhjCuKmRgdE8oPuKALP_Ye9r6awWJT3fnqZHAxjKaUr76c_aO25W1cUYBtNvqHFCQ-tfeXdH1SlOiYmZ53fe34gzaaUlmiJcbQinDLCoHzyu6GN9zvzQEoAd8Q7ng3K57HQFy3r2eEc_ntOo-AzIRnc-Q3MJuPudZnZJ1PvjovsEc9Ka' },
] as const;

export const trendingSubmissions = [
  {
    id: '1',
    title: 'Bharatnatyam Varnam Performance',
    subtitle: 'Rhythm cycle: Adi Tala • 1.4k community votes',
    judgeScore: '4.8',
    duration: '02:45',
    views: '4.2k',
    votes: '1.4k',
    performer: { name: 'Priya Sen', contest: 'Feedants Classical Dance', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt9YGFt2b6MtqzL1j9P30WrAUI4qX_q-4eYcToJR3uyKjPbRYsoEZtpMp2wfScgY4KEbeFWqsx_G9PKaHUCGwfYT7odtvKKKkvcWzXNGketJTMHH6WUdj-7WYEKeDtbnSLyD8VaY5o9H_ueijnWpEuQ5lYgsWrKl_vrtkP_yxUql2y_d3HvvQ0Vv5meUFHwJzcDFjaucnE2TWHnqL0u07ZfWIhPv4SQGlprq7f3h8-YVeuzX84Rl0y' },
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqGOy4T3eFiY7VD58TpWPZp6nESXGcCPIM0V1bjoGTz-ZCkV1oVB0pP3een9mN0n--zgYMF0TXjZwQM5izTeATU4Htl-m-ZCSd-MzF2Y25Bg5-loNlup3kEyg9YAhhz8GSitcN3DceOf0QtM1OVAOxMcHt65pBj8Y3uvsrsnmBw-ooDznUfYfjlBblxPyhLmFHMwUBLh77bDuUv2Ib3JjRbs0VJdvy4FcYiDSMsRZRLN-4qvxLpLhe',
  },
  {
    id: '2',
    title: 'Kathak Tarana Rhythm',
    subtitle: 'Tatkar footwork speed • 980 community votes',
    judgeScore: '4.6',
    duration: '01:58',
    views: '2.8k',
    votes: '980',
    performer: { name: 'Rohan Joshi', contest: 'Kathak Monsoon Showcase', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvXIpvuls2DF5ePPfk8JBSQdVWujn-J03O_v5HFbF-CxF-rG2IXUAiXEnLGRXjrxsaNKMC60_ihJ0lV6dDUjwU6ktL4wKmIrb5fPW1Pm3tP_NeTwxEb4H3l1G-qjJl5jVRh93irQBjOkTQKVGNUFCnFsYpC4fBUUwe-P4yOdZ4xSfsJlpUIQqf77AJqrW32nSM_oJFyjr41en6Z_bb_kNE7Jei5Q1sMMlTqM3TS9edS3WawlOECph8' },
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeHkySVPwiKjf0bg5mmKTyABNAfPYwR9OysJq-hpLt6PdIWgDixAbHGIb10wLXT7A2CNokf6BI7mpR2661RVxmV-JSRoPnjQMAmWIHNbiQMAtcPJHQ7seHbxItO0IJJkeu0rm5ByT0snyHo9WIFyx5lYFlZDeheep5nHVYfFwnBr3pZvAiQKpXrkXYvP9P5kFq9wFUqD0GpZaHKOUUFYdqSm7AEpWoniP2mdPQGLED3VNG6-MBevGQ',
  },
] as const;

export const judgesMasterclass = [
  {
    id: '1',
    name: 'Manju Dubey',
    specialty: 'Kathak Maestro • 12+ Yrs',
    rating: 4.9,
    reviews: '340+',
    nextClass: 'Ghunghroo Rhythms',
    price: '₹ 299',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY4QbGoeX6pKPC72-szD4GUaZbyOiHro4IRFThC-RuvsM4cmKlQzCkMa5oD9nNIKzTjmzw-jeY6Vj61okf6mSK0kEK97-S095lvbDeqVmW11slqOmrQD35g5Zf95MJGOj-S9-gdbQivA7WzaePQnBdMJVtIYgO1imHxrudx0LJ6xAP3597wwn-n8CKdoq1o_6pUHUFb89fQZJJWMn4ZrStv-ybdvPjAWEYLhJTImEzTX_h_ST0n8kH',
  },
  {
    id: '2',
    name: 'Pt. Ravi Academy',
    specialty: 'Sitar & Classical Strings',
    rating: 5.0,
    reviews: '512+',
    nextClass: 'Raga Yaman Deep Dive',
    price: '₹ 499',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAirhivGasGMSN_A6y9bPhSY3xK7u66G1LI1TuRN6Tb-5HxG8tInffU8SzAj7hzPBmDkg7dhVpXC6LnZEu07Hnb5q98FGJD15QWjtn2m-J1qUhCYh6-rNMbioSJVzv7rA8H-p2FP8A2OPGAJByYmF1ymRSM1ccRRTJHpF3e2hfwHR-62bRYVNRuUgKz3vw9-fJ6S7LVWmVedjMGNiRuhpw-aUx4rUeUPDfkwxIcapaeyT4dLFKQKshO',
  },
] as const;

export const contestDetails = {
  title: 'Feedants Classical Dance',
  status: 'Registered' as const,
  tags: ['Dance', 'Multi-Win'],
  certificateNote: 'Winners get certificate',
  prizePool: '₹ 1,500',
  entryFee: '₹ 99',
  spotsLeft: 19,
  totalSpots: 20,
  booked: 1,
  judge: {
    name: 'Manju Dubey',
    title: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ifDBkwjvPCtEO0ihelkBBMagXZ9o_pRQrrOuWe87JteXgJajTuxUOy-Zwv7r1-kF84KSC2G6uydsM1ynHaaq4AOwq00jzeg_byvIxp1FP2QW3cKXRcb1iLKHuBErSwArN3RotJ7fdKxpxXffuPvFMlxS0XPxg--B2LPwlGEDLm8xVtcQyVy61lShnV1feIM3hNsufBKPW27nRZ9rUF99Fp_8KO4s6VIaBwmYR83jiY0sN9pytOYp',
  },
  countdown: '01d : 06h : 28m : 32s',
  dates: [
    { label: 'Register Before', date: '10 Aug 26', time: '11:50 PM' },
    { label: 'Submission Starts', date: '6 Aug 26', time: '04:00 AM' },
    { label: 'Submission Ends', date: '30 Aug 26', time: '11:55 PM' },
    { label: 'Result Date', date: '1 Sept 26', time: '11:50 PM' },
  ],
  previousWinners: [
    { name: 'Riya Shah', position: '1st Winner', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2MiHo15SPOSpQIlZmL0_VaS06RyEVX8fUGrf9d8oI61Dg0jF9ICIyzGVSsXYomczZnS1IS9SQ9RmAt9MfuttmvX7tsz6FuA_HiKkAGHKG3fSBMkUeaZyyEIKOF_SP8v5KLukg7beUwswxB7xR754JWipaic26v_X2_SbDwDsSnakp6XMEcWf9G7szXWPT8emSS_2QuKQ4SUHobxKhrQqaZmeVrI7xGfB4nMK_xcOCQyh2y794KqD1' },
    { name: 'Aarav Mehta', position: '1st Winner', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB3YY6yNqokn1hgIBCw5atTMGRq2Dtq9k9gX-vb_JDcK1RHVhXGSpL3CBkZCs0IZiIrBH9BFOpztx-OW5Fs145z_J71xEuA9F8-BKvGXOKeuBMWizreHIdRm_NmrenhbM78HBTZ_-wN1O1bgeeQteF6uicF8IqOflIisMYvmGOydMkS7s5Jdud0PbkILf4P4iT7HAHdOR9Yy8UJCsKq1Tf9hWz3KMG6Yi8FCznkoJ563yfy1SZC-O6' },
    { name: 'Neha Verma', position: '2nd Winner', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyzXkJf4U7EiDChGMD6ooTtkEEriQSejzrMp2MR2LPX4uxTJVrVOcy5vYiKTDVo6BjyYDmyxDzUv8MVHz0mA3COQvoYJHP4dUQxfmCy5Wmgc329HnOfggEkT5cFHibDkCtp_68-nIq4znSQRM92Sd4tJ51pXuGTJCjtDGMWWX3zk5PIxRMxGax0sFuQOYrZ5GlLGarWnpKwovYH1rxB7RpjUo1Li1X1s1eFVRY0iOdRZi35EV1QwXm' },
  ],
  aboutText: 'This is an online classical dance competition open for all age groups.\nParticipate from anywhere and showcase your talent.\nExpress your passion through traditional dance.',
  rewards: [
    { position: '1st Winner', emoji: '🏆', amount: '₹ 550' },
    { position: '2nd Winner', emoji: '🥈', amount: '₹ 300' },
    { position: '3rd Winner', emoji: '🥉', amount: '₹ 240' },
    { position: '4th Winner', emoji: '☆', amount: '₹ 200' },
    { position: '5th Winner', emoji: '☆', amount: '₹ 130' },
    { position: '6th Winner', emoji: '☆', amount: '₹ 80' },
  ],
} as const;

export const profileCompetitions = [
  {
    id: '1',
    title: 'Feedants Classical Dance',
    category: 'Solo Kathak',
    status: 'Registered' as const,
    deadline: 'Deadline: 30 Aug 26 • 11:55 PM',
    slot: 'Slot #18 of 20 • Ready for clip',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPwhSECggkJ3rdl0AT5ygaG3TH2622cXcuKoeUF-2YPaV52eY7JBe7lIPpQ9xcVLXDnRE5tSPTHH8Gqr89LsUUzFE3Iae5lTte9iC2PMgR_VcOQ-5CJdRmhem8e1p9kVcuGfhdaKnioK0kLKSS_TQ8KyiH21ujE3UU17p1XXRCxypLY8HmDe-xi6YcgXKUpVALSjUXBUyHQoT3fmz0tJ9CjZGQ4Mo3mZZYuLi2iDJxqba-ui5BpjE_',
  },
  {
    id: '2',
    title: 'Bollywood Fusion League',
    category: 'Fusion / Freestyle',
    status: 'Upcoming' as const,
    deadline: 'Submissions open 5 Sep 26',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIwXUyk5c31jxOgFcM3fEJmsZgiHDcP4LzAFQAoZEP_2CtUofirW-l6jeop5AW_rx22ZxE_8jJTSRKKjL7HV9AaE99abtcBgMCgJymBdJHnuSTqaMmu89p-rJBykxLAVP9RcVQg6q4k3uKUh72pciuMibmYPktHCGzHhc4-y4cHeXXg6eNnFqlRXFgNiUprLafUNEeraKw9LgNZ9g3i3mLK_qo16cqQQVbjayx89I6moZpCmu6bCUj',
  },
] as const;

export const profileMenuItems = [
  { id: '1', icon: 'card', label: 'Payment Methods & UPI', value: 'Primary linked', valueColor: 'primary' as const },
  { id: '2', icon: 'people', label: 'Refer & Earn', badge: '₹10/signup' },
  { id: '3', icon: 'notifications', label: 'Notification Preferences' },
  { id: '4', icon: 'help-circle', label: 'Help & Razorpay FAQs', subtitle: 'Payment safety, refunds & rules' },
  { id: '5', icon: 'information-circle', label: 'About Feedants', value: 'v2.4.1' },
] as const;

export const profileFilters = [
  { id: '1', label: 'Registered (2)', isActive: true },
  { id: '2', label: 'Submissions (5)', isActive: false },
  { id: '3', label: 'Certificates (3)', isActive: false },
  { id: '4', label: 'Saved', isActive: false },
] as const;

export const exploreFilters = [
  { id: '1', label: 'All Talents', isActive: true },
  { id: '2', label: 'Trending Videos', isActive: false },
  { id: '3', label: 'Top Judges', isActive: false },
  { id: '4', label: 'Rising Stars', isActive: false },
  { id: '5', label: 'Workshops', isActive: false },
] as const;

export const trustBadges = [
  { icon: 'shield-checkmark', label: '100% Secure' },
  { icon: 'ribbon', label: 'Unbiased Jury' },
  { icon: 'cash', label: 'Direct Payouts' },
] as const;
