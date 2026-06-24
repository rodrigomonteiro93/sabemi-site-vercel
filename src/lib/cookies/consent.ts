export const COOKIE_CONSENT_KEY = 'sabemi-cookie-consent';

export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
}

export function setCookieConsent(): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
}
