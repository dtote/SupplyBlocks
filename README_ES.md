# SupplyBlocks - Guía Completa de Instalación y Configuración

**Aplicación de blockchain para la orquestación de cadena de suministros**

SupplyBlocks permite a diferentes entidades (fábricas, transportistas, almacenes, minoristas) gestionar productos y entregas de forma descentralizada usando contratos inteligentes en Ethereum.

## 🚀 **ACTUALIZACIONES TECNOLÓGICAS (2024)**

Esta aplicación ha sido completamente actualizada con las tecnologías más recientes:

### **Frontend Modernizado:**
- ✅ **React 18.3.1** - API moderna con createRoot
- ✅ **Material-UI v5 (@mui/material 7.3.2)** - Componentes actualizados
- ✅ **notistack v3.0.2** - Sistema de notificaciones moderno
- ✅ **formik-mui** - Formularios compatibles con MUI v5
- ✅ **Styled Components API v5** - Estilos modernos
- ✅ **Grid2** - Sistema de layout actualizado de MUI v5

### **Mejoras Implementadas:**
- ✅ **Migración completa de makeStyles a styled components**
- ✅ **Eliminación de advertencias de deprecación**
- ✅ **Compatibilidad total con React 18**
- ✅ **Grid System actualizado con props `item` correctas**
- ✅ **ListItem `button` prop migrado a `component="div"`**
- ✅ **Hidden component reemplazado por useMediaQuery**
- ✅ **Optimización de rendimiento**
- ✅ **Corrección de errores de tipado TypeScript**
- ✅ **Sintaxis de importación ES6 moderna**
- ✅ **Compatibilidad 100% con MUI v5**

---

## 📋 **PRERREQUISITOS**

### **Software Necesario:**
- **Node.js 18.x** (OBLIGATORIO - otras versiones pueden causar problemas)
- **Git** para clonar el repositorio
- **MetaMask** (extensión del navegador)

### **Verificar Node.js:**
```bash
node --version  # Debe mostrar v18.x.x
npm --version   # Debe mostrar 8.x.x o superior
```

### **Instalar Node.js 18 (si es necesario):**
```bash
# Con nvm (recomendado)
nvm install 18
nvm use 18

# Verificar instalación
node --version
```

---

## 🚀 **INSTALACIÓN PASO A PASO**

### **PASO 1: CLONAR Y CONFIGURAR EL PROYECTO**

```bash
# Clonar repositorio
git clone https://github.com/dtote/SupplyBlocks.git
cd SupplyBlocks

# Asegurar Node.js 18
nvm use 18

# Instalar dependencias del proyecto
npm install

# Instalar Ganache CLI globalmente
npm install -g ganache-cli
```

### **PASO 2: INICIAR LA APLICACIÓN (3 TERMINALES NECESARIAS)**

#### **Terminal 1 - Blockchain Local (Ganache):**
```bash
cd SupplyBlocks
nvm use 18

# Iniciar Ganache con configuración específica
npx ganache-cli --port 7545 --network-id 1337 --gas-limit 6721975 --gas-price 20000000000 --accounts 10 --defaultBalanceEther 1000 --deterministic
```

> **⚠️ IMPORTANTE:** Deja esta terminal corriendo. Ganache debe estar activo para que funcione la aplicación.

#### **Terminal 2 - Desplegar Contratos Inteligentes:**
```bash
cd SupplyBlocks

# Esperar que Ganache esté completamente iniciado (unos segundos)
# Luego desplegar los contratos
npm run migrate
```

> **✅ Éxito:** Deberías ver mensajes como "Replacing 'Manager'" y direcciones de contratos.

#### **Terminal 3 - Aplicación Web:**
```bash
cd SupplyBlocks

# Esperar que los contratos estén desplegados
# Luego iniciar la aplicación React
npm start
```

> **✅ Éxito:** La aplicación se abrirá automáticamente en `http://localhost:3000`

---

## 🦊 **CONFIGURACIÓN DE METAMASK**

### **PASO 1: INSTALAR METAMASK**
- Descargar desde [metamask.io](https://metamask.io)
- Crear nueva wallet o importar existente
- **Recordar la contraseña** que configures

### **PASO 2: CONFIGURAR RED PERSONALIZADA**

```
1. Abrir MetaMask
2. Clic en selector de red (arriba)
3. "Add network" → "Add a network manually"
4. Llenar EXACTAMENTE estos datos:

Network Name: Ganache Local
RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Currency Symbol: ETH
Block Explorer URL: (dejar vacío)

5. "Save"
6. Seleccionar "Ganache Local" en el selector de red
```

### **PASO 3: IMPORTAR CUENTAS NECESARIAS**

**Necesitas importar 4 cuentas adicionales para usar todas las funcionalidades (la Admin ya está disponible):**

#### **Claves Privadas:**

> **⚠️ IMPORTANTE:** La cuenta Admin se importa automáticamente al usar Ganache con `--deterministic`, por lo que solo necesitas importar las otras 4 cuentas manualmente.

```
Admin (Account 0):     0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d (SE IMPORTA AUTOMÁTICAMENTE)
Factory (Account 1):   0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1
Transport (Account 2): 0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c
Warehouse (Account 3): 0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913
Retailer (Account 4):  0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743
```

#### **Proceso de Importación:**
```
1. MetaMask → Account menu (círculo arriba derecha) → "Import Account"
2. Pegar clave privada completa (con 0x incluido)
3. "Import"
4. Repetir para las 4 cuentas (Factory, Transport, Warehouse, Retailer)
5. Renombrar las cuentas para identificarlas fácilmente:
   - Account 1 → "Admin" (ya disponible automáticamente)
   - Account 2 → "Factory" 
   - Account 3 → "Transport"
   - Account 4 → "Warehouse"
   - Account 5 → "Retailer"
```

> **💡 Tip:** Si las cuentas no se importan inmediatamente, cierra el navegador completamente, ábrelo de nuevo e intenta otra vez.

---

## 🎯 **USAR LA APLICACIÓN**

### **ACCESO COMO ADMINISTRADOR**

```
1. MetaMask → Cambiar a "Admin" (Account 1)
2. Refrescar página (F5)
3. Ir a: http://localhost:3000
4. Deberías ver botón "Dashboard"
5. Clic en "Dashboard" para acceder al panel de administración
```

### **REGISTRAR NUEVAS ENTIDADES**

**Para cada tipo de entidad (Factory, Transport, Warehouse, Retailer):**

```
1. MetaMask → Cambiar a la cuenta correspondiente
2. Refrescar página (F5)
3. Ir a: http://localhost:3000/sign-up
4. Llenar el formulario:
   - Company Name: [Nombre de tu empresa]
   - Email: [email@ejemplo.com]
   - Phone: [123456789]
   - Company type: [Seleccionar el tipo correcto]
   - ✅ Marcar checkbox de awareness
5. Clic en "Send petition"
6. Deberías ver mensaje "Success"
```

### **APROBAR SOLICITUDES (COMO ADMIN)**

```
1. MetaMask → Cambiar a "Admin"
2. Refrescar página (F5)
3. Dashboard → Companies
4. Ver sección "Pending" con las solicitudes pendientes
5. Clic en cada CompanyCard para aprobar
6. Ver mensaje "Approved"
7. La entidad se mueve a la sección "Companies" (aprobadas)
```

---

## 🔄 **CAMBIAR ENTRE MÚLTIPLES CUENTAS**

### **PROBLEMA COMÚN: CACHÉ DE CUENTAS**

Cuando trabajas con múltiples cuentas (varias factories, transports, etc.), la aplicación puede **no detectar correctamente** el cambio de cuenta en MetaMask debido a problemas de caché.

### **SÍNTOMAS:**
- Cambias de cuenta en MetaMask pero la aplicación sigue mostrando la cuenta anterior
- Una cuenta se comporta como otra (ej: Factory se comporta como Admin)
- No puedes acceder al Dashboard con una cuenta que debería funcionar

### **SOLUCIÓN: PROCEDIMIENTO CORRECTO PARA CAMBIAR CUENTAS**

#### **Método 1: Hard Refresh (RECOMENDADO)**
```
1. MetaMask → Cambiar a la cuenta deseada
2. Hard Refresh: 
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R
3. Esperar 2-3 segundos
4. Verificar que funciona correctamente
```

#### **Método 2: Refresh Normal + Verificación**
```
1. MetaMask → Cambiar a la cuenta deseada
2. Refrescar página (F5)
3. F12 → Console → Ejecutar: window.ethereum.selectedAddress
4. Verificar que la dirección coincide con la cuenta seleccionada
5. Si NO coincide → Repetir pasos 2-4
```

#### **Método 3: Desconectar/Reconectar MetaMask**
```
1. MetaMask → Settings → Connected sites
2. Desconectar localhost:3000
3. Ir a http://localhost:3000
4. Conectar MetaMask nuevamente
5. Aprobar conexión con la cuenta correcta
```

### **RESET COMPLETO DE CACHÉ (SI NADA FUNCIONA)**

#### **Limpiar Caché de MetaMask:**
```
1. MetaMask → Settings (⚙️) → Advanced
2. "Reset Account" 
3. Confirmar (NO borra cuentas, solo limpia caché)
4. Refrescar página en el navegador
5. Reconectar MetaMask si es necesario
```

#### **Limpiar Caché del Navegador:**
```
1. F12 → Application/Storage tab
2. "Clear storage" → "Clear site data"
3. Refrescar página
4. Reconectar MetaMask
```

### **WORKFLOW RECOMENDADO PARA MÚLTIPLES CUENTAS**

```
1. Planificar qué tareas hacer con cada cuenta
2. MetaMask → Cambiar a cuenta específica
3. Hard Refresh (Ctrl+Shift+R / Cmd+Shift+R)
4. Verificar que la aplicación detecta la cuenta correcta
5. Realizar las tareas necesarias
6. Repetir proceso para siguiente cuenta
```

### **VERIFICACIÓN RÁPIDA**

**Para confirmar que estás en la cuenta correcta:**
```
F12 → Console → window.ethereum.selectedAddress
```

**Direcciones de referencia:**
```
Admin:      0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1
Factory 1:  0xffcf8fdee72ac11b5c542428b35eef5769c409f0
Transport:  0x22d491bde2303f2f43325b2108d26f1eaba1e32b
Warehouse:  0xe11ba2b4d45eaed5996cd0823791e0c93114882d
Retailer:   0xd03ea8624c8c5987235048901fb614fdca89b117
```

> **💡 Consejo:** Este comportamiento es **normal** en aplicaciones Web3 locales. Siempre usa Hard Refresh al cambiar cuentas para evitar problemas.

---

## ✅ **VERIFICACIÓN DE FUNCIONAMIENTO**

### **URLs Importantes:**
- **Aplicación Principal:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard
- **Registro:** http://localhost:3000/sign-up

### **Checklist de Verificación:**
- [ ] **Ganache:** Corriendo en puerto 7545
- [ ] **React:** Corriendo en puerto 3000
- [ ] **MetaMask:** Conectado a "Ganache Local"
- [ ] **Admin:** Puede acceder al Dashboard sin errores
- [ ] **Otras cuentas:** Pueden registrarse en Sign Up
- [ ] **Solicitudes:** Aparecen en Dashboard como "Pending"
- [ ] **Aprobación:** Admin puede aprobar solicitudes

---

## 🚨 **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Error: "Internal JSON-RPC error" o "header not found"**
```
Causa: MetaMask tiene cache de blockchain anterior
Solución:
1. MetaMask → Settings → Advanced → "Reset Account"
2. Refrescar página (F5)
3. Reconectar MetaMask si es necesario
```

### **Error: "Unauthorized error" en Dashboard**
```
Causa: No estás conectado como Admin o red incorrecta
Solución:
1. Verificar que MetaMask esté en "Ganache Local"
2. Verificar que estés en la cuenta "Admin"
3. Refrescar página (F5)
```

### **Error: No aparecen solicitudes en "Pending"**
```
Causa: Las solicitudes se enviaron desde cuentas incorrectas
Solución:
1. Verificar que cada solicitud se envió desde su cuenta correspondiente
2. Verificar que el Admin esté en la cuenta correcta
3. Refrescar página como Admin
```

### **Error: Una cuenta se comporta como otra (ej: Factory como Admin)**
```
Causa: Problema de caché entre MetaMask y la aplicación
Solución:
1. Ver sección "CAMBIAR ENTRE MÚLTIPLES CUENTAS" arriba
2. Usar Hard Refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. Si persiste: Reset Account en MetaMask
```

### **Las cuentas no se importan en MetaMask**
```
Solución:
1. Cerrar navegador completamente
2. Reabrir navegador
3. Abrir MetaMask
4. Verificar que las cuentas aparezcan
5. Si no: intentar importar una por una, esperando entre cada una
```

### **Ganache se desconecta**
```
Verificación:
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://127.0.0.1:7545

Si no responde:
1. Reiniciar Ganache con el comando npx ganache-cli...
2. Redesplegar contratos: npm run migrate
3. Reset Account en MetaMask
```

---

## 🔧 **COMANDOS ÚTILES**

### **Reiniciar Completamente:**
```bash
# Matar procesos existentes
pkill -f ganache
pkill -f "npm start"

# Reiniciar en orden:
# Terminal 1:
npx ganache-cli --port 7545 --network-id 1337 --gas-limit 6721975 --gas-price 20000000000 --accounts 10 --defaultBalanceEther 1000 --deterministic

# Terminal 2:
npm run migrate

# Terminal 3:
npm start
```

### **Verificar Estado:**
```bash
# Verificar Ganache
curl http://127.0.0.1:7545

# Verificar React
curl http://localhost:3000

# Ver procesos corriendo
lsof -i :7545  # Ganache
lsof -i :3000  # React
```

---

## 📱 **FUNCIONALIDADES DE LA APLICACIÓN**

### **Tipos de Usuario:**
- **Admin:** Aprueba entidades, ve todas las empresas y productos
- **Factory:** Crea y prepara productos para envío
- **Transport:** Recoge productos y los transporta
- **Warehouse:** Almacena productos temporalmente
- **Retailer:** Recibe productos finales para venta

### **Flujo Típico:**
1. **Registro:** Cada entidad se registra y espera aprobación del Admin
2. **Aprobación:** Admin aprueba las entidades registradas
3. **Creación de Productos:** Factory crea productos
4. **Logística:** Products pasan por Transport → Warehouse → Retailer
5. **Trazabilidad:** Cada paso queda registrado en blockchain

---

## 🎉 **¡LISTO!**

Si has seguido todos los pasos correctamente, deberías tener:
- ✅ Ganache corriendo con blockchain local
- ✅ Contratos inteligentes desplegados
- ✅ Aplicación React funcionando
- ✅ MetaMask configurado con 5 cuentas
- ✅ Admin con acceso completo al sistema

**¡La aplicación SupplyBlocks está lista para usar!**

---

## 📞 **Soporte**

Si encuentras problemas no cubiertos en esta guía:
1. Verifica que todos los prerrequisitos estén cumplidos
2. Revisa la sección de solución de problemas
3. Asegúrate de que Ganache, contratos y React estén corriendo
4. Verifica la configuración de MetaMask

**Versiones probadas:**
- Node.js: 18.20.8
- npm: 8.x.x
- MetaMask: Última versión
- Ganache CLI: Última versión