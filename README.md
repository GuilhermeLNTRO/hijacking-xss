# 🕵️ Session Hijacking: Uma Demonstração Educativa

Bem-vindo ao Laboratório de Sequestro de Sessão. Este projeto demonstra como hackers podem roubar sua identidade online sem precisar da sua senha.

## 🍎 A Analogia da Pulseira da Balada
Imagine que você vai a uma festa exclusiva.
1. Na entrada, o segurança checa seu RG (Login/Senha).
2. Ele te dá uma **pulseira VIP** (Session ID / Cookie).
3. Agora, você pode entrar e sair, pedir bebidas e ir ao banheiro apenas mostrando a pulseira. O segurança não pede seu RG de novo.

**O Ataque (Hijacking):**
Se um ladrão arrancar a pulseira do seu braço e colocar no dele, ele pode pedir bebidas na sua conta. O segurança acha que o ladrão é você, porque a pulseira é válida. Ele não precisa saber seu nome nem seu RG, só precisa da pulseira.

Na web, essa "pulseira" é chamada de **Cookie de Sessão**.

## 💻 Como funciona este projeto?
1. **O Usuário Legítimo:** Faz login e ganha um "Cookie".
2. **O Atacante:** Usa um script malicioso (XSS) para ler esse Cookie e enviá-lo para o servidor dele.
3. **O Resultado:** O atacante agora tem acesso à conta sem saber a senha.

## 🛡️ Como se proteger?
* **Sites:** Devem usar flags `HttpOnly` (impede que scripts leiam cookies) e `Secure` (só trafega em HTTPS).
* **Usuários:** Não cliquem em links suspeitos e usem HTTPS.
