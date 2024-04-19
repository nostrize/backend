import { Relay } from 'nostr-tools/relay'
import type { Event } from 'nostr-tools/core'

import { jsonResponse } from '../helpers/json';

type Content = { lud16: string };

/*
[
  "wss://relay.damus.io", 
  "wss://nostr1.tunnelsats.com", 
  "wss://nostr-pub.wellorder.net", 
  "wss://relay.nostr.info", 
  "wss://nostr-relay.wlvs.space", 
  "wss://nostr.bitcoiner.social", 
  "wss://nostr-01.bolt.observer", 
  "wss://relayer.fiatjaf.com"
]
*/

type lud16Params = { pubkey: string };

export async function lud16(params: lud16Params): Promise<Response> {
  const { pubkey } = params;

  const relay = await Relay.connect('wss://relay.damus.io');

  return new Promise((resolve, reject) => {
    relay.subscribe([
      {
        kinds: [0],
        authors: [pubkey],
      },
    ], {
      onevent(event) {
        const lud16 = parseLud16From(event)

        resolve(jsonResponse({ lud16 }));
      },
      onclose(reason) {
        reject(reason);
      },
    })
  });  
}

function parseLud16From(profile: Event): string | null {
  const content = profile.content;
  
  let parsed: Content;

  try {
    parsed = JSON.parse(content);

    return parsed.lud16;
  } catch (error) {
    return null;
  }
}