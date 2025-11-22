const grid = document.getElementById("factoryGrid");
const panel = document.getElementById("machinePanel");

// Panel elements
const pImg = document.getElementById("pImg");
const pId = document.getElementById("pId");
const pName = document.getElementById("pName");
const pStatus = document.getElementById("pStatus");
const pRate = document.getElementById("pRate");
const pTemp = document.getElementById("pTemp");
const pPower = document.getElementById("pPower");
const pUptime = document.getElementById("pUptime");
const pDowntime = document.getElementById("pDowntime");
const pMTBF = document.getElementById("pMTBF");
const pOperator = document.getElementById("pOperator");
const pLast = document.getElementById("pLast");
const pNext = document.getElementById("pNext");

const sensorBox = document.getElementById("sensorBox");
const errorBox = document.getElementById("errorBox");

document.getElementById("closePanel").onclick = () => {
    panel.classList.remove("open");
};

// Build machine cards
function loadFactoryGrid() {
    factoryMachines.forEach(machine => {
        const card = document.createElement("div");
        card.className = `machine ${machine.status}`;

        card.innerHTML = `
            <img src="${machine.image}" alt="${machine.name}">
            <div class="machine-title">${machine.name}</div>
        `;

        card.onclick = () => showMachine(machine, card);
        grid.appendChild(card);
    });
}

function showMachine(machine, card) {
    document.querySelectorAll(".machine").forEach(m => m.classList.remove("glow"));
    card.classList.add("glow");

    pImg.src = machine.image;
    pId.textContent = machine.id;
    pName.textContent = machine.name;
    pStatus.textContent = machine.status;
    pRate.textContent = machine.throughput;
    pTemp.textContent = `${machine.temperature}°C`;
    pPower.textContent = machine.power;
    pUptime.textContent = machine.uptime;
    pDowntime.textContent = machine.downtime;
    pMTBF.textContent = machine.mtbf;
    pOperator.textContent = machine.operator;
    pLast.textContent = machine.lastMaintenance;
    pNext.textContent = machine.nextMaintenance;

    // Sensors
    sensorBox.innerHTML = `
        <p><strong>Vibration:</strong> ${machine.sensors.vibration}</p>
        <p><strong>Load:</strong> ${machine.sensors.load}</p>
        <p><strong>RPM:</strong> ${machine.sensors.rpm}</p>
        <p><strong>Noise:</strong> ${machine.sensors.noise}</p>
    `;

    // Errors
    errorBox.innerHTML = machine.errors
        .map(e => `<p><strong>${e.date}</strong> - ${e.code}: ${e.desc}</p>`)
        .join("");

    panel.classList.add("open");
}

// Init
loadFactoryGrid();
