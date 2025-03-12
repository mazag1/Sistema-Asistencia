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

    return estudiantes.length > 0 ? estudiantes[0] : null;
};

// Crear un nuevo estudiante (se inserta en persona y luego en estudiante)
const crear = async (data) => {
    const { dni, nombre, apellido_paterno, apellido_materno, telefono, direccion, foto, email, fecha_nacimiento, grado, seccion } = data;
    
    // Insertar en persona
    const personaData = { dni, nombre, apellido_paterno, apellido_materno, telefono, direccion, foto, email, fecha_nacimiento, tipo: 'estudiante' };
    const personaResult = await crudUtils.insert(TABLA_PERSONA, personaData);
    
    // Insertar en estudiante con el ID de persona
    const estudianteData = { persona_id: personaResult.insertId, grado, seccion };
    return await crudUtils.insert(TABLA_ESTUDIANTE, estudianteData);
};

// Actualizar datos de un estudiante
const actualizar = async (id, data) => {
    const { grado, seccion, ...personaData } = data;
    
    // Actualizar en persona
    await crudUtils.update(TABLA_PERSONA, personaData, { id });

    // Actualizar en estudiante
    return await crudUtils.update(TABLA_ESTUDIANTE, { grado, seccion }, { persona_id: id });
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
