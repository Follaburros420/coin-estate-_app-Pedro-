import crypto from 'crypto';


export const handleFormateTime = (dateString) => {
  if (!dateString)
    return '__'
  const date = new Date(dateString);
  const day = date.getUTCDate(); // Get the day
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getUTCMonth()]; // Get the month name
  // const year = date.getUTCFullYear() + 10; // Add 10 to the year
  const year = date.getUTCFullYear(); // Add 10 to the year

  return `${day} ${month} ${year}`;
}

export const handleFormate = (email) => {
  return
}

export const routerPaths = [
  'admin',
  'dashboard',
  '/dashboard',
  '/dashboard/my-properties',
  '/dashboard/market-place',
  '/admin/dashboard',
  '/admin/create-property',
  '/admin/create-blog'
]


// const ENCRYPTION_KEY = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest(); // Derive 32-byte key
// const IV_LENGTH = 16;
// function encrypt(text) {
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// function decrypt(text) {
//   const [iv, encrypted] = text.split(':');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
//   let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }
