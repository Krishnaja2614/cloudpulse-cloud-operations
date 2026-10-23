
const services = [
  {name:"Web Application",symbol:"◎",status:"Healthy",uptime:"99.99%"},
  {name:"API Gateway",symbol:"♧",status:"Healthy",uptime:"99.97%"},
  {name:"Database",symbol:"▤",status:"Healthy",uptime:"99.98%"},
  {name:"Authentication",symbol:"♙",status:"Healthy",uptime:"99.95%"},
  {name:"Storage",symbol:"▱",status:"Warning",uptime:"99.90%"},
  {name:"CDN",symbol:"☁",status:"Healthy",uptime:"99.99%"},
  {name:"Monitoring",symbol:"⌁",status:"Critical",uptime:"98.76%"}
];

const deployments = [
  {version:"v1.2.0",branch:"main",status:"Success",time:"Oct 23, 13:47"},
  {version:"v1.1.3",branch:"main",status:"Success",time:"Oct 22, 16:32"},
  {version:"v1.1.2",branch:"feature/ui",status:"Success",time:"Oct 21, 11:03"},
  {version:"v1.1.1",branch:"main",status:"Failed",time:"Oct 20, 09:21"},
  {version:"v1.1.0",branch:"main",status:"Success",time:"Oct 19, 18:45"}
];

let incidents = [
  {id:"INC-1005",service:"Monitoring",severity:"Critical",status:"Open",time:"Oct 23, 11:42"},
  {id:"INC-1004",service:"Storage",severity:"Minor",status:"Resolved",time:"Oct 22, 20:15"},
  {id:"INC-1003",service:"API Gateway",severity:"Minor",status:"Resolved",time:"Oct 21, 14:32"},
  {id:"INC-1002",service:"Database",severity:"Low",status:"Resolved",time:"Oct 20, 10:17"},
  {id:"INC-1001",service:"Web Application",severity:"Low",status:"Resolved",time:"Oct 18, 16:09"}
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#39;"
}[char]));

let toastTimer;

function toast(message) {
  const element = $("#toast");
  if (!element) return;

  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 2600);
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function renderServices(filter="") {
  const filtered = services.filter(s =>
    `${s.name} ${s.status}`.toLowerCase().includes(filter.toLowerCase())
  );

  $("#serviceList").innerHTML = filtered.map(service => `
    <div class="service-row">
      <div class="service-name">
        <span class="service-symbol">${escapeHTML(service.symbol)}</span>
        <span>${escapeHTML(service.name)}</span>
      </div>
      <span class="status-pill status-${statusClass(service.status)}">${escapeHTML(service.status)}</span>
      <span class="uptime">${escapeHTML(service.uptime)}</span>
    </div>
  `).join("") || `<p class="empty-state">No matching services found.</p>`;

  $("#healthyCount").innerHTML =
    `${services.filter(s => s.status === "Healthy").length} <small>/ ${services.length}</small>`;
}

function renderDeployments(filter="") {
  const filtered = deployments.filter(d =>
    `${d.version} ${d.branch} ${d.status} ${d.time}`.toLowerCase().includes(filter.toLowerCase())
  );

  $("#deploymentRows").innerHTML = filtered.map(d => `
    <tr>
      <td>${escapeHTML(d.version)}</td>
      <td>${escapeHTML(d.branch)}</td>
      <td><span class="deployment-status ${d.status === "Success" ? "success" : "failed"}">${escapeHTML(d.status)}</span></td>
      <td>${escapeHTML(d.time)}</td>
    </tr>
  `).join("") || `<tr><td colspan="4">No matching deployments.</td></tr>`;
}

function renderIncidents(filter="") {
  const filtered = incidents.filter(i =>
    `${i.id} ${i.service} ${i.severity} ${i.status} ${i.time}`.toLowerCase().includes(filter.toLowerCase())
  );

  $("#incidentRows").innerHTML = filtered.map(i => `
    <tr>
      <td>${escapeHTML(i.id)}</td>
      <td>${escapeHTML(i.service)}</td>
      <td><span class="severity-pill severity-${statusClass(i.severity)}">${escapeHTML(i.severity)}</span></td>
      <td><span class="status-pill ${i.status === "Resolved" ? "status-resolved" : "status-critical"}">${escapeHTML(i.status)}</span></td>
      <td>${escapeHTML(i.time)}</td>
      <td>${i.status === "Open" ? `<button type="button" class="incident-action" data-resolve="${escapeHTML(i.id)}">Resolve</button>` : ""}</td>
    </tr>
  `).join("") || `<tr><td colspan="6">No matching incidents.</td></tr>`;

  $("#openIncidentCount").textContent =
    incidents.filter(i => i.status === "Open").length;
}

function applySearch(value) {
  renderServices(value);
  renderDeployments(value);
  renderIncidents(value);
}

function showView(view) {
  const titles = {
    services:["Services","Review component health and service availability."],
    deployments:["Deployments","Review release history and deployment outcomes."],
    incidents:["Incidents","Track incidents and record their resolution."],
    monitoring:["Monitoring","Review illustrative uptime and response-time metrics."],
    settings:["Settings","Demo preferences and project information."]
  };

  if (view === "dashboard") {
    $("#dashboardView").classList.remove("hidden");
    $("#secondaryView").classList.add("hidden");
  } else {
    const [title, subtitle] = titles[view] || titles.services;
    $("#dashboardView").classList.add("hidden");
    $("#secondaryView").classList.remove("hidden");
    $("#secondaryTitle").textContent = title;
    $("#secondarySubtitle").textContent = subtitle;
    renderSecondary(view);
  }

  $$(".nav-item").forEach(button =>
    button.classList.toggle("active", button.dataset.view === view)
  );

  $("#sidebar").classList.remove("open");
}

function renderSecondary(view) {
  const content = $("#secondaryContent");

  if (view === "services") {
    content.innerHTML = `
      <h2>Service inventory</h2>
      <p class="subtitle">Sample service status values for the portfolio demo.</p>
      <div class="secondary-list">
        ${services.map(s => `
          <div class="secondary-list-item">
            <div>
              <strong>${escapeHTML(s.symbol)} ${escapeHTML(s.name)}</strong>
              <small>Illustrative uptime: ${escapeHTML(s.uptime)}</small>
            </div>
            <span class="status-pill status-${statusClass(s.status)}">${escapeHTML(s.status)}</span>
          </div>
        `).join("")}
      </div>`;
  } else if (view === "deployments") {
    content.innerHTML = `
      <h2>Deployment history</h2>
      <p class="subtitle">Sample release events. No deployments are performed by this website.</p>
      <div class="secondary-list">
        ${deployments.map(d => `
          <div class="secondary-list-item">
            <div>
              <strong>${escapeHTML(d.version)} · ${escapeHTML(d.branch)}</strong>
              <small>${escapeHTML(d.time)}</small>
            </div>
            <span class="deployment-status ${d.status === "Success" ? "success" : "failed"}">${escapeHTML(d.status)}</span>
          </div>
        `).join("")}
      </div>`;
  } else if (view === "incidents") {
    content.innerHTML = ` <h2>Incident register</h2> <p class="subtitle"> Investigate incidents, review simulated monitoring evidence, and resolve issues when ready. </p> <div class="secondary-list"> ${incidents.map(i => ` <div class="secondary-list-item"> <div> <strong>${escapeHTML(i.id)} · ${escapeHTML(i.service)}</strong> <small> ${escapeHTML(i.severity)} severity · ${escapeHTML(i.time)} </small> </div> <div class="incident-controls"> <span class="status-pill ${ i.status === "Resolved" ? "status-resolved" : "status-critical" }">${escapeHTML(i.status)}</span> <button type="button" class="incident-action" data-investigate="${escapeHTML(i.id)}" >Investigate</button> ${i.status === "Open" ? `<button type="button" class="incident-action" data-resolve="${escapeHTML(i.id)}" >Resolve</button>` : ""} </div> </div> `).join("")} </div> <div id="incidentInvestigation" class="investigation-panel"> <h3>Incident investigation</h3> <p>Select <strong>Investigate</strong> beside an incident to begin.</p> </div> `;
    
  } else if (view === "monitoring") {
    content.innerHTML = `
      <h2>Monitoring overview</h2>
      <p class="subtitle">These values are static examples, not live metrics.</p>
      <div class="secondary-list">
        <div class="secondary-list-item">
          <div><strong>Availability target</strong><small>Illustrative service-level objective</small></div>
          <strong>99.9%</strong>
        </div>
        <div class="secondary-list-item">
          <div><strong>Average response time</strong><small>Sample metric</small></div>
          <strong>186 ms</strong>
        </div>
        <div class="secondary-list-item">
          <div><strong>Suggested AWS integration</strong><small>CloudWatch metrics and alarms; configure costs before enabling</small></div>
          <strong>Planned</strong>
        </div>
      </div>`;
  } else {
    content.innerHTML = `
      <h2>Project settings</h2>
      <p class="subtitle">CloudPulse is a static front-end portfolio demonstration.</p>
      <div class="secondary-list">
        <div class="secondary-list-item">
          <div><strong>Data source</strong><small>Local JavaScript sample data only</small></div>
          <strong>Demo</strong>
        </div>
        <div class="secondary-list-item">
          <div><strong>AWS integration</strong><small>No AWS credentials or resources are accessed</small></div>
          <strong>Disabled</strong>
        </div>
        <div class="secondary-list-item">
          <div><strong>CI/CD</strong><small>GitHub Actions workflow</small></div>
          <strong>Configured</strong>
        </div>
      </div>`;
  }
}

function updateChart(range) {
  const values = {
    "24h": {
      up:"M25 48 L115 39 L205 46 L295 40 L385 43 L475 33 L580 37",
      resp:"M25 140 L115 163 L205 177 L295 151 L385 170 L475 160 L580 168",
      labels:["00:00","04:00","08:00","12:00","16:00","20:00","Now"]
    },
    "7d": {
      up:"M25 48 L115 44 L205 49 L295 45 L385 47 L475 39 L580 36",
      resp:"M25 145 L115 160 L205 183 L295 164 L385 177 L475 170 L580 174",
      labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Today"]
    },
    "30d": {
      up:"M25 55 L115 51 L205 46 L295 48 L385 42 L475 39 L580 35",
      resp:"M25 165 L115 175 L205 155 L295 185 L385 160 L475 170 L580 151",
      labels:["Week 1","Week 2","Week 3","Week 4","","","Today"]
    }
  };

  const data = values[range] || values["7d"];

  $("#uptimePath").setAttribute("d", data.up);
  $("#uptimeArea").setAttribute("d", `${data.up} L580 220 L25 220Z`);
  $("#responsePath").setAttribute("d", data.resp);

  $("#chartPoints").innerHTML = data.up
    .match(/-?\d+(?:\.\d+)?\s+-?\d+(?:\.\d+)?/g)
    .map(pair => {
      const [x, y] = pair.trim().split(/\s+/);
      return `<circle cx="${x}" cy="${y}" r="4"/>`;
    }).join("");

  $("#xLabels").innerHTML = data.labels
    .map(label => `<span>${escapeHTML(label)}</span>`)
    .join("");

  $$(".segmented button").forEach(button =>
    button.classList.toggle("selected", button.dataset.range === range)
  );
}

function handleResolveClick(event) {
  const button = event.target.closest("[data-resolve]");
  if (!button) return;

  const incident = incidents.find(i => i.id === button.dataset.resolve);
  if (!incident || incident.status !== "Open") return;

  incident.status = "Resolved";

  renderIncidents($("#globalSearch").value.trim());

  if (
    !$("#secondaryView").classList.contains("hidden") &&
    $("#secondaryTitle").textContent === "Incidents"
  ) {
    renderSecondary("incidents");
  }

  toast(`${incident.id} marked resolved in demo data.`);
}

function init() {
  $("#todayDate").textContent = new Intl.DateTimeFormat(undefined, {
    weekday:"short",
    month:"short",
    day:"numeric",
    year:"numeric"
  }).format(new Date());

  renderServices();
  renderDeployments();
  renderIncidents();

  $$(".nav-item,[data-view='deployments'],[data-view='incidents']").forEach(button =>
    button.addEventListener("click", () => showView(button.dataset.view))
  );

  $("#backDashboard").addEventListener("click", () => showView("dashboard"));
  $("#globalSearch").addEventListener("input", event => applySearch(event.target.value.trim()));

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      $("#globalSearch").focus();
    }

    if (event.key === "Escape") $("#architectureDialog").close?.();
  });

  $("#mobileMenu").addEventListener("click", () =>
    $("#sidebar").classList.toggle("open")
  );

  $$(".segmented button").forEach(button =>
    button.addEventListener("click", () => updateChart(button.dataset.range))
  );

  $("#incidentRows").addEventListener("click", handleResolveClick);
  $("#secondaryContent").addEventListener("click", handleResolveClick);
  $("#secondaryContent").addEventListener("click", event => {
  const button = event.target.closest("[data-investigate]");
  if (!button) return;

  const incident = incidents.find(
    i => i.id === button.dataset.investigate
  );
  if (!incident) return;

  const panel = $("#incidentInvestigation");

  const investigations = {
    "INC-1005": {
      symptom: "Monitoring alerts are not being processed.",
      impact: "Monitoring visibility may be reduced.",
      evidence: "Simulated alert-processing errors detected.",
      cause: "Possible monitoring service or configuration issue.",
      steps: [
        "Check the monitoring service health.",
        "Review recent configuration changes.",
        "Inspect application and system logs.",
        "Verify alert delivery and notification settings."
      ],
      fix: "Validate the configuration, correct any identified errors, and retest alert delivery."
    }
  };

  const details = investigations[incident.id] || {
    symptom: `${incident.service} requires investigation.`,
    impact: "The impact has not yet been confirmed.",
    evidence: "No additional monitoring evidence is available in this demo.",
    cause: "Root cause has not yet been identified.",
    steps: [
      "Confirm the reported symptoms.",
      "Check service health and availability.",
      "Review relevant logs and recent changes.",
      "Test the service after any corrective action."
    ],
    fix: "Document the verified root cause and the corrective action taken."
  };

  
panel.innerHTML = `
  <h3>Investigation: ${escapeHTML(incident.id)}</h3>

  <p><strong>Service:</strong> ${escapeHTML(incident.service)}</p>
  <p><strong>Severity:</strong> ${escapeHTML(incident.severity)}</p>
  <p><strong>Current status:</strong> ${escapeHTML(incident.status)}</p>
  <p><strong>Symptoms:</strong> ${escapeHTML(details.symptom)}</p>
  <p><strong>Impact:</strong> ${escapeHTML(details.impact)}</p>
  <p><strong>Monitoring evidence:</strong> ${escapeHTML(details.evidence)}</p>
  <p><strong>Possible cause:</strong> ${escapeHTML(details.cause)}</p>

  <h4>Troubleshooting checklist</h4>

  <div class="investigation-checklist">
    ${details.steps.map((step, index) => `
      <label class="investigation-step">
        <input
          type="checkbox"
          class="investigation-checkbox"
          data-step-index="${index}"
        >
        <span>${escapeHTML(step)}</span>
      </label>
    `).join("")}
  </div>

  <div class="investigation-progress">
    <div class="investigation-progress-heading">
      <strong>Investigation progress</strong>
      <span id="investigationProgressText">0/${details.steps.length} completed</span>
    </div>

    <div
      class="investigation-progress-track"
      role="progressbar"
      aria-label="Troubleshooting progress"
      aria-valuemin="0"
      aria-valuemax="${details.steps.length}"
      aria-valuenow="0"
    >
      <div
        id="investigationProgressBar"
        class="investigation-progress-bar"
        style="width: 0%"
      ></div>
    </div>
  </div>

  <h4>Recommended corrective action</h4>
  <p>${escapeHTML(details.fix)}</p>

  <p class="subtitle">
    Training scenario only — evidence and root cause are simulated.
  </p>
`;

const checklist = panel.querySelector(".investigation-checklist");
const checkboxes = checklist.querySelectorAll(
  ".investigation-checkbox"
);
const progressText = panel.querySelector("#investigationProgressText");
const progressBar = panel.querySelector("#investigationProgressBar");
const progressTrack = panel.querySelector(".investigation-progress-track");

function updateInvestigationProgress() {
  const completed = [...checkboxes].filter(box => box.checked).length;
  const total = checkboxes.length;
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  progressText.textContent = `${completed}/${total} completed`;
  progressBar.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuenow", completed);
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", updateInvestigationProgress);
});

updateInvestigationProgress();
});

  $("#architectureBtn").addEventListener("click", () =>
    $("#architectureDialog").showModal()
  );

  $("#closeArchitecture").addEventListener("click", () =>
    $("#architectureDialog").close()
  );

  $("#architectureDialog").addEventListener("click", event => {
    if (event.target === $("#architectureDialog")) {
      $("#architectureDialog").close();
    }
  });

  updateChart("7d");
}

document.addEventListener("DOMContentLoaded", init);