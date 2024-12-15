import { toast } from "@/components/ui/use-toast";

interface EmailData {
  to: string;
  name: string;
  planName: string;
  price: number;
  dueDate: string;
  period: string;
}

export const sendPaymentEmail = async (emailData: EmailData) => {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: emailData.to }],
          dynamic_template_data: {
            name: emailData.name,
            plan_name: emailData.planName,
            price: emailData.price.toFixed(2),
            due_date: emailData.dueDate,
            period: emailData.period
          },
        }],
        from: { email: "academia@exemplo.com", name: "Academia Fitness" },
        template_id: "d-your-template-id", // Você precisará criar um template no SendGrid
        subject: "Mensalidade Academia Fitness"
      }),
    });

    if (!response.ok) {
      throw new Error('Falha ao enviar e-mail');
    }

    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    toast({
      title: "Erro ao enviar e-mail",
      description: "Não foi possível enviar o e-mail de cobrança.",
      variant: "destructive",
    });
    return false;
  }
};