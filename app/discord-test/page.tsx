'use client';

import { useState } from 'react';

export default function DiscordTestPage() {
  const [channelId, setChannelId] = useState('');
  const [message, setMessage] = useState('Hello from Discord test!');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/discord/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId, message }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error);
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui' }}>
      <h1 style={{ color: '#5865f2' }}>Discord Bot Test</h1>

      <div style={{ background: '#fee', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
        <strong>⚠️ Test Mode Only</strong>
        <p>This page is for testing Discord bot integration. Remove before production.</p>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Step 1: Add Bot to Server</h2>
        <p>First, add the bot to your Discord server:</p>
        <a
          href="/api/discord/bot-invite"
          target="_blank"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#5865f2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '600'
          }}
        >
          🤖 Add Bot to Server
        </a>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          Select your server, click "Authorize", then come back here.
        </p>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Step 2: Get Channel ID</h2>
        <ol style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>In Discord: <strong>User Settings → Advanced → Enable Developer Mode</strong></li>
          <li>Right-click any text channel (like #general)</li>
          <li>Click <strong>"Copy Channel ID"</strong></li>
          <li>Paste it below</li>
        </ol>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h2>Step 3: Send Test Message</h2>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Channel ID:
          </label>
          <input
            type="text"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Paste channel ID here (e.g., 1234567890123456789)"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Message:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <button
          onClick={handleTest}
          disabled={loading || !channelId || !message}
          style={{
            padding: '12px 24px',
            background: channelId && message ? '#5865f2' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: channelId && message ? 'pointer' : 'not-allowed',
            fontSize: '14px'
          }}
        >
          {loading ? 'Sending...' : '📤 Send Test Message'}
        </button>
      </div>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: result.success ? '#d1fae5' : '#fee',
          borderRadius: '8px',
          borderLeft: `4px solid ${result.success ? '#10b981' : '#ef4444'}`
        }}>
          <h3 style={{ marginTop: 0 }}>
            {result.success ? '✅ Success!' : '❌ Error'}
          </h3>
          {result.success ? (
            <>
              <p><strong>Message sent successfully!</strong></p>
              <p style={{ fontSize: '14px', color: '#666' }}>Message ID: {result.messageId}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>Check your Discord channel to see the message.</p>
            </>
          ) : (
            <>
              <p><strong>{error}</strong></p>
              {result.hints && (
                <div style={{ marginTop: '15px' }}>
                  <strong>Hints:</strong>
                  <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    {result.hints.map((hint: string, i: number) => (
                      <li key={i} style={{ fontSize: '14px' }}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
              {result.code && (
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  Error code: {result.code}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', background: '#fff8dc', borderRadius: '8px' }}>
        <h3>💡 Troubleshooting</h3>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>Error 50001</strong>: Bot can't access the channel. Make sure the bot is in the server and can see the channel.</li>
          <li><strong>Error 50013</strong>: Bot lacks permissions. Give it "Send Messages" permission in server settings.</li>
          <li><strong>Error 10003</strong>: Channel not found. Double-check you copied the right channel ID.</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#f5f5f5', borderRadius: '8px', fontSize: '12px' }}>
        <strong>API Endpoint:</strong> POST /api/discord/test
        <pre style={{ marginTop: '10px', padding: '10px', background: '#fff', borderRadius: '4px', overflow: 'auto' }}>
{`curl -X POST https://your-domain.com/api/discord/test \\
  -H "Content-Type: application/json" \\
  -d '{"channelId": "${channelId || 'YOUR_CHANNEL_ID'}", "message": "${message}"}'`}
        </pre>
      </div>
    </div>
  );
}
