export function audit(event, payload = {}) {
  console.log(
    '[audit]',
    event,
    JSON.stringify({ ...payload, at: new Date().toISOString() })
  );
}
