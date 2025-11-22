/* script.js */
/* Module 1 + Module 2 combined script
   - KPI animations, periodic updates, alerts (Module1)
   - Leaflet map initialization, markers, popups, animated shipment routes (Module2)
*/

/* ---------- Small helpers ---------- */
const $ = s => document.querySelector(s);
const formatNumber = n => (n >= 1000 ? n.toLocaleString() : String(n));

/* ---------- App state ---------- */
const App = {
  data: window.DUMMY_DATA,
  state: { productionToday:0, inventoryStock:0, onTimePercent:100, activeSuppliers:0, factoryUtil:0, alerts:[] },
  map: null,
  markers: { suppliers:[], warehouses:[], retail:[], factory:null },
  routeLayers: [],
  movers: [] // animated moving markers
};

/* ---------- Derived metric compute ---------- */
function computeDerived(){
  const baseProd = App.data.production_per_hour.reduce((a,b)=>a+b,0);
  App.state.productionToday = Math.round(baseProd + (Math.random()*60 - 20));
  App.state.inventoryStock = App.data.warehouses.reduce((a,w)=>a + w.stock, 0);
  const totalShip = App.data.shipments.length || 1;
  const onTime = App.data.shipments.filter(s => s.status !== 'delayed').length;
  App.state.onTimePercent = Math.round((onTime/totalShip) * 100);
  App.state.activeSuppliers = App.data.suppliers.length;
  const running = App.data.machines.filter(m => m.status === 'running').length;
  App.state.factoryUtil = Math.round((running / App.data.machines.length) * 100);
  App.state.alerts = App.data.alerts.slice().sort((a,b)=>b.ts - a.ts);
}

/* ---------- KPI animation (anime.js) ---------- */
function animateKPI(selectorKey, newValue){
  const el = document.querySelector(`.kpi-value[data-key="${selectorKey}"]`);
  if (!el) return;
  const start = +el.textContent.replace(/,/g,'') || 0;
  anime({
    targets: {v: start},
    v: newValue,
    round: 1,
    duration: 900,
    easing: 'easeOutExpo',
    update: anim => el.textContent = formatNumber(anim.animations[0].currentValue)
  });
}

function renderKPIs(){
  animateKPI('productionToday', App.state.productionToday);
  animateKPI('inventoryStock', App.state.inventoryStock);
  animateKPI('onTimePercent', App.state.onTimePercent);
  animateKPI('activeSuppliers', App.state.activeSuppliers);
  animateKPI('factoryUtil', App.state.factoryUtil);
}

/* ---------- Alerts ---------- */
function renderAlerts(){
  const container = $('#alertList');
  container.innerHTML = '';
  App.state.alerts.slice(0,40).forEach(a => {
    const timeStr = new Date(a.ts).toLocaleTimeString();
    const div = document.createElement('div');
    div.className = `alert ${a.level}`;
    div.innerHTML = `<div class="dot" style="background:${a.level==='danger'? 'var(--danger)': (a.level==='warn'? 'var(--warn)':'var(--accent)') }"></div>
      <div class="body"><div class="text">${a.text}</div><div class="time">${timeStr}</div></div>`;
    container.appendChild(div);
  });
}

/* ---------- Random alert generator ---------- */
function generateRandomAlert(){
  const templates = [
    {lvl:'warn', txt: () => `Battery supplier shipment delayed`},
    {lvl:'danger', txt: () => `Factory Line ${Math.ceil(Math.random()*3)}: RPM Out of Range`},
    {lvl:'warn', txt: () => `Warehouse ${['A','B','C'][Math.floor(Math.random()*3)]} nearing capacity`},
    {lvl:'info', txt: () => `Shipment ${Math.ceil(Math.random()*1000)} in transit`},
  ];
  const pick = templates[Math.floor(Math.random()*templates.length)];
  const alert = { id:'a'+Math.random().toString(36).slice(2,9), ts:Date.now(), level:pick.lvl, text:pick.txt() };
  App.data.alerts.unshift(alert);
  App.state.alerts.unshift(alert);
  renderAlerts();
  gsap.from('.alert:first-child', {y:-8, opacity:0, duration:0.45, ease:'power2.out'});
}

/* ---------- Map & Markers (Leaflet) ---------- */
function initMap(){
  // compute bounds to fit points
  const allCoords = [
    ...App.data.suppliers.map(s=>[s.lat,s.lon]),
    ...App.data.warehouses.map(w=>[w.lat,w.lon]),
    [App.data.factory.lat, App.data.factory.lon],
    ...Object.values(App.data.retailLocations).map(r=>[r.lat,r.lon])
  ];
  const avgLat = allCoords.reduce((a,c)=>a+c[0],0)/allCoords.length;
  const avgLon = allCoords.reduce((a,c)=>a+c[1],0)/allCoords.length;

  App.map = L.map('map', { zoomControl:true }).setView([avgLat, avgLon], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19, attribution: '&copy; OpenStreetMap'
  }).addTo(App.map);

  addFactoryMarker();
  addSupplierMarkers();
  addWarehouseMarkers();
  addRetailMarkers();
  startRoutes(); // create polylines + moving markers
}

function makeDivIcon(htmlClass, innerHTML){
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="pulse-marker ${htmlClass}">${innerHTML}</div>`,
    iconSize: [28,28],
    iconAnchor: [14,14]
  });
}

function addSupplierMarkers(){
  App.data.suppliers.forEach(s => {
    const icon = makeDivIcon('pulse-supplier', '<i class="fas fa-bolt" style="font-size:12px"></i>');
    const m = L.marker([s.lat, s.lon], {icon}).addTo(App.map);
    m.bindPopup(`<strong>${s.name}</strong><br>${s.type.toUpperCase()} • ${s.city}<br>Lead time: ${s.leadTimeDays} days<br>Risk: ${s.risk}<br>Status: ${s.status}`);
    m.on('click', ()=>{ gsap.fromTo(m._icon, {scale:0.9}, {scale:1.05, duration:0.25, yoyo:true, repeat:1}); });
    App.markers.suppliers.push(m);
  });
}

function addFactoryMarker(){
  const f = App.data.factory;
  const icon = makeDivIcon('pulse-factory', '<i class="fas fa-industry" style="font-size:12px"></i>');
  const m = L.marker([f.lat, f.lon], {icon}).addTo(App.map);
  m.bindPopup(`<strong>${f.name}</strong><br>${f.city}<br>Main assembly site`);
  App.markers.factory = m;
}

function addWarehouseMarkers(){
  App.data.warehouses.forEach(w => {
    const icon = makeDivIcon('pulse-warehouse', '<i class="fas fa-warehouse" style="font-size:12px"></i>');
    const m = L.marker([w.lat, w.lon], {icon}).addTo(App.map);
    m.bindPopup(`<strong>${w.name}</strong><br>${w.city}<br>Stock: ${w.stock}/${w.capacity}`);
    m.on('click', ()=>{ gsap.fromTo(m._icon, {scale:0.95}, {scale:1.06, duration:0.25, yoyo:true, repeat:1}); });
    App.markers.warehouses.push(m);
  });
}

function addRetailMarkers(){
  Object.entries(App.data.retailLocations).forEach(([name, r]) => {
    const icon = makeDivIcon('pulse-retail', '<i class="fas fa-store" style="font-size:11px"></i>');
    const m = L.marker([r.lat, r.lon], {icon}).addTo(App.map);
    m.bindPopup(`<strong>${name}</strong><br>${r.city}<br>Retail outlet`);
    App.markers.retail.push(m);
  });
}

/* ---------- Routes + moving markers ---------- */
function clearRoutes(){
  App.routeLayers.forEach(l => App.map.removeLayer(l));
  App.movers.forEach(m => App.map.removeLayer(m.marker));
  App.routeLayers = []; App.movers = [];
}

function startRoutes(){
  clearRoutes();
  App.data.shipments.forEach(s => {
    const from = App.data.warehouses.find(w => w.id === s.from);
    const to = App.data.retailLocations[s.to];
    if (!from || !to) return;

    const latlngs = [[from.lat, from.lon], [to.lat, to.lon]];
    const lineStyle = {color: s.status === 'delayed' ? '#ef4444' : '#0ea5e9', weight:4, opacity:0.6};
    const poly = L.polyline(latlngs, lineStyle).addTo(App.map);
    App.routeLayers.push(poly);

    // moving marker
    const truckDiv = L.divIcon({className:'truck-div', html:`<div class="truck-marker"><i class="fas fa-truck"></i></div>`, iconSize:[18,18], iconAnchor:[9,9]});
    const moverMarker = L.marker(latlngs[0], {icon:truckDiv}).addTo(App.map);

    // animate along the line
    const duration = s.status === 'in-transit' ? (8000 + Math.random()*6000) : (s.status === 'delayed' ? 16000 : 4000);
    let start = null;
    let stopped = (s.status === 'delivered');

    function step(timestamp){
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(1, elapsed / duration);
      // linear interpolation
      const lat = from.lat + (to.lat - from.lat) * t;
      const lon = from.lon + (to.lon - from.lon) * t;
      moverMarker.setLatLng([lat, lon]);

      if (t < 1 && !stopped){
        requestAnimationFrame(step);
      } else {
        if (s.status === 'in-transit'){
          // loop
          start = null;
          requestAnimationFrame(step);
        } else if (s.status === 'delayed'){
          // pause longer then loop
          setTimeout(()=>{ start = null; requestAnimationFrame(step); }, 3000 + Math.random()*4000);
        } else {
          // delivered: place at end and stop
          moverMarker.setLatLng([to.lat, to.lon]);
        }
      }
    }
    if (!stopped) requestAnimationFrame(step);
    App.movers.push({id:s.id, marker:moverMarker, poly});
  });
}

/* ---------- Re-sync map markers/popups on periodic data update ---------- */
function syncMapWithData(){
  // update warehouse popups (stock changes)
  App.markers.warehouses.forEach((m, idx) => {
    const w = App.data.warehouses[idx];
    if (!w) return;
    const content = `<strong>${w.name}</strong><br>${w.city}<br>Stock: ${w.stock}/${w.capacity}`;
    m.getPopup().setContent(content);
    // change pulse color if near capacity
    const pct = w.stock / w.capacity;
    const el = m._icon && m._icon.querySelector('.pulse-marker');
    if (el){
      if (pct > 0.9) el.style.boxShadow = '0 0 0 14px rgba(245,158,11,0.06)';
      else el.style.boxShadow = '';
    }
  });

  // update supplier popups if status changed
  App.markers.suppliers.forEach((m, idx) => {
    const s = App.data.suppliers[idx];
    if (!s) return;
    const content = `<strong>${s.name}</strong><br>${s.type.toUpperCase()} • ${s.city}<br>Lead time: ${s.leadTimeDays} days<br>Risk: ${s.risk}<br>Status: ${s.status}`;
    m.getPopup().setContent(content);
    const el = m._icon && m._icon.querySelector('.pulse-marker');
    if (el){
      el.style.opacity = s.status === 'delayed' ? '0.8' : '1';
    }
  });

  // restart routes to reflect shipment status changes
  startRoutes();
}

/* ---------- Periodic updates (Module1 behavior kept) ---------- */
function startPeriodicUpdates(){
  computeDerived();
  renderKPIs();
  renderAlerts();

  setInterval(()=> {
    // simulate production sliding window
    const p = App.data.production_per_hour;
    p.shift(); p.push(110 + Math.round(Math.random()*40 - 10));
    // warehouses change storage
    App.data.warehouses.forEach(w => {
      const delta = Math.round(Math.random()*120 - 40);
      w.stock = Math.max(0, Math.min(w.capacity + 200, w.stock + delta));
    });
    // random shipment status change (30% chance)
    if (Math.random() < 0.25){
      const idx = Math.floor(Math.random()*App.data.shipments.length);
      const s = App.data.shipments[idx];
      const options = ['in-transit','delivered','delayed'];
      s.status = options[Math.floor(Math.random()*options.length)];
    }
    computeDerived(); renderKPIs();
    syncMapWithData();
  }, 5000);

  // alerts generation
  setInterval(()=> generateRandomAlert(), 7000 + Math.round(Math.random()*2000));
}

/* ---------- UI interactions ---------- */
function setupUI(){
  $('#toggleSidebar').addEventListener('click', ()=>{
    const sidebar = $('#sidebar');
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) gsap.to(sidebar,{width:72,duration:0.25});
    else gsap.to(sidebar,{width:getComputedStyle(document.documentElement).getPropertyValue('--sidebar-w')||240,duration:0.25});
  });

  $('#darkToggle').addEventListener('click', ()=>{
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark){ html.removeAttribute('data-theme'); $('#darkIcon').className='fas fa-moon'; }
    else { html.setAttribute('data-theme','dark'); $('#darkIcon').className='fas fa-sun'; }
  });

  $('#notifToggle').addEventListener('click', ()=> {
    const notif = $('#notifications'); notif.classList.toggle('collapsed');
    if (notif.classList.contains('collapsed')) gsap.to(notif,{x:120,opacity:0.6,duration:0.25}); else gsap.to(notif,{x:0,opacity:1,duration:0.25});
  });

  $('#clearAlerts').addEventListener('click', ()=> {
    App.state.alerts = []; App.data.alerts = []; renderAlerts();
  });

  $('#centerFactory').addEventListener('click', ()=> {
    const f = App.data.factory; App.map.setView([f.lat,f.lon],8,{animate:true});
    App.markers.factory.openPopup();
  });

  $('#toggleRoutes').addEventListener('click', ()=> {
    const visible = App.routeLayers.length && App.map.hasLayer(App.routeLayers[0]);
    App.routeLayers.forEach(layer => visible ? App.map.removeLayer(layer) : layer.addTo(App.map));
    App.movers.forEach(m => visible ? App.map.removeLayer(m.marker) : m.marker.addTo(App.map));
  });
}

/* ---------- Initialization ---------- */
function init(){
  computeDerived();
  setupUI();
  renderKPIs();
  renderAlerts();
  initMap();
  startPeriodicUpdates();

  gsap.from('.kpi-card', {y:12, opacity:0, duration:0.6, stagger:0.08, ease:'power2.out'});
}

document.addEventListener('DOMContentLoaded', init);

/* ---------- Expose for debug ---------- */
window.NovaApp = { App, computeDerived, startRoutes, syncMapWithData, generateRandomAlert };
