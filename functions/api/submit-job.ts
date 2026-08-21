interface Env {
  // Add any environment variables here if needed
}

interface JobSubmission {
  name: string;
  company: string;
  town: string;
  weeklyJob: string;
  email: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  try {
    const data: JobSubmission = await context.request.json();

    // Validate required fields
    if (!data.name || !data.company || !data.town || !data.weeklyJob || !data.email) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Email anders@a7.team with the submission
    const emailBody = `
One Job Agent Request

Name: ${data.name}
Company: ${data.company}
Town: ${data.town}
The weekly job: ${data.weeklyJob}
Email: ${data.email}

Submitted from a7.team/one-job
    `.trim();

    // Send email using Cloudflare's MailChannels (available on Pages)
    const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'anders@a7.team' }],
          },
        ],
        from: {
          email: 'noreply@a7.team',
          name: 'a7.team Form',
        },
        subject: 'One Job Agent Request',
        content: [
          {
            type: 'text/plain',
            value: emailBody,
          },
        ],
      }),
    });

    if (!emailResponse.ok) {
      console.error('Email send failed:', await emailResponse.text());
      return new Response(JSON.stringify({ error: 'Failed to send' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
