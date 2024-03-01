var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const Model = require('../models/Model');

// Función para registrar un nuevo usuario
const registrarUsuario = async function (req, res) {
    if (req.user) {
        try {
            var data = req.body;
            
            if(!data.rol_user){
                let rol_arr = await Model.Rol_user.find({ orden: { $gt: 3 } }).sort({orden:-1});
                if(!rol_arr){
                    let rol_arrc = await Model.Rol_user.create({nombre:'Ciudadano', orden: 4});
                    data.rol_user = rol_arrc._id;
                }else{
                    console.log(rol_arr);
                    data.rol_user = rol_arr[0]._id;
                }
            }
            
            var admin_arr = await Model.Usuario.find({ correo: data.correo });
            var admin_arr2 = await Model.Usuario.find({ cedula: data.cedula });

            if (admin_arr.length == 0 && admin_arr2.length == 0) {
                try {
                    bcrypt.hash(data.password, null, null, async function (err, hash) {
                        if (hash) {
                            data.password = hash;
                            data.estado = 'On';
                            console.log(data);
                            await Model.Usuario.create(data);
                            res.status(201).send({ message: 'Registrado con éxito' });
                        } else {
                            res.status(500).send({ message: 'ErrorServer' });
                        }
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ message: 'Algo salió mal' });
                }
            } else {
                res.status(409).send({ message: 'El correo y/o la cédula ya existe en la base de datos' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Algo salió mal' });
        }
    } else {
        res.status(401).send({ message: 'NoAccess' });
    }
};


// Función para registrar una nueva actividad de proyecto
const registrarActividadProyecto = async function (req, res) {
    if (req.user) {
        try {
            let nuevaActividad = await Model.Ficha_sectorial.create(req.body);
            res.status(200).send({ message: 'Actividad de proyecto registrada correctamente', data: nuevaActividad });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo incidente o denuncia
const registrarIncidenteDenuncia = async function (req, res) {
    if (req.user) {
        try {
            console.log("Body", req.body);
            var fotos = [];
            var index = 0;
            while (req.files['foto' + index]) {
                var file = req.files['foto' + index];
                var img_path = file.path;
                var name = img_path.split('/'); // usar / en producci�n \\ local
                var portada_name = name[2];
                fotos.push(portada_name);
                console.log("Foto", portada_name);
                index++;
            }
            if (fotos.length > 0) {
                req.body.foto = fotos;
            }
            let estado = await Model.Estado_incidente.findOne().sort({ orden: 1 });
            if (estado) {
                req.body.estado = estado._id;
                let nuevoIncidente = await Model.Incidentes_denuncia.create(req.body);
                res.status(200).send({ message: 'Incidente/denuncia registrado correctamente', data: nuevoIncidente });
            } else {
                res.status(500).send({ message: 'Error al registrar el incidente/denuncia', error: 'No se han registrado Estado de Incidencia' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error al registrar el incidente/denuncia', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};


// Función para registrar una nueva categoría
const registrarCategoria = async function (req, res) {
    if (req.user) {
        try {
            let data=req.body;
            let find = await Model.Categoria.find({nombre:data.nombre});
            if(find.length==0){
                let nuevaCategoria = await Model.Categoria.create(req.body);
                res.status(200).send({ message: 'Categoría registrada correctamente', data: nuevaCategoria });
            }else{
                res.status(500).send({ message: 'Ya registró la categoría', data: undefined  }); 
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar una nueva subcategoría
const registrarSubcategoria = async function (req, res) {
    if (req.user) {
        try {
            let data=req.body;
            let find = await Model.Subcategoria.find({nombre:data.nombre});
            if(find.length==0){
                let nuevaSubcategoria = await Model.Subcategoria.create(req.body);
                res.status(200).send({ message: 'Subcategoría registrada correctamente', data: nuevaSubcategoria });
            }else{
                res.status(500).send({ message: 'Ya registró la subcategoría', data: undefined  }); 
            }            
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la subcategoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo encargado de categoría
const registrarEncargadoCategoria = async function (req, res) {
    if (req.user) {
        try {
            let data=req.body;
            let find = await Model.Encargado_categoria.find({encargado:data.encargado,categoria:data.categoria});
            if(find.length==0){
                let nuevoEncargado = await Model.Encargado_categoria.create(req.body);
                res.status(200).send({ message: 'Encargado de categoría registrado correctamente', data: nuevoEncargado });    
            }else{
                res.status(500).send({ message: 'Ya registró esto', data: undefined  }); 
            }            
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el encargado de categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo rol de usuario
const registrarRolUsuario = async function (req, res) {
    if (req.user) {
        try {
            // Verificar si ya existe un rol de usuario con el mismo orden
            const rolExistente = await Model.Rol_user.findOne({ orden: req.body.orden });
            if (rolExistente) {
                return res.status(400).send({ message: 'Ya existe un rol de usuario con el mismo orden' });
            }

            // Crear el nuevo rol de usuario
            let nuevoRol = await Model.Rol_user.create(req.body);
            res.status(200).send({ message: 'Rol de usuario registrado correctamente', data: nuevoRol });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el rol de usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};


const registrarPermiso = async function (req, res) {
    if (req.user) {
        try {
            let nuevoPermiso = await Model.Permiso.create(req.body);
            res.status(200).send({ message: 'Permiso registrado correctamente', data: nuevoPermiso });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el permiso', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo estado de incidente
const registrarEstadoIncidente = async function (req, res) {
    if (req.user) {
        try {
            let data = req.body;
            let verf= await Model.Estado_incidente.find();
            if(verf.length==0){
                data.orden=1;
            }
            let nuevoEstado = await Model.Estado_incidente.create(data);
            res.status(200).send({ message: 'Estado de incidente registrado correctamente', data: nuevoEstado });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el estado de incidente', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo estado de actividad de proyecto
const registrarEstadoActividadProyecto = async function (req, res) {
    if (req.user) {
        try {
            let data = req.body;
            let verf= await Model.Estado_actividad_proyecto.find();
            if(!verf){
                data.orden=1;
            }
            let nuevoEstado = await Model.Estado_actividad_proyecto.create(data);
            res.status(200).send({ message: 'Estado de actividad de proyecto registrado correctamente', data: nuevoEstado });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el estado de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo tipo de actividad de proyecto
const registrarTipoActividadProyecto = async function (req, res) {
    if (req.user) {
        try {
            let nuevoTipo = await Model.Actividad_proyecto.create(req.body);
            res.status(200).send({ message: 'Tipo de actividad de proyecto registrado correctamente', data: nuevoTipo });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el tipo de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar una nueva dirección geográfica
const registrarDireccionGeo = async function (req, res) {
    if (req.user) {
        try {
            let nuevaDireccion = await Model.Direccion_geo.create(req.body);
            res.status(200).send({ message: 'Dirección geográfica registrada correctamente', data: nuevaDireccion });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la dirección geográfica', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

module.exports = {
    registrarUsuario,
    registrarActividadProyecto,
    registrarIncidenteDenuncia,
    registrarCategoria,
    registrarSubcategoria,
    registrarEncargadoCategoria,
    registrarRolUsuario,
    registrarEstadoIncidente,
    registrarEstadoActividadProyecto,
    registrarTipoActividadProyecto,
    registrarDireccionGeo,
    registrarPermiso
};
