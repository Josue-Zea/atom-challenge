<br />
<div align="center">
  <h3 align="center">Challenge técnico</h3>

  <p align="center">
    <a href="https://atom-challenge-c5867.web.app/login">Link a la aplicación</a>

  </p>
</div>

## Acerca del proyecto

Esta pequeña aplicación busca solucionar el challenge de habilidades técnicas para el puesto de FullStack Developer, con el resultado podemos observar tanto el resultado del aplicativo solicitado, como el desarrollo del mismo.

## Construido con
* [![Angular][Angular]][Angular-url]
* [![Tailwind CSS][Tailwind]][Tailwind-url]
* [![Express.js][Express]][Express-url]
* [![TypeScript][TypeScript]][TypeScript-url]

### Frontend

El frontend fue realizado utilizando Angular en su versión 16, el código fuente de dicho desarrollo se encuentra en la carpeta "frontend" del proyecto, este se desplego utilizando Firebase Hosting.

El backend fue desarrollado utilizando nodejs versión 18, principalmente construido utilizando la librería express y typescript para mejor control del código, este se encuentra desplegado en el servicio Cloud Functions de Firebase.

## Contacto

Contacto - [Github](https://github.com/Josue-Zea) - jdzeaherrera@gmail.com

Link del código fuente [Atom challenge](https://github.com/Josue-Zea/atom-challenge)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Angular]: https://img.shields.io/badge/Angular-FF0000?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.dev/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/

## Estimación de tiempo

| Sección        | Nombre de la Tarea               | Tiempo Estimado | Descripción de la Tarea                      | Responsable | Dependencias |
|---------------|---------------------------------|----------------|---------------------------------------------|-------------|-------------|
| **Base de datos**   | Creación y configuración de proyecto | 1h            | Creación de proyecto en firebase | DB | -           |
| **Backend**   | Configuración de Express y TypeScript | 1h            | Configurar servidor con Express y TypeScript | Dev Backend | -           |
| **Backend**   | Estructura de backend y conexión con Firebase | 1h            | Configurar servidor con Express y TypeScript, conexión con firebase | Dev Backend | Base de datos |
| **Backend**   | Implementación de autenticación | 2h            | Login y creación de usuarios utilizando JWT | Dev Backend | Base de datos |
| **Backend**   | Implementación de endpoints de tareas | 4h            | CRUD de tareas        | Dev Backend | Base de datos |
| **Frontend**  | Configuración de Tailwind y Angular | 1h            | Configurar Tailwind en el proyecto Angular  | Dev Frontend | -           |
| **Frontend**  | Diseño de pantalla de Login, mobile first    | 1h            | Crear el formulario de autenticación responsivo | Dev Frontend | Backend API |
| **Frontend**  | Diseño de pantalla de dashboard, mobile first    | 3h            | Crear la vista del dashboard responsivo | Dev Frontend | Backend API |
| **Frontend**  | Funcionalidad del login y navegación    | 2h            | Flujo de autenticación y manejo de rutas | Dev Frontend | Backend API |
| **Frontend**  | CRUD de tareas    | 6h            | Crud visual del lado del cliente para hacer el CRUD | Dev Frontend | Backend API |
| **Pruebas**   | Pruebas manuales de flujo completo    | 1h            | Pruebas de diferentes operaciones dentro de la aplicación | Dev Frontend | Código finalizado |
| **Pruebas**   | Solución de errores | 2h            | Solución de errores y mejoras en base a pruebas realizadas | Dev Frontend | Código finalizado |
| **Despliegue**| Configuración de entornos en Firebase | 2h            | Configurar los proyectos dentro de la cuenta de firebase | DevOps      | -           |
| **Documentación** | Documentación de entrega de proyecto  | 2h            | Documentación en el README.MD del proyecto | Dev Docs    | -           |

### Tiempo estimado para la solución: 29 Horas
<br>
<br>

---

# 📊 Comparación de Tiempos Reales vs. Estimados

| Sección        | Nombre de la Tarea               | Tiempo Estimado | Tiempo Real | Fecha Estimada | Fecha Real |
|---------------|---------------------------------|----------------|-------------|---------------|------------|
| **Base de datos**   | Creación y configuración de proyecto | 1h            | 0.5h           | 26/01/2025 | 26/01/2025 |
| **Backend**   | Configuración de Express y TypeScript | 1h            | 0.5h           | 26/01/2025 | 26/01/2025 |
| **Backend**   | Estructura de backend y conexión con Firebase | 1h            | 1h           | 26/01/2025 | 26/01/2025 |
| **Backend**   | Implementación de autenticación | 2h            | 2.5h           | 26/01/2025 | 27/01/2025 |
| **Backend**   | Implementación de endpoints de tareas | 4h            | 3h           | 27/01/2025 | 27/01/2025 |
| **Frontend**  | Configuración de Tailwind y Angular | 1h            | 0.5h           | 27/01/2025 | 27/01/2025 |
| **Frontend**  | Diseño de pantalla de Login, mobile first | 1h            | 1h           | 27/01/2025 | 27/01/2025 |
| **Frontend**  | Diseño de pantalla de dashboard, mobile first | 3h            | 4h           | 27/01/2025 | 27/01/2025 |
| **Frontend**  | Funcionalidad del login y navegación | 2h            | 1.5h           | 28/01/2025 | 28/01/2025 |
| **Frontend**  | CRUD de tareas | 6h            | 6h           | 28/01/2025 | 28/01/2025 |
| **Pruebas**   | Pruebas manuales de flujo completo | 1h            | 0.5h           | 28/01/2025 | 28/01/2025 |
| **Pruebas**   | Solución de errores | 2h            | 1.5h           | 28/01/2025 | 28/01/2025 |
| **Despliegue**| Configuración de entornos en Firebase | 2h            | 1h           | 28/01/2025 | 28/01/2025 |
| **Documentación** | Documentación de entrega de proyecto | 2h            | 1.5h           | 28/01/2025 | 28/01/2025 |

### Tiempo real utilizado para la solución: 25 Horas
### Iniciando el desarrollo el día 26/01/2025 - finalizando el día 28/01/2025