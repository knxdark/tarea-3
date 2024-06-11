// script.js

document.addEventListener('DOMContentLoaded', function () {
    const contactList = document.getElementById('contacts');
    const contactForm = document.getElementById('contact-form');

    // Función para obtener y mostrar contactos
    async function fetchContacts() {
        try {
            const response = await fetch('http://www.raydelto.org/agenda.php');
            const contacts = await response.json();

            // Limpiar la lista actual
            contactList.innerHTML = '';

            // Poblar la lista con los contactos obtenidos
            contacts.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
                li.classList.add('list-group-item');
                contactList.appendChild(li);
            });
        } catch (error) {
            console.error('Error al obtener los contactos:', error);
        }
    }

    // Obtener contactos al cargar la página
    fetchContacts();

    // Función para agregar un nuevo contacto
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const newContact = {
            nombre: contactForm.nombre.value,
            apellido: contactForm.apellido.value,
            telefono: contactForm.telefono.value
        };

        try {
            const response = await fetch('http://www.raydelto.org/agenda.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            });

            if (response.ok) {
                // Limpiar el formulario
                contactForm.reset();
                // Obtener y mostrar la lista de contactos actualizada
                fetchContacts();
            } else {
                console.error('Error al agregar el contacto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar el contacto:', error);
        }
    });
});
