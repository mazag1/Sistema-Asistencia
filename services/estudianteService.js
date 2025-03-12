import { crudUtils } from '../database/dbUtils.js';

const TABLA_PERSONA = 'persona';
const TABLA_ESTUDIANTE = 'estudiante';

// Obtener todos los estudiantes con datos de persona
const obtenerTodos = async () => {
    return await crudUtils.query(`
        SELECT p.id, p.dni, p.nombre, p.apellido_paterno, p.apellido_materno, 
               p.telefono, p.direccion, p.foto, p.email, p.fecha_nacimiento, 
               e.grado, e.seccion
        FROM persona p
        JOIN estudiante e ON p.id = e.persona_id
    `);
};

// Obtener un estudiante por ID
const obtenerPorId = async (id) => {
    const estudiantes = await crudUtils.query(`
        SELECT p.id, p.dni, p.nombre, p.apellido_paterno, p.apellido_materno, 
               p.telefono, p.direccion, p.foto, p.email, p.fecha_nacimiento, 
               e.grado, e.seccion
        FROM persona p
        JOIN estudiante e ON p.id = e.persona_id
        WHERE p.id = ?
    `, [id]);

    if (estudiantes.length > 0) {
        const estudiante = estudiantes[0];
        // Formatear la fecha de nacimiento si no es null
        if (estudiante.fecha_nacimiento) {
            estudiante.fecha_nacimiento = new Date(estudiante.fecha_nacimiento).toISOString().split('T')[0];
        }
        return estudiante;
    }
    return null;
};


// Crear un nuevo estudiante
const crear = async (data) => {
    console.log("Datos recibidos en estudianteService:", data);

    const { dni, nombre, apellido_paterno, apellido_materno, telefono, direccion, email, fecha_nacimiento, grado, seccion, foto } = data;

    // Insertar en persona
    const personaData = { 
        dni, 
        nombre, 
        apellido_paterno, 
        apellido_materno, 
        telefono, 
        direccion, 
        email, 
        fecha_nacimiento, 
        tipo: 'estudiante',
        foto: foto || null // Guarda la imagen solo si existe
    };

    try {
        const personaResult = await crudUtils.insert(TABLA_PERSONA, personaData);
        console.log("Resultado de inserción en persona:", personaResult);

        // Insertar en estudiante con el ID de persona
        const estudianteData = { persona_id: personaResult.insertId, grado, seccion };
        const estudianteResult = await crudUtils.insert(TABLA_ESTUDIANTE, estudianteData);

        console.log("Resultado de inserción en estudiante:", estudianteResult);

        return estudianteResult;
    } catch (error) {
        console.error("Error en estudianteService.crear:", error);
        throw error;
    }
};

// Actualizar datos de un estudiante
const actualizar = async (id, data) => {
    console.log("Datos recibidos en actualizar:", data);

    const { grado, seccion, foto, ...personaData } = data;

    try {
        // Si hay una nueva foto, actualizarla
        if (foto) {
            personaData.foto = foto;
        }

        // Actualizar en persona
        await crudUtils.update(TABLA_PERSONA, personaData, { id });

        // Actualizar en estudiante
        return await crudUtils.update(TABLA_ESTUDIANTE, { grado, seccion }, { persona_id: id });
    } catch (error) {
        console.error("Error en estudianteService.actualizar:", error);
        throw error;
    }
};

// Eliminar estudiante (primero de estudiante, luego de persona)
const eliminar = async (id) => {
    await crudUtils.delete(TABLA_ESTUDIANTE, { persona_id: id }); // Eliminar de estudiante
    return await crudUtils.delete(TABLA_PERSONA, { id }); // Luego de persona
};

export default {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
