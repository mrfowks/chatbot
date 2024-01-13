const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo','quiero hacer un pedido','buenas noches','buenas tardes','señito','seño','sánguche','atendiendo','atiende'])
.addAnswer(['🍔🍗🍟 ¡Bienvenido a *Fuente de Soda Marita!*','Descubre el placer de nuestras ricas *hamburguesas, broaster y salchipapas.*',])
.addAnswer('¿deseas hacer algun pedido?')
    .addAnswer('Escribe *SI* para realizar tu pedido',{capture:true},(ctx) => {
        console.log('Mensaje entrante: ',ctx.body)
    })
    .addAnswer('*Tenemos disponible los siguientes platillos:*')
    .addAnswer(
        [
            '🍗*Broaster:* incluye 🍟papas, 🥗ensada y 🥫cremas.',
            'Alitas',
            'Pierna',
            'Pecho',
            'Encuentro',
            'Alitas acevichadas'
        ]
    )
    .addAnswer(
        [
            '🍔*Hamburguesas:* incluye 🍟papas, 🥗ensada y 🥫cremas.',
            'Clásica de Carne',
            'Clásica de Fil. de Pollo',
            'Sandwich de Pollo desh.',
            'Hamburguesa de Chorizo',
            'Royal de Carne o Pollo',
            'Club Sandwich'
        ]
    )
    .addAnswer(
        [
            '🍟*Salchipapas:* incluye 🍟papas, 🥗ensada y 🥫cremas.',
            'Salchipapa Crispy',
            'Salchipapa crispy a lo pobre'
        ]
    )
    .addAnswer('¡Simplemente escribe *Pedir* y nos encargaremos!',{capture:true},(ctx) => {
        console.log('Mensaje entrante: ',ctx.body)
    })
    .addAnswer('¿Qué te gustaría pedir y en qué cantidad?')
    .addAnswer('¿Hay alguna preferencia que debamos tener en cuenta, como salsas, cremas o algún otro detalle?')
    .addAnswer('Su dirección completa?')
    .addAnswer('¿Cómo te gustaría realizar el pago? efectivo, tarjeta, Plim o Yape?')
    
    
    const main = async () => {
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipal])
        const adapterProvider = createProvider(BaileysProvider)
    
        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })
    
        QRPortalWeb()
    }
    
    main()
