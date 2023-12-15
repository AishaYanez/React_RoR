# React_RoR Documentation

## Introducción
Esté proyecto está centrado en la creación de una aplicación, movil para los usuarios cliente y de ordenador para el administrador.

La aplicación tiene dos objetivos:
* Permitir la gestión de las actividades por parte de los administradores.
* Y ofrecer a los clientes una forma rápida y fácil de acceder a las actividades por la empresa.

## Diagramas
### Entidades y relaciones
#### Entidades
* User: El usuario es toda aquella persona que se registra en la aplicación, este grupo está dividido en dos sub-grupos, empleados y clientes.
* Settings: Son los ajustes de la aplicación que tiene un usuario.
* Activity: Son las actividades que pone la empresa a disposición del usuario.

#### Relaciones
* User-Settings: Cada usuario tiene unos ajustes de la aplicación que puede personalizar, OneToOne.
* Activity-Coordinador(User): Cada actividad tiene un coordinador asignado, OneToOne.
* Activity-Client(User): La actividad tiene una lista de clientes que están inscritos en ella y los clientes tienen una lista de atividades en las que están inscritos, ManyToMany.
* Activity-Employee(User): La actividad tiene una lista de empleados trabajarán en ella y los empleados tienen una lista de atividades en las que deben asistir, ManyToMany.

### Diagrama entidad/relación
![Diagrama entidad/relación](/image/e_r.png)


### Diagrama relacional

![Diagrama relacional](/image/relational.png)

### Diagrama de clases
![Diagrama de clases](/image/class.png)

## Requisitos de usuario
Lista de requisitos funcionales y no funcionales del usuario.

## Casos de uso
![Diagrama de casos de uso](/image/use_case.png)

## Descripción
Descripción detallada del proyecto, su propósito y su contexto.

## Interfaces
### Diseño inicial
Capturas de pantalla o esquemas de cómo se espera que se vea la interfaz de usuario.

### Usabilidad y Accesibilidad
Detalles sobre cómo el diseño de la interfaz de usuario considera la usabilidad y accesibilidad.

## Stack Tecnológico
### Backend (Ruby on Rails)

- **Ruby (Versión 3.0.0+):** Lenguaje de programación dinámico y orientado a objetos.
  
- **Ruby on Rails (Versión 7.1.1):** Framework de desarrollo web que sigue el principio de convención sobre configuración.

- **PostgreSQL (Versión 1.1):** Sistema de gestión de bases de datos relacional.

- **Puma (Versión >= 5.0):** Servidor web de aplicación para Ruby.

- **Devise y Devise-JWT:** Gemas para la autenticación de usuarios en Ruby on Rails.

- **Active Model Serializers y JSONAPI Serializer:** Facilitan la serialización de objetos Ruby en formatos JSON API.

- **Rack CORS:** Middleware de manejo de CORS (Cross-Origin Resource Sharing) para Rails.

- **Figaro:** Gema para gestionar variables de entorno de forma segura.

- **Bcrypt (Versión ~3.1.7):** Algoritmo de hashing para el almacenamiento seguro de contraseñas.

- **Bootsnap:** Gema para reducir los tiempos de inicio mediante el almacenamiento en caché.

### Frontend (React)
- **React (Versión 18.2.0):** Biblioteca de JavaScript para construir interfaces de usuario.

- **Ant Design (Versión ^5.11.0):** Biblioteca de componentes de interfaz de usuario para React.

- **Axios (Versión ^1.6.0):** Cliente HTTP basado en promesas para realizar solicitudes HTTP.

- **React Router Dom (Versión ^6.18.0):** Librería para manejar la navegación en aplicaciones React.

- **Web Vitals (Versión ^2.1.4):** Herramienta para medir el rendimiento de las aplicaciones web.

- **Testing Library (Versión ^13.4.0):** Conjunto de herramientas para realizar pruebas unitarias en componentes React.

## Instalación
Instrucciones paso a paso para instalar y configurar el proyecto.

## Test
El test que esta aplicado es en la creación de location, para ejecturla debes pegar en la terminal el siguiente comando:

bin/rails test test/controllers/locations_controller_test.rb:14

## Postman
- [Link to postma](https://www.postman.com/speeding-spaceship-865616/workspace/still-higher/collection/29807304-c6914720-4c2a-496e-8ca6-33d53159e19f)

## Planificación
Al comienzo de cada sprint, el equipo realiza una reunión de planificación del sprint..
En esta reunión, el equipo, en esté caso yo, revisa y prioriza las tareas pendientes del backlog del producto.
El equipo selecciona las tareas que pueden completar durante el sprint, teniendo en cuenta la capacidad del equipo y la complejidad de las tareas.

## Conclusiones
Reflexiones finales sobre el proyecto, lecciones aprendidas y desafíos superados.

## Helpful Links
- [Authentication Actions in React](https://github.com/DakotaLMartinez/react-redux-auth-client/blob/main/src/actions/auth.js)

- [Rails Registrations Controller](https://github.com/DakotaLMartinez/rails-devise-jwt-tutorial/blob/main/app/controllers/users/registrations_controller.rb)

- [Devise JWT Tutorial for API-only Mode](https://dakotaleemartinez.com/tutorials/devise-jwt-api-only-mode-for-authentication/)

- [Devise Sessions Controller](https://github.com/heartcombo/devise/blob/v4.9.3/app/controllers/devise/sessions_controller.rb)

- [Guide for Uploading Images to Rails API from React](https://medium.com/swlh/upload-images-to-your-rails-api-from-react-the-easy-way-241bbe71ea85#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlNzJkYTFkZjUwMWNhNmY3NTZiZjEwM2ZkN2M3MjAyOTQ3NzI1MDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOT)
- [EduApp example](https://github.com/eduapp-project/eduapp/tree/main/backend/eduapp_db/app/controllers)