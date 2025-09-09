module.exports = [
"[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$src$2f$app$2f$Providers$2f$authProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/Providers/authProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function page() {
    const { token, usuario } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$src$2f$app$2f$Providers$2f$authProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [nombre, setNombre] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [edad, setEdad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [especie, setEspecie] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [raza, setRaza] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [descripcion, setDescripcion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [foto, setFoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const handleAgregarMascota = async (e)=>{
        e.preventDefault();
        if (!token || !usuario || !usuario.esDueño) {
            alert('No tienes permiso para agregar mascotas');
            router.push('/dashboard');
            return;
        }
        const nuevaMascota = {
            nombre,
            especie,
            raza,
            edad: parseInt(edad),
            descripcion,
            foto,
            estado: 'disponible'
        };
        try {
            const response = await fetch('http://localhost:5000/api/mascota', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nuevaMascota)
            });
            if (response.ok) {
                alert('Mascota agregada con exito');
                router.push('/mascotas');
            } else {
                const data = await response.json();
                alert(`Error al agregar la mascota: ${data.mensaje}`);
            }
        } catch (error) {
            console.error('Error de red ', error);
            alert(`ocurrio un error al conectar con el servidor`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-center mb-4",
                children: "Agregar Nueva Mascota"
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                lineNumber: 63,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card mx-auto",
                style: {
                    maxWidth: '600px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-body",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleAgregarMascota,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Nombre"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        className: "form-control",
                                        value: nombre,
                                        onChange: (e)=>setNombre(e.target.value),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                lineNumber: 67,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Edad"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        className: "form-control",
                                        value: edad,
                                        onChange: (e)=>setEdad(e.target.value),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                lineNumber: 71,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Especie (Perro, Gato, etc.)"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        className: "form-control",
                                        value: especie,
                                        onChange: (e)=>setEspecie(e.target.value),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                lineNumber: 75,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Raza"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        className: "form-control",
                                        value: raza,
                                        onChange: (e)=>setRaza(e.target.value),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                lineNumber: 79,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "Descripción"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "form-control",
                                        value: descripcion,
                                        onChange: (e)=>setDescripcion(e.target.value),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                lineNumber: 83,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "form-label",
                                        children: "URL de la Foto"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "url",
                                        className: "form-control",
                                        value: foto,
                                        onChange: (e)=>setFoto(e.target.value),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                lineNumber: 87,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "btn btn-primary",
                                children: "Agregar Mascota"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                                lineNumber: 91,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                        lineNumber: 66,
                        columnNumber: 19
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                    lineNumber: 65,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
                lineNumber: 64,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/agregar/page.tsx",
        lineNumber: 62,
        columnNumber: 7
    }, this);
}
}),
];

//# sourceMappingURL=7889e_Proyecto_Desarrollo_Web2_proyecto_src_app_mascotas_agregar_page_tsx_7aedc99d._.js.map