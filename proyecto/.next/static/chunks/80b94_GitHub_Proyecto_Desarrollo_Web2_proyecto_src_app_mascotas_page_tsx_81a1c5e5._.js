(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MascotasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$src$2f$app$2f$Providers$2f$authProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/Providers/authProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MascotasPage() {
    _s();
    const [mascotas, setMascotas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cargando, setCargando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$src$2f$app$2f$Providers$2f$authProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MascotasPage.useEffect": ()=>{
            async function fetchMascotas() {
                if (!token) {
                    router.push('/');
                    return;
                }
                try {
                    const response = await fetch('http://localhost:5000/api/mascota', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer ".concat(token)
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Error al obtener las mascotas.');
                    }
                    const data = await response.json();
                    setMascotas(data);
                } catch (err) {
                    setError('No se pudo cargar la lista de mascotas.');
                    console.error(err);
                } finally{
                    setCargando(false);
                }
            }
            fetchMascotas();
        }
    }["MascotasPage.useEffect"], [
        token,
        router
    ]);
    if (cargando) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mt-5",
            children: "Cargando mascotas..."
        }, void 0, false, {
            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
            lineNumber: 46,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "alert alert-danger text-center mt-5",
            children: error
        }, void 0, false, {
            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
            lineNumber: 50,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-center mb-4",
                children: "Mascotas Disponibles"
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row",
                children: mascotas.map((mascota)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-md-4 mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card h-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: mascota.foto,
                                    className: "card-img-top",
                                    alt: "Foto de ".concat(mascota.nombre),
                                    style: {
                                        height: '250px',
                                        objectFit: 'cover'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card-body",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                            className: "card-title",
                                            children: mascota.nombre
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "card-text",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Raza:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                mascota.raza,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 57
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Edad:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                mascota.edad,
                                                " años ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 62
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Especie:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                mascota.especie
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                            lineNumber: 63,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "card-text",
                                            children: mascota.descripcion
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn btn-primary",
                                            children: "Adoptar"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this)
                    }, mascota.id_mascota, false, {
                        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/mascotas/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(MascotasPage, "WbceDPKfggQS8hvz4IA7Nr00n5o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$src$2f$app$2f$Providers$2f$authProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MascotasPage;
var _c;
__turbopack_context__.k.register(_c, "MascotasPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=80b94_GitHub_Proyecto_Desarrollo_Web2_proyecto_src_app_mascotas_page_tsx_81a1c5e5._.js.map