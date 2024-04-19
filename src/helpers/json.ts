export function jsonResponse(json: object) {
  return new Response(JSON.stringify(json), { headers: { "Content-Type": "application/json" } })
}