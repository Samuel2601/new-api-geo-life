
var mongoose = require('mongoose');

const Model = require('../models/Model');

// Función para listar usuarios con opción de búsqueda por filtros
const listarUsuarios = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var usuarios = await Model.Usuario.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: usuarios });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de usuarios', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar actividades de proyecto con opción de búsqueda por filtros
const listarActividadesProyecto = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var actividadesProyecto = await Model.Ficha_sectorial.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: actividadesProyecto });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de actividades de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar incidentes o denuncias con opción de búsqueda por filtros
const listarIncidentesDenuncias = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var incidentesDenuncias = await Model.Incidentes_denuncia.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: incidentesDenuncias });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de incidentes/denuncias', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar categorías con opción de búsqueda por filtros
const listarCategorias = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var categorias = await Model.Categoria.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: categorias });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de categorías', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar subcategorías con opción de búsqueda por filtros
const listarSubcategorias = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var subcategorias = await Model.Subcategoria.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: subcategorias });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de subcategorías', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar encargados de categorías con opción de búsqueda por filtros
const listarEncargadosCategorias = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var encargadosCategorias = await Model.Encargado_categoria.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: encargadosCategorias });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de encargados de categorías', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar roles de usuario con opción de búsqueda por filtros
const listarRolesUsuarios = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var rolesUsuarios = await Model.Rol_user.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: rolesUsuarios });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de roles de usuarios', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

const listarPermisos = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var permisos = await Model.Permiso.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: permisos });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de permisos', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar estados de incidente con opción de búsqueda por filtros
const listarEstadosIncidentes = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var estadosIncidentes = await Model.Estado_incidente.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: estadosIncidentes });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de estados de incidentes', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar estados de actividad de proyecto con opción de búsqueda por filtros
const listarEstadosActividadesProyecto = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var estadosActividadesProyecto = await Model.Estado_actividad_proyecto.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: estadosActividadesProyecto });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de estados de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar tipos de actividad de proyecto con opción de búsqueda por filtros
const listarTiposActividadesProyecto = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var tiposActividadesProyecto = await Model.Actividad_proyecto.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: tiposActividadesProyecto });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de tipos de actividades de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para listar direcciones geográficas con opción de búsqueda por filtros
const listarDireccionesGeo = async function (req, res) {
    if (req.user) {
        try {
            const { campo, valor } = req.body;
            let filtroConsulta = {};
            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }
            var direccionesGeo = await Model.Direccion_geo.find(filtroConsulta).sort({ createdAt: -1 });
            res.status(200).send({ data: direccionesGeo });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de direcciones geográficas', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

module.exports = {
    listarUsuarios,
    listarActividadesProyecto,
    listarIncidentesDenuncias,
    listarCategorias,
    listarSubcategorias,
    listarEncargadosCategorias,
    listarRolesUsuarios,
    listarEstadosIncidentes,
    listarEstadosActividadesProyecto,
    listarTiposActividadesProyecto,
    listarDireccionesGeo,
    listarPermisos
};
