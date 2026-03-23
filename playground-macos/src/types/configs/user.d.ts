export interface UserData {
  name: string;
  /** Shown in the phone status bar center (fixed; not the current app title). */
  brandTitle: string;
  /** Short line under the name on the mobile home screen. */
  tagline: string;
  avatar: string;
  password: string;
}
