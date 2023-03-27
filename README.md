
# Proyecto Evaluativo Integrador

Tercer Proyecto - Akademi 2023 - Vortex-IT

Sistema de gestión de activos y empleados (activos asignados a sus empleados) que se encuentran trabajando de manera remota, por lo que dichos activos se encuentran distribuidos por todo el país.

## Instalación

1. Clonar este repositorio

2. Para proyecto backend ejecutar npm install en la terminal (instalación de dependencias)

3. Configurar las variables de entorno en archivo .env:

- DB_HOST=localhost
- DB_NAME=consultora_vortex_it
- DB_USER=root
- API_PORT=8000


4. Ejecutar npm run start:dev en la terminal para iniciar la aplicación.

5. Para proyecto frontend ejecutar npm install en la terminal (instalación de dependencias)

6. Ejecutar npm start en la terminal para iniciar la aplicación.

## Uso

1. Aplicación backend disponible en http://localhost:8000

2. Aplicación frontend disponible en http://localhost:3000

## Esquema de Base de Datos

#### Creación de Base de Datos 
CREATE DATABASE consultora_vortex_it;

#### Creación de tabla Employees
CREATE TABLE `employees` (
  `id_employee` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `cuit` bigint(20) NOT NULL,
  `team_id` int(11) NOT NULL,
  `join_date` date NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#### Creación de tabla Assets
CREATE TABLE `assets` (
  `id_asset` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `brand` varchar(50) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `purchase_date` date NOT NULL,
  `id_employee` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

