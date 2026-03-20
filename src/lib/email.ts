import nodemailer from 'nodemailer'
import type { ContactFormValues } from './validators'

/**
 * Configuração do transporter SMTP.
 * Usa variáveis de ambiente para as credenciais.
 * Em desenvolvimento, pode-se usar um serviço como Mailtrap ou Ethereal.
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

/**
 * Gera o HTML do e-mail de contato.
 * Template inline para evitar dependências externas.
 */
function buildEmailHtml(data: ContactFormValues): string {
  const rows = [
    { label: 'Nome', value: data.name },
    { label: 'E-mail', value: data.email },
    { label: 'Telefone', value: data.phone },
    ...(data.company ? [{ label: 'Empresa', value: data.company }] : []),
    ...(data.employees
      ? [{ label: 'Nº de Funcionários', value: data.employees }]
      : []),
    ...(data.message ? [{ label: 'Mensagem', value: data.message }] : []),
  ]

  const tableRows = rows
    .map(
      (row) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #DFCCFF; font-weight: 600; color: #28044F; width: 160px; vertical-align: top;">
          ${row.label}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #DFCCFF; color: #333;">
          ${row.value}
        </td>
      </tr>
    `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #F8F8F8; font-family: Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F8F8; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(40, 4, 79, 0.08);">
              <!-- Header -->
              <tr>
                <td style="background-color: #28044F; padding: 32px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 700;">
                    Novo Contato — 4Core
                  </h1>
                  <p style="margin: 8px 0 0; color: #DFCCFF; font-size: 14px;">
                    Um novo lead preencheu o formulário do site.
                  </p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #DFCCFF; border-radius: 6px; overflow: hidden;">
                    ${tableRows}
                  </table>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 40px 32px; text-align: center;">
                  <p style="margin: 0; color: #999; font-size: 12px;">
                    Este e-mail foi gerado automaticamente pelo site da 4Core.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

/**
 * Envia o e-mail de contato para o endereço configurado.
 * Retorna true se enviou com sucesso, false caso contrário.
 *
 * A interface é propositalmente simples para facilitar
 * a troca de provedor (ex: Resend) no futuro.
 */
export async function sendContactEmail(
  data: ContactFormValues
): Promise<{ success: boolean; error?: string }> {
  const contactEmail = process.env.CONTACT_EMAIL

  if (!contactEmail) {
    console.error('[email] CONTACT_EMAIL não configurado nas variáveis de ambiente.')
    return {
      success: false,
      error: 'Configuração de e-mail ausente no servidor.',
    }
  }

  try {
    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"Site 4Core" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: data.email,
      subject: `Novo contato: ${data.name}${data.company ? ` — ${data.company}` : ''}`,
      html: buildEmailHtml(data),
    })

    return { success: true }
  } catch (error) {
    console.error('[email] Erro ao enviar e-mail:', error)
    return {
      success: false,
      error: 'Falha ao enviar e-mail. Tente novamente mais tarde.',
    }
  }
}
