import type { Project, ProjectStatus } from "./types";

/**
 * Contenido redactado a partir de los README, la documentación y el historial
 * de git de cada repositorio. Reglas:
 * - `myRole` describe solo lo que aparece con la firma de Juan David en git.
 * - Si parte del código lo generó una IA, `aiAssisted` lo dice.
 * - `results` vacío: todavía no hay métricas verificadas, no se muestran.
 * - `image` y `gallery` apuntan a capturas reales con datos demo en
 *   `public/proyectos/<slug>/` (generadas con `node scripts/captures.mjs`).
 *   ERP y Palatsi son confidenciales: sin capturas ni enlaces.
 * - Sin enlaces a repositorios hasta que Juan David confirme
 *   qué es público (ver docs/CONTENIDO_PENDIENTE.md).
 */
export const projects: Project[] = [
  {
    id: "erp-educacion-superior",
    slug: "erp-educacion-superior",
    title: "ERP Universitario",
    subtitle: "Producto ERP para instituciones de educación superior",
    description:
      "ERP que sistematiza una institución completa: académico, admisiones, contratación, contabilidad, tesorería, nómina, marketing y pagos, con un componente académico pensado para universidades.",
    longDescription:
      "Nació como el sistema institucional de la Corporación Unicorsalud y evolucionó a un producto configurable para cualquier institución de educación superior: nombre, NIT, representante legal, logos y colores se definen por configuración. Lo construimos cuatro desarrolladores. Mi trabajo se concentró en el componente académico, los estudiantes y sus calificaciones, los reportes en PDF y la seguridad de sesiones.",
    year: 2026,
    category: "ERP para universidades",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "JWT",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "PostgreSQL",
      "Celery",
      "Redis",
      "Docker",
    ],
    image: null,
    gallery: [],
    featured: true,
    status: "en-desarrollo",
    problem:
      "Las universidades manejan procesos que casi nunca viven en un mismo sistema: programas, pensums y horarios, admisiones y matrícula, contratación docente, contabilidad, tesorería, nómina y pagos en línea. Los ERP genéricos no entienden la parte académica.",
    solution:
      "Un backend Django REST con una app por dominio del negocio y un frontend React con TypeScript por módulos. Roles y permisos granulares, JWT con soporte opcional para Active Directory, tareas asíncronas con Celery, documentos PDF parametrizados y marca configurable por institución.",
    role: "Desarrollador full stack",
    myRole: [
      "Componente académico: grupos, cargas académicas, horarios por docente, consulta de horarios por aula y dashboard académico.",
      "Módulo de estudiantes: calificaciones por docente, notas y listas de asistencia.",
      "Reportes en PDF de notas y beneficios, con interfaz de impresión en el frontend.",
      "Seguridad: versionado de tokens JWT para invalidar sesiones cuando cambia el rol de un usuario y API de aprovisionamiento de usuarios.",
      "Admisión y matrícula; beneficios, descuentos y cuentas bancarias en los conceptos de pago.",
    ],
    team: "Equipo de 4 desarrolladores con ramas por funcionalidad y revisión antes de integrar.",
    confidential: true,
    features: [
      "Académico: programas, asignaturas, pensums, sedes, aulas, cargas académicas, horarios y calificaciones.",
      "Admisiones, matrícula y seguimiento de aspirantes con marketing y alertas.",
      "Contratación con flujo de revisión por contabilidad, rectoría y presidencia, y contratos en PDF.",
      "Contabilidad con PUC, terceros, centros de costo y periodos; tesorería, facturación y nómina.",
      "Requisiciones con flujo de aprobación, inventario, planeación y auditoría.",
      "Pagos en línea con ePayco y asistente de analítica con IA para directivos.",
    ],
    challenges: [
      "Revocar la sesión de un usuario en cuanto cambian sus permisos, sin cerrar la sesión de todos los demás.",
      "Que las fechas y los datos de los documentos PDF coincidan siempre con lo registrado en el sistema.",
      "Pasar de un sistema hecho para una institución a un producto configurable sin romper lo que ya funcionaba.",
    ],
    results: [],
    architecture: {
      layers: [
        {
          name: "Interfaz",
          tech: "React, TypeScript, Vite, Radix UI",
          nodes: ["Páginas por dominio", "Clientes de la API", "Rutas y permisos"],
        },
        {
          name: "API",
          tech: "Django REST Framework, Simple JWT",
          nodes: ["Autenticación y roles", "Active Directory opcional", "Marca por institución"],
        },
        {
          name: "Dominio",
          tech: "Una app de Django por área",
          nodes: [
            "Académico",
            "Admisiones",
            "Contratación",
            "Contabilidad y PUC",
            "Tesorería",
            "Nómina",
            "Marketing",
            "Pagos",
          ],
        },
        {
          name: "Datos e infraestructura",
          tech: "PostgreSQL 16, Celery, Redis, Docker",
          nodes: ["Base de datos", "Tareas asíncronas", "Archivos en S3", "Correo SMTP"],
        },
      ],
      decisions: [
        "Una app de Django por dominio del negocio, para que cada desarrollador trabaje en su área.",
        "Marca, datos legales y colores por variables de entorno: el mismo producto sirve a otra institución.",
        "Versión del token guardada por usuario: cambiar un rol invalida sus sesiones activas.",
      ],
    },
  },
  {
    id: "orbitra",
    slug: "orbitra",
    title: "Orbitra",
    subtitle: "Trazabilidad de activos y logística para alquiler de equipos audiovisuales",
    description:
      "Plataforma que responde dónde está cada equipo, quién responde por él y cuándo debe volver, con control del gasto de insumos por orden.",
    longDescription:
      "Sistema de gestión y trazabilidad para empresas que alquilan equipos audiovisuales para eventos. Cubre órdenes de servicio, despacho con QR, entrega con firma, recepción parcial en varias bodegas, inventario con Kardex inmutable y mantenimiento. Lo diseñé y construí completo.",
    year: 2026,
    category: "Logística",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "JWT",
      "React",
      "TypeScript",
      "Vite",
      "PostgreSQL",
      "Celery",
      "Redis",
      "Docker",
      "Nginx",
      "GitHub Actions",
    ],
    image: "/proyectos/orbitra/dashboard-1440.webp",
    gallery: ["/proyectos/orbitra/ordenes-1440.webp", "/proyectos/orbitra/logistica-1440.webp"],
    featured: true,
    status: "en-desarrollo",
    problem:
      "Una empresa de alquiler audiovisual pierde plata cuando no sabe dónde está un equipo, quién lo tiene o cuándo vuelve, y cuando los insumos se gastan sin registro por evento.",
    solution:
      "Órdenes de servicio con un flujo de estados explícito, desde borrador hasta cerrada. Cada movimiento de inventario queda en un Kardex que no se puede editar, las reservas se protegen en la base de datos y las alertas corren en tareas programadas.",
    role: "Arquitecto y desarrollador full stack",
    myRole: [
      "Documento de arquitectura, modelo de datos y reglas del negocio.",
      "Backend Django REST con capa de servicios transaccional y acciones de negocio explícitas, como despachar una orden.",
      "Frontend React con TypeScript, escáner QR y mapa de eventos.",
      "Integración de una API de IA como asistente para los usuarios de la plataforma.",
      "Contenedores con Docker Compose y Nginx, tareas programadas con Celery y pipeline de integración continua.",
    ],
    team: "Proyecto propio, autor único.",
    confidential: false,
    features: [
      "Órdenes de servicio con asignación en varias bodegas y personal.",
      "Despacho con QR, entrega con firma y recepción parcial.",
      "Inventario serializado y por cantidades con Kardex inmutable y hoja de vida.",
      "Consumo de insumos por orden, lugar y fecha, con devolución de sobrantes.",
      "Mantenimiento preventivo por días o usos y correctivo automático.",
      "Novedades con evidencias, bajas con aprobación, auditoría y reportes.",
      "Asistente con IA que responde en lenguaje natural las preguntas de quienes usan la plataforma.",
    ],
    challenges: [
      "Impedir que un equipo se reserve dos veces en fechas que se cruzan, incluso con solicitudes simultáneas: restricción EXCLUDE sobre rangos de tiempo en PostgreSQL.",
      "Que el stock, la ubicación o el estado de un equipo nunca cambien sin un movimiento que lo explique.",
      "Recibir devoluciones parciales en varias bodegas sin perder la trazabilidad de cada elemento.",
    ],
    results: [],
    architecture: {
      layers: [
        {
          name: "Cliente",
          tech: "React, TypeScript, Vite",
          nodes: ["Escáner QR", "Mapa de eventos", "Alertas", "Asistente IA"],
        },
        {
          name: "Borde",
          tech: "Nginx",
          nodes: ["Build estático", "Proxy de /api"],
        },
        {
          name: "API y dominio",
          tech: "Django REST Framework, Gunicorn, JWT",
          nodes: ["Órdenes", "Logística", "Inventario", "Insumos", "Mantenimiento", "Control"],
        },
        {
          name: "Datos y tareas",
          tech: "PostgreSQL 16, Redis, Celery",
          nodes: ["Constraints", "Auditoría JSONB", "Worker", "Tareas periódicas"],
        },
      ],
      decisions: [
        "La lógica vive en services.py, nunca en vistas ni serializers.",
        "Acciones de negocio explícitas en la API, como POST /ordenes/{id}/despachar/.",
        "Nada se borra: PROTECT, desactivación y bajas con aprobación.",
        "Fechas guardadas en UTC y mostradas en hora de Bogotá.",
      ],
    },
  },
  {
    id: "nexora-platform",
    slug: "nexora-platform",
    title: "Nexora Platform",
    subtitle: "LMS y CMS multi-tenant",
    description:
      "Plataforma para que varias instituciones publiquen contenidos y cursos desde un mismo sistema, con los datos de cada una aislados.",
    longDescription:
      "Monolito modular API-first que une un LMS y un CMS. Cada institución es un tenant con sus propios usuarios, roles, planes y cuotas. El proyecto avanza por fases: fundación e identidad están terminadas, medios, CMS, LMS, evaluaciones y certificados vienen después.",
    year: 2026,
    category: "Educación",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "JWT",
      "React",
      "TypeScript",
      "Vite",
      "PostgreSQL",
      "Redis",
      "Celery",
      "S3 / MinIO",
      "Docker",
      "GitHub Actions",
    ],
    image: "/proyectos/nexora-platform/catalogo-1440.webp",
    gallery: [
      "/proyectos/nexora-platform/dashboard-1440.webp",
      "/proyectos/nexora-platform/login-1440.webp",
    ],
    featured: true,
    status: "en-desarrollo",
    problem:
      "Varias instituciones educativas necesitan publicar contenidos y cursos sin mantener cada una su propia plataforma, y sin que los datos de una sean visibles para otra.",
    solution:
      "Tenants con control de acceso por roles, JWT con rotación y cookie HttpOnly, auditoría y pruebas de aislamiento entre instituciones. Medios con subidas firmadas a almacenamiento compatible con S3 y contrato de API documentado con OpenAPI.",
    role: "Desarrollador full stack",
    myRole: [
      "Módulo de medios con subidas firmadas a S3 y miniaturas generadas en segundo plano.",
      "Notificaciones, búsqueda, planes y cuotas por institución.",
      "Roles de colegio, recuperación de cuenta, consentimiento de datos personales (Ley 1581) y carga masiva de usuarios desde Excel o CSV.",
      "Panel docente con métricas de notas y edición de calificaciones.",
      "Chat con IA integrado en la plataforma.",
    ],
    team: "Proyecto propio.",
    aiAssisted:
      "Parte del código lo hizo Claude Code: componentes de formulario, documentación del esquema de base de datos y correcciones de formato. Está firmado así en el historial.",
    confidential: false,
    features: [
      "Aislamiento de datos por institución con pruebas automáticas.",
      "Roles y permisos por tenant, con suspensión de cuentas y auditoría.",
      "Subidas de archivos firmadas y miniaturas asíncronas.",
      "Planes y cuotas por institución.",
      "Carga masiva de usuarios desde Excel o CSV.",
    ],
    challenges: [
      "Garantizar que ninguna consulta devuelva datos de otra institución, con pruebas que lo verifican.",
      "Subir archivos grandes sin que pasen por el servidor de la API.",
    ],
    results: [],
    architecture: {
      layers: [
        {
          name: "Interfaz",
          tech: "React 19, TypeScript, Vite",
          nodes: ["Autenticación", "CMS", "Administración"],
        },
        {
          name: "API",
          tech: "Django REST Framework, OpenAPI",
          nodes: ["Identidad", "Tenants", "Medios", "Notificaciones", "Búsqueda"],
        },
        {
          name: "Dominio",
          tech: "Apps por módulo con services y selectors",
          nodes: ["CMS", "LMS", "Evaluaciones", "Certificados", "Analítica"],
        },
        {
          name: "Datos",
          tech: "PostgreSQL, Redis, Celery, MinIO",
          nodes: ["Datos por tenant", "Colas", "Archivos"],
        },
      ],
      decisions: [
        "Monolito modular: un despliegue, límites claros entre módulos.",
        "Errores de la API con formato Problem Details e ID de correlación por petición.",
        "Tokens con rotación y cookie HttpOnly para el refresh.",
      ],
    },
  },
  {
    id: "palatsi-beauty-os",
    slug: "palatsi-beauty-os",
    title: "Palatsi Beauty OS",
    subtitle: "Comercio y operación: tienda, backoffice y bodega",
    description:
      "Capa digital que conecta la compra en línea con la operación: reserva, preparación, despacho, entrega y fidelización.",
    longDescription:
      "Plataforma para una marca de belleza que integra sus sistemas existentes de inventario, pagos y envíos mediante adapters y un modelo canónico propio. Tiene tienda, backoffice y una app móvil de bodega, sobre infraestructura en AWS definida con Terraform.",
    year: 2026,
    category: "Comercio",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "Celery",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Terraform",
      "AWS",
      "GitHub Actions",
    ],
    image: null,
    gallery: [],
    featured: false,
    status: "en-desarrollo",
    problem:
      "La marca vendía en línea con sistemas que no hablaban entre sí: el inventario, los pagos y los envíos no reflejaban lo que pasaba en tiendas y bodega.",
    solution:
      "Un monolito modular en Django con adapters hacia cada sistema externo, eventos con patrón outbox y PostgreSQL con Row-Level Security. El frontend se divide en tres zonas Next.js: tienda, administración y bodega.",
    role: "Dirección técnica de un desarrollo asistido por IA",
    myRole: [
      "Dirección técnica y revisión del desarrollo generado con Claude Code.",
      "Entorno Docker de desarrollo y ajustes de la tienda: carrusel y agregado rápido al carrito.",
    ],
    team: "Proyecto para un cliente.",
    aiAssisted:
      "La mayor parte del código la generó Claude Code (39 de 41 commits). Lo muestro como ejemplo de dirección técnica de un desarrollo asistido por IA, no como código escrito a mano.",
    confidential: true,
    features: [
      "Tienda, backoffice y app de bodega instalable.",
      "Máquinas de estado para pedidos y tareas de bodega.",
      "Reservas de inventario con vencimiento y stock bloqueado.",
      "Devoluciones, cambios, garantías, club de fidelización y tarjetas de regalo.",
      "13 decisiones de arquitectura documentadas y 6 runbooks de incidentes.",
    ],
    challenges: [
      "Integrar sistemas externos sin que sus modelos contaminen el dominio propio.",
      "Aislar los datos por tienda en la base de datos, no solo en la aplicación.",
    ],
    results: [],
  },
  {
    id: "pracxu",
    slug: "pracxu",
    title: "Pracxu",
    subtitle: "LMS de cursos cortos virtuales",
    description:
      "Plataforma para publicar cursos cortos, venderlos en línea y certificar a los estudiantes, con alcance por fases documentado en un SRS.",
    longDescription:
      "LMS para una empresa de formación que ofrece cursos cortos 100% virtuales. Hice el levantamiento de requisitos, el SRS por fases y la primera versión del sistema: autenticación, catálogo de cursos, inscripciones y un CMS para páginas, planes, preguntas frecuentes y testimonios.",
    year: 2026,
    category: "Educación",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "JWT",
      "React",
      "Vite",
      "PostgreSQL",
      "Docker",
    ],
    image: "/proyectos/pracxu/cursos-1440.webp",
    gallery: ["/proyectos/pracxu/home-1440.webp", "/proyectos/pracxu/curso-detalle-1440.webp"],
    featured: false,
    status: "en-desarrollo",
    problem:
      "Una empresa de formación quería vender cursos cortos en línea y certificar a sus estudiantes sin depender de una plataforma de terceros.",
    solution:
      "API Django REST con apps de autenticación, cursos e inscripciones y un CMS para el contenido del sitio, y un frontend React con rutas protegidas. Pagos, aula virtual y certificados quedaron planeados por fases en el SRS.",
    role: "Analista y desarrollador full stack",
    myRole: [
      "Levantamiento de requisitos, propuesta comercial y SRS con el plan por fases.",
      "API con registro, inicio de sesión con JWT, perfil, cursos, categorías e inscripciones.",
      "Frontend React con catálogo, detalle de curso, autenticación y rutas protegidas.",
    ],
    team: "Proyecto propio para un cliente.",
    confidential: false,
    features: [
      "Catálogo de cursos por categorías con detalle e inscripción.",
      "Registro, inicio de sesión y perfil.",
      "CMS de páginas, planes, preguntas frecuentes y testimonios.",
      "Entorno completo con Docker Compose.",
    ],
    challenges: [
      "Traducir lo que el cliente pedía en fases con entregables verificables y un alcance cerrado.",
    ],
    results: [],
  },
  {
    id: "jdc-digital-portfolio",
    slug: "jdc-digital-portfolio",
    title: "JDC Digital Portfolio",
    subtitle: "Este sitio",
    description:
      "Portafolio prerenderizado por ruta, con contenido verificable y pruebas automáticas de accesibilidad y rendimiento.",
    longDescription:
      "El portafolio también es un proyecto. Escribí la especificación maestra del producto y la base del código se construyó con asistentes de IA bajo esa especificación, con reglas de diseño y de calidad explícitas.",
    year: 2026,
    category: "Frontend",
    technologies: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS", "GitHub Actions"],
    image: "/proyectos/jdc-digital-portfolio/home-1440.webp",
    gallery: ["/proyectos/jdc-digital-portfolio/proyecto-1440.webp"],
    featured: false,
    github: "https://github.com/JuanDCova/Software-Developer",
    status: "en-desarrollo",
    problem:
      "Un portafolio tiene segundos para explicar a un reclutador quién soy y, al mismo tiempo, debe aguantar la revisión de un entrevistador técnico.",
    solution:
      "HTML estático por ruta con React Router para que buscadores y vistas previas de LinkedIn lean cada página, contenido tipado con pruebas y un design system con tokens para modo claro y oscuro.",
    role: "Producto, especificación y dirección técnica",
    myRole: [
      "Especificación maestra: objetivos, arquitectura de información, design system y roadmap.",
      "Contenido y revisión de cada decisión de arquitectura.",
    ],
    team: "Proyecto propio.",
    aiAssisted:
      "La base del código se generó con Claude Code y OpenCode a partir de mi especificación.",
    confidential: false,
    features: [
      "Prerender estático por ruta y metadatos Open Graph por página.",
      "Modo claro y oscuro con tokens, sin parpadeo al cargar.",
      "CV imprimible en /cv.",
      "Pruebas de datos, de extremo a extremo y de accesibilidad en CI.",
    ],
    challenges: [
      "Mantener la carga rápida en celulares aunque el diseño pida movimiento y 3D: se agregan por capas y solo si no afectan el LCP.",
    ],
    results: [],
  },
];

export const statusLabels: Record<ProjectStatus, string> = {
  "en-produccion": "En producción",
  "en-desarrollo": "En desarrollo",
  prototipo: "Prototipo",
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
