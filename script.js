const page = document.body.dataset.page || 'login';

const STORAGE_KEYS = {
  users: 'uph_users_v1',
  inventory: 'uph_inventory_v1',
  areas: 'uph_areas_v1',
  session: 'uph_session_v1'
};

const defaultUsers = [
  { id: 1, name: 'Administrador', username: 'admin', password: 'admin123', role: 'admin', status: 'Activo' },
  { id: 2, name: 'Operador', username: 'operador', password: 'operador123', role: 'operador', status: 'Activo' }
];

const defaultAreas = [
  { id: 1, name: 'ROUTER', type: 'Infraestructura', status: 'Asignada' },
  { id: 2, name: 'BIBLIOTECA', type: 'Área de estudio', status: 'Disponible' },
  { id: 3, name: 'AULA A#1', type: 'Aula', status: 'Asignada' },
  { id: 4, name: 'AULA A#2', type: 'Aula', status: 'Disponible' },
  { id: 5, name: 'AULA A#3', type: 'Aula', status: 'Asignada' },
  { id: 6, name: 'AULA A#4', type: 'Aula', status: 'Disponible' },
  { id: 7, name: 'SALÓN DE JUEGOS', type: 'Salón', status: 'Asignada' },
  { id: 8, name: 'AULA A#6', type: 'Aula', status: 'Disponible' },
  { id: 9, name: 'AULA A#7', type: 'Aula', status: 'Asignada' },
  { id: 10, name: 'AULA A#8', type: 'Aula', status: 'Disponible' },
  { id: 11, name: 'AULA A#9', type: 'Aula', status: 'Asignada' },
  { id: 12, name: 'CÁMARA DE GESTIÓN', type: 'Oficina', status: 'Asignada' },
  { id: 13, name: 'DIRECCIÓN OFICINA', type: 'Oficina', status: 'Asignada' },
  { id: 14, name: 'LAB. QUÍMICA', type: 'Laboratorio', status: 'Disponible' },
  { id: 15, name: 'LAB. INFORMÁTICA', type: 'Laboratorio', status: 'Asignada' },
  { id: 16, name: 'SALÓN DE USO', type: 'Salón', status: 'Disponible' },
  { id: 17, name: 'BODEGA', type: 'Almacén', status: 'Asignada' },
  { id: 18, name: 'CLÍNICA PSIC', type: 'Atención', status: 'Disponible' }
];

const defaultInventory = [
  {
    id: 1,
    no: 1,
    ubicacion: 'Laboratorio de Redes',
    descripcion: 'Laptop Dell Latitude 5430',
    clasificacion: 'Equipo de cómputo',
    codigo: 'UPH-001',
    estado: 'Activo',
    marca: 'Dell',
    modelo: 'Latitude 5430',
    ram: '16 GB',
    tarjetaGrafica: 'Intel Iris Xe',
    serial: 'DLX-5430-2024-001',
    sistemaOperativo: 'Windows 11 Pro',
    disco: '512 GB SSD',
    foto: 'https://images.unsplash.com/photo-1496181133206-9fa9a9c9b6a6?auto=format&fit=crop&w=500&q=80',
    ultimaModificacion: '2026-08-12',
    fechaRecibida: '2024-03-18',
    actaEntrega: 'ACTA-2024-015'
  },
  {
    id: 2,
    no: 2,
    ubicacion: 'Sala de Docentes',
    descripcion: 'Desktop HP ProDesk 600 G5',
    clasificacion: 'Equipo de cómputo',
    codigo: 'UPH-002',
    estado: 'Disponible',
    marca: 'HP',
    modelo: 'ProDesk 600 G5',
    ram: '32 GB',
    tarjetaGrafica: 'Intel UHD Graphics 630',
    serial: 'HP-600G5-2041',
    sistemaOperativo: 'Windows 10 Pro',
    disco: '1 TB SSD',
    foto: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80',
    ultimaModificacion: '2026-08-07',
    fechaRecibida: '2024-01-15',
    actaEntrega: 'ACTA-2024-008'
  },
  {
    id: 3,
    no: 3,
    ubicacion: 'Laboratorio de Diseño',
    descripcion: 'Workstation Lenovo ThinkStation P360',
    clasificacion: 'Servidor de trabajo',
    codigo: 'UPH-003',
    estado: 'En mantenimiento',
    marca: 'Lenovo',
    modelo: 'ThinkStation P360',
    ram: '64 GB',
    tarjetaGrafica: 'NVIDIA RTX A4000',
    serial: 'LEN-TSP360-8890',
    sistemaOperativo: 'Windows 11 Pro',
    disco: '2 TB NVMe',
    foto: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80',
    ultimaModificacion: '2026-07-21',
    fechaRecibida: '2023-11-30',
    actaEntrega: 'ACTA-2023-102'
  },
  {
    id: 4,
    no: 4,
    ubicacion: 'Oficina de TI',
    descripcion: 'Monitor LG UltraWide 34"',
    clasificacion: 'Periférico',
    codigo: 'UPH-004',
    estado: 'Asignado',
    marca: 'LG',
    modelo: '34WN750',
    ram: '-',
    tarjetaGrafica: '-',
    serial: 'LG-34WN750-7711',
    sistemaOperativo: '-',
    disco: '-',
    foto: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80',
    ultimaModificacion: '2026-08-14',
    fechaRecibida: '2025-02-10',
    actaEntrega: 'ACTA-2025-021'
  },
  {
    id: 5,
    no: 5,
    ubicacion: 'Aula 2B',
    descripcion: 'Proyector Epson EB-X06',
    clasificacion: 'Equipo audiovisual',
    codigo: 'UPH-005',
    estado: 'Activo',
    marca: 'Epson',
    modelo: 'EB-X06',
    ram: '-',
    tarjetaGrafica: '-',
    serial: 'EPS-EBX06-0102',
    sistemaOperativo: '-',
    disco: '-',
    foto: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
    ultimaModificacion: '2026-08-09',
    fechaRecibida: '2024-06-22',
    actaEntrega: 'ACTA-2024-040'
  },
  {
    id: 6,
    no: 6,
    ubicacion: 'Administración',
    descripcion: 'Impresora multifuncional Canon G3010',
    clasificacion: 'Periférico',
    codigo: 'UPH-006',
    estado: 'Dado de baja',
    marca: 'Canon',
    modelo: 'G3010',
    ram: '-',
    tarjetaGrafica: '-',
    serial: 'CAN-G3010-6612',
    sistemaOperativo: '-',
    disco: '-',
    foto: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=500&q=80',
    ultimaModificacion: '2026-05-11',
    fechaRecibida: '2022-08-19',
    actaEntrega: 'ACTA-2022-072'
  }
];

const elements = {
  loginScreen: document.getElementById('loginScreen'),
  appScreen: document.getElementById('appScreen'),
  loginForm: document.getElementById('loginForm'),
  loginError: document.getElementById('loginError'),
  sessionUser: document.getElementById('sessionUser'),
  sessionRole: document.getElementById('sessionRole'),
  logoutBtn: document.getElementById('logoutBtn'),
  newAssetBtn: document.getElementById('newAssetBtn'),
  inventorySearch: document.getElementById('inventorySearch'),
  statusFilter: document.getElementById('statusFilter'),
  inventoryTableBody: document.getElementById('inventoryTableBody'),
  statsGrid: document.getElementById('statsGrid'),
  computersSearch: document.getElementById('computersSearch'),
  computersStatusFilter: document.getElementById('computersStatusFilter'),
  computersTableBody: document.getElementById('computersTableBody'),
  computersStatsGrid: document.getElementById('computersStatsGrid'),
  areasGrid: document.getElementById('areasGrid'),
  usersTableBody: document.getElementById('usersTableBody'),
  reportSummary: document.getElementById('reportSummary'),
  reportAreas: document.getElementById('reportAreas'),
  assetModal: document.getElementById('assetModal'),
  assetForm: document.getElementById('assetForm'),
  assetModalTitle: document.getElementById('assetModalTitle'),
  assetUbicacion: document.getElementById('assetUbicacion'),
  assetDescripcion: document.getElementById('assetDescripcion'),
  assetClasificacion: document.getElementById('assetClasificacion'),
  assetCodigo: document.getElementById('assetCodigo'),
  assetEstado: document.getElementById('assetEstado'),
  assetMarca: document.getElementById('assetMarca'),
  assetModelo: document.getElementById('assetModelo'),
  assetRam: document.getElementById('assetRam'),
  assetTarjeta: document.getElementById('assetTarjeta'),
  assetSerial: document.getElementById('assetSerial'),
  assetSO: document.getElementById('assetSO'),
  assetDisco: document.getElementById('assetDisco'),
  assetFotoFile: document.getElementById('assetFotoFile'),
  assetFotoExisting: document.getElementById('assetFotoExisting'),
  assetFechaRecibida: document.getElementById('assetFechaRecibida'),
  assetActaFile: document.getElementById('assetActaFile'),
  assetActaExisting: document.getElementById('assetActaExisting'),
  assetId: document.getElementById('assetId'),
  areaModal: document.getElementById('areaModal'),
  areaForm: document.getElementById('areaForm'),
  areaModalTitle: document.getElementById('areaModalTitle'),
  areaId: document.getElementById('areaId'),
  areaName: document.getElementById('areaName'),
  areaType: document.getElementById('areaType'),
  areaEstado: document.getElementById('areaEstado'),
  userModal: document.getElementById('userModal'),
  userForm: document.getElementById('userForm'),
  userModalTitle: document.getElementById('userModalTitle'),
  userId: document.getElementById('userId'),
  userName: document.getElementById('userName'),
  userUsername: document.getElementById('userUsername'),
  userPassword: document.getElementById('userPassword'),
  userRole: document.getElementById('userRole'),
  userStatus: document.getElementById('userStatus'),
  navButtons: document.querySelectorAll('.nav-btn')
};

const state = {
  users: loadData(STORAGE_KEYS.users, defaultUsers),
  inventory: loadData(STORAGE_KEYS.inventory, defaultInventory),
  areas: loadData(STORAGE_KEYS.areas, defaultAreas),
  session: loadData(STORAGE_KEYS.session, null),
  activeSection: 'inventory'
};

function loadData(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveData(key, payload) {
  localStorage.setItem(key, JSON.stringify(payload));
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString + 'T00:00:00');
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('es-HN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

function isDataUrl(value) {
  return typeof value === 'string' && value.startsWith('data:');
}

function toAttachmentLink(value, label) {
  if (!value) return '-';
  if (isDataUrl(value)) {
    return `<a href="${value}" target="_blank" rel="noreferrer">${label}</a>`;
  }
  return `<a href="${value}" target="_blank" rel="noreferrer">${label}</a>`;
}

function statusClass(status) {
  const map = {
    'Activo': 'activo',
    'Disponible': 'disponible',
    'Asignado': 'asignado',
    'En mantenimiento': 'en-mantenimiento',
    'Dado de baja': 'dado-baja'
  };
  return map[status] || 'activo';
}

function getRoleLabel(role) {
  const map = { admin: 'Administrador', operador: 'Operador', soporte: 'Soporte' };
  return map[role] || role;
}

function setSession(user) {
  state.session = user;
  saveData(STORAGE_KEYS.session, user);
  if (elements.sessionUser) elements.sessionUser.textContent = user ? user.name : '-';
  if (elements.sessionRole) elements.sessionRole.textContent = user ? getRoleLabel(user.role) : '-';
}

function ensureDefaults() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) saveData(STORAGE_KEYS.users, defaultUsers);
  if (!localStorage.getItem(STORAGE_KEYS.inventory)) saveData(STORAGE_KEYS.inventory, defaultInventory);
  if (!localStorage.getItem(STORAGE_KEYS.areas)) saveData(STORAGE_KEYS.areas, defaultAreas);
}

function validateLogin(username, password) {
  const user = state.users.find((item) => item.username === username && item.password === password && item.status === 'Activo');
  return user || null;
}

function renderStats() {
  if (!elements.statsGrid) return;

  const total = state.inventory.length;
  const activos = state.inventory.filter((item) => item.estado === 'Activo').length;
  const asignados = state.inventory.filter((item) => item.estado === 'Asignado').length;
  const mantenimiento = state.inventory.filter((item) => item.estado === 'En mantenimiento').length;

  const stats = [
    { label: 'Total', value: total, color: '#5b5ce6' },
    { label: 'Activos', value: activos, color: '#22c55e' },
    { label: 'Asignados', value: asignados, color: '#8b5cf6' },
    { label: 'Mantenimiento', value: mantenimiento, color: '#f59e0b' }
  ];

  elements.statsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <span class="label">${stat.label}</span>
      <div class="value">
        <span>${stat.value}</span>
        <span class="dot" style="background:${stat.color};"></span>
      </div>
    </article>
  `).join('');
}

function renderInventory() {
  if (!elements.inventoryTableBody || !elements.inventorySearch || !elements.statusFilter) return;

  const searchText = elements.inventorySearch.value.trim().toLowerCase();
  const pickedStatus = elements.statusFilter.value;

  let items = state.inventory.filter((item) => {
    const hayTexto = !searchText || [
      item.ubicacion,
      item.descripcion,
      item.clasificacion,
      item.codigo,
      item.estado,
      item.marca,
      item.modelo,
      item.serial
    ].join(' ').toLowerCase().includes(searchText);

    const hayEstado = pickedStatus === 'todos' || item.estado === pickedStatus;
    return hayTexto && hayEstado;
  });

  if (!items.length) {
    elements.inventoryTableBody.innerHTML = '<tr><td colspan="18" class="empty-state">No se encontraron activos con esos filtros.</td></tr>';
    return;
  }

  elements.inventoryTableBody.innerHTML = items.map((item) => `
    <tr>
      <td>${item.no}</td>
      <td>${item.ubicacion}</td>
      <td>${item.descripcion}</td>
      <td>${item.clasificacion}</td>
      <td><span class="item-code">${item.codigo}</span></td>
      <td><span class="badge ${statusClass(item.estado)}">${item.estado}</span></td>
      <td>${item.marca || '-'}</td>
      <td>${item.modelo || '-'}</td>
      <td>${item.ram || '-'}</td>
      <td>${item.tarjetaGrafica || '-'}</td>
      <td>${item.serial || '-'}</td>
      <td>${item.sistemaOperativo || '-'}</td>
      <td>${item.disco || '-'}</td>
      <td>
        <div class="photo-box">
          <img src="${item.foto || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'}" alt="${item.descripcion}" />
        </div>
      </td>
      <td>${formatDate(item.ultimaModificacion)}</td>
      <td>${formatDate(item.fechaRecibida)}</td>
      <td>${toAttachmentLink(item.actaEntrega, 'Ver archivo')}</td>
      <td>
        <div class="action-group">
          <button class="action-btn edit" data-action="edit" data-id="${item.id}">Editar</button>
          <button class="action-btn status" data-action="status" data-id="${item.id}">Estado</button>
          <button class="action-btn delete" data-action="delete" data-id="${item.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderComputers() {
  if (!elements.computersTableBody || !elements.computersSearch || !elements.computersStatusFilter) return;

  const searchText = elements.computersSearch.value.trim().toLowerCase();
  const pickedStatus = elements.computersStatusFilter.value;

  // Filtrar solo computadoras: Equipo de cómputo y Servidor de trabajo
  let computers = state.inventory.filter((item) => {
    const isComputer = item.clasificacion && (
      item.clasificacion.includes('Equipo de cómputo') || 
      item.clasificacion.includes('Servidor de trabajo')
    );
    
    if (!isComputer) return false;

    const hayTexto = !searchText || [
      item.ubicacion,
      item.descripcion,
      item.marca,
      item.modelo,
      item.serial
    ].join(' ').toLowerCase().includes(searchText);

    const hayEstado = pickedStatus === 'todos' || item.estado === pickedStatus;
    return hayTexto && hayEstado;
  });

  if (!computers.length) {
    elements.computersTableBody.innerHTML = '<tr><td colspan="14" class="empty-state">No se encontraron computadoras con esos filtros.</td></tr>';
    return;
  }

  elements.computersTableBody.innerHTML = computers.map((item) => `
    <tr>
      <td>${item.no}</td>
      <td>${item.ubicacion}</td>
      <td>${item.descripcion}</td>
      <td>${item.marca || '-'}</td>
      <td>${item.modelo || '-'}</td>
      <td>${item.ram || '-'}</td>
      <td>${item.tarjetaGrafica || '-'}</td>
      <td>${item.serial || '-'}</td>
      <td>${item.sistemaOperativo || '-'}</td>
      <td>${item.disco || '-'}</td>
      <td><span class="badge ${statusClass(item.estado)}">${item.estado}</span></td>
      <td>
        <div class="photo-box">
          <img src="${item.foto || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'}" alt="${item.descripcion}" />
        </div>
      </td>
      <td>${formatDate(item.ultimaModificacion)}</td>
      <td>
        <div class="action-group">
          <button class="action-btn edit" data-action="edit" data-id="${item.id}">Editar</button>
          <button class="action-btn status" data-action="status" data-id="${item.id}">Estado</button>
          <button class="action-btn delete" data-action="delete" data-id="${item.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderComputersStats() {
  if (!elements.computersStatsGrid) return;

  // Filtrar solo computadoras
  const computers = state.inventory.filter((item) => 
    item.clasificacion && (
      item.clasificacion.includes('Equipo de cómputo') || 
      item.clasificacion.includes('Servidor de trabajo')
    )
  );

  const total = computers.length;
  const activos = computers.filter((item) => item.estado === 'Activo').length;
  const asignados = computers.filter((item) => item.estado === 'Asignado').length;
  const mantenimiento = computers.filter((item) => item.estado === 'En mantenimiento').length;

  const stats = [
    { label: 'Total', value: total, color: '#5b5ce6' },
    { label: 'Activos', value: activos, color: '#22c55e' },
    { label: 'Asignados', value: asignados, color: '#8b5cf6' },
    { label: 'Mantenimiento', value: mantenimiento, color: '#f59e0b' }
  ];

  elements.computersStatsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <span class="label">${stat.label}</span>
      <div class="value">
        <span>${stat.value}</span>
        <span class="dot" style="background:${stat.color};"></span>
      </div>
    </article>
  `).join('');
}

function renderAreas() {
  if (!elements.areasGrid) return;

  elements.areasGrid.innerHTML = state.areas.map((area) => {
    const itemsCount = state.inventory.filter((item) => item.ubicacion.toLowerCase().includes(area.name.toLowerCase())).length;
    const areaClass = area.status.toLowerCase().replace(/\s+/g, '-');
    return `
      <article class="area-card">
        <div class="area-top">
          <div>
            <div class="area-name">${area.name}</div>
            <div class="area-meta">${area.type || 'Área general'}</div>
          </div>
          <span class="area-status ${areaClass}">${area.status}</span>
        </div>
        <div class="area-meta">Activos asignados: ${itemsCount}</div>
        <div class="area-actions">
          <button class="action-btn edit" data-action="edit-area" data-id="${area.id}">Editar</button>
          <button class="action-btn delete" data-action="delete-area" data-id="${area.id}">Eliminar</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderUsers() {
  if (!elements.usersTableBody) return;

  elements.usersTableBody.innerHTML = state.users.map((user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${getRoleLabel(user.role)}</td>
      <td><span class="badge ${user.status === 'Activo' ? 'activo' : 'inactivo'}">${user.status}</span></td>
      <td>
        <div class="action-group">
          <button class="action-btn edit" data-action="edit-user" data-id="${user.id}">Editar</button>
          <button class="action-btn delete" data-action="delete-user" data-id="${user.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderReports() {
  if (!elements.reportSummary || !elements.reportAreas) return;

  const counts = {
    activo: state.inventory.filter((item) => item.estado === 'Activo').length,
    mantenimiento: state.inventory.filter((item) => item.estado === 'En mantenimiento').length,
    baja: state.inventory.filter((item) => item.estado === 'Dado de baja').length,
    disponible: state.inventory.filter((item) => item.estado === 'Disponible').length
  };

  elements.reportSummary.innerHTML = `
    <li>Activos: ${counts.activo}</li>
    <li>Disponibles: ${counts.disponible}</li>
    <li>En mantenimiento: ${counts.mantenimiento}</li>
    <li>Dadas de baja: ${counts.baja}</li>
  `;

  const areaUsage = state.areas.map((area) => ({
    name: area.name,
    count: state.inventory.filter((item) => item.ubicacion.toLowerCase().includes(area.name.toLowerCase())).length
  })).sort((a, b) => b.count - a.count).slice(0, 5);

  elements.reportAreas.innerHTML = areaUsage.map((area) => `<li>${area.name}: ${area.count} activos</li>`).join('');
}

function toggleSection(section) {
  state.activeSection = section;
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.section === section);
  });

  const sections = {
    inventory: document.getElementById('inventorySection'),
    computers: document.getElementById('computersSection'),
    areas: document.getElementById('areasSection'),
    users: document.getElementById('usersSection'),
    reports: document.getElementById('reportsSection')
  };

  Object.entries(sections).forEach(([key, el]) => {
    el.classList.toggle('hidden-section', key !== section);
    el.classList.toggle('active-section', key === section);
  });

  // Renderizar datos según la sección activa
  if (section === 'computers') {
    renderComputersStats();
    renderComputers();
  }
}

function openAssetModal(item = null) {
  if (item) {
    elements.assetModalTitle.textContent = 'Editar activo';
    elements.assetId.value = item.id;
    elements.assetUbicacion.value = item.ubicacion;
    elements.assetDescripcion.value = item.descripcion;
    elements.assetClasificacion.value = item.clasificacion;
    elements.assetCodigo.value = item.codigo;
    elements.assetEstado.value = item.estado;
    elements.assetMarca.value = item.marca || '';
    elements.assetModelo.value = item.modelo || '';
    elements.assetRam.value = item.ram || '';
    elements.assetTarjeta.value = item.tarjetaGrafica || '';
    elements.assetSerial.value = item.serial || '';
    elements.assetSO.value = item.sistemaOperativo || '';
    elements.assetDisco.value = item.disco || '';
    elements.assetFotoExisting.value = item.foto || '';
    elements.assetFechaRecibida.value = item.fechaRecibida || '';
    elements.assetActaExisting.value = item.actaEntrega || '';
  } else {
    elements.assetModalTitle.textContent = 'Registrar activo';
    elements.assetForm.reset();
    elements.assetId.value = '';
    elements.assetEstado.value = 'Activo';
    elements.assetFotoExisting.value = '';
    elements.assetActaExisting.value = '';
  }

  elements.assetModal.classList.remove('hidden');
}

function closeAssetModal() {
  elements.assetModal.classList.add('hidden');
  elements.assetForm.reset();
  if (elements.assetFotoExisting) elements.assetFotoExisting.value = '';
  if (elements.assetActaExisting) elements.assetActaExisting.value = '';
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

async function handleAssetSubmit(event) {
  event.preventDefault();

  const fotoFile = elements.assetFotoFile && elements.assetFotoFile.files[0];
  const actaFile = elements.assetActaFile && elements.assetActaFile.files[0];
  const fotoActual = elements.assetFotoExisting ? elements.assetFotoExisting.value : '';
  const actaActual = elements.assetActaExisting ? elements.assetActaExisting.value : '';

  const [fotoValue, actaValue] = await Promise.all([
    fotoFile ? readFileAsDataUrl(fotoFile) : Promise.resolve(fotoActual || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'),
    actaFile ? readFileAsDataUrl(actaFile) : Promise.resolve(actaActual || '')
  ]);

  const payload = {
    id: Number(elements.assetId.value) || Date.now(),
    no: Number(elements.assetCodigo.value.replace(/\D/g, '')) || state.inventory.length + 1,
    ubicacion: elements.assetUbicacion.value.trim(),
    descripcion: elements.assetDescripcion.value.trim(),
    clasificacion: elements.assetClasificacion.value.trim(),
    codigo: elements.assetCodigo.value.trim(),
    estado: elements.assetEstado.value,
    marca: elements.assetMarca.value.trim(),
    modelo: elements.assetModelo.value.trim(),
    ram: elements.assetRam.value.trim(),
    tarjetaGrafica: elements.assetTarjeta.value.trim(),
    serial: elements.assetSerial.value.trim(),
    sistemaOperativo: elements.assetSO.value.trim(),
    disco: elements.assetDisco.value.trim(),
    foto: fotoValue,
    ultimaModificacion: new Date().toISOString().slice(0, 10),
    fechaRecibida: elements.assetFechaRecibida.value,
    actaEntrega: actaValue
  };

  const existingIndex = state.inventory.findIndex((item) => item.id === payload.id);

  if (existingIndex >= 0) {
    state.inventory[existingIndex] = { ...state.inventory[existingIndex], ...payload };
  } else {
    state.inventory.unshift(payload);
  }

  saveData(STORAGE_KEYS.inventory, state.inventory);
  renderAll();
  closeAssetModal();
}

function openAreaModal(area = null) {
  if (area) {
    elements.areaModalTitle.textContent = 'Editar área';
    elements.areaId.value = area.id;
    elements.areaName.value = area.name;
    elements.areaType.value = area.type || '';
    elements.areaEstado.value = area.status || 'Disponible';
  } else {
    elements.areaModalTitle.textContent = 'Agregar área';
    elements.areaForm.reset();
    elements.areaId.value = '';
    elements.areaEstado.value = 'Disponible';
  }

  elements.areaModal.classList.remove('hidden');
}

function closeAreaModal() {
  elements.areaModal.classList.add('hidden');
  elements.areaForm.reset();
}

function handleAreaSubmit(event) {
  event.preventDefault();

  const payload = {
    id: Number(elements.areaId.value) || Date.now(),
    name: elements.areaName.value.trim(),
    type: elements.areaType.value.trim(),
    status: elements.areaEstado.value
  };

  if (!payload.name) return;

  const existingIndex = state.areas.findIndex((area) => area.id === payload.id);

  if (existingIndex >= 0) {
    state.areas[existingIndex] = payload;
  } else {
    state.areas.unshift(payload);
  }

  saveData(STORAGE_KEYS.areas, state.areas);
  renderAreas();
  renderReports();
  closeAreaModal();
}

function openUserModal(user = null) {
  if (user) {
    elements.userModalTitle.textContent = 'Editar usuario';
    elements.userId.value = user.id;
    elements.userName.value = user.name;
    elements.userUsername.value = user.username;
    elements.userPassword.value = user.password;
    elements.userRole.value = user.role;
    elements.userStatus.value = user.status;
  } else {
    elements.userModalTitle.textContent = 'Agregar usuario';
    elements.userForm.reset();
    elements.userId.value = '';
    elements.userRole.value = 'operador';
    elements.userStatus.value = 'Activo';
  }

  elements.userModal.classList.remove('hidden');
}

function closeUserModal() {
  elements.userModal.classList.add('hidden');
  elements.userForm.reset();
}

function handleUserSubmit(event) {
  event.preventDefault();

  const payload = {
    id: Number(elements.userId.value) || Date.now(),
    name: elements.userName.value.trim(),
    username: elements.userUsername.value.trim(),
    password: elements.userPassword.value.trim(),
    role: elements.userRole.value,
    status: elements.userStatus.value
  };

  if (!payload.name || !payload.username || !payload.password) return;

  const existingIndex = state.users.findIndex((user) => user.id === payload.id);

  if (existingIndex >= 0) {
    state.users[existingIndex] = payload;
  } else {
    state.users.unshift(payload);
  }

  saveData(STORAGE_KEYS.users, state.users);
  renderUsers();
  closeUserModal();
}

function deleteInventory(id) {
  state.inventory = state.inventory.filter((item) => item.id !== id);
  saveData(STORAGE_KEYS.inventory, state.inventory);
  renderAll();
}

function changeStatus(id) {
  const item = state.inventory.find((entry) => entry.id === id);
  if (!item) return;

  const states = ['Activo', 'En mantenimiento', 'Dado de baja', 'Disponible'];
  const index = states.indexOf(item.estado);
  item.estado = states[(index + 1) % states.length];
  item.ultimaModificacion = new Date().toISOString().slice(0, 10);
  saveData(STORAGE_KEYS.inventory, state.inventory);
  renderAll();
}

function deleteArea(id) {
  state.areas = state.areas.filter((area) => area.id !== id);
  saveData(STORAGE_KEYS.areas, state.areas);
  renderAreas();
  renderReports();
}

function deleteUser(id) {
  state.users = state.users.filter((user) => user.id !== id);
  saveData(STORAGE_KEYS.users, state.users);
  renderUsers();
}

function renderAll() {
  renderStats();
  renderInventory();
  renderAreas();
  renderUsers();
  renderReports();
}

function handleInventoryClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;
  const numericId = Number(id);

  if (action === 'edit') {
    const item = state.inventory.find((entry) => entry.id === numericId);
    if (item) openAssetModal(item);
  }

  if (action === 'delete') {
    deleteInventory(numericId);
  }

  if (action === 'status') {
    changeStatus(numericId);
  }

  if (action === 'edit-area') {
    const area = state.areas.find((entry) => entry.id === numericId);
    if (area) openAreaModal(area);
  }

  if (action === 'delete-area') {
    deleteArea(numericId);
  }

  if (action === 'edit-user') {
    const user = state.users.find((entry) => entry.id === numericId);
    if (user) openUserModal(user);
  }

  if (action === 'delete-user') {
    deleteUser(numericId);
  }
}

function handleLogin(event) {
  event.preventDefault();

  if (!elements.loginForm || !elements.loginError) return;

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const user = validateLogin(username, password);
  if (!user) {
    elements.loginError.textContent = 'Usuario o contraseña incorrectos.';
    return;
  }

  elements.loginError.textContent = '';
  setSession(user);
  window.location.href = 'dashboard.html';
}

function handleLogout() {
  setSession(null);
  localStorage.removeItem(STORAGE_KEYS.session);

  if (elements.loginForm) {
    elements.loginForm.reset();
  }

  if (page === 'dashboard') {
    window.location.href = 'index.html';
    return;
  }

  if (elements.loginScreen) elements.loginScreen.classList.remove('hidden');
  if (elements.appScreen) elements.appScreen.classList.add('hidden');
}

function bindEvents() {
  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', handleLogin);
  }

  if (page === 'dashboard') {
    if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', handleLogout);
    if (elements.newAssetBtn) elements.newAssetBtn.addEventListener('click', () => openAssetModal());
    if (elements.inventorySearch) elements.inventorySearch.addEventListener('input', renderInventory);
    if (elements.statusFilter) elements.statusFilter.addEventListener('change', renderInventory);
    if (elements.computersSearch) elements.computersSearch.addEventListener('input', renderComputers);
    if (elements.computersStatusFilter) elements.computersStatusFilter.addEventListener('change', renderComputers);
    if (elements.assetForm) elements.assetForm.addEventListener('submit', handleAssetSubmit);
    if (document.getElementById('closeAssetModal')) document.getElementById('closeAssetModal').addEventListener('click', closeAssetModal);
    if (document.getElementById('cancelAssetBtn')) document.getElementById('cancelAssetBtn').addEventListener('click', closeAssetModal);
    if (document.getElementById('newAreaBtn')) document.getElementById('newAreaBtn').addEventListener('click', () => openAreaModal());
    if (document.getElementById('closeAreaModal')) document.getElementById('closeAreaModal').addEventListener('click', closeAreaModal);
    if (document.getElementById('cancelAreaBtn')) document.getElementById('cancelAreaBtn').addEventListener('click', closeAreaModal);
    if (elements.areaForm) elements.areaForm.addEventListener('submit', handleAreaSubmit);
    if (document.getElementById('newUserBtn')) document.getElementById('newUserBtn').addEventListener('click', () => openUserModal());
    if (document.getElementById('closeUserModal')) document.getElementById('closeUserModal').addEventListener('click', closeUserModal);
    if (document.getElementById('cancelUserBtn')) document.getElementById('cancelUserBtn').addEventListener('click', closeUserModal);
    if (elements.userForm) elements.userForm.addEventListener('submit', handleUserSubmit);

    elements.navButtons.forEach((button) => {
      button.addEventListener('click', () => toggleSection(button.dataset.section));
    });

    document.addEventListener('click', handleInventoryClick);
  }
}

function init() {
  ensureDefaults();
  state.users = loadData(STORAGE_KEYS.users, defaultUsers);
  state.inventory = loadData(STORAGE_KEYS.inventory, defaultInventory);
  state.areas = loadData(STORAGE_KEYS.areas, defaultAreas);

  if (page === 'dashboard') {
    const savedSession = loadData(STORAGE_KEYS.session, null);
    if (!savedSession) {
      window.location.href = 'index.html';
      return;
    }

    setSession(savedSession);
    bindEvents();
    renderAll();
    return;
  }

  bindEvents();
}

init();
