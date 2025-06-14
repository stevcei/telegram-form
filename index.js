const https = require('https');

const TELEGRAM_TOKEN = '7665929910:AAGejxbAgfw2a0oHpjJyzZC6XCXejFTkefI';
const CHAT_ID = '7736182876';

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Méthode non autorisée');
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    // Parse les données du formulaire (x-www-form-urlencoded)
    const params = new URLSearchParams(body);
    const message = params.get('message') || 'Message vide';

    const text = encodeURIComponent(`Formulaire reçu: ${message}`);

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

    https.get(url, (telegramRes) => {
      if (telegramRes.statusCode === 200) {
        res.status(200).send('Message envoyé sur Telegram');
      } else {
        res.status(500).send('Erreur lors de l\'envoi à Telegram');
      }
    }).on('error', () => {
      res.status(500).send('Erreur réseau');
    });
  });
};