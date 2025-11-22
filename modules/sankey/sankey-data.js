/* sankey-data.js - Level 2 dataset with metadata for cost, carbon, leadTime.
   Nodes: suppliers, factory stages, warehouses, retail.
   Links include: value (units), costPerUnit (USD), carbonPerUnit (kg CO2), leadTime (days).
*/

(function(){
  // helper factory to build link with metadata
  function L(src, tgt, units, costPerUnit=10, carbonPerUnit=5, leadTime=5, status='ok'){
    return { source: src, target: tgt, value: units, costPerUnit, carbonPerUnit, leadTime, status };
  }

  // nodes list - using ids
  const nodes = [
    // TATA
    { id: 'tata_catl', name: 'TATA - CATL Cells', oem:'TATA', type:'supplier' },
    { id: 'tata_bosch', name: 'TATA - Bosch ECU', oem:'TATA', type:'supplier' },
    { id: 'tata_steel', name: 'TATA - Tata Steel', oem:'TATA', type:'supplier' },
    { id: 'tata_plant', name: 'TATA Manufacturing (Pune)', oem:'TATA', type:'plant', region:'India' },
    { id: 'tata_warehouse', name: 'TATA Warehouse (Pune Depot)', oem:'TATA', type:'warehouse' },

    // Mahindra
    { id: 'mah_lg', name: 'Mahindra - LG Chem', oem:'Mahindra', type:'supplier' },
    { id: 'mah_marelli', name: 'Mahindra - Marelli', oem:'Mahindra', type:'supplier' },
    { id: 'mah_plant', name: 'Mahindra Plant (Chakan)', oem:'Mahindra', type:'plant' },
    { id: 'mah_wh', name: 'Mahindra Warehouse', oem:'Mahindra', type:'warehouse' },

    // Tesla
    { id: 'tes_pan', name: 'Tesla - Panasonic Cells', oem:'Tesla', type:'supplier' },
    { id: 'tes_idra', name: 'Tesla - IDRA Gigacast', oem:'Tesla', type:'supplier' },
    { id: 'tes_giga', name: 'Tesla Giga Shanghai', oem:'Tesla', type:'plant', region:'China' },
    { id: 'tes_dist', name: 'Tesla Distribution (APAC)', oem:'Tesla', type:'warehouse' },

    // BYD
    { id: 'byd_blade', name: 'BYD - Blade Cells', oem:'BYD', type:'supplier' },
    { id: 'byd_sem', name: 'BYD - Semiconductor', oem:'BYD', type:'supplier' },
    { id: 'byd_plant', name: 'BYD Plant (Shenzhen)', oem:'BYD', type:'plant' },
    { id: 'byd_export', name: 'BYD Export Hub', oem:'BYD', type:'warehouse' }
  ];

  // base links; numbers are units per day (example)
  const links = [
    // TATA
    L('tata_catl','tata_plant', 1200, 65, 12, 7),
    L('tata_bosch','tata_plant', 1100, 30, 4, 4),
    L('tata_steel','tata_plant', 1150, 15, 20, 6),
    L('tata_plant','tata_warehouse', 2800, 0, 0, 1),

    // Mahindra
    L('mah_lg','mah_plant', 900, 62, 14, 9),
    L('mah_marelli','mah_plant', 800, 28, 5, 5),
    L('mah_plant','mah_wh', 1600, 0, 0, 1),

    // Tesla
    L('tes_pan','tes_giga', 2500, 60, 10, 10),
    L('tes_idra','tes_giga', 2300, 1200, 2, 7),
    L('tes_giga','tes_dist', 4800, 0, 0, 2),

    // BYD
    L('byd_blade','byd_plant', 2100, 35, 8, 6),
    L('byd_sem','byd_plant', 1800, 45, 3, 4),
    L('byd_plant','byd_export', 3900, 0, 0, 3),

    // cross-OEM flows (small sharing / subcontract)
    L('tata_catl','mah_plant', 120, 66, 12, 9),
    L('byd_blade','tes_giga', 200, 35, 8, 12)
  ];

  // augment nodes with metrics (simulated)
  nodes.forEach(n => {
    n.metrics = {
      unitsPerHour: Math.round((Math.random()*80) + 50),
      utilization: Math.round(60 + Math.random()*35) + '%',
      temperature: Math.round(30 + Math.random()*15),
      defectPct: (Math.random()*1.5).toFixed(2) + '%',
      lastUpdated: Date.now()
    };
    // sub parameters example
    n.sub = {
      sensors: {
        vibration: (Math.random()*10 + 2).toFixed(2) + ' mm/s',
        load: Math.round(30 + Math.random()*60) + '%',
        rpm: Math.round(500 + Math.random()*1500)
      },
      maintenance: {
        last: new Date(Date.now() - Math.round(Math.random()*30)*24*3600*1000).toISOString().slice(0,10),
        next: new Date(Date.now() + Math.round(Math.random()*30)*24*3600*1000).toISOString().slice(0,10)
      }
    };
  });

  // expose dataset with helpers
  window.Level2SankeyData = {
    nodes, links,
    // function to return deep clone
    clone: function(){ return { nodes: JSON.parse(JSON.stringify(nodes)), links: JSON.parse(JSON.stringify(links)) }; },

    // small simulator: apply multipliers (demand, leadTimeMultiplier), and optional random disruptions
    simulate: function({demand=1.0, leadTimeMul=1.0, disruption=false} = {}){
      const out = this.clone();
      // scale values by demand for quantities; adjust leadTime; add stochastic noise
      out.links.forEach(l => {
        // base units scaled
        const noise = 1 + (Math.random()*0.12 - 0.06); // ±6%
        l.value = Math.max(1, Math.round(l.value * demand * noise));
        l.cost = Math.round((l.costPerUnit || l.costPerUnit === 0 ? l.costPerUnit : 1) * l.value); // not used directly
        l.costPerUnit = l.costPerUnit; // keep
        l.carbonPerUnit = l.carbonPerUnit;
        // lead time scaled
        l.leadTime = Math.max(0.5, Math.round((l.leadTime || 1) * leadTimeMul));
        // disruption random: mark status 'delayed' occasionally or based on flag
        if(disruption && Math.random() < 0.12){
          l.status = 'delayed';
          // reduce throughput
          l.value = Math.max(1, Math.round(l.value * (0.4 + Math.random()*0.5)));
          l.leadTime = Math.round(l.leadTime * (1.4 + Math.random()*1.2));
        } else {
          l.status = 'ok';
        }
      });

      // mutate node metrics lightly
      out.nodes.forEach(n => {
        n.metrics.unitsPerHour = Math.max(1, Math.round(n.metrics.unitsPerHour * (0.9 + Math.random()*0.2) * demand));
        n.metrics.utilization = Math.min(100, Math.round(parseInt(n.metrics.utilization) * (0.9 + Math.random()*0.15))) + '%';
        n.metrics.temperature = Math.round(n.metrics.temperature * (0.98 + Math.random()*0.06));
        n.metrics.defectPct = (Math.max(0, (parseFloat(n.metrics.defectPct) * (0.95 + Math.random()*0.15))).toFixed(2) ) + '%';
        n.metrics.lastUpdated = Date.now();
      });

      return out;
    }
  };
})();
