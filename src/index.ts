import { serve } from 'bun';

import { lud16 } from './routes/profile';

serve({
  fetch(req) {
    const url = new URL(req.url);

    const urlParts = url.pathname.split("/");
    const [_, endpoint, ...rest] = urlParts;
    const [pubkey] = rest;
    
    if (url.pathname === "/") return new Response("Home page!");
    if (endpoint === "profile") return lud16({ pubkey });
    
    return new Response("404!");
  }
});
