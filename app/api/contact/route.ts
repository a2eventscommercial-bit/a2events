import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'A² Events <noreply@a2events.dz>',
      to: ['contact@a2events.dz'],
      replyTo: email,
      subject: `Nouveau message de ${name} — A² Events`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 40px;">
          <div style="border-top: 4px solid #CC0000; padding-top: 24px; margin-bottom: 32px;">
            <h1 style="color: #CC0000; font-size: 24px; margin: 0 0 8px 0;">A² Events</h1>
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin: 0;">Nouveau message reçu</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 30%;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #CC0000;">${email}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff;">${phone}</td>
            </tr>
            ` : ''}
            ${service ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff;">${service}</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 32px; padding: 24px; background: #111; border-left: 3px solid #CC0000;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">Message</p>
            <p style="color: #eee; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #222; text-align: center;">
            <p style="color: #444; font-size: 11px;">© ${new Date().getFullYear()} A² Events — Alger, Algérie</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
