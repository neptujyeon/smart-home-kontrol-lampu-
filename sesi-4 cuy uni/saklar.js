// saklar.js - Smart Home Lamp Control
// Kompatibel dengan tugas semester 1 - fungsi saklar() dipertahankan

const roomConfig = {
  keluarga: [1, 2, 3],
  makan:    [4],
  tidur:    [5, 6],
  tamu:     [7, 8, 9, 10]
};

function setLampState(num, state) {
  const item = document.getElementById('item-lampu' + num);
  const c1   = document.getElementById('bulb' + num + '-c1');
  const c2   = document.getElementById('bulb' + num + '-c2');

  if (!item) return;

  if (state) {
    item.classList.add('lamp-on');
    if (c1) c1.setAttribute('stop-color', '#fff9c4');
    if (c2) c2.setAttribute('stop-color', '#ffd700');
  } else {
    item.classList.remove('lamp-on');
    if (c1) c1.setAttribute('stop-color', '#555');
    if (c2) c2.setAttribute('stop-color', '#222');
  }
}

function updateRoomStatus(roomName) {
  const lamps   = roomConfig[roomName];
  const onCount = lamps.filter(n => document.getElementById('default-toggle' + n).checked).length;
  const total   = lamps.length;

  const infoEl  = document.getElementById('info-' + roomName);
  const dot     = document.getElementById('dot-' + roomName);
  const card    = document.getElementById('room-' + roomName);
  const master  = document.getElementById('master-' + roomName);

  if (infoEl) infoEl.textContent = onCount + ' / ' + total + ' menyala';

  if (onCount === total) {
    if (dot) dot.classList.add('active');
    if (card) card.classList.add('active-room');
    if (master) { master.checked = true; master.indeterminate = false; }
  } else if (onCount === 0) {
    if (dot) dot.classList.remove('active');
    if (card) card.classList.remove('active-room');
    if (master) { master.checked = false; master.indeterminate = false; }
  } else {
    if (dot) dot.classList.add('active');
    if (card) card.classList.add('active-room');
    if (master) master.indeterminate = true;
  }

  updateGlobalStats();
}

function updateGlobalStats() {
  let totalOn = 0;
  for (let n = 1; n <= 10; n++) {
    const t = document.getElementById('default-toggle' + n);
    if (t && t.checked) totalOn++;
  }
  const elOn    = document.getElementById('total-on');
  const elOff   = document.getElementById('total-off');
  const elRooms = document.getElementById('total-rooms');

  if (elOn)  elOn.textContent  = totalOn;
  if (elOff) elOff.textContent = 10 - totalOn;

  let activeRooms = 0;
  Object.keys(roomConfig).forEach(room => {
    const on = roomConfig[room].filter(n => {
      const t = document.getElementById('default-toggle' + n);
      return t && t.checked;
    }).length;
    if (on > 0) activeRooms++;
  });
  if (elRooms) elRooms.textContent = activeRooms;
}

function saklarSingle(num, room) {
  const toggle = document.getElementById('default-toggle' + num);
  if (toggle) setLampState(num, toggle.checked);
  updateRoomStatus(room);
}

function masterToggle(roomName) {
  const master = document.getElementById('master-' + roomName);
  if (!master) return;
  const state = master.checked;
  master.indeterminate = false;

  roomConfig[roomName].forEach(n => {
    const toggle = document.getElementById('default-toggle' + n);
    if (toggle) {
      toggle.checked = state;
      setLampState(n, state);
    }
  });

  updateRoomStatus(roomName);
}

// Fungsi saklar() asli - dipertahankan sesuai materi pembelajaran
function saklar() {
  for (let n = 1; n <= 10; n++) {
    const toggle = document.getElementById('default-toggle' + n);
    if (toggle) setLampState(n, toggle.checked);
  }
  Object.keys(roomConfig).forEach(room => updateRoomStatus(room));
}
