# SJ CUSTOMS

## Descripción General

**SJ CUSTOMS** es una aplicación web desarrollada como proyecto de final de grado, centrada en el tuneo y la personalización de coches. Su objetivo es ofrecer a los usuarios una plataforma intuitiva donde puedan explorar servicios, personalizar vehículos y gestionar sus pedidos de manera sencilla y segura.

## Estructura del Proyecto

La estructura del proyecto está organizada para facilitar el desarrollo, mantenimiento y escalabilidad de la aplicación. A continuación se describe la organización principal:

```
proyecto/
│
├── public/                  # Archivos estáticos públicos
├── src/                     # Código fuente principal
│   ├── components/          # Componentes reutilizables de React
│   │   ├── Auth/            # Componentes de autenticación (login, registro, etc.)
│   │   ├── Home/            # Componentes de la página principal
│   │   ├── Shared/          # Componentes compartidos (notificaciones, botones, etc.)
│   │   └── ...              # Otros componentes específicos
│   ├── services/            # Servicios para comunicación con APIs
│   ├── styles/              # Archivos de estilos CSS modularizados
│   ├── App.js               # Componente principal de la aplicación
│   ├── index.js             # Punto de entrada de React
│   └── ...                  # Otros archivos de configuración
├── package.json             # Dependencias y scripts del proyecto
├── webpack.config.js        # Configuración de Webpack
└── README.md                # Documentación del proyecto
```

### Principales Carpetas y Archivos

- **components/**: Contiene todos los componentes de React organizados por funcionalidad (autenticación, home, compartidos, etc.).
- **services/**: Incluye los servicios para interactuar con APIs externas o internas.
- **styles/**: Archivos CSS para el diseño y la personalización visual de la aplicación.
- **App.js**: Componente raíz que gestiona las rutas y la estructura general.
- **index.js**: Punto de entrada donde se monta la aplicación React.

## Funcionalidades Principales

- **Personalización de vehículos:** Selección de modelos, colores, accesorios y visualización previa.
- **Catálogo de servicios:** Información detallada sobre los servicios de tuneo y personalización.
- **Gestión de pedidos:** Proceso de compra y seguimiento de pedidos.
- **Autenticación de usuarios:** Registro, inicio de sesión y gestión de cuenta.
- **Contacto y soporte:** Formulario de contacto y atención al cliente.
- **Notificaciones y validaciones:** Sistema de notificaciones y validación de formularios.
- **Diseño responsive:** Adaptado a dispositivos móviles y escritorio.

## Tecnologías Utilizadas

- **Frontend:** React.js
- **Estilos:** CSS modularizado
- **Gestión de rutas:** React Router
- **Backend/API:** Integración mediante servicios en `src/services`
- **Herramientas:** Node.js, npm, Webpack

## Instalación y Ejecución

1. Clona el repositorio:
   ```sh
   git clone https://github.com/usuario/EC-Sebastian-Juan-Coca.git
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   npm start
   ```

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## Licencia

Este proyecto es parte de un trabajo de final de grado y su uso está sujeto a las condiciones establecidas por el autor.
