# SupplyBlocks - Guía de Configuración

Aplicación de blockchain para la orquestación de cadena de suministros

## 🚀 Configuración Rápida

### Prerrequisitos

- **Node.js 18.x** (obligatorio)
- **Ganache** (blockchain local)
- **MetaMask** (extensión del navegador)

### Pasos

#### 1. **Instalar dependencias**

```bash
git clone https://github.com/dtote/SupplyBlocks.git
cd SupplyBlocks
npm install
```

#### 2. **Iniciar Ganache**

- Abrir Ganache
- Asegurar que esté en puerto **7545**

#### 3. **Compilar y desplegar contratos**

```bash
# Compilar contratos y generar tipos TypeScript
npm run postinstall

# Desplegar contratos (migraciones en JavaScript)
npm run migrate
```

#### 4. **Configurar MetaMask**

- Abrir MetaMask
- Clic en selector de red → "Add network"
- Configurar:
  - **Network Name:** Ganache
  - **RPC URL:** `http://127.0.0.1:7545`
  - **Chain ID:** `1337`
  - **Currency Symbol:** ETH
- Importar cuenta desde Ganache (clave privada)

#### 5. **Iniciar aplicación**

```bash
npm start
```

#### 6. **Conectar wallet**

- Ir a `http://localhost:3000`
- Clic en "Connect Wallet"
- **IMPORTANTE:** Verificar que MetaMask esté en red "Ganache" (no Mainnet)

## 🔧 Solución de Problemas

### Error "Returned values aren't valid"

```bash
# Verificar Ganache
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://127.0.0.1:7545

# Redeployar contratos
npm run migrate
```

### Error de TypeScript

```bash
# Regenerar tipos de contratos
npm run generate-types
```

### Error "Module not found"

- Verificar Node.js 18.x: `node --version`
- Cambiar versión: `nvm use 18`
- Reinstalar dependencias: `npm install`

### Error de compilación de contratos

```bash
# Limpiar y recompilar
rm -rf src/contracts
npm run postinstall
```

### Error de migraciones TypeScript

Si encuentras errores de tipos en las migraciones, las migraciones están configuradas en JavaScript para evitar problemas de compatibilidad:

```bash
# Las migraciones están en JavaScript, no TypeScript
# Archivos: migrations/1_initial_migration.js, migrations/2_deploy_contracts.js
```

## 📁 Estructura del Proyecto

```
SupplyBlocks/
├── contracts/          # Contratos Solidity
│   ├── Entity.sol
│   ├── Manager.sol
│   ├── Product.sol
│   └── TypesLibrary.sol
├── migrations/         # Migraciones JavaScript
├── src/
│   ├── components/     # Componentes React
│   ├── contexts/       # Contextos de React
│   ├── hooks/          # Hooks personalizados
│   ├── types/          # Tipos TypeScript generados
│   ├── utils/          # Utilidades
│   └── views/          # Vistas de la aplicación
└── truffle-config.js   # Configuración de Truffle
```

## 🛠️ Scripts Disponibles

- `npm start` - Inicia la aplicación de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run migrate` - Compila y despliega contratos
- `npm run generate-types` - Genera tipos TypeScript desde contratos
- `npm run postinstall` - Compila contratos y genera tipos automáticamente

## ✅ Checklist

- [ ] Node.js 18.x
- [ ] Ganache corriendo (puerto 7545)
- [ ] Contratos compilados y desplegados
- [ ] Tipos TypeScript generados
- [ ] MetaMask en red "Ganache"
- [ ] Wallet conectada

¡Listo! La aplicación debería funcionar. 🎉

## 🔄 Flujo de Desarrollo

1. **Modificar contratos** → `npm run postinstall`
2. **Desplegar cambios** → `npm run migrate`
3. **Desarrollar frontend** → `npm start`
