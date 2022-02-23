# Guía de Instalación del SERVIDOR

1-	Para la ejecución del proyecto se utilizó el editor de código fuente VisualCode aunque puede utilizarse cualquier otro que desee

2-	Descargar e instalar el entorno de ejecución Node JS:

    https://nodejs.org/es/

3-	Clonar el repositorio (o descargar) donde se encuentra todo el proyecto y las utilidades

    https://github.com/gonza-folli/dwfs-project3

4-	En el editor de código utilizado, abrir la terminal(consola) ubicándose en la raíz del proyecto descargado y ejecutar la instrucción

    npm i

Esto generara que el sistema detecte todas las instancias listadas en el archivo package.json (necesarias para la ejecución del proyecto) y las instale localmente utilizando el gestor de descarga provisto por NodeJs


# Guía de Instalación de la BASE de DATOS

1-	Descargar e Instalar un gestor de base de datos MYSQL, recomiendo utilizar XAMPP el cual se puede obtener en el siguiente link:

https://www.apachefriends.org/download.html

2-	Navegar en consola hasta la raíz del proyecto, carpeta “utilities” y ejecutar los archivos 

    “delilah.sql” 

y luego el archivo

    “InitialInsertDataSQL.sql” 

Éstos archivos crearan las tablas para la base de dato necesarias para el proyecto y el segundo archivo hará un volcado inicial de información en dichas tablas


# Configuraciones
1-	En la Raíz del proyecto “utilities/dbConnection.js” se encuentran los datos para conectar a la base de datos Mysql, dichos datos deben COINCIDIR con las configuraciones en XAMPP 

        database = {
            NAME: 'delilah',
            HOST: 'localhost',
            USER: 'root',
            // PASSWORD: '5555',
            dialect: 'mysql',
            PORT: 3306
        }

2-	El puerto Utilizado para hostear el servidor es el PORT 3000 y para acceder al mismo se utiliza el link:

    localhost:3000/

3-	El proyecto tiene seguridad JWT cuya contraseña de encriptación es:

    jwtSecret = 'D3l1l4h';


# Levantar Servidor
Para iniciar la API se debe acceder a la raíz del proyecto en la Consola del Visual Code y ejecutar el comando:

    node .\app.js


# Testear la API
Para testear los distintos Endpoints se puede utilizar Postman cuyo link de descarga es: 

    https://www.postman.com/downloads/

En la raíz del proyecto “utilities/Delilah.postman_collection.json” se puede utilizar dicho archivo para ser importado en Postman y probar todos los Endpoins listados


# Documentación
Toda la documentación relativa a los Endpoints de la Api se encuentra en la raíz del proyecto, carpeta “utilities/ gonza-folli-DelilahResto-1.0.0-resolved.yaml”.
Dicha documentación fue elaborada con Swagger
