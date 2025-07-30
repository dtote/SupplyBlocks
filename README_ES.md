# SupplyBlocks - Guía de Configuración

Aplicación de blockchain para la orquestación de cadena de suministros

## 🚀 Configuración Rápida

### Prerrequisitos

- **Node.js 18.x**
- **Ganache** (blockchain local)
- **MetaMask** (extensión del navegador)

> **Nota:** TypeScript 4.9.5 se instala automáticamente (compatible con react-scripts 5.0.1)

### Pasos para hacer funcionar la app

#### 1. **Instalar dependencias**

```bash
git clone https://github.com/dtote/SupplyBlocks.git
cd SupplyBlocks
npm install
```

#### 2. **Iniciar Ganache**

- Abrir Ganache
- Asegurar que esté en puerto **7545**

#### 3. **Desplegar contratos**

```bash
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
- **IMPORTANTE:** Verificar que MetaMask esté en red "Ganache"

## ✅ Checklist

- [ ] Node.js 18.x
- [ ] Ganache corriendo (puerto 7545)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Contratos desplegados (`npm run migrate`)
- [ ] MetaMask en red "Ganache"
- [ ] Wallet conectada

¡Listo! La aplicación debería funcionar. 🎉
