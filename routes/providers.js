const express = require('express');
const router = express.Router();

const providers = [
    {
        "cif": "12345",
        "name": "Proveedor A",
        "activity": "Suministros",
        "address": "Calle 123",
        "city": "Ciudad X",
        "cp": "28001",
        "phone": "123456789"
    }
];

router.use(express.json());

// Ruta para obtener todos los proveedores
router.get('/', (req, res) => {
    if (providers.length === 0) {
        return res.status(404).json({
            message: "No hay proveedores"
        });
    }
    res.status(200).json({
        message: "Lista de proveedores",
        providers
    });
});

// Ruta para obtener un proveedor por CIF
router.get('/:cif', (req, res) => {
    if (!req.params.cif) {
        return res.status(400).json({
            message: "Introduce el CIF del proveedor que quieres buscar"
        });
    }
    const cif = req.params.cif;
    const provider = providers.find(p => p.cif === cif);
    if (provider) {
        return res.status(200).json({
            message: "Proveedor encontrado",
            provider
        });
    } else {
        return res.status(404).json({
            message: "Proveedor no encontrado"
        });
    }
});

// Ruta para agregar un nuevo proveedor
router.post('/', (req, res) => {
    const { cif } = req.body
    if (!cif) {
        return res.status(400).json({
            message: "Introduce por lo menos el cif del nuevo proveedor"
        });
    } else if (providers.find(provider => provider.cif === cif)) {
        return res.status(409).json({
            message: "Este CIF está siendo usado por otro proveedor"
        });
    }
    else {
        const newProvider = req.body;
        providers.push(newProvider);

        return res.status(201).json({
            message: "Proveedor creado",
            newProvider
        });
    }
});

// Ruta para modificar un proveedor existente
router.put('/:cif', (req, res) => { 
    if (!req.params.cif) {
        return res.status(400).json({
            message: "Introduce el CIF del proveedor a modificar"
        });
    } else if (!providers.find(p => p.cif === req.params.cif)) {
        return res.status(404).json({
            message: "Proveedor no encontrado"
        })
    } else {
        const cif = req.params.cif;
        const updatedProvider = req.body;
        const index = providers.findIndex(p => p.cif === cif);
        providers[index] = { ...providers[index], ...updatedProvider };
        return res.status(200).json({
            message: "Proveedor actualizado",
            provider: providers[index]
        });
    }
});

router.delete('/:cif', (req, res) => {
    if (!req.params.cif) {
        return res.status(400).json({
            message: "Introduce el CIF del proveedor a eliminar"
        });
    }
    const cif = req.params.cif;
    const index = providers.findIndex(p => p.cif === cif);
    if (index !== -1) {
        providers.splice(index, 1);
        return res.status(200).json({
            message: "Proveedor eliminado"
        });
    } else {
        return res.status(404).json({
            message: "Proveedor no encontrado"
        });
    }
});

module.exports = router;