import React, { useState } from 'react';
import { Log } from 'Logging Middleware/logging';

const SHORT_DOMAIN = 'http://short.url/';

function randomCode(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

const App: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl('');
    setError('');

    if (!longUrl || !/^https?:\/\/\S+$/.test(longUrl)) {
      setError('Please enter a valid URL.');
      await Log(
        'ShortenURL/Validation',
        'warn',
        'url-shortener-frontend',
        'User entered invalid URL'
      );
      return;
    }

    const code = randomCode();
    const newShortUrl = SHORT_DOMAIN + code;
    setShortUrl(newShortUrl);

    await Log(
      'ShortenURL/Success',
      'info',
      'url-shortener-frontend',
      `Shortened ${longUrl} to ${newShortUrl}`
    );
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleShorten}>
        <input
          type="url"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          style={{ width: '80%', padding: 8 }}
          required
        />
        <button type="submit" style={{ padding: 8, marginLeft: 10 }}>Shorten</button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: 20 }}>
          <strong>Shortened URL: </strong>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
      {error && (
        <div style={{ color: 'red', marginTop: 20 }}>{error}</div>
      )}
    </div>
  );
};

export default App;
