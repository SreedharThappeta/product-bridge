'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Channel {
  id: string;
  name: string;
  type: number;
}

export default function DiscordSetupPage() {
  const searchParams = typeof window !== "undefined" ? useSearchParams() : { get: () => null };
  const [guildId, setGuildId] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [testMessage, setTestMessage] = useState('Hello from Discord!');
  const [sendingTest, setSendingTest] = useState(false);

  // Check if just came back from OAuth
  useEffect(() => {
    const discordStatus = searchParams.get('discord');
    const discordGuildId = searchParams.get('discord_guild');

    if (discordStatus === 'connected') {
      setSuccess('✅ Bot added to server successfully!');
      if (discordGuildId) {
        setGuildId(discordGuildId);
        fetchChannels(discordGuildId);
      }
    } else if (discordStatus === 'error') {
      const errorMsg = searchParams.get('discord_error_message');
      setError(errorMsg || 'Failed to add bot');
    }
  }, [searchParams]);

  const fetchChannels = async (gid: string) => {
    setLoading(true);
    setError('');

    try {
      const bot = await fetch('/api/discord/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'get_channels',
          guildId: gid,
        }),
      });

      // If test endpoint doesn't support channel fetching, try direct bot client
      // For now, we'll use a simpler approach - just enter channel ID manually
      setError('Please enter a channel ID manually (right-click channel in Discord → Copy Channel ID)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch channels');
    } finally {
      setLoading(false);
    }
  };

  const handleSendTest = async () => {
    if (!selectedChannel || !testMessage) {
      setError('Please enter both channel ID and message');
      return;
    }

    setSendingTest(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/discord/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: selectedChannel,
          message: testMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`✅ Message sent! Message ID: ${data.messageId}`);
      } else {
        setError(data.error || 'Failed to send message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send test message');
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui' }}>
      <h1 style={{ color: '#5865f2' }}>Discord Setup</h1>

      {/* Step 1: Add Bot */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Step 1: Add Bot to Your Server</h2>
        <p>Click the button below to add the bot to your Discord server:</p>
        <a
          href="/api/discord/login?returnTo=/discord-setup"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#5865f2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            marginTop: '10px',
          }}
        >
          🤖 Add Bot to Server
        </a>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div style={{
          padding: '15px',
          background: '#d1fae5',
          border: '1px solid #10b981',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#065f46',
        }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{
          padding: '15px',
          background: '#fee',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#991b1b',
        }}>
          {error}
        </div>
      )}

      {/* Step 2: Get Channel ID */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Step 2: Get Channel ID</h2>
        <ol style={{ lineHeight: '1.8' }}>
          <li>In Discord: <strong>Settings → Advanced → Enable Developer Mode</strong></li>
          <li>Right-click the channel (e.g., #general) where you want to send messages</li>
          <li>Click <strong>"Copy Channel ID"</strong></li>
          <li>Paste it below</li>
        </ol>

        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Channel ID:
          </label>
          <input
            type="text"
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            placeholder="Paste channel ID here (e.g., 1234567890123456789)"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* Step 3: Test */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h2>Step 3: Send Test Message</h2>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Test Message:
          </label>
          <textarea
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <button
          onClick={handleSendTest}
          disabled={sendingTest || !selectedChannel || !testMessage}
          style={{
            padding: '12px 24px',
            background: selectedChannel && testMessage ? '#5865f2' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: selectedChannel && testMessage ? 'pointer' : 'not-allowed',
            fontSize: '14px',
          }}
        >
          {sendingTest ? 'Sending...' : '📤 Send Test Message'}
        </button>
      </div>

      {/* Usage Info */}
      <div style={{ marginTop: '30px', padding: '20px', background: '#fffbeb', borderRadius: '8px' }}>
        <h3>✨ What's Next?</h3>
        <p>After the test message works, you can use the API endpoint to send messages programmatically:</p>
        <pre style={{
          marginTop: '10px',
          padding: '15px',
          background: '#fff',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px',
        }}>
{`curl -X POST ${typeof window !== 'undefined' ? window.location.origin : ''}/api/discord/test \\
  -H "Content-Type: application/json" \\
  -d '{
    "channelId": "${selectedChannel || 'YOUR_CHANNEL_ID'}",
    "message": "Your message here"
  }'`}
        </pre>
      </div>
    </div>
  );
}
