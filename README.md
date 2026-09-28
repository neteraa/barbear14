# 🔵 Barbearia Jorge Rodrigues - Site Completo

Site profissional e responsivo para barbearia com sistema de agendamento e **programa de fidelidade digital**.

## ✨ Funcionalidades

- ✅ **Design Moderno e Profissional** - Inspirado nas cores do logo (azul escuro e dourado)
- ✅ **100% Responsivo** - Perfeito em celular, tablet e desktop
- ✅ **Sistema de Agendamento** - Integrado com WhatsApp
- ✅ **Programa de Fidelidade Digital** 🔥 - Sistema de pontos e recompensas
- ✅ **Botão WhatsApp Flutuante** - Para contato rápido
- ✅ **Calendário Inteligente** - Horários disponíveis por dia da semana
- ✅ **Animações Suaves** - Experiência de usuário profissional
- ✅ **SEO Otimizado** - Pronto para Google

## 🎨 Seções

1. **Hero** - Apresentação impactante com logo
2. **Sobre** - História e estatísticas da barbearia
3. **Serviços** - 5 serviços com preços e botão de agendamento
4. **Fidelidade** 🎁 - Programa de pontos, prêmios e FAQ completo
5. **Agendamento** - Formulário completo integrado com WhatsApp
6. **Contato** - Informações atualizadas e mapa do Google
7. **Footer** - Redes sociais e informações

## 🚀 Como Usar

### 1. Personalizar Número do WhatsApp

Abra o arquivo `script.js` e localize a linha 172:

```javascript
const whatsappNumber = '5515999999999'; // Formato: 55 + DDD + Número (DDD 15 = Itapeva/SP)
```

**Altere para o número real da barbearia:**
```javascript
const whatsappNumber = '5515987654321'; // Exemplo: DDD 15 + número
```

**IMPORTANTE:** O número também precisa ser alterado em 2 lugares:
- Linha 172 (agendamento)
- Linha 349 (ativação do cartão fidelidade)

### 2. Atualizar Informações de Contato

No arquivo `index.html`, procure pela seção `#contato` e atualize:

- 📍 Endereço
- 📱 Telefone
- 📧 E-mail
- 🌐 Links de redes sociais

### 3. Ajustar Horários de Funcionamento

No arquivo `script.js`, localize o objeto `horarios` (linha 34):

```javascript
const horarios = {
    'seg-sex': ['09:00', '09:30', '10:00', ...],
    'sab': ['09:00', '09:30', ...],
    'dom': []
};
```

Adicione ou remova horários conforme necessário.

### 4. Personalizar Serviços e Preços

No arquivo `index.html`, localize a seção `#servicos` e edite:
- Nome do serviço
- Descrição
- Preço
- Emoji/ícone

### 5. Atualizar Endereço no Mapa

No arquivo `index.html`, procure pelo iframe do Google Maps e substitua pelo link do endereço correto:

```html
<iframe src="SEU_LINK_DO_GOOGLE_MAPS_AQUI" ...>
```

**Como obter o link:**
1. Acesse [Google Maps](https://maps.google.com)
2. Procure o endereço da barbearia
3. Clique em "Compartilhar" > "Incorporar um mapa"
4. Copie o código iframe

## 📱 Responsividade

O site se adapta automaticamente para:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1920px+)

## 🎯 Testes Antes de Apresentar

### Checklist:

- [ ] Testar número do WhatsApp (enviar mensagem de teste)
- [ ] Verificar se todos os horários estão corretos
- [ ] Testar formulário em celular e desktop
- [ ] Verificar se o menu mobile funciona
- [ ] Confirmar informações de contato
- [ ] Testar links de redes sociais
- [ ] Verificar responsividade em diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

- HTML5 puro
- CSS3 com variáveis e animações
- JavaScript vanilla (sem frameworks)
- Google Fonts (Playfair Display + Montserrat)
- Sem dependências externas

## 📊 Como Hospedar

### Opção 1: Vercel (Recomendado - Grátis)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale o Vercel CLI: `npm i -g vercel`
3. Na pasta do projeto: `vercel`
4. Siga as instruções

### Opção 2: Netlify (Grátis)

1. Crie uma conta em [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para o painel
3. Site no ar!

### Opção 3: GitHub Pages (Grátis)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Site publicado!

## 💡 Dicas para Apresentação

1. **Mostre a versão mobile primeiro** - A maioria dos clientes usará celular
2. **Demonstre o agendamento** - Preencha o formulário e mostre a mensagem no WhatsApp
3. **Destaque a facilidade** - Não precisa de aplicativo, funciona no navegador
4. **Mencione a expansibilidade** - Pode adicionar mais funcionalidades depois

## 🔮 Próximas Melhorias (Pós-venda)

- Sistema de gestão de agendamentos (admin panel)
- Confirmação automática via WhatsApp Business API
- Integração com Google Calendar
- Notificações por SMS
- Sistema de fidelidade
- Galeria de trabalhos (antes/depois)
- Avaliações de clientes

## 📞 Suporte

Para dúvidas ou melhorias, entre em contato!

---

**Desenvolvido com 💈 e ❤️**
