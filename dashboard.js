document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initDirectionSystem();
  initNavigationTabs();
  initCharts();
  initFlowChart();
  initHeaderControls();
  initAppointments();
  initPatientsDirectory();
  initCalculator();
  initInvoices();
  initModals();
  initGlobalShortcuts();
  initGreeting();
});
let lineChartInstance = null;
let barChartInstance = null;
let circleChartInstance = null;
function initThemeSystem() {
  const themeBtn = document.getElementById('dash-theme-btn');
  const savedTheme = localStorage.getItem('oralize_theme') || document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(savedTheme);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('oralize_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`, 'info');
      updateChartsTheme(newTheme);
    });
  }
}
function applyTheme(theme) {
  const themeBtn = document.getElementById('dash-theme-btn');
  const isDark = theme === 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  if (themeBtn) {
    themeBtn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    themeBtn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    const icon = themeBtn.querySelector('.theme-icon');
    if (icon) {
      icon.innerHTML = isDark
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }
}
function initDirectionSystem() {
  const rtlBtn = document.getElementById('dash-rtl-btn');
  const savedDir = localStorage.getItem('oralize_dir') || 'ltr';
  applyDirection(savedDir);
  if (rtlBtn) {
    rtlBtn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem('oralize_dir', newDir);
      showToast(`Layout switched to ${newDir.toUpperCase()}`, 'info');
      setTimeout(() => {
        if (lineChartInstance) lineChartInstance.resize();
        if (barChartInstance) barChartInstance.resize();
        if (circleChartInstance) circleChartInstance.resize();
      }, 150);
    });
  }
}
function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  const rtlBtn = document.getElementById('dash-rtl-btn');
  if (rtlBtn) {
    rtlBtn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    rtlBtn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    const label = rtlBtn.querySelector('.rtl-label');
    if (label) {
      label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }
  }
}
function initNavigationTabs() {
  const navLinks = document.querySelectorAll('.dash-nav-link[data-tab]');
  const panels = document.querySelectorAll('.dash-tab-panel');
  const sidebar = document.getElementById('dash-sidebar');
  const mobileToggle = document.getElementById('dash-sidebar-toggle');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target) && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
  window.switchTab = function(targetTab) {
    if (!targetTab) return;
    navLinks.forEach(link => {
      if (link.getAttribute('data-tab') === targetTab) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    panels.forEach(panel => {
      if (panel.id === `tab-${targetTab}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
    if (history.pushState) {
      history.pushState(null, null, `#${targetTab}`);
    } else {
      location.hash = `#${targetTab}`;
    }
    if (sidebar && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
    }
    const contentArea = document.getElementById('dash-main-content');
    if (contentArea) contentArea.scrollTop = 0;
    if (targetTab === 'overview') {
      setTimeout(() => {
        if (lineChartInstance) lineChartInstance.resize();
        if (barChartInstance) barChartInstance.resize();
        if (circleChartInstance) circleChartInstance.resize();
      }, 100);
    }
  };
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tab = link.getAttribute('data-tab');
      window.switchTab(tab);
    });
  });
  document.querySelectorAll('.dash-switch-tab-link[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-tab');
      window.switchTab(tab);
      closeAllPopovers();
    });
  });
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(`tab-${initialHash}`)) {
    window.switchTab(initialHash);
  }
}
function initCharts() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#ffffff' : '#777078';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(39, 35, 38, 0.06)';
  const lineCtx = document.getElementById('dash-line-chart');
  if (lineCtx && typeof Chart !== 'undefined') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = [98, 105, 114, 122, 118, 129, 134, 138, 142, 148, 154, 162];
    const patientData = [820, 890, 940, 1020, 1080, 1150, 1210, 1260, 1340, 1420, 1480, 1550];
    lineChartInstance = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Revenue ($ in thousands)',
            data: revenueData,
            borderColor: isDark ? '#ffffff' : '#B51F3D',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(181, 31, 61, 0.12)',
            borderWidth: 3,
            fill: true,
            tension: 0.38,
            pointBackgroundColor: isDark ? '#ffffff' : '#B51F3D',
            pointRadius: 4,
            pointHoverRadius: 7,
            yAxisID: 'y'
          },
          {
            label: 'Patient Visits',
            data: patientData,
            borderColor: isDark ? '#60a5fa' : '#3b82f6',
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            borderDash: [5, 5],
            fill: false,
            tension: 0.38,
            pointBackgroundColor: isDark ? '#60a5fa' : '#3b82f6',
            pointRadius: 3,
            pointHoverRadius: 6,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: textColor,
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 600 }
            }
          },
          tooltip: {
            backgroundColor: isDark ? '#1a1b20' : '#ffffff',
            titleColor: '#ffffff',
            bodyColor: isDark ? '#9ca3af' : '#777078',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#f0e6e8',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  return ` Revenue: $${context.parsed.y * 1000}`;
                }
                return ` Patients: ${context.parsed.y} visits`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: "'Inter', sans-serif", size: 11 } }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              callback: function(val) { return `$${val}k`; },
              font: { family: "'Inter', sans-serif", size: 11 }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: textColor,
              font: { family: "'Inter', sans-serif", size: 11 }
            }
          }
        }
      }
    });
    const filterAll = document.getElementById('chart-filter-all');
    const filterRev = document.getElementById('chart-filter-rev');
    const filterPatients = document.getElementById('chart-filter-patients');
    if (filterAll && filterRev && filterPatients) {
      filterAll.addEventListener('click', () => {
        setActiveChartFilter(filterAll);
        lineChartInstance.data.datasets[0].hidden = false;
        lineChartInstance.data.datasets[1].hidden = false;
        lineChartInstance.update();
      });
      filterRev.addEventListener('click', () => {
        setActiveChartFilter(filterRev);
        lineChartInstance.data.datasets[0].hidden = false;
        lineChartInstance.data.datasets[1].hidden = true;
        lineChartInstance.update();
      });
      filterPatients.addEventListener('click', () => {
        setActiveChartFilter(filterPatients);
        lineChartInstance.data.datasets[0].hidden = true;
        lineChartInstance.data.datasets[1].hidden = false;
        lineChartInstance.update();
      });
    }
  }
  const barCtx = document.getElementById('dash-bar-chart');
  if (barCtx && typeof Chart !== 'undefined') {
    const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];
    const scheduled = [3, 5, 7, 9, 4, 6, 8, 7, 6, 4, 2];
    const walkIns = [1, 1, 2, 3, 1, 2, 2, 1, 1, 0, 0];
    barChartInstance = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: hours,
        datasets: [
          {
            label: 'Scheduled Patients',
            data: scheduled,
            backgroundColor: isDark ? '#ffffff' : '#B51F3D',
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Walk-in / Emergency',
            data: walkIns,
            backgroundColor: isDark ? '#f17a91' : '#F17A91',
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: 600 }
            }
          },
          tooltip: {
            backgroundColor: isDark ? '#1a1b20' : '#ffffff',
            titleColor: '#ffffff',
            bodyColor: isDark ? '#9ca3af' : '#777078',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#f0e6e8',
            borderWidth: 1,
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { family: "'Inter', sans-serif", size: 11 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor, stepSize: 2, font: { family: "'Inter', sans-serif", size: 11 } }
          }
        }
      }
    });
  }
  const circleCtx = document.getElementById('dash-circle-chart');
  if (circleCtx && typeof Chart !== 'undefined') {
    circleChartInstance = new Chart(circleCtx, {
      type: 'doughnut',
      data: {
        labels: ['Invisalign', 'Whitening', 'Implants', 'Hygiene'],
        datasets: [
          {
            data: [34, 26, 22, 18],
            backgroundColor: isDark
              ? ['#ffffff', '#f43f5e', '#60a5fa', '#34d399']
              : ['#B51F3D', '#e02f54', '#3b82f6', '#10b981'],
            borderWidth: isDark ? 2 : 2,
            borderColor: isDark ? '#1a1b20' : '#ffffff',
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#1a1b20' : '#ffffff',
            titleColor: '#ffffff',
            bodyColor: isDark ? '#9ca3af' : '#777078',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#f0e6e8',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${context.parsed}% of clinic revenue`;
              }
            }
          }
        }
      }
    });
  }
}
function setActiveChartFilter(btn) {
  const group = btn.parentElement;
  if (!group) return;
  group.querySelectorAll('.dash-filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
function updateChartsTheme(theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#777078';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(39, 35, 38, 0.06)';
  if (lineChartInstance) {
    lineChartInstance.data.datasets[0].borderColor = isDark ? '#ffffff' : '#B51F3D';
    lineChartInstance.data.datasets[0].backgroundColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(181, 31, 61, 0.12)';
    lineChartInstance.data.datasets[0].pointBackgroundColor = isDark ? '#ffffff' : '#B51F3D';
    lineChartInstance.data.datasets[1].borderColor = isDark ? '#60a5fa' : '#3b82f6';
    lineChartInstance.data.datasets[1].pointBackgroundColor = isDark ? '#60a5fa' : '#3b82f6';
    lineChartInstance.options.scales.x.ticks.color = textColor;
    lineChartInstance.options.scales.x.grid.color = gridColor;
    lineChartInstance.options.scales.y.ticks.color = textColor;
    lineChartInstance.options.scales.y.grid.color = gridColor;
    lineChartInstance.options.scales.y1.ticks.color = textColor;
    lineChartInstance.options.plugins.legend.labels.color = textColor;
    lineChartInstance.update();
  }
  if (barChartInstance) {
    barChartInstance.data.datasets[0].backgroundColor = isDark ? '#ffffff' : '#B51F3D';
    barChartInstance.data.datasets[1].backgroundColor = isDark ? '#f17a91' : '#F17A91';
    barChartInstance.options.scales.x.ticks.color = textColor;
    barChartInstance.options.scales.y.ticks.color = textColor;
    barChartInstance.options.scales.y.grid.color = gridColor;
    barChartInstance.options.plugins.legend.labels.color = textColor;
    barChartInstance.update();
  }
  if (circleChartInstance) {
    circleChartInstance.data.datasets[0].backgroundColor = isDark
      ? ['#ffffff', '#f43f5e', '#60a5fa', '#34d399']
      : ['#B51F3D', '#e02f54', '#3b82f6', '#10b981'];
    circleChartInstance.data.datasets[0].borderColor = isDark ? '#1a1b20' : '#ffffff';
    circleChartInstance.update();
  }
}
function initFlowChart() {
  const flowNodes = document.querySelectorAll('.dash-flow-node');
  const stageDetails = {
    '1': 'Intake & Triage: 3 active patients in waiting queue. Medical screening and temperature checked.',
    '2': '3D Scans & Diagnostics: CBCT panoramic imaging running for Operatory 1.',
    '3': 'Operatory Chair Treatment: 4 operatories active with 88% chair capacity utilization.',
    '4': 'Infection Control & Sterilization: Autoclave sterilization cycle 100% compliant with OSHA standards.',
    '5': 'Checkout & Recalls: Digital receipts issued, follow-up booked automatically.'
  };
  flowNodes.forEach(node => {
    node.addEventListener('click', () => {
      const stage = node.getAttribute('data-stage');
      flowNodes.forEach(n => n.classList.remove('active-stage'));
      node.classList.add('active-stage');
      const info = stageDetails[stage] || `Stage ${stage} selected`;
      showToast(info, 'info');
    });
  });
}
function initHeaderControls() {
  const notifBtn = document.getElementById('dash-notif-btn');
  const notifPopover = document.getElementById('dash-notif-popover');
  const notifBadge = document.getElementById('dash-notif-badge');
  const markReadBtn = document.getElementById('dash-notif-mark-read');
  const profileBtn = document.getElementById('dash-profile-btn');
  const userPopover = document.getElementById('dash-user-popover');
  if (notifBtn && notifPopover) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = notifPopover.classList.contains('show');
      closeAllPopovers();
      if (!isOpen) {
        notifPopover.classList.add('show');
        notifBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
  if (markReadBtn && notifBadge) {
    markReadBtn.addEventListener('click', () => {
      document.querySelectorAll('.dash-notif-item.unread').forEach(item => {
        item.classList.remove('unread');
      });
      notifBadge.style.display = 'none';
      showToast('All notifications marked as read', 'info');
    });
  }
  document.querySelectorAll('.dash-notif-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('unread')) {
        item.classList.remove('unread');
        const count = document.querySelectorAll('.dash-notif-item.unread').length;
        if (notifBadge) {
          if (count > 0) {
            notifBadge.textContent = count;
          } else {
            notifBadge.style.display = 'none';
          }
        }
      }
    });
  });
  if (profileBtn && userPopover) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = userPopover.classList.contains('show');
      closeAllPopovers();
      if (!isOpen) {
        userPopover.classList.add('show');
        profileBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
  if (notifPopover) {
    notifPopover.addEventListener('click', (e) => {
      if (!e.target.closest('.dash-switch-tab-link')) {
        e.stopPropagation();
      }
    });
  }
  if (userPopover) {
    userPopover.addEventListener('click', (e) => {
      if (!e.target.closest('.dash-switch-tab-link') && !e.target.closest('#dash-logout-trigger')) {
        e.stopPropagation();
      }
    });
  }
  const statusPills = document.querySelectorAll('.dash-status-pill');
  const statusIndicator = document.getElementById('dash-profile-status-indicator');
  statusPills.forEach(pill => {
    pill.addEventListener('click', () => {
      statusPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const status = pill.getAttribute('data-status');
      if (statusIndicator) {
        if (status === 'available') statusIndicator.style.background = '#10b981';
        if (status === 'surgery') statusIndicator.style.background = '#f59e0b';
        if (status === 'break') statusIndicator.style.background = '#6b7280';
      }
      showToast(`Status updated to: ${pill.textContent.trim()}`, 'info');
    });
  });
  const settingsBtn = document.getElementById('dash-settings-trigger');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      closeAllPopovers();
      showToast('Oralize Clinic Cloud Settings: Version 2.8.4 • All Systems Operational', 'info');
    });
  }
  function handlePortalLogout() {
    closeAllPopovers();
    if (confirm('Are you sure you want to log out of Oralize Dental Clinical Portal?')) {
      showToast('Logged out securely. Redirecting...', 'info');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 700);
    }
  }
  const logoutBtn = document.getElementById('dash-logout-trigger');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handlePortalLogout);
  }
  const sidebarLogoutBtn = document.getElementById('dash-sidebar-logout-btn');
  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', handlePortalLogout);
  }
  const globalSearch = document.getElementById('dash-global-search');
  if (globalSearch) {
    globalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = globalSearch.value.trim().toLowerCase();
        if (query) {
          showToast(`Searching clinical portal for: "${query}"...`, 'info');
          if (query.includes('patient') || query.includes('eleanor') || query.includes('david')) {
            window.switchTab('patients');
          } else if (query.includes('bill') || query.includes('inv') || query.includes('pay')) {
            window.switchTab('billing');
          } else {
            window.switchTab('appointments');
          }
        }
      }
    });
  }
  document.addEventListener('click', () => {
    closeAllPopovers();
  });
}
function closeAllPopovers() {
  document.querySelectorAll('.dash-popover.show').forEach(pop => {
    pop.classList.remove('show');
  });
  const notifBtn = document.getElementById('dash-notif-btn');
  const profileBtn = document.getElementById('dash-profile-btn');
  if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
  if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
}
function initGreeting() {
  const greetingEl = document.getElementById('dash-greeting-text');
  if (!greetingEl) return;
  const now = new Date();
  const hour = now.getHours();
  let timeSalutation = 'Good morning';
  if (hour >= 12 && hour < 17) {
    timeSalutation = 'Good afternoon';
  } else if (hour >= 17) {
    timeSalutation = 'Good evening';
  }
  greetingEl.innerHTML = `<span>${timeSalutation}, <span class="highlight-champagne">Dr. Sarah</span></span>`;
}
const defaultAppointments = [
  {
    id: 'APT-8421',
    patient: 'Eleanor Vance',
    avatar: 'assets/images/patient_sophia.jpg',
    service: 'Invisalign Checkup',
    specialty: 'Orthodontics',
    doctor: 'Dr. Sarah Jenkins',
    date: 'Oct 21, 2026',
    time: '10:30 AM',
    room: 'Operatory 2 (Ortho)',
    status: 'In Progress'
  },
  {
    id: 'APT-8422',
    patient: 'David Miller',
    avatar: 'assets/images/patient_david.jpg',
    service: 'Root Canal Endodontic',
    specialty: 'Oral Surgery',
    doctor: 'Dr. Marcus Vance',
    date: 'Oct 21, 2026',
    time: '11:15 AM',
    room: 'Operatory 1 (Surgical)',
    status: 'Confirmed'
  },
  {
    id: 'APT-8423',
    patient: 'Sophia Patel',
    avatar: 'assets/images/patient_sophia.jpg',
    service: 'Professional Hygiene Scaling',
    specialty: 'Preventive',
    doctor: 'Dr. Sarah Jenkins',
    date: 'Oct 21, 2026',
    time: '02:00 PM',
    room: 'Operatory 3 (Hygiene)',
    status: 'Confirmed'
  },
  {
    id: 'APT-8424',
    patient: 'James Wilson',
    avatar: 'assets/images/patient_liam.jpg',
    service: 'Dental Implant Follow-up',
    specialty: 'Implantology',
    doctor: 'Dr. Marcus Vance',
    date: 'Oct 21, 2026',
    time: '03:30 PM',
    room: 'Operatory 1 (Surgical)',
    status: 'Pending'
  },
  {
    id: 'APT-8425',
    patient: 'Emily Chen',
    avatar: 'assets/images/patient_elena.jpg',
    service: 'Laser Teeth Whitening',
    specialty: 'Cosmetic',
    doctor: 'Dr. Elena Rostova',
    date: 'Oct 22, 2026',
    time: '09:00 AM',
    room: 'Operatory 4 (Cosmetic)',
    status: 'Confirmed'
  },
  {
    id: 'APT-8426',
    patient: 'Robert Taylor',
    avatar: 'assets/images/patient_david.jpg',
    service: 'Pediatric Dental Sealant',
    specialty: 'Pediatric',
    doctor: 'Dr. Elena Rostova',
    date: 'Oct 22, 2026',
    time: '11:00 AM',
    room: 'Operatory 4 (Pediatric)',
    status: 'Confirmed'
  }
];
function getAppointmentsData() {
  const saved = localStorage.getItem('oralize_appointments');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch (e) {
      console.error(e);
    }
  }
  return defaultAppointments;
}
function saveAppointmentsData(data) {
  localStorage.setItem('oralize_appointments', JSON.stringify(data));
}
function renderAppointmentsTable(filterQuery = '', doctorFilter = 'all', statusFilter = 'all') {
  const tbody = document.getElementById('dash-appointments-tbody');
  const countEl = document.getElementById('dash-apt-count');
  if (!tbody) return;
  const data = getAppointmentsData();
  const q = filterQuery.toLowerCase();
  const filtered = data.filter(apt => {
    const matchesQuery = !q || apt.patient.toLowerCase().includes(q) || apt.service.toLowerCase().includes(q) || apt.id.toLowerCase().includes(q);
    const matchesDoc = doctorFilter === 'all' || apt.doctor === doctorFilter;
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesQuery && matchesDoc && matchesStatus;
  });
  if (countEl) countEl.textContent = filtered.length;
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 32px; color: var(--text-muted);">No appointments matching criteria.</td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map(apt => {
    let badgeClass = 'dash-badge-confirmed';
    if (apt.status === 'In Progress') badgeClass = 'dash-badge-in-progress';
    if (apt.status === 'Pending') badgeClass = 'dash-badge-pending';
    if (apt.status === 'Cancelled') badgeClass = 'dash-badge-cancelled';
    return `
      <tr>
        <td><strong>#${apt.id}</strong></td>
        <td>
          <div class="dash-table-user">
            <img src="${apt.avatar || 'assets/images/doctor_sarah.jpg'}" alt="${apt.patient}" class="dash-table-avatar">
            <div>
              <div class="dash-table-user-name">${apt.patient}</div>
              <div class="dash-table-user-sub">${apt.specialty || 'General'}</div>
            </div>
          </div>
        </td>
        <td>${apt.service}</td>
        <td>${apt.doctor}</td>
        <td><strong>${apt.date}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${apt.time}</span></td>
        <td><span style="font-size: 0.8rem; font-weight: 600;">${apt.room}</span></td>
        <td><span class="dash-badge ${badgeClass}"><span class="dash-badge-dot"></span>${apt.status}</span></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="dash-btn dash-btn-outline dash-btn-sm" onclick="viewPatientChartByName('${apt.patient}')" title="View Patient Dental Chart">Chart</button>
            <button type="button" class="dash-btn dash-btn-outline dash-btn-sm" onclick="cancelAppointment('${apt.id}')" style="color: #ef4444;" title="Cancel Slot">Cancel</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}
function initAppointments() {
  renderAppointmentsTable();
  const searchInput = document.getElementById('dash-apt-search');
  const doctorFilter = document.getElementById('dash-apt-doctor-filter');
  const statusFilter = document.getElementById('dash-apt-status-filter');
  const onFilter = () => {
    renderAppointmentsTable(
      searchInput ? searchInput.value : '',
      doctorFilter ? doctorFilter.value : 'all',
      statusFilter ? statusFilter.value : 'all'
    );
  };
  if (searchInput) searchInput.addEventListener('input', onFilter);
  if (doctorFilter) doctorFilter.addEventListener('change', onFilter);
  if (statusFilter) statusFilter.addEventListener('change', onFilter);
  const form = document.getElementById('dash-new-apt-form');
  if (form) {
    const dateInput = document.getElementById('apt-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('apt-patient-name').value.trim();
      const service = document.getElementById('apt-service').value;
      const doctor = document.getElementById('apt-doctor').value;
      const room = document.getElementById('apt-room').value;
      const date = document.getElementById('apt-date').value;
      const time = document.getElementById('apt-time').value;
      const newApt = {
        id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
        patient: patientName,
        avatar: 'assets/images/patient_david.jpg',
        service: service,
        specialty: 'Clinical Procedure',
        doctor: doctor,
        date: date || 'Oct 24, 2026',
        time: time,
        room: room,
        status: 'Confirmed'
      };
      const current = getAppointmentsData();
      current.unshift(newApt);
      saveAppointmentsData(current);
      form.reset();
      closeModal('modal-book-apt');
      renderAppointmentsTable();
      showToast(`Appointment #${newApt.id} scheduled successfully for ${patientName}!`, 'success');
      window.switchTab('appointments');
    });
  }
  const quickBookBtn = document.getElementById('dash-quick-book-btn');
  const bookAptBtn = document.getElementById('dash-book-appointment-btn');
  if (quickBookBtn) quickBookBtn.addEventListener('click', () => openModal('modal-book-apt'));
  if (bookAptBtn) bookAptBtn.addEventListener('click', () => openModal('modal-book-apt'));
}
window.cancelAppointment = function(id) {
  if (confirm(`Are you sure you want to cancel appointment #${id}?`)) {
    const data = getAppointmentsData().filter(a => a.id !== id);
    saveAppointmentsData(data);
    renderAppointmentsTable();
    showToast(`Appointment #${id} has been cancelled.`, 'info');
  }
};
const patientsData = [
  {
    mrn: 'OR-2026-8491',
    name: 'Eleanor Vance',
    avatar: 'assets/images/patient_sophia.jpg',
    gender: 'Female',
    age: 29,
    phone: '+1 (555) 392-1084',
    blood: 'O+',
    alert: 'Latex Allergy',
    lastVisit: 'Oct 14, 2026',
    nextAppt: 'Oct 21, 2026 (10:30 AM)',
    doctor: 'Dr. Sarah Jenkins',
    plan: 'Invisalign Aligners Tray #8 of 14'
  },
  {
    mrn: 'OR-2026-8492',
    name: 'David Miller',
    avatar: 'assets/images/patient_david.jpg',
    gender: 'Male',
    age: 44,
    phone: '+1 (555) 728-4910',
    blood: 'A+',
    alert: 'Penicillin Sensitivity',
    lastVisit: 'Sep 28, 2026',
    nextAppt: 'Oct 21, 2026 (11:15 AM)',
    doctor: 'Dr. Marcus Vance',
    plan: 'Molar Endodontic Therapy & Porcelain Crown'
  },
  {
    mrn: 'OR-2026-8493',
    name: 'Sophia Patel',
    avatar: 'assets/images/patient_sophia.jpg',
    gender: 'Female',
    age: 34,
    phone: '+1 (555) 481-9923',
    blood: 'B+',
    alert: 'None (Healthy)',
    lastVisit: 'Aug 10, 2026',
    nextAppt: 'Oct 21, 2026 (02:00 PM)',
    doctor: 'Dr. Sarah Jenkins',
    plan: 'Routine Hygiene & Air Polishing'
  },
  {
    mrn: 'OR-2026-8494',
    name: 'James Wilson',
    avatar: 'assets/images/patient_liam.jpg',
    gender: 'Male',
    age: 58,
    phone: '+1 (555) 839-2041',
    blood: 'AB+',
    alert: 'Hypertension (Controlled)',
    lastVisit: 'Sep 15, 2026',
    nextAppt: 'Oct 21, 2026 (03:30 PM)',
    doctor: 'Dr. Marcus Vance',
    plan: 'Implant Post Check #14 Titanium Abutment'
  },
  {
    mrn: 'OR-2026-8495',
    name: 'Emily Chen',
    avatar: 'assets/images/patient_elena.jpg',
    gender: 'Female',
    age: 26,
    phone: '+1 (555) 294-8172',
    blood: 'O-',
    alert: 'None',
    lastVisit: 'Oct 02, 2026',
    nextAppt: 'Oct 22, 2026 (09:00 AM)',
    doctor: 'Dr. Elena Rostova',
    plan: 'In-Office Laser Whitening 450nm'
  },
  {
    mrn: 'OR-2026-8496',
    name: 'Robert Taylor',
    avatar: 'assets/images/patient_david.jpg',
    gender: 'Male',
    age: 11,
    phone: '+1 (555) 912-4029',
    blood: 'A-',
    alert: 'Pediatric Asthma',
    lastVisit: 'Jul 22, 2026',
    nextAppt: 'Oct 22, 2026 (11:00 AM)',
    doctor: 'Dr. Elena Rostova',
    plan: 'Fissure Sealants Teeth #19 & #30'
  }
];
function renderPatientsTable(searchQuery = '', filterCat = 'all') {
  const tbody = document.getElementById('dash-patients-tbody');
  if (!tbody) return;
  const q = searchQuery.toLowerCase();
  const filtered = patientsData.filter(p => {
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.mrn.toLowerCase().includes(q) || p.phone.includes(q);
    let matchesCat = true;
    if (filterCat === 'risk') matchesCat = p.alert && !p.alert.includes('None');
    if (filterCat === 'ortho') matchesCat = p.plan.toLowerCase().includes('invisalign');
    if (filterCat === 'implant') matchesCat = p.plan.toLowerCase().includes('implant');
    return matchesSearch && matchesCat;
  });
  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><strong>${p.mrn}</strong></td>
      <td>
        <div class="dash-table-user">
          <img src="${p.avatar}" alt="${p.name}" class="dash-table-avatar">
          <div>
            <div class="dash-table-user-name">${p.name}</div>
            <div class="dash-table-user-sub">${p.gender}, ${p.age} yrs</div>
          </div>
        </div>
      </td>
      <td>
        <div style="font-size: 0.82rem;">${p.phone}</div>
      </td>
      <td>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-weight: 700; font-size: 0.78rem;">Blood: ${p.blood}</span>
          ${p.alert && !p.alert.includes('None')
            ? `<span style="color: #ef4444; font-size: 0.72rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${p.alert}</span>`
            : `<span style="color: #10b981; font-size: 0.72rem; display: inline-flex; align-items: center; gap: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> No Allergies</span>`}
        </div>
      </td>
      <td>${p.lastVisit}</td>
      <td><strong>${p.nextAppt}</strong></td>
      <td>${p.doctor}</td>
      <td>
        <button type="button" class="dash-btn dash-btn-primary dash-btn-sm" onclick="viewPatientChartByName('${p.name}')">
          <span>Digital Chart</span>
        </button>
      </td>
    </tr>
  `).join('');
}
function initPatientsDirectory() {
  renderPatientsTable();
  const searchInput = document.getElementById('dash-patient-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderPatientsTable(searchInput.value);
    });
  }
  const catPills = document.querySelectorAll('[data-patient-cat]');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-patient-cat');
      renderPatientsTable(searchInput ? searchInput.value : '', cat);
    });
  });
  const regBtn = document.getElementById('dash-new-patient-btn');
  if (regBtn) {
    regBtn.addEventListener('click', () => {
      const name = prompt('Enter new patient full name:');
      if (name && name.trim()) {
        const newPatient = {
          mrn: 'OR-2026-' + Math.floor(8500 + Math.random() * 500),
          name: name.trim(),
          avatar: 'assets/images/patient_sophia.jpg',
          gender: 'Female',
          age: 31,
          phone: '+1 (555) 018-' + Math.floor(1000 + Math.random() * 9000),
          blood: 'O+',
          alert: 'None',
          lastVisit: 'New Patient Intake',
          nextAppt: 'Scheduling...',
          doctor: 'Dr. Sarah Jenkins',
          plan: 'Initial Comprehensive Consultation'
        };
        patientsData.unshift(newPatient);
        renderPatientsTable();
        showToast(`Patient profile registered: ${newPatient.name} (${newPatient.mrn})`, 'success');
      }
    });
  }
  document.querySelectorAll('.dash-tooth-unit').forEach(unit => {
    unit.addEventListener('click', () => {
      const title = unit.getAttribute('title') || `Tooth #${unit.textContent}`;
      showToast(`Odontogram Info: ${title}`, 'info');
    });
  });
}
window.viewPatientChartByName = function(name) {
  const patient = patientsData.find(p => p.name.toLowerCase() === name.toLowerCase()) || patientsData[0];
  const titleSub = document.getElementById('modal-chart-patient-subtitle');
  const avatar = document.getElementById('modal-chart-avatar');
  const nameEl = document.getElementById('modal-chart-name');
  const detailsEl = document.getElementById('modal-chart-details');
  const allergiesEl = document.getElementById('modal-chart-allergies');
  const planEl = document.getElementById('modal-chart-plan');
  if (titleSub) titleSub.textContent = `MRN #${patient.mrn} • ${patient.name}`;
  if (avatar) avatar.src = patient.avatar;
  if (nameEl) nameEl.textContent = patient.name;
  if (detailsEl) detailsEl.textContent = `Age: ${patient.age} • Gender: ${patient.gender} • Blood: ${patient.blood} • Attending: ${patient.doctor}`;
  if (allergiesEl) allergiesEl.textContent = patient.alert && !patient.alert.includes('None') ? `Alert: ${patient.alert}. Please take clinical precautions.` : 'No active medical allergies reported.';
  if (planEl) planEl.textContent = patient.plan || 'Routine preventive care protocol.';
  openModal('modal-patient-chart');
};
window.quickBookPatientFromChart = function() {
  closeModal('modal-patient-chart');
  const name = document.getElementById('modal-chart-name');
  if (name) {
    const input = document.getElementById('apt-patient-name');
    if (input) input.value = name.textContent.trim();
  }
  openModal('modal-book-apt');
};
function initCalculator() {
  const procSelect = document.getElementById('calc-procedure-select');
  const insSelect = document.getElementById('calc-insurance-select');
  const scanAddon = document.getElementById('calc-addon-scan');
  const sedationAddon = document.getElementById('calc-addon-sedation');
  const outGross = document.getElementById('calc-out-gross');
  const outIns = document.getElementById('calc-out-ins');
  const outPatient = document.getElementById('calc-out-patient');
  const calculate = () => {
    if (!procSelect || !insSelect) return;
    let basePrice = parseFloat(procSelect.value) || 0;
    let insRate = parseFloat(insSelect.value) || 0;
    let addonTotal = 0;
    if (scanAddon && scanAddon.checked) addonTotal += parseFloat(scanAddon.value) || 0;
    if (sedationAddon && sedationAddon.checked) addonTotal += parseFloat(sedationAddon.value) || 0;
    let gross = basePrice + addonTotal;
    let insCoverage = gross * insRate;
    let discount = insRate > 0 ? 50 : 0;
    let patientOop = Math.max(0, gross - insCoverage - discount);
    if (outGross) outGross.textContent = `$${gross.toFixed(2)}`;
    if (outIns) outIns.textContent = `-$${insCoverage.toFixed(2)}`;
    if (outPatient) outPatient.textContent = `$${patientOop.toFixed(2)}`;
  };
  if (procSelect) procSelect.addEventListener('change', calculate);
  if (insSelect) insSelect.addEventListener('change', calculate);
  if (scanAddon) scanAddon.addEventListener('change', calculate);
  if (sedationAddon) sedationAddon.addEventListener('change', calculate);
  calculate();
}
window.generatePatientQuote = function() {
  const proc = document.getElementById('calc-procedure-select');
  const patientOop = document.getElementById('calc-out-patient');
  const procName = proc ? proc.options[proc.selectedIndex].text : 'Dental Procedure';
  const price = patientOop ? patientOop.textContent : '$430.00';
  alert(`ORALIZE DENTAL CLINICAL TREATMENT QUOTE\n\nTreatment: ${procName}\nEstimated Patient Out-of-Pocket: ${price}\n\nQuote Valid For: 30 Days\nApproved by: Oralize Clinical Finance Dept.`);
};
const invoicesData = [
  {
    id: 'INV-2026-8921',
    patient: 'Eleanor Vance',
    procedure: 'Invisalign Alignment Checkup',
    date: 'Oct 21, 2026',
    method: 'Visa •••• 4219',
    amount: 240,
    status: 'Paid'
  },
  {
    id: 'INV-2026-8922',
    patient: 'David Miller',
    procedure: 'Root Canal Phase 1 Therapy',
    date: 'Oct 20, 2026',
    method: 'Delta Dental Reimbursement',
    amount: 850,
    status: 'Paid'
  },
  {
    id: 'INV-2026-8923',
    patient: 'Sophia Patel',
    procedure: 'Ultrasonic Hygiene & Air Polish',
    date: 'Oct 19, 2026',
    method: 'Mastercard •••• 9812',
    amount: 180,
    status: 'Paid'
  },
  {
    id: 'INV-2026-8924',
    patient: 'James Wilson',
    procedure: 'Titanium Dental Implant Fixture',
    date: 'Oct 18, 2026',
    method: 'Cigna Insurance Claim',
    amount: 1450,
    status: 'Processing'
  },
  {
    id: 'INV-2026-8925',
    patient: 'Emily Chen',
    procedure: 'In-Office Laser Whitening',
    date: 'Oct 16, 2026',
    method: 'Cash / Apple Pay',
    amount: 450,
    status: 'Paid'
  },
  {
    id: 'INV-2026-8926',
    patient: 'Robert Taylor',
    procedure: 'Pediatric Preventive Sealants',
    date: 'Oct 15, 2026',
    method: 'MetLife Dental',
    amount: 120,
    status: 'Pending'
  }
];
function renderInvoicesTable(searchQuery = '') {
  const tbody = document.getElementById('dash-invoices-tbody');
  if (!tbody) return;
  const q = searchQuery.toLowerCase();
  const filtered = invoicesData.filter(inv => {
    return !q || inv.id.toLowerCase().includes(q) || inv.patient.toLowerCase().includes(q) || inv.procedure.toLowerCase().includes(q);
  });
  tbody.innerHTML = filtered.map(inv => {
    let badgeClass = 'dash-badge-paid';
    if (inv.status === 'Processing') badgeClass = 'dash-badge-processing';
    if (inv.status === 'Pending') badgeClass = 'dash-badge-pending';
    return `
      <tr>
        <td><strong>${inv.id}</strong></td>
        <td><strong>${inv.patient}</strong></td>
        <td>${inv.procedure}</td>
        <td>${inv.date}</td>
        <td><span style="font-size: 0.8rem; color: var(--text-muted);">${inv.method}</span></td>
        <td><strong style="color: var(--color-primary); font-size: 0.95rem;">$${inv.amount.toFixed(2)}</strong></td>
        <td><span class="dash-badge ${badgeClass}"><span class="dash-badge-dot"></span>${inv.status}</span></td>
        <td>
          <button type="button" class="dash-btn dash-btn-outline dash-btn-sm" onclick="viewInvoiceReceipt('${inv.id}')">
            <span>View Receipt</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}
function initInvoices() {
  renderInvoicesTable();
  const searchInput = document.getElementById('dash-invoice-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderInvoicesTable(searchInput.value);
    });
  }
  const createInvBtn = document.getElementById('dash-create-invoice-btn');
  if (createInvBtn) {
    createInvBtn.addEventListener('click', () => {
      const patient = prompt('Enter Patient Name for New Invoice:');
      if (patient && patient.trim()) {
        const newInv = {
          id: 'INV-2026-' + Math.floor(8930 + Math.random() * 500),
          patient: patient.trim(),
          procedure: 'Comprehensive Dental Services',
          date: 'Oct 21, 2026',
          method: 'Visa Card / Pending',
          amount: 320,
          status: 'Paid'
        };
        invoicesData.unshift(newInv);
        renderInvoicesTable();
        showToast(`Invoice #${newInv.id} created successfully!`, 'success');
      }
    });
  }
  const exportBtn = document.getElementById('dash-export-report-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      showToast('Generating official monthly executive report PDF...', 'info');
      setTimeout(() => {
        showToast('Executive Report (Oct 2026) exported successfully! ($148,250 Revenue)', 'success');
      }, 900);
    });
  }
}
window.viewInvoiceReceipt = function(invId) {
  const inv = invoicesData.find(i => i.id === invId) || invoicesData[0];
  const invNumEl = document.getElementById('receipt-inv-num');
  const dateEl = document.getElementById('receipt-date');
  const patientEl = document.getElementById('receipt-patient-name');
  const statusEl = document.getElementById('receipt-status-badge');
  const paidEl = document.getElementById('receipt-patient-paid');
  const subtotalEl = document.getElementById('receipt-subtotal');
  if (invNumEl) invNumEl.textContent = inv.id;
  if (dateEl) dateEl.textContent = inv.date;
  if (patientEl) patientEl.textContent = inv.patient;
  if (statusEl) {
    statusEl.textContent = inv.status.toUpperCase();
    statusEl.className = `dash-badge ${inv.status === 'Paid' ? 'dash-badge-paid' : 'dash-badge-pending'}`;
  }
  if (paidEl) paidEl.textContent = `$${inv.amount.toFixed(2)}`;
  if (subtotalEl) subtotalEl.textContent = `$${(inv.amount * 1.4).toFixed(2)}`;
  openModal('modal-receipt-view');
};
window.printReceipt = function() {
  window.print();
};
window.quickBookDoctor = function(docName) {
  const docSelect = document.getElementById('apt-doctor');
  if (docSelect) docSelect.value = docName;
  openModal('modal-book-apt');
};
window.quickBookTreatment = function(serviceName) {
  const servSelect = document.getElementById('apt-service');
  if (servSelect) servSelect.value = serviceName;
  openModal('modal-book-apt');
};
window.openDoctorSchedule = function(docName) {
  showToast(`Loading weekly schedule for ${docName}...`, 'info');
  window.switchTab('doctors');
};
function initModals() {
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });
  document.querySelectorAll('.dash-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('show');
      }
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dash-modal-backdrop.show').forEach(b => b.classList.remove('show'));
      closeAllPopovers();
    }
  });
}
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('show');
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
}
function showToast(message, type = 'info') {
  const container = document.getElementById('dash-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `dash-toast ${type}`;
  const iconSymbol = type === 'success'
    ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
    : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
  toast.innerHTML = `
    <div class="dash-toast-icon">${iconSymbol}</div>
    <div class="dash-toast-msg">${message}</div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 250);
  }, 3600);
}
function initGlobalShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const search = document.getElementById('dash-global-search');
      if (search) {
        search.focus();
        search.select();
      }
    }
  });
}
