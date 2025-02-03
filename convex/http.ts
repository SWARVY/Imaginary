import { httpRouter } from 'convex/server';

import { getImageUrl } from './files';

const http = httpRouter();

http.route({
  path: '/getImage',
  method: 'GET',
  handler: getImageUrl,
});

export default http;
