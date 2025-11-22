/* data.js */
/* Module 2 data: suppliers, factory, warehouses, retail locations, shipments, machines, production, alerts */
window.DUMMY_DATA = (function(){
  const suppliers = [
    {id:'s1', name:'LithoBatt Co', type:'battery', city:'Seoul', leadTimeDays:7, risk:'medium', status:'on-time', lat:37.5665, lon:126.9780},
    {id:'s2', name:'PCBWorld', type:'pcb', city:'Taipei', leadTimeDays:5, risk:'low', status:'on-time', lat:25.0330, lon:121.5654},
    {id:'s3', name:'OLEDPro', type:'display', city:'Shenzhen', leadTimeDays:10, risk:'high', status:'delayed', lat:22.5431, lon:114.0579},
  ];

  const factory = { id:'f1', name:'NovaTech Main Plant', city:'Hyderabad', lat:17.3850, lon:78.4867 };

  const warehouses = [
    {id:'w1', name:'Warehouse A', city:'Hyderabad', lat:17.4480, lon:78.3875, stock:4200, capacity:5000},
    {id:'w2', name:'Warehouse B', city:'Mumbai', lat:19.0760, lon:72.8777, stock:3200, capacity:5000},
    {id:'w3', name:'Warehouse C', city:'Bengaluru', lat:12.9716, lon:77.5946, stock:4800, capacity:6000},
  ];

  const retailLocations = {
    'Retail - Chennai': { city:'Chennai', lat:13.0827, lon:80.2707 },
    'Retail - Delhi': { city:'Delhi', lat:28.7041, lon:77.1025 },
    'Retail - Kolkata': { city:'Kolkata', lat:22.5726, lon:88.3639 }
  };

  const shipments = [
    {id:'sh1', from:'w1', to:'Retail - Chennai', status:'in-transit', etaHours:12},
    {id:'sh2', from:'w2', to:'Retail - Delhi', status:'delivered', etaHours:0},
    {id:'sh3', from:'w3', to:'Retail - Kolkata', status:'delayed', etaHours:36},
  ];

  const machines = [
    {id:'m1', name:'Line 1 - Assembler', status:'running', rpm:1200},
    {id:'m2', name:'Line 2 - Tester', status:'idle', rpm:0},
    {id:'m3', name:'Line 3 - Packager', status:'fault', rpm:0},
  ];

  const production_per_hour = [120, 110, 115, 130, 140, 135, 128, 122];

  const alerts = [
    {id:'a1', ts:Date.now()-3600e3, level:'warn', text:'OLEDPro shipment delayed by 2 days'},
    {id:'a2', ts:Date.now()-1800e3, level:'danger', text:'Factory Line 3: PACKAGER fault detected'},
    {id:'a3', ts:Date.now()-600e3, level:'info', text:'Warehouse C nearing capacity'},
  ];

  return { suppliers, factory, warehouses, retailLocations, shipments, machines, production_per_hour, alerts };
})();
