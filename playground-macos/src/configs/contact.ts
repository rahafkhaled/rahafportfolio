/** Inbox for contact-form submissions. */
export const CONTACT_EMAIL = "rahaf.k.abutarbush@gmail.com";

/**
 * FormSubmit delivers form messages to CONTACT_EMAIL.
 * On the first submission, FormSubmit sends you an activation email — click it once to turn delivery on.
 */
export const CONTACT_FORM_URL = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;
