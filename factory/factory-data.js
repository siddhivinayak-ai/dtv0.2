const factoryMachines = [
  {
      id: "M1",
      name: "Battery Mounting",
      status: "running",
      category: "Assembly",
      image: "https://www.bhavyamachinetools.com/shop/wp-content/uploads/2022/05/square-hard-guide-way-flat-bed-lathe-cjk6140b-600x600.jpg",
      throughput: 120,
      temperature: 42,
      power: "2.1 kW",
      uptime: "97%",
      downtime: "3%",
      mtbf: "420 hrs",
      operator: "Alex Carter",
      lastMaintenance: "2025-11-12",
      nextMaintenance: "2025-12-01",
      sensors: {
          vibration: "12 mm/s",
          load: "78%",
          rpm: 1500,
          noise: "65 dB"
      },
      errors: [
          { date: "2025-11-01", code: "E102", desc: "Temperature spike" }
      ]
  },

  {
      id: "M2",
      name: "PCB Soldering",
      status: "idle",
      category: "Electronics",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9MENkbMRlcYfPVhzQoksFnUyHkWvX8e_gyg&s",
      throughput: 95,
      temperature: 37,
      power: "1.6 kW",
      uptime: "88%",
      downtime: "12%",
      mtbf: "360 hrs",
      operator: "Zara Lin",
      lastMaintenance: "2025-10-30",
      nextMaintenance: "2025-11-25",
      sensors: {
          vibration: "9 mm/s",
          load: "54%",
          rpm: 1200,
          noise: "55 dB"
      },
      errors: [
          { date: "2025-10-11", code: "E054", desc: "Solder overflow" }
      ]
  },

  {
      id: "M3",
      name: "Screen Attachment",
      status: "fault",
      category: "Assembly",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_NClT-2-yooCXg11pFeq1GrIPjDtz5uWpg&s",
      throughput: 0,
      temperature: 55,
      power: "1.9 kW",
      uptime: "72%",
      downtime: "28%",
      mtbf: "250 hrs",
      operator: "John Mills",
      lastMaintenance: "2025-10-10",
      nextMaintenance: "2025-11-20",
      sensors: {
          vibration: "26 mm/s",
          load: "0%",
          rpm: 0,
          noise: "92 dB"
      },
      errors: [
          { date: "2025-11-20", code: "E901", desc: "Vacuum nozzle failure" },
          { date: "2025-11-18", code: "E755", desc: "Screen misalignment" }
      ]
  },
  
  {
    "id": "M3",
    "name": "Screen Attachment",
    "status": "fault",
    "category": "Assembly",
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQNrpS2iXAnWjRy5guaZqGo-DEeJSCrJBBgO9UuNlrQF2UkUT8868UjYC01IxN8ZQj8iF18qKSvGlSF434XR8PzavmM7w3PGlzkROTmNoy3RRnXTDRI7_iqw",
    "throughput": 0,
    "temperature": 55,
    "power": "1.9 kW",
    "uptime": "72%",
    "downtime": "28%",
    "mtbf": "250 hrs",
    "operator": "John Mills",
    "lastMaintenance": "2025-10-10",
    "nextMaintenance": "2025-11-20",
    "sensors": {
      "vibration": "26 mm/s",
      "load": "0%",
      "rpm": 0,
      "noise": "92 dB"
    },
    "errors": [
      {
        "date": "2025-11-20",
        "code": "E901",
        "desc": "Vacuum nozzle failure"
      },
      {
        "date": "2025-11-18",
        "code": "E755",
        "desc": "Screen misalignment"
      }
    ]
  },
  {
    "id": "M4",
    "name": "CNC Mill 5-Axis",
    "status": "idle",
    "category": "Machining",
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRDUncO1XuzrFFdyFOigmM5e_wY-bFdc6iMYjMyVI4whO5kgBdVCBCLoHy7fmwATdOwLgXSspmPSzGFi-EZYkAlQkQIT9AQeGBEdYI9LzrXtZT-Ck2r1s2w",
    "throughput": 12,
    "temperature": 38,
    "power": "25 kW",
    "uptime": "95%",
    "downtime": "5%",
    "mtbf": "850 hrs",
    "operator": "Jane Doe",
    "lastMaintenance": "2025-11-01",
    "nextMaintenance": "2025-12-01",
    "sensors": {
      "vibration": "4 mm/s",
      "load": "10%",
      "rpm": 1500,
      "noise": "78 dB"
    },
    "errors": [
      {
        "date": "2025-11-22",
        "code": "A101",
        "desc": "Axis 3 Homing Error"
      }
    ]
  },
  {
    "id": "M5",
    "name": "Packaging Line 1",
    "status": "running",
    "category": "Packaging",
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSqFQPXkpBXHhEMTlb9aUpSpshBjDuqfTwvgTqSivzF3JI3_JwfYOnniYCREU2ZUNs5lgC46o-0T-DQAPDq1sKvlTALB7BdSHqM_AUzOuL_dMZ_bUy_VTps7g",
    "throughput": 450,
    "temperature": 35,
    "power": "15 kW",
    "uptime": "98%",
    "downtime": "2%",
    "mtbf": "1200 hrs",
    "operator": "Alex Chen",
    "lastMaintenance": "2025-11-15",
    "nextMaintenance": "2025-12-15",
    "sensors": {
      "vibration": "3 mm/s",
      "load": "65%",
      "rpm": 120,
      "noise": "85 dB"
    },
    "errors": [
      {
        "date": "2025-11-21",
        "code": "E102",
        "desc": "Film tear sensor false alarm"
      }
    ]
  },
  {
    "id": "M6",
    "name": "Injection Molder",
    "status": "running",
    "category": "Molding",
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTN15L8WsOa1g5aTNT6QHZIcmw8BCpM8PrUZzx0lNxGks3IjOOU4WWCwlRIoXp6DN4fKOt9ujaFBk4YOFYBa7KMYFMnxeGheJdbf2bgGq0WJ8OQ5kze6PfOwQ",
    "throughput": 90,
    "temperature": 45,
    "power": "150 kW",
    "uptime": "88%",
    "downtime": "12%",
    "mtbf": "600 hrs",
    "operator": "Sarah Kim",
    "lastMaintenance": "2025-10-25",
    "nextMaintenance": "2025-11-25",
    "sensors": {
      "vibration": "7 mm/s",
      "load": "95%",
      "rpm": 0,
      "noise": "95 dB"
    },
    "errors": [
      {
        "date": "2025-11-22",
        "code": "E405",
        "desc": "Hydraulic pressure low"
      }
    ]
  },
  {
    "id": "M7",
    "name": "Robotic Welder",
    "status": "running",
    "category": "Assembly",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFEurmgx_AT2Zjmgl0soIB3IrKCwk8ckuC1g&s",
    "throughput": 60,
    "temperature": 42,
    "power": "8.5 kW",
    "uptime": "99%",
    "downtime": "1%",
    "mtbf": "1500 hrs",
    "operator": "Mike Davis",
    "lastMaintenance": "2025-11-19",
    "nextMaintenance": "2025-12-19",
    "sensors": {
      "vibration": "2 mm/s",
      "load": "75%",
      "rpm": 0,
      "noise": "98 dB"
    },
    "errors": []
  },
  {
    "id": "M8",
    "name": "Laser Cutter",
    "status": "running",
    "category": "Fabrication",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNgof6bxMSPhrUosgeFr_5-q1hPOTcL9Dw2Q&s",
    "throughput": 0.8,
    "temperature": 39,
    "power": "12 kW",
    "uptime": "97%",
    "downtime": "3%",
    "mtbf": "1100 hrs",
    "operator": "Emily Rodriguez",
    "lastMaintenance": "2025-11-10",
    "nextMaintenance": "2025-12-10",
    "sensors": {
      "vibration": "5 mm/s",
      "load": "80%",
      "rpm": 0,
      "noise": "82 dB"
    },
    "errors": [
      {
        "date": "2025-11-21",
        "code": "E610",
        "desc": "Lens contamination warning"
      }
    ]
  },
  {
    "id": "M9",
    "name": "Automated Soldering",
    "status": "fault",
    "category": "Electronics",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtrPWqYV-KYHyq-jVB38y9VHjU_XMh7ZkQA&s",
    "throughput": 0,
    "temperature": 60,
    "power": "3.5 kW",
    "uptime": "65%",
    "downtime": "35%",
    "mtbf": "300 hrs",
    "operator": "David Lee",
    "lastMaintenance": "2025-10-15",
    "nextMaintenance": "2025-11-15",
    "sensors": {
      "vibration": "15 mm/s",
      "load": "0%",
      "rpm": 0,
      "noise": "88 dB"
    },
    "errors": [
      {
        "date": "2025-11-22",
        "code": "E302",
        "desc": "Solder paste blocked"
      }
    ]
  },
  {
    "id": "M10",
    "name": "Industrial 3D Printer",
    "status": "idle",
    "category": "Additive Man.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUmCJp3Gpw4VAZeqFDnWqgb8kov3rdBrWeg&s",
    "throughput": 1,
    "temperature": 30,
    "power": "6 kW",
    "uptime": "90%",
    "downtime": "10%",
    "mtbf": "700 hrs",
    "operator": "Jessica White",
    "lastMaintenance": "2025-11-05",
    "nextMaintenance": "2025-12-05",
    "sensors": {
      "vibration": "1 mm/s",
      "load": "5%",
      "rpm": 0,
      "noise": "65 dB"
    },
    "errors": []
  },
  {
    "id": "M11",
    "name": "Quality Inspection",
    "status": "running",
    "category": "Inspection",
    "image": "https://i.imgur.com/QkZlW7a.jpg",
    "throughput": 120,
    "temperature": 32,
    "power": "0.5 kW",
    "uptime": "99%",
    "downtime": "1%",
    "mtbf": "2000 hrs",
    "operator": "Omar Hassan",
    "lastMaintenance": "2025-11-18",
    "nextMaintenance": "2025-12-18",
    "sensors": {
      "vibration": "1 mm/s",
      "load": "50%",
      "rpm": 0,
      "noise": "70 dB"
    },
    "errors": []
  },
  {
    "id": "M12",
    "name": "Conveyor System",
    "status": "running",
    "category": "Material Handling",
    "image": "https://i.imgur.com/2A8XlWn.jpg",
    "throughput": 2.5,
    "temperature": 30,
    "power": "2.2 kW",
    "uptime": "100%",
    "downtime": "0%",
    "mtbf": "3000 hrs",
    "operator": "John Mills",
    "lastMaintenance": "2025-11-01",
    "nextMaintenance": "2025-12-01",
    "sensors": {
      "vibration": "5 mm/s",
      "load": "40%",
      "rpm": 60,
      "noise": "75 dB"
    },
    "errors": []
  },
  {
    "id": "M13",
    "name": "Heat Treatment Oven",
    "status": "running",
    "category": "Processing",
    "image": "https://i.imgur.com/V9jHl5k.jpg",
    "throughput": 5,
    "temperature": 250,
    "power": "40 kW",
    "uptime": "96%",
    "downtime": "4%",
    "mtbf": "900 hrs",
    "operator": "Jane Doe",
    "lastMaintenance": "2025-10-20",
    "nextMaintenance": "2025-11-30",
    "sensors": {
      "vibration": "0 mm/s",
      "load": "90%",
      "rpm": 0,
      "noise": "60 dB"
    },
    "errors": [
      {
        "date": "2025-11-21",
        "code": "E805",
        "desc": "Temperature variance high"
      }
    ]
  },
  {
    "id": "M14",
    "name": "Hydraulic Press 1",
    "status": "running",
    "category": "Forming",
    "image": "https://i.imgur.com/R3aB1kP.jpg",
    "throughput": 50,
    "temperature": 40,
    "power": "18 kW",
    "uptime": "94%",
    "downtime": "6%",
    "mtbf": "550 hrs",
    "operator": "Chris Brown",
    "lastMaintenance": "2025-11-08",
    "nextMaintenance": "2025-12-08",
    "sensors": {
      "vibration": "6 mm/s",
      "load": "85%",
      "rpm": 0,
      "noise": "90 dB"
    },
    "errors": [
      {
        "date": "2025-11-15",
        "code": "P210",
        "desc": "Ram slow retraction"
      }
    ]
  },
  {
    "id": "M15",
    "name": "Chemical Mixer 2",
    "status": "running",
    "category": "Processing",
    "image": "https://i.imgur.com/K7wXj0L.jpg",
    "throughput": 1000,
    "temperature": 75,
    "power": "5.5 kW",
    "uptime": "98%",
    "downtime": "2%",
    "mtbf": "1800 hrs",
    "operator": "Anna Garcia",
    "lastMaintenance": "2025-10-30",
    "nextMaintenance": "2025-11-30",
    "sensors": {
      "vibration": "3 mm/s",
      "load": "70%",
      "rpm": 300,
      "noise": "80 dB"
    },
    "errors": []
  },
  {
    "id": "M16",
    "name": "Coating Booth 3",
    "status": "idle",
    "category": "Finishing",
    "image": "https://i.imgur.com/Z9sF0xN.jpg",
    "throughput": 0,
    "temperature": 25,
    "power": "1.2 kW",
    "uptime": "92%",
    "downtime": "8%",
    "mtbf": "1400 hrs",
    "operator": "Mark Wilson",
    "lastMaintenance": "2025-11-20",
    "nextMaintenance": "2025-12-20",
    "sensors": {
      "vibration": "1 mm/s",
      "load": "0%",
      "rpm": 0,
      "noise": "68 dB"
    },
    "errors": []
  },
  {
    "id": "M17",
    "name": "Surface Grinder",
    "status": "fault",
    "category": "Machining",
    "image": "https://i.imgur.com/h2QyV5T.jpg",
    "throughput": 0,
    "temperature": 50,
    "power": "10 kW",
    "uptime": "70%",
    "downtime": "30%",
    "mtbf": "400 hrs",
    "operator": "Susan Taylor",
    "lastMaintenance": "2025-10-05",
    "nextMaintenance": "2025-11-05",
    "sensors": {
      "vibration": "20 mm/s",
      "load": "0%",
      "rpm": 0,
      "noise": "98 dB"
    },
    "errors": [
      {
        "date": "2025-11-22",
        "code": "G502",
        "desc": "Grinding wheel bearing failure"
      },
      {
        "date": "2025-11-19",
        "code": "G501",
        "desc": "Coolant pump shutdown"
      }
    ]
  },
  {
    "id": "M18",
    "name": "Pick-and-Place Robot",
    "status": "running",
    "category": "Assembly",
    "image": "https://i.imgur.com/4CjA1vI.jpg",
    "throughput": 800,
    "temperature": 34,
    "power": "1.5 kW",
    "uptime": "99%",
    "downtime": "1%",
    "mtbf": "2500 hrs",
    "operator": "Daniel Hill",
    "lastMaintenance": "2025-11-21",
    "nextMaintenance": "2025-12-21",
    "sensors": {
      "vibration": "1 mm/s",
      "load": "30%",
      "rpm": 0,
      "noise": "72 dB"
    },
    "errors": []
  },
  {
    "id": "M19",
    "name": "Wire EDM Machine",
    "status": "running",
    "category": "Machining",
    "image": "https://i.imgur.com/L7Xg0zO.jpg",
    "throughput": 0.5,
    "temperature": 40,
    "power": "7 kW",
    "uptime": "97%",
    "downtime": "3%",
    "mtbf": "1300 hrs",
    "operator": "Laura Perez",
    "lastMaintenance": "2025-11-12",
    "nextMaintenance": "2025-12-12",
    "sensors": {
      "vibration": "2 mm/s",
      "load": "60%",
      "rpm": 0,
      "noise": "75 dB"
    },
    "errors": []
  },
  {
    "id": "M20",
    "name": "Automated Palletizer",
    "status": "running",
    "category": "Packaging",
    "image": "https://i.imgur.com/N4eP8jA.jpg",
    "throughput": 30,
    "temperature": 35,
    "power": "4 kW",
    "uptime": "95%",
    "downtime": "5%",
    "mtbf": "1000 hrs",
    "operator": "Kevin Baker",
    "lastMaintenance": "2025-11-03",
    "nextMaintenance": "2025-12-03",
    "sensors": {
      "vibration": "8 mm/s",
      "load": "75%",
      "rpm": 0,
      "noise": "88 dB"
    },
    "errors": [
      {
        "date": "2025-11-20",
        "code": "P412",
        "desc": "Stack height sensor error"
      }
    ]
  },
  {
    "id": "M21",
    "name": "Billet Shear",
    "status": "running",
    "category": "Forming",
    "image": "https://i.imgur.com/GjT6xR0.jpg",
    "throughput": 15,
    "temperature": 50,
    "power": "50 kW",
    "uptime": "93%",
    "downtime": "7%",
    "mtbf": "650 hrs",
    "operator": "Jeff Clark",
    "lastMaintenance": "2025-10-28",
    "nextMaintenance": "2025-11-28",
    "sensors": {
      "vibration": "10 mm/s",
      "load": "98%",
      "rpm": 0,
      "noise": "105 dB"
    },
    "errors": []
  },
  {
    "id": "M22",
    "name": "Curing Chamber",
    "status": "running",
    "category": "Processing",
    "image": "https://i.imgur.com/hYlT0Mv.jpg",
    "throughput": 4,
    "temperature": 120,
    "power": "20 kW",
    "uptime": "98%",
    "downtime": "2%",
    "mtbf": "1600 hrs",
    "operator": "Maria Lopez",
    "lastMaintenance": "2025-11-16",
    "nextMaintenance": "2025-12-16",
    "sensors": {
      "vibration": "0 mm/s",
      "load": "80%",
      "rpm": 0,
      "noise": "55 dB"
    },
    "errors": []
  },
  {
    "id": "M23",
    "name": "Air Compressor 1",
    "status": "running",
    "category": "Utility",
    "image": "https://i.imgur.com/eB3dOQZ.jpg",
    "throughput": 100,
    "temperature": 40,
    "power": "75 kW",
    "uptime": "99%",
    "downtime": "1%",
    "mtbf": "1900 hrs",
    "operator": "Robert King",
    "lastMaintenance": "2025-11-07",
    "nextMaintenance": "2025-12-07",
    "sensors": {
      "vibration": "4 mm/s",
      "load": "90%",
      "rpm": 1800,
      "noise": "85 dB"
    },
    "errors": []
  },
  {
    "id": "M24",
    "name": "Bending Brake",
    "status": "idle",
    "category": "Forming",
    "image": "https://i.imgur.com/8QoK2Lw.jpg",
    "throughput": 0,
    "temperature": 30,
    "power": "5 kW",
    "uptime": "85%",
    "downtime": "15%",
    "mtbf": "800 hrs",
    "operator": "Tina Hall",
    "lastMaintenance": "2025-10-18",
    "nextMaintenance": "2025-11-18",
    "sensors": {
      "vibration": "3 mm/s",
      "load": "0%",
      "rpm": 0,
      "noise": "70 dB"
    },
    "errors": []
  },
  {
    "id": "M25",
    "name": "Vibratory Finisher",
    "status": "running",
    "category": "Finishing",
    "image": "https://i.imgur.com/T0bC3dU.jpg",
    "throughput": 60,
    "temperature": 45,
    "power": "3.3 kW",
    "uptime": "96%",
    "downtime": "4%",
    "mtbf": "1100 hrs",
    "operator": "Gary Allen",
    "lastMaintenance": "2025-11-14",
    "nextMaintenance": "2025-12-14",
    "sensors": {
      "vibration": "12 mm/s",
      "load": "70%",
      "rpm": 0,
      "noise": "90 dB"
    },
    "errors": []
  },
  {
    "id": "M26",
    "name": "Automated Guided Vehicle",
    "status": "running",
    "category": "Material Handling",
    "image": "https://i.imgur.com/QkRz7yX.jpg",
    "throughput": 0.5,
    "temperature": 30,
    "power": "1.0 kW",
    "uptime": "99%",
    "downtime": "1%",
    "mtbf": "2200 hrs",
    "operator": "Eva Miller",
    "lastMaintenance": "2025-11-20",
    "nextMaintenance": "2025-12-20",
    "sensors": {
      "vibration": "1 mm/s",
      "load": "50%",
      "rpm": 30,
      "noise": "60 dB"
    },
    "errors": []
  },
  {
    "id": "M27",
    "name": "Centrifugal Pump 4",
    "status": "running",
    "category": "Utility",
    "image": "https://i.imgur.com/3ZgU9hV.jpg",
    "throughput": 500,
    "temperature": 60,
    "power": "15 kW",
    "uptime": "95%",
    "downtime": "5%",
    "mtbf": "950 hrs",
    "operator": "Frank Carter",
    "lastMaintenance": "2025-11-04",
    "nextMaintenance": "2025-12-04",
    "sensors": {
      "vibration": "8 mm/s",
      "load": "85%",
      "rpm": 1450,
      "noise": "82 dB"
    },
    "errors": [
      {
        "date": "2025-11-21",
        "code": "U301",
        "desc": "Minor seal leak"
      }
    ]
  },
  {
    "id": "M28",
    "name": "Powder Coating Unit",
    "status": "running",
    "category": "Finishing",
    "image": "https://i.imgur.com/H1Xj0oP.jpg",
    "throughput": 40,
    "temperature": 200,
    "power": "10 kW",
    "uptime": "97%",
    "downtime": "3%",
    "mtbf": "1300 hrs",
    "operator": "Nancy Scott",
    "lastMaintenance": "2025-11-11",
    "nextMaintenance": "2025-12-11",
    "sensors": {
      "vibration": "2 mm/s",
      "load": "70%",
      "rpm": 0,
      "noise": "75 dB"
    },
    "errors": []
  },
  {
    "id": "M29",
    "name": "Automated Storage/Retrieval System",
    "status": "running",
    "category": "Material Handling",
    "image": "https://i.imgur.com/P5oW2jY.jpg",
    "throughput": 150,
    "temperature": 25,
    "power": "6 kW",
    "uptime": "99%",
    "downtime": "1%",
    "mtbf": "3500 hrs",
    "operator": "Henry Wilson",
    "lastMaintenance": "2025-11-17",
    "nextMaintenance": "2025-12-17",
    "sensors": {
      "vibration": "1 mm/s",
      "load": "45%",
      "rpm": 50,
      "noise": "65 dB"
    },
    "errors": []
  }









  // Add 5 more similarly enriched machines...
];








  // {
  //   "id": "M3",
  //   "name": "Screen Attachment",
  //   "status": "fault",
  //   "category": "Assembly",
  //   "image": "https://i.imgur.com/G5gWkS7.jpg",
  //   "throughput": 0,
  //   "temperature": 55,
  //   "power": "1.9 kW",
  //   "uptime": "72%",
  //   "downtime": "28%",
  //   "mtbf": "250 hrs",
  //   "operator": "John Mills",
  //   "lastMaintenance": "2025-10-10",
  //   "nextMaintenance": "2025-11-20",
  //   "sensors": {
  //     "vibration": "26 mm/s",
  //     "load": "0%",
  //     "rpm": 0,
  //     "noise": "92 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-20",
  //       "code": "E901",
  //       "desc": "Vacuum nozzle failure"
  //     },
  //     {
  //       "date": "2025-11-18",
  //       "code": "E755",
  //       "desc": "Screen misalignment"
  //     }
  //   ]
  // },
  // {
  //   "id": "M4",
  //   "name": "CNC Mill 5-Axis",
  //   "status": "idle",
  //   "category": "Machining",
  //   "image": "https://i.imgur.com/8zXlY0R.jpg",
  //   "throughput": 12,
  //   "temperature": 38,
  //   "power": "25 kW",
  //   "uptime": "95%",
  //   "downtime": "5%",
  //   "mtbf": "850 hrs",
  //   "operator": "Jane Doe",
  //   "lastMaintenance": "2025-11-01",
  //   "nextMaintenance": "2025-12-01",
  //   "sensors": {
  //     "vibration": "4 mm/s",
  //     "load": "10%",
  //     "rpm": 1500,
  //     "noise": "78 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-22",
  //       "code": "A101",
  //       "desc": "Axis 3 Homing Error"
  //     }
  //   ]
  // },
  // {
  //   "id": "M5",
  //   "name": "Packaging Line 1",
  //   "status": "running",
  //   "category": "Packaging",
  //   "image": "https://i.imgur.com/7gN0y5J.jpg",
  //   "throughput": 450,
  //   "temperature": 35,
  //   "power": "15 kW",
  //   "uptime": "98%",
  //   "downtime": "2%",
  //   "mtbf": "1200 hrs",
  //   "operator": "Alex Chen",
  //   "lastMaintenance": "2025-11-15",
  //   "nextMaintenance": "2025-12-15",
  //   "sensors": {
  //     "vibration": "3 mm/s",
  //     "load": "65%",
  //     "rpm": 120,
  //     "noise": "85 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-21",
  //       "code": "E102",
  //       "desc": "Film tear sensor false alarm"
  //     }
  //   ]
  // },
  // {
  //   "id": "M6",
  //   "name": "Injection Molder",
  //   "status": "running",
  //   "category": "Molding",
  //   "image": "https://i.imgur.com/T0a3sXq.jpg",
  //   "throughput": 90,
  //   "temperature": 45,
  //   "power": "150 kW",
  //   "uptime": "88%",
  //   "downtime": "12%",
  //   "mtbf": "600 hrs",
  //   "operator": "Sarah Kim",
  //   "lastMaintenance": "2025-10-25",
  //   "nextMaintenance": "2025-11-25",
  //   "sensors": {
  //     "vibration": "7 mm/s",
  //     "load": "95%",
  //     "rpm": 0,
  //     "noise": "95 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-22",
  //       "code": "E405",
  //       "desc": "Hydraulic pressure low"
  //     }
  //   ]
  // },
  // {
  //   "id": "M7",
  //   "name": "Robotic Welder",
  //   "status": "running",
  //   "category": "Assembly",
  //   "image": "https://i.imgur.com/P0oV4q8.jpg",
  //   "throughput": 60,
  //   "temperature": 42,
  //   "power": "8.5 kW",
  //   "uptime": "99%",
  //   "downtime": "1%",
  //   "mtbf": "1500 hrs",
  //   "operator": "Mike Davis",
  //   "lastMaintenance": "2025-11-19",
  //   "nextMaintenance": "2025-12-19",
  //   "sensors": {
  //     "vibration": "2 mm/s",
  //     "load": "75%",
  //     "rpm": 0,
  //     "noise": "98 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M8",
  //   "name": "Laser Cutter",
  //   "status": "running",
  //   "category": "Fabrication",
  //   "image": "https://i.imgur.com/1G2iBfP.jpg",
  //   "throughput": 0.8,
  //   "temperature": 39,
  //   "power": "12 kW",
  //   "uptime": "97%",
  //   "downtime": "3%",
  //   "mtbf": "1100 hrs",
  //   "operator": "Emily Rodriguez",
  //   "lastMaintenance": "2025-11-10",
  //   "nextMaintenance": "2025-12-10",
  //   "sensors": {
  //     "vibration": "5 mm/s",
  //     "load": "80%",
  //     "rpm": 0,
  //     "noise": "82 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-21",
  //       "code": "E610",
  //       "desc": "Lens contamination warning"
  //     }
  //   ]
  // },
  // {
  //   "id": "M9",
  //   "name": "Automated Soldering",
  //   "status": "fault",
  //   "category": "Electronics",
  //   "image": "https://i.imgur.com/y8U3g2z.jpg",
  //   "throughput": 0,
  //   "temperature": 60,
  //   "power": "3.5 kW",
  //   "uptime": "65%",
  //   "downtime": "35%",
  //   "mtbf": "300 hrs",
  //   "operator": "David Lee",
  //   "lastMaintenance": "2025-10-15",
  //   "nextMaintenance": "2025-11-15",
  //   "sensors": {
  //     "vibration": "15 mm/s",
  //     "load": "0%",
  //     "rpm": 0,
  //     "noise": "88 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-22",
  //       "code": "E302",
  //       "desc": "Solder paste blocked"
  //     }
  //   ]
  // },
  // {
  //   "id": "M10",
  //   "name": "Industrial 3D Printer",
  //   "status": "idle",
  //   "category": "Additive Man.",
  //   "image": "https://i.imgur.com/v0QkE2l.jpg",
  //   "throughput": 1,
  //   "temperature": 30,
  //   "power": "6 kW",
  //   "uptime": "90%",
  //   "downtime": "10%",
  //   "mtbf": "700 hrs",
  //   "operator": "Jessica White",
  //   "lastMaintenance": "2025-11-05",
  //   "nextMaintenance": "2025-12-05",
  //   "sensors": {
  //     "vibration": "1 mm/s",
  //     "load": "5%",
  //     "rpm": 0,
  //     "noise": "65 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M11",
  //   "name": "Quality Inspection",
  //   "status": "running",
  //   "category": "Inspection",
  //   "image": "https://i.imgur.com/QkZlW7a.jpg",
  //   "throughput": 120,
  //   "temperature": 32,
  //   "power": "0.5 kW",
  //   "uptime": "99%",
  //   "downtime": "1%",
  //   "mtbf": "2000 hrs",
  //   "operator": "Omar Hassan",
  //   "lastMaintenance": "2025-11-18",
  //   "nextMaintenance": "2025-12-18",
  //   "sensors": {
  //     "vibration": "1 mm/s",
  //     "load": "50%",
  //     "rpm": 0,
  //     "noise": "70 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M12",
  //   "name": "Conveyor System",
  //   "status": "running",
  //   "category": "Material Handling",
  //   "image": "https://i.imgur.com/2A8XlWn.jpg",
  //   "throughput": 2.5,
  //   "temperature": 30,
  //   "power": "2.2 kW",
  //   "uptime": "100%",
  //   "downtime": "0%",
  //   "mtbf": "3000 hrs",
  //   "operator": "John Mills",
  //   "lastMaintenance": "2025-11-01",
  //   "nextMaintenance": "2025-12-01",
  //   "sensors": {
  //     "vibration": "5 mm/s",
  //     "load": "40%",
  //     "rpm": 60,
  //     "noise": "75 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M13",
  //   "name": "Heat Treatment Oven",
  //   "status": "running",
  //   "category": "Processing",
  //   "image": "https://i.imgur.com/V9jHl5k.jpg",
  //   "throughput": 5,
  //   "temperature": 250,
  //   "power": "40 kW",
  //   "uptime": "96%",
  //   "downtime": "4%",
  //   "mtbf": "900 hrs",
  //   "operator": "Jane Doe",
  //   "lastMaintenance": "2025-10-20",
  //   "nextMaintenance": "2025-11-30",
  //   "sensors": {
  //     "vibration": "0 mm/s",
  //     "load": "90%",
  //     "rpm": 0,
  //     "noise": "60 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-21",
  //       "code": "E805",
  //       "desc": "Temperature variance high"
  //     }
  //   ]
  // },
  // {
  //   "id": "M14",
  //   "name": "Hydraulic Press 1",
  //   "status": "running",
  //   "category": "Forming",
  //   "image": "https://i.imgur.com/R3aB1kP.jpg",
  //   "throughput": 50,
  //   "temperature": 40,
  //   "power": "18 kW",
  //   "uptime": "94%",
  //   "downtime": "6%",
  //   "mtbf": "550 hrs",
  //   "operator": "Chris Brown",
  //   "lastMaintenance": "2025-11-08",
  //   "nextMaintenance": "2025-12-08",
  //   "sensors": {
  //     "vibration": "6 mm/s",
  //     "load": "85%",
  //     "rpm": 0,
  //     "noise": "90 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-15",
  //       "code": "P210",
  //       "desc": "Ram slow retraction"
  //     }
  //   ]
  // },
  // {
  //   "id": "M15",
  //   "name": "Chemical Mixer 2",
  //   "status": "running",
  //   "category": "Processing",
  //   "image": "https://i.imgur.com/K7wXj0L.jpg",
  //   "throughput": 1000,
  //   "temperature": 75,
  //   "power": "5.5 kW",
  //   "uptime": "98%",
  //   "downtime": "2%",
  //   "mtbf": "1800 hrs",
  //   "operator": "Anna Garcia",
  //   "lastMaintenance": "2025-10-30",
  //   "nextMaintenance": "2025-11-30",
  //   "sensors": {
  //     "vibration": "3 mm/s",
  //     "load": "70%",
  //     "rpm": 300,
  //     "noise": "80 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M16",
  //   "name": "Coating Booth 3",
  //   "status": "idle",
  //   "category": "Finishing",
  //   "image": "https://i.imgur.com/Z9sF0xN.jpg",
  //   "throughput": 0,
  //   "temperature": 25,
  //   "power": "1.2 kW",
  //   "uptime": "92%",
  //   "downtime": "8%",
  //   "mtbf": "1400 hrs",
  //   "operator": "Mark Wilson",
  //   "lastMaintenance": "2025-11-20",
  //   "nextMaintenance": "2025-12-20",
  //   "sensors": {
  //     "vibration": "1 mm/s",
  //     "load": "0%",
  //     "rpm": 0,
  //     "noise": "68 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M17",
  //   "name": "Surface Grinder",
  //   "status": "fault",
  //   "category": "Machining",
  //   "image": "https://i.imgur.com/h2QyV5T.jpg",
  //   "throughput": 0,
  //   "temperature": 50,
  //   "power": "10 kW",
  //   "uptime": "70%",
  //   "downtime": "30%",
  //   "mtbf": "400 hrs",
  //   "operator": "Susan Taylor",
  //   "lastMaintenance": "2025-10-05",
  //   "nextMaintenance": "2025-11-05",
  //   "sensors": {
  //     "vibration": "20 mm/s",
  //     "load": "0%",
  //     "rpm": 0,
  //     "noise": "98 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-22",
  //       "code": "G502",
  //       "desc": "Grinding wheel bearing failure"
  //     },
  //     {
  //       "date": "2025-11-19",
  //       "code": "G501",
  //       "desc": "Coolant pump shutdown"
  //     }
  //   ]
  // },
  // {
  //   "id": "M18",
  //   "name": "Pick-and-Place Robot",
  //   "status": "running",
  //   "category": "Assembly",
  //   "image": "https://i.imgur.com/4CjA1vI.jpg",
  //   "throughput": 800,
  //   "temperature": 34,
  //   "power": "1.5 kW",
  //   "uptime": "99%",
  //   "downtime": "1%",
  //   "mtbf": "2500 hrs",
  //   "operator": "Daniel Hill",
  //   "lastMaintenance": "2025-11-21",
  //   "nextMaintenance": "2025-12-21",
  //   "sensors": {
  //     "vibration": "1 mm/s",
  //     "load": "30%",
  //     "rpm": 0,
  //     "noise": "72 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M19",
  //   "name": "Wire EDM Machine",
  //   "status": "running",
  //   "category": "Machining",
  //   "image": "https://i.imgur.com/L7Xg0zO.jpg",
  //   "throughput": 0.5,
  //   "temperature": 40,
  //   "power": "7 kW",
  //   "uptime": "97%",
  //   "downtime": "3%",
  //   "mtbf": "1300 hrs",
  //   "operator": "Laura Perez",
  //   "lastMaintenance": "2025-11-12",
  //   "nextMaintenance": "2025-12-12",
  //   "sensors": {
  //     "vibration": "2 mm/s",
  //     "load": "60%",
  //     "rpm": 0,
  //     "noise": "75 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M20",
  //   "name": "Automated Palletizer",
  //   "status": "running",
  //   "category": "Packaging",
  //   "image": "https://i.imgur.com/N4eP8jA.jpg",
  //   "throughput": 30,
  //   "temperature": 35,
  //   "power": "4 kW",
  //   "uptime": "95%",
  //   "downtime": "5%",
  //   "mtbf": "1000 hrs",
  //   "operator": "Kevin Baker",
  //   "lastMaintenance": "2025-11-03",
  //   "nextMaintenance": "2025-12-03",
  //   "sensors": {
  //     "vibration": "8 mm/s",
  //     "load": "75%",
  //     "rpm": 0,
  //     "noise": "88 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-20",
  //       "code": "P412",
  //       "desc": "Stack height sensor error"
  //     }
  //   ]
  // },
  // {
  //   "id": "M21",
  //   "name": "Billet Shear",
  //   "status": "running",
  //   "category": "Forming",
  //   "image": "https://i.imgur.com/GjT6xR0.jpg",
  //   "throughput": 15,
  //   "temperature": 50,
  //   "power": "50 kW",
  //   "uptime": "93%",
  //   "downtime": "7%",
  //   "mtbf": "650 hrs",
  //   "operator": "Jeff Clark",
  //   "lastMaintenance": "2025-10-28",
  //   "nextMaintenance": "2025-11-28",
  //   "sensors": {
  //     "vibration": "10 mm/s",
  //     "load": "98%",
  //     "rpm": 0,
  //     "noise": "105 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M22",
  //   "name": "Curing Chamber",
  //   "status": "running",
  //   "category": "Processing",
  //   "image": "https://i.imgur.com/hYlT0Mv.jpg",
  //   "throughput": 4,
  //   "temperature": 120,
  //   "power": "20 kW",
  //   "uptime": "98%",
  //   "downtime": "2%",
  //   "mtbf": "1600 hrs",
  //   "operator": "Maria Lopez",
  //   "lastMaintenance": "2025-11-16",
  //   "nextMaintenance": "2025-12-16",
  //   "sensors": {
  //     "vibration": "0 mm/s",
  //     "load": "80%",
  //     "rpm": 0,
  //     "noise": "55 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M23",
  //   "name": "Air Compressor 1",
  //   "status": "running",
  //   "category": "Utility",
  //   "image": "https://i.imgur.com/eB3dOQZ.jpg",
  //   "throughput": 100,
  //   "temperature": 40,
  //   "power": "75 kW",
  //   "uptime": "99%",
  //   "downtime": "1%",
  //   "mtbf": "1900 hrs",
  //   "operator": "Robert King",
  //   "lastMaintenance": "2025-11-07",
  //   "nextMaintenance": "2025-12-07",
  //   "sensors": {
  //     "vibration": "4 mm/s",
  //     "load": "90%",
  //     "rpm": 1800,
  //     "noise": "85 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M24",
  //   "name": "Bending Brake",
  //   "status": "idle",
  //   "category": "Forming",
  //   "image": "https://i.imgur.com/8QoK2Lw.jpg",
  //   "throughput": 0,
  //   "temperature": 30,
  //   "power": "5 kW",
  //   "uptime": "85%",
  //   "downtime": "15%",
  //   "mtbf": "800 hrs",
  //   "operator": "Tina Hall",
  //   "lastMaintenance": "2025-10-18",
  //   "nextMaintenance": "2025-11-18",
  //   "sensors": {
  //     "vibration": "3 mm/s",
  //     "load": "0%",
  //     "rpm": 0,
  //     "noise": "70 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M25",
  //   "name": "Vibratory Finisher",
  //   "status": "running",
  //   "category": "Finishing",
  //   "image": "https://i.imgur.com/T0bC3dU.jpg",
  //   "throughput": 60,
  //   "temperature": 45,
  //   "power": "3.3 kW",
  //   "uptime": "96%",
  //   "downtime": "4%",
  //   "mtbf": "1100 hrs",
  //   "operator": "Gary Allen",
  //   "lastMaintenance": "2025-11-14",
  //   "nextMaintenance": "2025-12-14",
  //   "sensors": {
  //     "vibration": "12 mm/s",
  //     "load": "70%",
  //     "rpm": 0,
  //     "noise": "90 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M26",
  //   "name": "Automated Guided Vehicle",
  //   "status": "running",
  //   "category": "Material Handling",
  //   "image": "https://i.imgur.com/QkRz7yX.jpg",
  //   "throughput": 0.5,
  //   "temperature": 30,
  //   "power": "1.0 kW",
  //   "uptime": "99%",
  //   "downtime": "1%",
  //   "mtbf": "2200 hrs",
  //   "operator": "Eva Miller",
  //   "lastMaintenance": "2025-11-20",
  //   "nextMaintenance": "2025-12-20",
  //   "sensors": {
  //     "vibration": "1 mm/s",
  //     "load": "50%",
  //     "rpm": 30,
  //     "noise": "60 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M27",
  //   "name": "Centrifugal Pump 4",
  //   "status": "running",
  //   "category": "Utility",
  //   "image": "https://i.imgur.com/3ZgU9hV.jpg",
  //   "throughput": 500,
  //   "temperature": 60,
  //   "power": "15 kW",
  //   "uptime": "95%",
  //   "downtime": "5%",
  //   "mtbf": "950 hrs",
  //   "operator": "Frank Carter",
  //   "lastMaintenance": "2025-11-04",
  //   "nextMaintenance": "2025-12-04",
  //   "sensors": {
  //     "vibration": "8 mm/s",
  //     "load": "85%",
  //     "rpm": 1450,
  //     "noise": "82 dB"
  //   },
  //   "errors": [
  //     {
  //       "date": "2025-11-21",
  //       "code": "U301",
  //       "desc": "Minor seal leak"
  //     }
  //   ]
  // },
  // {
  //   "id": "M28",
  //   "name": "Powder Coating Unit",
  //   "status": "running",
  //   "category": "Finishing",
  //   "image": "https://i.imgur.com/H1Xj0oP.jpg",
  //   "throughput": 40,
  //   "temperature": 200,
  //   "power": "10 kW",
  //   "uptime": "97%",
  //   "downtime": "3%",
  //   "mtbf": "1300 hrs",
  //   "operator": "Nancy Scott",
  //   "lastMaintenance": "2025-11-11",
  //   "nextMaintenance": "2025-12-11",
  //   "sensors": {
  //     "vibration": "2 mm/s",
  //     "load": "70%",
  //     "rpm": 0,
  //     "noise": "75 dB"
  //   },
  //   "errors": []
  // },
  // {
  //   "id": "M29",
  //   "name": "Automated Storage/Retrieval System",
  //   "status": "running",
  //   "category": "Material Handling",
  //   "image": "https://i.imgur.com/P5oW2jY.jpg",
  //   "throughput": 150,
  //   "temperature": 25,
  //   "power": "6 kW",
  //   "uptime": "99%",
  //   "downtime": "1%",
  //   "mtbf": "3500 hrs",
  //   "operator": "Henry Wilson",
  //   "lastMaintenance": "2025-11-17",
  //   "nextMaintenance": "2025-12-17",
  //   "sensors": {
  //     "vibration": "1 mm/s",
  //     "load": "45%",
  //     "rpm": 50,
  //     "noise": "65 dB"
  //   },
  //   "errors": []
  // }






