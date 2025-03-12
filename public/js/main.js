// Función para inicializar DataTable de manera dinámica
function inicializarDataTable(tablaId, dataUrl, columnsConfig) {
    const tableElement = document.getElementById(tablaId);
    if (!tableElement) {
        console.error(`No se encontró la tabla con ID: ${tablaId}`);
        return;
    }

    const table = new DataTable(`#${tablaId}`, {
        responsive: true,
        orderCellsTop: true,
        fixedHeader: true,
        ajax: {
            url: dataUrl,
            dataSrc: ''
        },
        columns: columnsConfig,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/es-MX.json'
        }
    });

    // Recargar datos después de 3 segundos (solo para prueba)
    setTimeout(() => {
        table.ajax.reload();
    }, 3000);
}

// Función para eliminar estudiante/profesor dinámicamente
function eliminarRegistro(id, tipo) {
    if (confirm(`¿Seguro que deseas eliminar este ${tipo}?`)) {
        fetch(`/api/${tipo}/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                document.querySelector(`#${tipo}Table`).DataTable().ajax.reload();
            })
            .catch(error => console.error('Error:', error));
    }
}

// Delegar evento a botones de eliminación
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("eliminar-registro")) {
        const id = event.target.dataset.id;
        const tipo = event.target.dataset.tipo;
        eliminarRegistro(id, tipo);
    }
});


const form = document.getElementById('registroForm'); // Usa el mismo ID de formulario para ambas entidades

if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const id = document.getElementById('id').value;
        const entity = form.dataset.entity; // "estudiantes" o "profesores"

        // Construimos el objeto dinámicamente
        const formData = {};
        form.querySelectorAll('input, select').forEach(input => {
            if (input.name) {
                formData[input.name] = input.value.trim();
            }
        });

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/${entity}/${id}` : `/api/${entity}`;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || `${entity} guardado correctamente.`);
                window.location.href = `/${entity}`;
            } else {
                alert('Error: ' + (result.error || 'No se pudo procesar la solicitud.'));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}