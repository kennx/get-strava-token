import { NextApiRequest, NextApiResponse } from 'next';
import strava from 'strava-v3';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body);
      process.env.STRAVA_CLIENT_ID = body.client_id;
      process.env.STRAVA_CLIENT_SECRET = body.client_secret;
      process.env.STRAVA_REDIRECT_URI = 'http://localhost:3000/callback';
      const url = await strava.oauth.getRequestAccessURL({
        scope: 'read,activity:read_all,profile:read_all,read_all',
      });
      res.status(200).json({ url });
    } catch (error) {
      res.status(400).json({ error: String(error) });
    }
  }
}

export default handler;
