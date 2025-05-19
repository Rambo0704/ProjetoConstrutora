

from django.core.mail import send_mail
from django.conf import settings

def enviar_email_automatico(email):
    subject = "Bem-vindo!"
    message = "Obrigado por se cadastrar! Recebemos sua mensagem,em breve nossa equipe entrar em contato com você."
    from_email = settings.EMAIL_HOST_USER

    try:
        send_mail(subject, message, from_email, [email])
        print(f"E-mail enviado para {email}")
    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")
