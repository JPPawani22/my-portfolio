import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: { json: () => PromiseLike<{ name: any; email: any; message: any; }> | { name: any; email: any; message: any; }; }) {
  const { name, email, message } = await request.json();

  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Your email where you want to receive messages
    subject: `New message from ${name} (${email})`,
    text: message,
    html: `
      <div>
        <h2>New message from your portfolio website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}