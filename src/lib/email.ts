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
      from: `"Site 4Core" <comercial@4core.site>`,
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

/**
 * Envia um e-mail rico e formatado para o lead que baixou um material.
 */
function buildLeadMagnetHtml(name: string): string {
  // force turbopack cache rebuild
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-top: 40px; margin-bottom: 40px;">
        
        <!-- Header -->
        <div style="background-color: #28044F; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Seu material chegou! 📄</h1>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1e293b; font-size: 20px; font-weight: 700; margin-top: 0;">Olá, ${name}.</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Ficamos felizes com o seu interesse em garantir a conformidade da sua empresa! Entendemos que as exigências da Portaria 671 MTP podem ser confusas.
          </p>
          
          <div style="background-color: #f1f5f9; border-left: 4px solid #7c3aed; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
            <p style="color: #334155; margin: 0; font-size: 15px; font-weight: 500;">
              Você sabia que 7.3 em cada 10 empresas sofrem com apontamentos incorretos por culpa dos relógios REP desatualizados?
            </p>
          </div>

          <h3 style="color: #1e293b; font-size: 18px; margin-bottom: 16px;">Como podemos ajudar:</h3>
          <ul style="color: #475569; font-size: 15px; line-height: 1.6; padding-left: 20px; margin-bottom: 30px;">
            <li style="margin-bottom: 8px;"><strong>Relógios Homologados (REP-C / REP-P):</strong> Equipamentos focados em segurança jurídica.</li>
            <li style="margin-bottom: 8px;"><strong>Software em Nuvem (TopPonto):</strong> Geração de AFDT e ACJEF em compliance total com os relatórios do INPI.</li>
            <li style="margin-bottom: 8px;"><strong>Controle de Acesso:</strong> Catracas físicas e integração de reconhecimento facial ultra-rápido.</li>
          </ul>

          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
            Estamos anexando o material completo sobre a Portaria 671 caso queira salvar. Se você sentiu que precisa modernizar as operações da sua empresa para se blindar de multas...
          </p>

          <div style="text-align: center; margin-bottom: 20px;">
            <a href="https://wa.me/5541988035657?text=Ol%C3%A1%2C%20vim%20pelo%20material%20da%20Portaria%20671.%20Quero%20falar%20com%20o%20especialista!" 
               style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 16px 32px; font-weight: bold; border-radius: 8px; font-size: 16px;">
              Falar com o Comercial (WhatsApp)
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="color: #64748b; font-size: 13px; margin: 0;">
            4Core | Soluções em Ponto e Acesso<br>
            Equipamentos com certificação ISO 9001 e Portaria 671 MTE.
          </p>
        </div>

      </div>
    </body>
    </html>
  `
}

export async function sendLeadMagnetEmail(
  data: ContactFormValues
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: `"4Core Consultoria" <comercial@4core.site>`,
      to: data.email,
      subject: `O Guia Portaria 671 da 4Core chegou!`,
      html: buildLeadMagnetHtml(data.name),
    })

    return { success: true }
  } catch (error) {
    console.error('[email] Erro ao enviar e-mail para o Lead:', error)
    return {
      success: false,
      error: 'Falha ao enviar o material para o lead.',
    }
  }
}
