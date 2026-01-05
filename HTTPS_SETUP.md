# HTTPS Setup for Local Development

This guide explains how to enable HTTPS for local development to allow camera access on iOS devices.

## Why HTTPS is needed

iOS requires HTTPS for accessing device cameras in web browsers. Since this app uses QR code scanning with camera access, you need to run the development server over HTTPS when testing on iPhone/iPad.

## Setup Instructions

### 1. Generate SSL Certificate

Run this command in the project root directory:

```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

This will create two files:
- `cert.pem` - SSL certificate
- `key.pem` - Private key

**Note:** These files are already in `.gitignore` and will not be committed to the repository.

### 2. Create .env file

Create a `.env` file in the project root with the following content:

```env
HTTPS=true
SSL_CRT_FILE=cert.pem
SSL_KEY_FILE=key.pem
```

**Note:** The `.env` file is already in `.gitignore` and will not be committed to the repository.

### 3. Start the development server

```bash
npm start
```

The app will now run on `https://localhost:3000`

## Accessing from iOS Device

### Option 1: Using Local IP Address

1. Find your Mac's local IP address:
   ```bash
   ipconfig getifaddr en0
   ```

2. On your iPhone/iPad (connected to the same WiFi/VPN network):
   - Navigate to: `https://[YOUR_IP]:3000`
   - Example: `https://192.168.1.100:3000`

### Option 2: Using mDNS (Bonjour)

If on the same network, you can use:
```
https://[YOUR_MAC_NAME].local:3000
```

Replace `[YOUR_MAC_NAME]` with your Mac's computer name (found in System Preferences → Sharing).

## Trust the Certificate on iOS

Since this is a self-signed certificate, iOS will show a security warning:

1. When you first visit the site, tap **"Show Details"** or **"Advanced"**
2. Tap **"Visit this website"** or **"Proceed anyway"**
3. If needed, trust the certificate in iOS Settings:
   - Go to: **Settings → General → About → Certificate Trust Settings**
   - Enable full trust for the certificate

## Troubleshooting

### Certificate expired
Certificates generated with this method expire after 365 days. If expired, delete the old certificates and regenerate them:

```bash
rm cert.pem key.pem
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

### Camera still not working
- Ensure you're accessing via HTTPS (not HTTP)
- Check that your iPhone and Mac are on the same network
- Clear your browser cache on iOS
- Try Safari if using another browser
- Verify camera permissions in iOS Settings → Safari → Camera

### Cannot access from iPhone
- Ensure both devices are on the same WiFi network or VPN
- Check firewall settings on your Mac
- Try disabling any VPN temporarily to test local network access
- Verify the IP address hasn't changed (DHCP can reassign IPs)

## Production Deployment

For production, this app is deployed to GitHub Pages which automatically provides HTTPS. No certificate setup is needed for the deployed version.

```bash
npm run deploy
```

Access the production app at: https://arronstorm.github.io/amazon-otp
