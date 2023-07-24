const mapping: Record<string, string> = {
  clients: 'client',
  'scraped-data': 'scraped_data',
  topics: 'topic',
  users: 'user',
  websites: 'website',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
