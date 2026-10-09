// Browser-side fetch wrapper for the admin panel: never throws, always returns { ok, data?, error? }.
// Handles network failures, non-JSON error pages and expired sessions.
export async function api(url, { method = 'GET', body, raw, loginRedirect = true } = {}) {
  try {
    const res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: raw || (body ? JSON.stringify(body) : undefined),
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      /* body was not JSON (e.g. a proxy error page) */
    }
    if (res.status === 401 && loginRedirect) {
      window.location.href = '/admin/login';
      return { ok: false, error: 'Session expired. Please log in again.' };
    }
    if (!res.ok) return { ok: false, status: res.status, error: (data && data.error) || `Server error (${res.status}). Please try again.` };
    return { ok: true, data: data || {} };
  } catch {
    return { ok: false, error: 'Network error. Check your connection and try again.' };
  }
}
