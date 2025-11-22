/* sankey.js - Level 2 advanced behaviors
   Features:
   - multi-metric (quantity / cost / carbon / leadTime)
   - scenario controls (demand, lead time mul, disruption)
   - auto-updates every 5s (can be paused)
   - production & logistics tables updated
   - alerts engine
   - export SVG
*/

/* ----------------- Setup & state ----------------- */
const SVG = d3.select('#sankeySVG');
const tooltip = d3.select('#tooltip');
const metricSelect = document.getElementById('metricSelect');
const demandSlider = document.getElementById('demandSlider');
const demandVal = document.getElementById('demandVal');
const ltSlider = document.getElementById('ltSlider');
const ltVal = document.getElementById('ltVal');
const btnToggle = document.getElementById('btnToggle');
const btnExport = document.getElementById('btnExport');
const disruptToggle = document.getElementById('disruptToggle');
const alertsList = document.getElementById('alertsList');
const productionTableBody = document.querySelector('#productionTable tbody');
const logisticsTableBody = document.querySelector('#logisticsTable tbody');
const legendDiv = document.getElementById('legend');
const scenChip = document.getElementById('scen_chip');
const scenPort = document.getElementById('scen_port');
const scenRestore = document.getElementById('scen_restore');

let width = Math.max(800, document.getElementById('vizWrap').clientWidth - 40);
let height = 520;
SVG.attr('width', width).attr('height', height);

window.addEventListener('resize', () => {
  width = Math.max(600, document.getElementById('vizWrap').clientWidth - 40);
  SVG.attr('width', width);
  renderCurrent(); // rerender to adjust layout
});

let playing = true;
let updateInterval = null;
let lastData = Level2SankeyData.clone(); // initial clone
let currentView = 'quantity'; // metric
let currentScenario = { demand:1.0, leadTimeMul:1.0, disruption:false };

/* ----------------- Sankey generator ----------------- */
const { sankey, sankeyLinkHorizontal } = d3;
let sankeyGen = sankey()
  .nodeId(d=>d.id)
  .nodeWidth(16)
  .nodePadding(10)
  .extent([[1,1],[width-1, height-1]]);

/* color scale for OEM groups (TATA, Mahindra, Tesla, BYD) */
const oemColors = {
  'TATA': '#4dd0e1',
  'Mahindra': '#60a5fa',
  'Tesla': '#f472b6',
  'BYD': '#f59e0b',
  'default': '#94a3b8'
};

/* ----------------- Utility functions ----------------- */
function getColorForNode(n){
  return oemColors[n.oem] || oemColors['default'];
}

function computeLinkMetric(link, metric){
  // link has fields: value (units), costPerUnit, carbonPerUnit, leadTime
  if(metric === 'quantity') return link.value;
  if(metric === 'cost') return (link.costPerUnit || link.costPerUnit === 0 ? link.costPerUnit * link.value : (link.value * 20));
  if(metric === 'carbon') return (link.carbonPerUnit || link.carbonPerUnit === 0 ? link.carbonPerUnit * link.value : (link.value * 5));
  if(metric === 'leadTime') return (link.leadTime || 1) * 10; // scale leadTime to visible thickness
  return link.value;
}

function computeLinkColor(link, metric){
  // color mapping per metric; returns color string
  if(metric === 'cost') return d3.interpolatePlasma(Math.min(1, (link.costPerUnit/500)));
  if(metric === 'carbon') return d3.interpolateYlOrBr(Math.min(1, (link.carbonPerUnit/50)));
  if(link.status === 'delayed') return '#ff6b6b';
  return '#7dd3fc';
}

/* ----------------- Render Sankey ----------------- */
let svgGroup = null;
function renderSankeyFrom(data){
  SVG.selectAll('*').remove();
  sankeyGen = sankey().nodeId(d=>d.id).nodeWidth(16).nodePadding(10).extent([[1,1],[width-1,height-1]]);
  // prepare nodes & links arrays for sankey (d3 expects objects referencing nodes)
  // ensure nodes have .id property
  const nodes = data.nodes.map(n => Object.assign({}, n));
  const nodeIndex = new Map(nodes.map(n => [n.id, n]));
  const links = data.links.map(l => {
    return Object.assign({}, l);
  });

  const graph = sankeyGen({
    nodes: nodes.map(d=>Object.assign({}, d)),
    links: links.map(d=>Object.assign({}, d))
  });

  // compute metric values for link widths and attach gradient ids
  graph.links.forEach((l,i) => {
    const metricVal = computeLinkMetric(l, currentView);
    l.metricVal = metricVal;
    l.widthForRender = Math.max(1, Math.sqrt(metricVal) * 1.6); // scale mapping
    l.gradientId = 'grad-'+i;
  });

  // defs for gradients
  const defs = SVG.append('defs');
  graph.links.forEach((l,i) => {
    const g = defs.append('linearGradient').attr('id', l.gradientId).attr('gradientUnits','userSpaceOnUse');
    g.attr('x1', l.source.x1).attr('x2', l.target.x0);
    const col = computeLinkColor(l, currentView);
    g.append('stop').attr('offset','0%').attr('stop-color', col);
    g.append('stop').attr('offset','100%').attr('stop-color', d3.color(col).darker(0.6));
  });

  // draw links
  const linkGroup = SVG.append('g').attr('class','links');
  const linkSel = linkGroup.selectAll('path.link')
    .data(graph.links)
    .enter().append('path')
    .attr('class','link')
    .attr('d', sankeyLinkHorizontal())
    .attr('stroke', d => `url(#${d.gradientId})`)
    .attr('stroke-width', d => d.widthForRender)
    .on('mousemove', (e,d) => {
      showTooltipLink(e,d);
    })
    .on('mouseout', hideTooltip)
    .on('click', (e,d) => { showAlert(`${d.source.name} → ${d.target.name} : ${d.value} units`, 'info'); });

  // draw nodes
  const nodeGroup = SVG.append('g').attr('class','nodes');
  const nodeSel = nodeGroup.selectAll('g.node')
    .data(graph.nodes)
    .enter().append('g')
    .attr('class','node')
    .attr('transform', d=>`translate(${d.x0},${d.y0})`);

  nodeSel.append('rect')
    .attr('height', d => Math.max(6, d.y1 - d.y0))
    .attr('width', d => Math.max(6, d.x1 - d.x0))
    .attr('fill', d => getColorForNode(d))
    .attr('rx', 4).attr('ry', 4)
    .on('mouseover', (e,d) => showTooltipNode(e,d))
    .on('mousemove', (e) => tooltip.style('left', (e.pageX+12)+'px').style('top', (e.pageY+6)+'px'))
    .on('mouseout', hideTooltip)
    .on('click', (e,d) => { isolateNode(d); populateInfoPanel(d); });

  nodeSel.append('text')
    .attr('x', d => d.x0 < width/2 ? (d.x1 - d.x0) + 6 : -6)
    .attr('y', d => (d.y1 - d.y0)/2)
    .attr('dy','0.35em')
    .attr('text-anchor', d => d.x0 < width/2 ? 'start' : 'end')
    .text(d => truncate(d.name, 28));

  // store for later updates
  lastData.graph = graph;
  lastData.svg = { linkSel, nodeSel };

  // update tables & legend
  renderLegend();
  updateProductionTable(graph);
  updateLogisticsTable(graph);
}

/* ----------------- Tooltip & helpers ----------------- */
function showTooltipNode(e, d){
  const html = `<strong>${d.name}</strong><br/>
    OEM: ${d.oem || '—'} • Type: ${d.type || '—'}<br/>
    Units/hr: ${d.metrics?.unitsPerHour || '-'} • Util: ${d.metrics?.utilization || '-'}<br/>
    Temp: ${d.metrics?.temperature || '-'}°C • Defect: ${d.metrics?.defectPct || '-'}`;
  tooltip.style('display','block').html(html);
}

function showTooltipLink(e, d){
  const metricVal = computeLinkMetric(d, currentView);
  const html = `<strong>${d.source.name}</strong> → <strong>${d.target.name}</strong><br/>
    Units: ${d.value} • Metric(${currentView}): ${Math.round(metricVal)}<br/>
    Cost/unit: $${d.costPerUnit || '—'} • CO₂/unit: ${d.carbonPerUnit || '—'} kg<br/>
    LeadTime: ${d.leadTime} days • Status: ${d.status || 'ok'}`;
  tooltip.style('display','block').html(html);
}

function hideTooltip(){ tooltip.style('display','none').html(''); }

function truncate(s, n){ return s.length>n ? s.slice(0,n-1)+'…' : s; }

/* ----------------- Isolation / Highlight ----------------- */
function isolateNode(node){
  // dim links not connected to node
  const links = lastData.graph.links;
  const svgLinks = d3.selectAll('path.link');
  svgLinks.classed('dimmed', d => !(d.source.id === node.id || d.target.id === node.id));
}

/* ----------------- Tables ----------------- */
function updateProductionTable(graph){
  // derive plant nodes by type 'plant'
  const plants = graph.nodes.filter(n => n.type === 'plant');
  const rows = plants.map(p => {
    return `<tr>
      <td>${p.oem}</td>
      <td>${p.name}</td>
      <td>${p.metrics?.unitsPerHour || '-'}</td>
      <td>${p.metrics?.utilization || '-'}</td>
      <td>${p.metrics?.temperature || '-'}</td>
      <td>${p.metrics?.defectPct || '-'}</td>
    </tr>`;
  }).join('');
  productionTableBody.innerHTML = rows || '<tr><td colspan="6">No plant data</td></tr>';
}

function updateLogisticsTable(graph){
  // use links as shipments
  const rows = graph.links.map(l => {
    const metricVal = computeLinkMetric(l, currentView);
    const eta = l.leadTime || '-';
    const status = l.status || 'ok';
    return `<tr>
      <td>${l.source.name}</td>
      <td>${l.target.name}</td>
      <td>${currentView}</td>
      <td>${Math.round(metricVal)}</td>
      <td>${eta}</td>
      <td>${status}</td>
    </tr>`;
  }).join('');
  logisticsTableBody.innerHTML = rows;
}

/* ----------------- Legend ----------------- */
function renderLegend(){
  legendDiv.innerHTML = '';
  const oems = Array.from(new Set(lastData.graph.nodes.map(n => n.oem).filter(Boolean)));
  oems.forEach(o => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span style="display:inline-block;width:12px;height:12px;background:${oemColors[o]||oemColors.default};margin-right:8px;border-radius:3px"></span>${o}`;
    legendDiv.appendChild(item);
  });
}

/* ----------------- Alerts engine ----------------- */
const alerts = [];
function showAlert(msg, level='warn'){
  const id = 'al_'+Math.random().toString(36).slice(2,9);
  const ts = Date.now();
  const el = { id, ts, msg, level };
  alerts.unshift(el);
  renderAlerts();
}
function renderAlerts(){
  alertsList.innerHTML = alerts.slice(0,50).map(a => {
    const time = new Date(a.ts).toLocaleTimeString();
    const cls = a.level === 'danger' ? 'alert danger' : (a.level === 'ok' ? 'alert ok' : 'alert');
    return `<div class="${cls}"><div>${a.msg}</div><div class="time">${time}</div></div>`;
  }).join('');
}

/* automatic alert generation based on thresholds */
function checkForAlerts(graph){
  // leadTime too high
  graph.links.forEach(l => {
    if(l.leadTime > 20 && Math.random() < 0.35){
      showAlert(`High lead time: ${l.source.name} → ${l.target.name} = ${l.leadTime} days`, 'danger');
    }
    if(l.status === 'delayed' && Math.random() < 0.5){
      showAlert(`Delayed shipment: ${l.source.name} → ${l.target.name}`, 'warn');
    }
    // carbon hotspots
    if((l.carbonPerUnit || 0) > 20 && Math.random() < 0.2) {
      showAlert(`Carbon spike on ${l.source.name} → ${l.target.name}`, 'warn');
    }
  });
}

/* ----------------- Simulation & update loop ----------------- */
function tickUpdate(){
  // generate simulated dataset according to current scenario
  const simulated = Level2SankeyData.simulate({demand: currentScenario.demand, leadTimeMul: currentScenario.leadTimeMul, disruption: currentScenario.disruption});
  lastData.currentSim = simulated;
  renderSankeyFrom(simulated);
  // check alerts based on rendered graph
  if(lastData.graph) checkForAlerts(lastData.graph);
}

function startAutoUpdate(){
  if(updateInterval) clearInterval(updateInterval);
  updateInterval = setInterval(() => {
    if(playing) {
      tickUpdate();
    }
  }, 5000);
}

/* ----------------- Controls wiring ----------------- */
metricSelect.addEventListener('change', (e) => {
  currentView = e.target.value;
  renderCurrent();
});
demandSlider.addEventListener('input', (e) => {
  const val = (+e.target.value)/100;
  demandVal.innerText = e.target.value + '%';
  currentScenario.demand = val;
  renderCurrent();
});
ltSlider.addEventListener('input', (e) => {
  const val = (+e.target.value)/100;
  ltVal.innerText = e.target.value + '%';
  currentScenario.leadTimeMul = val;
  renderCurrent();
});
btnToggle.addEventListener('click', () => {
  playing = !playing;
  btnToggle.innerText = playing ? 'Pause' : 'Play';
});
btnExport.addEventListener('click', exportSVG);
disruptToggle.addEventListener('change', (e) => {
  currentScenario.disruption = e.target.checked;
  // immediate re-render
  renderCurrent();
});

/* scenario quick buttons */
scenChip.addEventListener('click', () => {
  // chip shortage reduces throughput (demand off, disrupt suppliers)
  currentScenario.demand = 0.75;
  currentScenario.disruption = true;
  demandSlider.value = 75; demandVal.innerText = '75%';
  disruptToggle.checked = true;
  renderCurrent();
  showAlert('Scenario applied: Chip Shortage (reduced demand & disruptions)', 'warn');
});
scenPort.addEventListener('click', () => {
  currentScenario.leadTimeMul = 1.6;
  ltSlider.value = 160; ltVal.innerText = '160%';
  currentScenario.disruption = true;
  disruptToggle.checked = true;
  renderCurrent();
  showAlert('Scenario applied: Port Congestion (lead times up)', 'warn');
});
scenRestore.addEventListener('click', () => {
  currentScenario = { demand:1.0, leadTimeMul:1.0, disruption:false };
  demandSlider.value = 100; demandVal.innerText = '100%';
  ltSlider.value = 100; ltVal.innerText = '100%';
  disruptToggle.checked = false;
  renderCurrent();
  showAlert('Scenarios cleared', 'ok');
});

/* ----------------- Export SVG ----------------- */
function exportSVG(){
  const svgNode = document.getElementById('sankeySVG');
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgNode);
  if(!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  const link = document.createElement('a');
  link.href = url; link.download = 'ev_sankey.svg'; document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

/* ----------------- Render helpers ----------------- */
function renderCurrent(){
  // recompute width/height in case of resize
  width = Math.max(600, document.getElementById('vizWrap').clientWidth - 40);
  sankeyGen = sankey().nodeId(d=>d.id).nodeWidth(16).nodePadding(10).extent([[1,1],[width-1,height-1]]);
  tickUpdate(); // immediate update with current scenario
}

/* ----------------- kick-off ----------------- */
renderCurrent();
startAutoUpdate();

// initial alert for user
showAlert('Level 2 Sankey initialized • Auto-updates enabled', 'ok');
