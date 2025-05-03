export const mockUsers = () => [
  {
    id: 1,
    username: 'mage_milo',
    role: 'claimsProcessor',
    password: 'spellcaster123',
  },
  {
    id: 2,
    username: 'knight_kevin',
    role: 'claimsProcessor',
    password: 'swordmaster456',
  },
];

export const mockCreatures = () => [
  {
    id: 101,
    name: 'Flamewing the Dragon',
    species: 'Dragon',
    insurancePolicy: 'Fire Damage, Hoard Theft',
    claims: [301, 302],
    imageUrl: 'assets/dragon.png',
  },
  {
    id: 102,
    name: 'Sir Clumsy the Unicorn',
    species: 'Unicorn',
    insurancePolicy: 'Medical Coverage, Magical Horn Protection',
    claims: [303, 307],
    imageUrl: 'assets/unicorn.png',
  },
];

export const mockInsuranceClaims = () => [
  {
    id: 301,
    clientId: 101,
    title: "🔥 Dragon's Hoard Fire Disaster",
    description: 'Accidentally burned down gold stash with fire breath.',
    amountRequested: 5000,
    status: 'Pending',
    fraudRisk: 'Low',
    imageUrl: 'assets/dragon.png',
  },
];

export const mockFraudeDetectionCases = () => [
  {
    claimId: 303,
    flaggedBySystem: true,
    reason: 'Similar fraudulent claims detected in history.',
    riskScore: 8.5,
  },
  {
    claimId: 307,
    flaggedBySystem: false,
    reason:
      ' An invisible goblin theft with no supporting evidence raises major red flags',
    riskScore: 9.5,
  },
];

export const mockClaimsProcessingHistory = () => [
  {
    claimId: 301,
    processedBy: 'mage_milo',
    decision: 'Approved',
    notes: 'Fire damage covered under policy.',
  },
  {
    claimId: 302,
    processedBy: 'knight_kevin',
    decision: 'Approved',
    notes: 'Client provided evidence of goblin theft.',
  },
  {
    claimId: 303,
    processedBy: 'mage_milo',
    decision: 'Rejected',
    notes: 'Horn damage not covered under policy.',
  },
];
