// Runtime configuration (public file - do NOT put a plain-text password here).
// adminPasswordSha256: SHA-256 hex digest of the admin password used by the "Admin Panel" button.
//   Generate:  printf '%s' 'your-long-passphrase' | sha256sum
// Leave empty to disable the Admin Panel shortcut.
window.BMART_CONFIG = {
  adminPasswordSha256: ""
};
