export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, business_name, email, phone, message, domain_status, botcheck } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const payload = {
    access_key: process.env.WEB3FORMS_KEY,
    subject: 'New Website Enquiry from RealFastWebsite',
    from_name: 'RealFastWebsite Enquiry',
    name,
    email,
    message,
    botcheck,
    ...(business_name && { business_name }),
    ...(phone && { phone }),
    ...(domain_status && { domain_status }),
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
