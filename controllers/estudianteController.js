import estudianteService from '../services/estudianteService.js';

const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await estudianteService.obtenerTodos();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};

const obtenerEstudiantePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estudiante = await estudianteService.obtenerPorId(id);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
};

const registrarEstudiante = async (req, res) => {
    try {
        const nuevoEstudiante = await estudianteService.crear(req.body);
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el estudiante' });
    }
};

const actualizarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const estudianteActualizado = await estudianteService.actualizar(id, req.body);
        if (!estudianteActualizado) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(estudianteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};

const eliminarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await estudianteService.eliminar(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
};

export default {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};
