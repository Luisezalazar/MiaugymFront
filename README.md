#  MiauGym – Frontend

**MiauGym** es una aplicación web desarrollada con **React** que permite a los usuarios gestionar sus rutinas de entrenamiento, registrar sus objetivos físicos y realizar un seguimiento visual de su progreso a través de imágenes corporales.

---

##  Tecnologías utilizadas

-  **React** – Librería principal del frontend  
-  **React Router DOM** – Navegación entre páginas  
-  **Tailwind CSS** – Estilos rápidos y adaptables  
-  **JWT Authentication** – Manejo de sesiones seguras  
-  **Cloudinary** – Almacenamiento de imágenes  
-  **Vite** – Bundler para desarrollo rápido  
- **Context API + useReducer** – Manejo de estado global  

---

##  Funcionalidades principales

-  **Gestión de objetivos (Goals):**  
  Crear, editar y visualizar objetivos con posibilidad de subir imágenes del cuerpo para comparar el progreso.

-  **Rutinas personalizadas:**  
  Crear rutinas con distintos ejercicios, pesos, repeticiones y series, totalmente adaptables al usuario.

-  **Subida de imágenes con Cloudinary:**  
  Implementación del sistema de carga de imágenes mediante `multer` y la API de Cloudinary para un seguimiento visual seguro y rápido.

-  **Autenticación de usuarios:**  
  Ingreso mediante token JWT para asegurar que cada usuario solo acceda a su propia información.

-  **Modo oscuro y claro:**  
  Interfaz adaptable al tema del sistema, mejorando la experiencia visual.

---

  **Para utilizar el proyecto realice lo siguiente:**
  `npm install`

 Colocar la variable de entorno 

 VITE_BASE_URL=VITE_BASE_URL
