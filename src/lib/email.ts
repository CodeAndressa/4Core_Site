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
 * Template simples e direto conforme solicitado.
 */
function buildEmailHtml(data: ContactFormValues): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #28044F; margin-bottom: 20px;">Site 4Core</h2>
        <p style="margin-bottom: 20px;">Recebemos um novo cadastro via site.</p>
        
        <p style="margin: 5px 0;"><strong>Nome:</strong> ${data.name}</p>
        ${data.company ? `<p style="margin: 5px 0;"><strong>Nome empresa:</strong> ${data.company}</p>` : ''}
        <p style="margin: 5px 0;"><strong>Telefone:</strong> ${data.phone}</p>
        <p style="margin: 5px 0;"><strong>E-mail:</strong> ${data.email}</p>
        ${data.employees ? `<p style="margin: 5px 0;"><strong>Nº de Funcionários:</strong> ${data.employees}</p>` : ''}
        ${data.message ? `<p style="margin: 15px 0 5px;"><strong>Mensagem:</strong></p><p style="margin: 5px 0;">${data.message}</p>` : ''}
      </div>
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
      from: `"Site 4Core" <noreply@4core.site>`,
      to: contactEmail,
      replyTo: data.email,
      subject: `Novo lead - Site 4Core`,
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
