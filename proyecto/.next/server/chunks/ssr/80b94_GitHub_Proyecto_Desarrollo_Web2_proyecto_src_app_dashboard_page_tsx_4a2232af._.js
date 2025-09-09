module.exports = [
"[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$src$2f$app$2f$Providers$2f$authProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/Providers/authProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function DashboardPage() {
    const { usuario, cargando } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$src$2f$app$2f$Providers$2f$authProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    if (cargando) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Cargando..."
        }, void 0, false, {
            fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/dashboard/page.tsx",
            lineNumber: 11,
            columnNumber: 16
        }, this);
    }
    if (!usuario) {
        router.push('/');
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: [
                    "Bienvenido, ",
                    usuario.nombre
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/dashboard/page.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Has iniciado sesión exitosamente."
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/dashboard/page.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Proyecto_Desarrollo_Web2$2f$proyecto$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Tu rol es: ",
                    usuario.esAdoptante ? 'Adoptante' : '',
                    " ",
                    usuario.esDueño ? 'Dueño' : ''
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/dashboard/page.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/Proyecto_Desarrollo_Web2/proyecto/src/app/dashboard/page.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=80b94_GitHub_Proyecto_Desarrollo_Web2_proyecto_src_app_dashboard_page_tsx_4a2232af._.js.map