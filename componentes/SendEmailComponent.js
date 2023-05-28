import React from 'react';
import * as MailComposer from 'expo-mail-composer';

const EmailForm = () => {
    const enviarCorreo = () => {
        const emailData = {
            to: 'destinatario@example.com',
            subject: 'Asunto del correo',
            body: 'Contenido del correo'
        };

        MailComposer(emailData);
    };

    return (
        <div>
            <button onClick={enviarCorreo}>Enviar correo</button>
        </div>
    );
};

export default EmailForm;
