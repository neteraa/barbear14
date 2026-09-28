# ⚡ Configuração Rápida - 5 Minutos

## 🎯 Checklist de Personalização Essencial

### 1. ☎️ NÚMERO DO WHATSAPP (OBRIGATÓRIO)

**Arquivo:** `script.js` - Linha 133

```javascript
// ANTES:
const whatsappNumber = '5511999999999';

// DEPOIS (exemplo com número real):
const whatsappNumber = '5511987654321';
```

**Formato:** 55 (Brasil) + DDD + Número (sem espaços ou caracteres)

---

### 2. 📍 ENDEREÇO E CONTATO

**Arquivo:** `index.html` - Seção `<section id="contato">`

Procure por:
```html
<p>Rua Exemplo, 123<br>Centro - São Paulo, SP</p>
```

E substitua pelo endereço real.

Também atualize:
- Telefone: `(11) 99999-9999`
- E-mail: `contato@barbear14.com.br`

---

### 3. 🗺️ MAPA DO GOOGLE

**Arquivo:** `index.html` - Procure por `<iframe src=`

**Como obter o código correto:**

1. Vá para: https://www.google.com/maps
2. Digite o endereço da barbearia
3. Clique em **"Compartilhar"**
4. Selecione **"Incorporar um mapa"**
5. Copie o código `<iframe>` completo
6. Substitua no HTML

---

### 4. 💰 PREÇOS DOS SERVIÇOS (Opcional)

**Arquivo:** `index.html` - Seção `<section id="servicos">`

Procure pelos cards de serviço e atualize:

```html
<h3>Corte Tradicional</h3>
<p>Corte clássico com técnicas refinadas</p>
<span class="servico-preco">R$ 35,00</span>  <!-- ALTERE AQUI -->
```

**IMPORTANTE:** Também atualize no `<select id="servico">` da seção de agendamento!

---

### 5. 🌐 REDES SOCIAIS

**Arquivo:** `index.html` - Seção `<footer>`

Procure por:
```html
<a href="#" aria-label="Instagram">  <!-- Coloque o link do Instagram -->
<a href="#" aria-label="Facebook">   <!-- Coloque o link do Facebook -->
```

Substitua `#` pelos links reais:
```html
<a href="https://instagram.com/barbear14" aria-label="Instagram">
<a href="https://facebook.com/barbear14" aria-label="Facebook">
```

---

## 🕐 HORÁRIOS DE FUNCIONAMENTO

### No site (visual):

**Arquivo:** `index.html` - Seção `class="horarios-info"`

```html
<span class="hora">09:00 - 19:00</span>  <!-- Segunda a Sexta -->
<span class="hora">09:00 - 17:00</span>  <!-- Sábado -->
```

### No sistema de agendamento:

**Arquivo:** `script.js` - Linha 34

```javascript
const horarios = {
    'seg-sex': [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30'
    ],
    'sab': [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ],
    'dom': [] // Fechado
};
```

**Exemplo de horário sem almoço:**
```javascript
'seg-sex': [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00'
]
```

---

## 📱 Como Testar

1. **Abra o site no navegador**
2. **Preencha o formulário de agendamento**
3. **Clique em "Confirmar Agendamento via WhatsApp"**
4. **Verifique se abre o WhatsApp com a mensagem formatada**

### ⚠️ Atenção

Se você testar com o número padrão `5511999999999`, a mensagem não será entregue!

---

## 🎨 Personalizações Avançadas (Opcional)

### Mudar Cores do Site

**Arquivo:** `styles.css` - Linhas 1-10

```css
:root {
    --primary: #d4af37;    /* Dourado - cor principal */
    --secondary: #16213e;  /* Azul escuro */
    --dark: #0f1419;       /* Quase preto */
    /* ... */
}
```

### Adicionar Novo Serviço

1. **No HTML** - Copie um card existente e adapte
2. **No Select** - Adicione uma nova `<option>` no formulário
3. **No JS** - A função `agendarServico()` já funciona automaticamente

---

## ✅ Teste Final

- [ ] Mensagem do WhatsApp abre corretamente
- [ ] Número está certo (envie uma mensagem de teste)
- [ ] Todos os horários estão corretos
- [ ] Endereço atualizado
- [ ] Mapa mostra o local certo
- [ ] Links de redes sociais funcionam
- [ ] Preços estão corretos
- [ ] Site funciona no celular

---

## 🚀 Pronto para Apresentar!

Depois dessas configurações, o site está 100% funcional e pronto para uso!

**Dica:** Abra em modo anônimo do navegador para ver como o cliente verá.
