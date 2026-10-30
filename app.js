(() => {
  'use strict';

  const STORAGE_KEY = 'roam-notes-busan-gyeongju-v1';
  const TRIP_DAYS = [
    { date: '2026-12-04', day: 'DAY 01', short: '12/04（五）' },
    { date: '2026-12-05', day: 'DAY 02', short: '12/05（六）' },
    { date: '2026-12-06', day: 'DAY 03', short: '12/06（日）' },
    { date: '2026-12-07', day: 'DAY 04', short: '12/07（一）' },
    { date: '2026-12-08', day: 'DAY 05', short: '12/08（二）' }
  ];
  const CATEGORIES = {
    attraction: { label: '景點', icon: '✦', color: '#338c85' },
    food: { label: '美食', icon: '餐', color: '#d88752' },
    transit: { label: '交通', icon: '↗', color: '#6679a5' },
    shopping: { label: '購物', icon: '袋', color: '#ad7c9c' },
    stay: { label: '住宿', icon: '⌂', color: '#77856a' },
    other: { label: '其他', icon: '＋', color: '#8a8c83' }
  };
  const SEED_PLACES = [
    { id: 'seed-busan-station', name: '釜山站', korean: '부산역 · Busan Station', city: 'Busan', category: 'transit', lat: 35.1152, lng: 129.0415, date: '', time: '', notes: '主要鐵路與交通轉乘點。可在此記錄抵達、離開或行李寄放資訊。', address: ' 부산역, Dong-gu, Busan', budget: 0, visited: false },
    { id: 'seed-gamcheon', name: '甘川洞文化村', korean: '감천문화마을 · Gamcheon Culture Village', city: 'Busan', category: 'attraction', lat: 35.0975, lng: 129.0106, date: '', time: '', notes: '彩色山城與巷弄景觀。建議預留散步、拍照時間；部分區域是居民生活空間。', address: '203 Gamnae 2-ro, Saha-gu, Busan', budget: 0, visited: false },
    { id: 'seed-jagalchi', name: '札嘎其市場', korean: '자갈치시장 · Jagalchi Market', city: 'Busan', category: 'food', lat: 35.0965, lng: 129.0304, date: '', time: '', notes: '釜山代表性的海鮮市場。可把想吃的料理、店家或價格記在這裡。', address: 'Jagalchihaean-ro, Jung-gu, Busan', budget: 0, visited: false },
    { id: 'seed-biff', name: 'BIFF 廣場', korean: 'BIFF 광장 · BIFF Square', city: 'Busan', category: 'shopping', lat: 35.0984, lng: 129.0272, date: '', time: '', notes: '南浦洞一帶的商圈，可與札嘎其市場、國際市場排在同一區。', address: 'Nampo-dong, Jung-gu, Busan', budget: 0, visited: false },
    { id: 'seed-gwangalli', name: '廣安里海水浴場', korean: '광안리해수욕장 · Gwangalli Beach', city: 'Busan', category: 'attraction', lat: 35.1532, lng: 129.1187, date: '', time: '', notes: '面向廣安大橋的海灘。適合安排傍晚至夜間散步、看橋景。', address: '219 Gwanganhaebyeon-ro, Suyeong-gu, Busan', budget: 0, visited: false },
    { id: 'seed-haeundae', name: '海雲臺海水浴場', korean: '해운대해수욕장 · Haeundae Beach', city: 'Busan', category: 'attraction', lat: 35.1587, lng: 129.1604, date: '', time: '', notes: '海雲臺主要海岸區域，可搭配冬柏島或海雲臺周邊散步。', address: '264 Haeundaehaebyeon-ro, Haeundae-gu, Busan', budget: 0, visited: false },
    { id: 'seed-blueline', name: '海雲臺藍線公園（尾浦）', korean: '해운대 블루라인파크 · Mipo', city: 'Busan', category: 'attraction', lat: 35.1597, lng: 129.1804, date: '', time: '', notes: '海岸列車與天空膠囊的搭乘區域之一。想搭乘的話，記得先確認班次與預約方式。', address: 'Mipo, Haeundae-gu, Busan', budget: 0, visited: false },
    { id: 'seed-yonggungsa', name: '海東龍宮寺', korean: '해동용궁사 · Haedong Yonggungsa', city: 'Busan', category: 'attraction', lat: 35.1885, lng: 129.2232, date: '', time: '', notes: '靠海的寺院，位於釜山東北側，建議與海雲臺東側行程一起評估交通。', address: '86 Yonggung-gil, Gijang-gun, Busan', budget: 0, visited: false },
    { id: 'seed-huinnyeoul', name: '白淺灘文化村', korean: '흰여울문화마을 · Huinnyeoul Culture Village', city: 'Busan', category: 'attraction', lat: 35.0788, lng: 129.0445, date: '', time: '', notes: '影島海岸聚落與步道。可和南浦洞、札嘎其安排在同一天，但需留意移動時間。', address: 'Yeongseon-dong, Yeongdo-gu, Busan', budget: 0, visited: false },
    { id: 'seed-taejongdae', name: '太宗臺', korean: '태종대 · Taejongdae', city: 'Busan', category: 'attraction', lat: 35.0513, lng: 129.0870, date: '', time: '', notes: '影島南端的海岸景觀與步道；建議預留較完整的移動及遊覽時間。', address: '24 Jeonmang-ro, Yeongdo-gu, Busan', budget: 0, visited: false },
    { id: 'seed-singyeongju', name: '新慶州站', korean: '신경주역 · Singyeongju Station', city: 'Gyeongju', category: 'transit', lat: 35.7985, lng: 129.1392, date: '', time: '', notes: 'KTX 新慶州站。車站與慶州市區有一段距離，出發前確認巴士或計程車接駁。', address: 'Geoncheon-eup, Gyeongju', budget: 0, visited: false },
    { id: 'seed-bulguksa', name: '佛國寺', korean: '불국사 · Bulguksa Temple', city: 'Gyeongju', category: 'attraction', lat: 35.7898, lng: 129.3320, date: '', time: '', notes: '慶州代表性佛教古蹟，位於市區東南側；可和市中心古蹟分開安排。', address: '385 Bulguk-ro, Gyeongju', budget: 0, visited: false },
    { id: 'seed-daereungwon', name: '大陵苑', korean: '대릉원 · Daereungwon', city: 'Gyeongju', category: 'attraction', lat: 35.8395, lng: 129.2112, date: '', time: '', notes: '新羅古墳群，鄰近皇理團路與市中心歷史景點。', address: '9 Gyerim-ro, Gyeongju', budget: 0, visited: false },
    { id: 'seed-cheomseongdae', name: '瞻星臺', korean: '첨성대 · Cheomseongdae', city: 'Gyeongju', category: 'attraction', lat: 35.8346, lng: 129.2190, date: '', time: '', notes: '新羅時期天文觀測設施，周邊有大片草地與古蹟群。', address: '140-25 Cheomseong-ro, Gyeongju', budget: 0, visited: false },
    { id: 'seed-donggung', name: '東宮與月池', korean: '동궁과 월지 · Donggung & Wolji', city: 'Gyeongju', category: 'attraction', lat: 35.8347, lng: 129.2268, date: '', time: '', notes: '新羅王宮別宮遺址與池塘，常被安排在傍晚或夜間。', address: ' palace site, Gyeongju', budget: 0, visited: false },
    { id: 'seed-hwangnidan', name: '皇理團路', korean: '황리단길 · Hwangnidan-gil', city: 'Gyeongju', category: 'food', lat: 35.8390, lng: 129.2090, date: '', time: '', notes: '咖啡廳、餐廳與特色小店聚集的街區。可先收藏想吃的店，再分配用餐時段。', address: 'Poseok-ro area, Gyeongju', budget: 0, visited: false },
    { id: 'seed-woljeonggyo', name: '月精橋', korean: '월정교 · Woljeonggyo Bridge', city: 'Gyeongju', category: 'attraction', lat: 35.8316, lng: 129.2156, date: '', time: '', notes: '復原的新羅時期橋梁，夜間點燈時也很適合散步拍照。', address: 'Gyo-dong, Gyeongju', budget: 0, visited: false }
  ];
  const DEFAULT_CHECKLIST = [
    { id: 'c1', text: '護照、機票與住宿資料', done: false },
    { id: 'c2', text: '確認韓國 eSIM／網路', done: false },
    { id: 'c3', text: 'T-money 或交通支付方式', done: false },
    { id: 'c4', text: '韓國 220V 電源轉接頭', done: false },
    { id: 'c5', text: '冬季外套、圍巾與手套', done: false },
    { id: 'c6', text: '舒適好走的鞋與常備藥', done: false }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const makeId = () => `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const formatWon = amount => `₩${Math.round(Number(amount) || 0).toLocaleString('ko-KR')}`;

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { places: structuredClone(SEED_PLACES), checklist: structuredClone(DEFAULT_CHECKLIST), notes: '' };
      const parsed = JSON.parse(stored);
      if (!parsed || !Array.isArray(parsed.places)) throw new Error('資料格式不正確');
      return {
        places: parsed.places,
        checklist: Array.isArray(parsed.checklist) ? parsed.checklist : structuredClone(DEFAULT_CHECKLIST),
        notes: typeof parsed.notes === 'string' ? parsed.notes : ''
      };
    } catch (error) {
      console.warn('無法讀取本機資料，改用預設地點。', error);
      return { places: structuredClone(SEED_PLACES), checklist: structuredClone(DEFAULT_CHECKLIST), notes: '' };
    }
  }

  let state = loadState();
  let activeTab = 'itinerary';
  let activeCity = 'all';
  let activeCategory = 'all';
  let searchTerm = '';
  let selectedId = null;
  let editing = false;
  let map = null;
  let markerLayer = null;
  let markers = new Map();
  let addingOnMap = false;
  let pendingDraft = null;
  let toastTimer = null;

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $('#saveStatus').textContent = '已儲存於此裝置';
    } catch (error) {
      $('#saveStatus').textContent = '儲存失敗，請匯出備份';
      showToast('瀏覽器儲存空間不足，請先匯出備份。');
    }
    updateStats();
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function updateStats() {
    $('#placeCount').textContent = state.places.length;
    const total = state.places.reduce((sum, place) => sum + (Number(place.budget) > 0 ? Number(place.budget) : 0), 0);
    $('#budgetTotal').textContent = formatWon(total);
  }

  function initMap() {
    const mapElement = $('#map');
    if (!window.L) {
      mapElement.innerHTML = '<div class="map-loading">地圖載入失敗。請確認網路連線，或使用下方地點清單。</div>';
      return;
    }
    mapElement.innerHTML = '';
    map = L.map('map', { zoomControl: true, scrollWheelZoom: true }).setView([35.47, 129.15], 9.4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
    map.on('click', event => {
      if (!addingOnMap) return;
      addingOnMap = false;
      map.getContainer().style.cursor = '';
      const city = nearestCity(event.latlng.lat, event.latlng.lng);
      pendingDraft = {
        id: makeId(), name: '', korean: '', city, category: 'attraction',
        lat: Number(event.latlng.lat.toFixed(6)), lng: Number(event.latlng.lng.toFixed(6)),
        date: '', time: '', notes: '', address: '', budget: 0, visited: false
      };
      selectedId = null;
      editing = true;
      renderDetail();
      showToast('已選好地圖位置，請填寫地點名稱。');
    });
    renderMarkers();
  }

  function nearestCity(lat, lng) {
    const busan = Math.hypot((lat - 35.1796) * 1.0, (lng - 129.0756) * 0.82);
    const gyeongju = Math.hypot((lat - 35.8562) * 1.0, (lng - 129.2247) * 0.82);
    return busan <= gyeongju ? 'Busan' : 'Gyeongju';
  }

  function getVisiblePlaces() {
    return state.places.filter(place => {
      const cityOK = activeCity === 'all' || place.city === activeCity;
      const categoryOK = activeCategory === 'all' || place.category === activeCategory;
      const haystack = `${place.name} ${place.korean || ''} ${place.notes || ''} ${place.address || ''}`.toLowerCase();
      const searchOK = !searchTerm || haystack.includes(searchTerm.toLowerCase());
      return cityOK && categoryOK && searchOK;
    });
  }

  function markerIcon(place, selected = false, dimmed = false) {
    const category = CATEGORIES[place.category] || CATEGORIES.other;
    const classes = ['map-pin', selected ? 'selected' : '', dimmed ? 'dimmed' : ''].filter(Boolean).join(' ');
    const html = `<div class="${classes}" style="background:${category.color}"><span>${escapeHTML(category.icon)}</span></div>`;
    return L.divIcon({ className: 'map-pin-wrap', html, iconSize: selected ? [31, 31] : [25, 25], iconAnchor: selected ? [15, 28] : [12, 23], popupAnchor: [0, -24] });
  }

  function renderMarkers() {
    if (!map || !markerLayer) return;
    markerLayer.clearLayers();
    markers.clear();
    const visible = getVisiblePlaces();
    visible.forEach(place => {
      if (!Number.isFinite(Number(place.lat)) || !Number.isFinite(Number(place.lng))) return;
      const marker = L.marker([Number(place.lat), Number(place.lng)], { icon: markerIcon(place, place.id === selectedId) });
      marker.bindPopup(`<b>${escapeHTML(place.name || '未命名地點')}</b><br><span>${escapeHTML(place.city === 'Busan' ? '釜山' : '慶州')} · ${escapeHTML((CATEGORIES[place.category] || CATEGORIES.other).label)}</span>`);
      marker.on('click', () => {
        selectedId = place.id;
        editing = false;
        pendingDraft = null;
        renderMarkers();
        renderDetail();
      });
      marker.addTo(markerLayer);
      markers.set(place.id, marker);
    });
  }

  function selectPlace(id, shouldPan = true) {
    const place = state.places.find(item => item.id === id);
    if (!place) return;
    selectedId = id;
    editing = false;
    pendingDraft = null;
    renderMarkers();
    renderDetail();
    if (map && shouldPan) {
      map.setView([Number(place.lat), Number(place.lng)], Math.max(map.getZoom(), 12), { animate: true });
      const marker = markers.get(id);
      if (marker) marker.openPopup();
    }
  }

  function cityName(city) { return city === 'Busan' ? '釜山 Busan' : '慶州 Gyeongju'; }
  function categoryName(category) { return (CATEGORIES[category] || CATEGORIES.other).label; }

  function renderDetail() {
    const panel = $('#detailPanel');
    const place = pendingDraft || state.places.find(item => item.id === selectedId);
    if (!place) {
      panel.innerHTML = `<div class="empty-detail"><span class="empty-icon">⌖</span><p class="eyebrow">PLACE DETAILS</p><h2>選一個地點開始</h2><p>點擊地圖標記，查看景點資訊；也可以新增自己的收藏點。</p><button class="text-button" id="detailAddButton" type="button">＋ 在地圖新增地點</button></div>`;
      $('#detailAddButton').addEventListener('click', startAddMode);
      return;
    }
    if (editing) {
      renderEditForm(panel, place);
      return;
    }
    const category = CATEGORIES[place.category] || CATEGORIES.other;
    const dateLabel = place.date ? (TRIP_DAYS.find(day => day.date === place.date)?.short || place.date) : '尚未安排';
    panel.innerHTML = `
      <div class="place-detail-head">
        <div class="place-title-wrap">
          <span class="place-category"><i class="legend-dot" style="background:${category.color}"></i>${category.label} · ${escapeHTML(cityName(place.city))}</span>
          <h2>${escapeHTML(place.name)}</h2>
          ${place.korean ? `<div class="place-subname">${escapeHTML(place.korean)}</div>` : ''}
        </div>
        <div class="detail-actions"><button class="icon-button" id="editPlaceButton" type="button" aria-label="編輯地點" title="編輯">✎</button><button class="icon-button" id="deletePlaceButton" type="button" aria-label="刪除地點" title="刪除">×</button></div>
      </div>
      <p class="detail-note">${escapeHTML(place.notes || '還沒有備註。按右上角編輯，加入想記住的資訊。')}</p>
      <div class="detail-meta">
        <div><small>安排日期／時間</small><strong>${escapeHTML(dateLabel)}${place.time ? ` · ${escapeHTML(place.time)}` : ''}</strong></div>
        <div><small>預估花費</small><strong>${Number(place.budget) > 0 ? formatWon(place.budget) : '未填寫'}</strong></div>
        <div><small>地址／區域</small><strong>${escapeHTML(place.address || '未填寫')}</strong></div>
        <div><small>座標</small><strong>${Number(place.lat).toFixed(4)}, ${Number(place.lng).toFixed(4)}</strong></div>
      </div>
      <div class="detail-bottom"><label class="visited-toggle"><input type="checkbox" id="visitedToggle" ${place.visited ? 'checked' : ''}> 已經去過</label><a class="directions-link" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${place.lat},${place.lng}`)}" target="_blank" rel="noopener">Google Maps 導航 ↗</a></div>`;
    $('#editPlaceButton').addEventListener('click', () => { editing = true; renderDetail(); });
    $('#deletePlaceButton').addEventListener('click', deleteSelectedPlace);
    $('#visitedToggle').addEventListener('change', event => {
      place.visited = event.target.checked;
      saveState();
      renderMarkers();
      renderTabs();
    });
  }

  function renderEditForm(panel, place) {
    panel.innerHTML = `
      <form class="edit-form" id="placeForm">
        <div class="form-heading"><h2>${pendingDraft ? '新增地點' : '編輯地點'}</h2><button class="icon-button" id="cancelEditButton" type="button" aria-label="取消編輯">×</button></div>
        <div class="form-grid">
          <div class="field full"><label for="placeName">地點名稱 *</label><input id="placeName" name="name" required maxlength="70" placeholder="例如：想去的咖啡廳" value="${escapeHTML(place.name)}"></div>
          <div class="field"><label for="placeCity">城市</label><select id="placeCity" name="city"><option value="Busan" ${place.city === 'Busan' ? 'selected' : ''}>釜山 Busan</option><option value="Gyeongju" ${place.city === 'Gyeongju' ? 'selected' : ''}>慶州 Gyeongju</option></select></div>
          <div class="field"><label for="placeCategory">類別</label><select id="placeCategory" name="category">${Object.entries(CATEGORIES).map(([key, value]) => `<option value="${key}" ${place.category === key ? 'selected' : ''}>${value.label}</option>`).join('')}</select></div>
          <div class="field"><label for="placeDate">安排日期</label><select id="placeDate" name="date"><option value="">尚未安排</option>${TRIP_DAYS.map(day => `<option value="${day.date}" ${place.date === day.date ? 'selected' : ''}>${day.short}</option>`).join('')}</select></div>
          <div class="field"><label for="placeTime">時間（選填）</label><input id="placeTime" name="time" type="time" value="${escapeHTML(place.time || '')}"></div>
          <div class="field full"><label for="placeKorean">韓文名稱／關鍵字</label><input id="placeKorean" name="korean" maxlength="100" placeholder="方便搜尋或給計程車司機看" value="${escapeHTML(place.korean || '')}"></div>
          <div class="field full"><label for="placeAddress">地址／區域</label><input id="placeAddress" name="address" maxlength="140" placeholder="可貼上韓文地址或地鐵站" value="${escapeHTML(place.address || '')}"></div>
          <div class="field"><label for="placeBudget">預估花費（韓元）</label><input id="placeBudget" name="budget" type="number" min="0" step="1000" value="${Number(place.budget) || 0}"></div>
          <div class="field"><label for="placeVisited">完成狀態</label><select id="placeVisited" name="visited"><option value="false" ${!place.visited ? 'selected' : ''}>尚未去過</option><option value="true" ${place.visited ? 'selected' : ''}>已經去過</option></select></div>
          <div class="field full"><label for="placeNotes">備註／想做的事</label><textarea id="placeNotes" name="notes" maxlength="1200" placeholder="營業時間、必吃餐點、預約資訊、交通方式……">${escapeHTML(place.notes || '')}</textarea></div>
        </div>
        <div class="coordinate-line"><span>LAT ${Number(place.lat).toFixed(5)} · LNG ${Number(place.lng).toFixed(5)}</span><span>座標取自地圖點擊</span></div>
        <div class="form-actions"><button class="button button-small" id="cancelEditText" type="button">取消</button><div class="right-actions"><button class="button button-primary button-small" type="submit">儲存地點</button></div></div>
      </form>`;
    $('#placeForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const name = String(form.get('name') || '').trim();
      if (!name) { $('#placeName').focus(); showToast('請先填寫地點名稱。'); return; }
      const updated = {
        ...place,
        name,
        city: String(form.get('city')),
        category: String(form.get('category')),
        date: String(form.get('date') || ''),
        time: String(form.get('time') || ''),
        korean: String(form.get('korean') || '').trim(),
        address: String(form.get('address') || '').trim(),
        budget: Math.max(0, Number(form.get('budget')) || 0),
        visited: form.get('visited') === 'true',
        notes: String(form.get('notes') || '').trim()
      };
      if (pendingDraft) {
        state.places.push(updated);
        selectedId = updated.id;
        pendingDraft = null;
        showToast('地點已加入地圖！');
      } else {
        const index = state.places.findIndex(item => item.id === updated.id);
        if (index >= 0) state.places[index] = updated;
        showToast('地點資訊已更新。');
      }
      editing = false;
      saveState();
      renderMarkers();
      renderDetail();
      renderTabs();
    });
    const cancel = () => {
      if (pendingDraft) pendingDraft = null;
      editing = false;
      renderDetail();
    };
    $('#cancelEditButton').addEventListener('click', cancel);
    $('#cancelEditText').addEventListener('click', cancel);
  }

  function deleteSelectedPlace() {
    const place = state.places.find(item => item.id === selectedId);
    if (!place || !window.confirm(`確定刪除「${place.name}」嗎？`)) return;
    state.places = state.places.filter(item => item.id !== selectedId);
    selectedId = null;
    editing = false;
    saveState();
    renderMarkers();
    renderDetail();
    renderTabs();
    showToast('地點已刪除。');
  }

  function startAddMode() {
    if (!map) { showToast('地圖尚未載入，請稍後再試。'); return; }
    addingOnMap = true;
    map.getContainer().style.cursor = 'crosshair';
    showToast('請在地圖上點選新地點的位置。');
  }

  function renderTabs() {
    $$('.tab-button').forEach(button => {
      const active = button.dataset.tab === activeTab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    const content = $('#tabContent');
    if (activeTab === 'itinerary') renderItinerary(content);
    if (activeTab === 'places') renderPlaceList(content);
    if (activeTab === 'notes') renderNotes(content);
  }

  function renderItinerary(container) {
    container.innerHTML = TRIP_DAYS.map(day => {
      const dayPlaces = state.places.filter(place => place.date === day.date).sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
      return `<div class="day-block"><div class="day-heading"><div><strong>${day.day}</strong><small>${day.short}</small></div><button type="button" data-day-add="${day.date}">＋ 加入地點</button></div>
        ${dayPlaces.length ? dayPlaces.map(place => `<button type="button" class="itinerary-item" data-select-place="${escapeHTML(place.id)}"><span class="itinerary-time">${escapeHTML(place.time || '— —')}</span><span class="itinerary-name">${escapeHTML(place.name)}</span><span class="itinerary-city">${place.city === 'Busan' ? '釜山' : '慶州'}</span></button>`).join('') : '<div class="day-empty">還沒有安排。從「所有地點」選一個收藏點，設定日期就會出現在這裡。</div>'}
      </div>`;
    }).join('');
    $$('[data-select-place]', container).forEach(button => button.addEventListener('click', () => selectPlace(button.dataset.selectPlace)));
    $$('[data-day-add]', container).forEach(button => button.addEventListener('click', () => {
      activeTab = 'places';
      activeCategory = 'all';
      renderTabs();
      showToast('選擇地點後按編輯，即可指定這一天。');
    }));
  }

  function renderPlaceList(container) {
    const places = getVisiblePlaces().slice().sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));
    container.innerHTML = `
      <div class="list-filters"><select id="listCityFilter" aria-label="依城市篩選"><option value="all">全部城市</option><option value="Busan" ${activeCity === 'Busan' ? 'selected' : ''}>釜山</option><option value="Gyeongju" ${activeCity === 'Gyeongju' ? 'selected' : ''}>慶州</option></select><select id="listCategoryFilter" aria-label="依類別篩選"><option value="all">全部類別</option>${Object.entries(CATEGORIES).map(([key, value]) => `<option value="${key}" ${activeCategory === key ? 'selected' : ''}>${value.label}</option>`).join('')}</select></div>
      <div class="location-list">${places.length ? places.map(place => `<button type="button" class="location-row" data-select-place="${escapeHTML(place.id)}"><i class="place-dot" style="background:${(CATEGORIES[place.category] || CATEGORIES.other).color}"></i><span style="min-width:0;flex:1"><strong>${escapeHTML(place.name)}</strong><small>${escapeHTML(cityName(place.city))} · ${categoryName(place.category)}${place.visited ? ' · 已去過' : ''}</small></span><span class="row-arrow">›</span></button>`).join('') : '<div class="empty-list">找不到符合條件的地點。<br>試試看其他關鍵字或篩選條件。</div>'}</div>`;
    $('#listCityFilter').addEventListener('change', event => { activeCity = event.target.value; updateCityButtons(); renderMarkers(); renderTabs(); });
    $('#listCategoryFilter').addEventListener('change', event => { activeCategory = event.target.value; renderMarkers(); renderTabs(); });
    $$('[data-select-place]', container).forEach(button => button.addEventListener('click', () => selectPlace(button.dataset.selectPlace)));
  }

  function renderNotes(container) {
    container.innerHTML = `
      <div class="notes-area">
        <div><label for="tripNotes">旅程總備忘</label><textarea id="tripNotes" placeholder="航班時間、住宿地址、集合資訊、想買的東西……">${escapeHTML(state.notes)}</textarea></div>
        <div><label>出發前檢查 <span id="checkCount"></span></label><div class="checklist" id="checklist">${state.checklist.map(item => `<label class="check-item ${item.done ? 'done' : ''}"><input type="checkbox" data-check-id="${escapeHTML(item.id)}" ${item.done ? 'checked' : ''}><span>${escapeHTML(item.text)}</span></label>`).join('')}</div></div>
        <div class="add-check-row"><input id="newCheckText" type="text" maxlength="80" placeholder="新增一項待辦…"><button id="addCheckButton" type="button">新增</button></div>
        <p style="margin:0;color:#9aa19c;font-size:9px;line-height:1.6">提醒：清單與備忘會儲存在目前瀏覽器。建議出發前使用右上角「匯出備份」。</p>
      </div>`;
    const updateCount = () => {
      const done = state.checklist.filter(item => item.done).length;
      $('#checkCount').textContent = `（${done}/${state.checklist.length}）`;
    };
    updateCount();
    $('#tripNotes').addEventListener('input', event => { state.notes = event.target.value; saveState(); });
    $$('[data-check-id]', container).forEach(input => input.addEventListener('change', event => {
      const item = state.checklist.find(entry => entry.id === event.target.dataset.checkId);
      if (item) item.done = event.target.checked;
      saveState();
      renderNotes(container);
    }));
    $('#addCheckButton').addEventListener('click', addChecklistItem);
    $('#newCheckText').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); addChecklistItem(); } });
  }

  function addChecklistItem() {
    const input = $('#newCheckText');
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    state.checklist.push({ id: makeId(), text, done: false });
    saveState();
    renderTabs();
  }

  function updateCityButtons() {
    $$('.city-button').forEach(button => button.classList.toggle('active', button.dataset.city === activeCity));
  }

  function setCity(city) {
    activeCity = city;
    updateCityButtons();
    renderMarkers();
    if (activeTab === 'places') renderTabs();
    if (!map) return;
    if (city === 'Busan') map.setView([35.145, 129.105], 11);
    else if (city === 'Gyeongju') map.setView([35.835, 129.222], 12);
    else map.setView([35.47, 129.15], 9.4);
  }

  function exportBackup() {
    const payload = { app: 'roam-notes-busan-gyeongju', version: 1, exportedAt: new Date().toISOString(), trip: { start: '2026-12-04', end: '2026-12-08' }, ...state };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `busan-gyeongju-trip-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('備份檔已下載。');
  }

  function importBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result));
        if (!imported || !Array.isArray(imported.places)) throw new Error('找不到地點資料');
        if (!window.confirm(`備份內有 ${imported.places.length} 個地點。匯入會取代目前這個瀏覽器的資料，確定繼續嗎？`)) return;
        state = {
          places: imported.places.map(place => ({ ...place, id: place.id || makeId() })),
          checklist: Array.isArray(imported.checklist) ? imported.checklist : structuredClone(DEFAULT_CHECKLIST),
          notes: typeof imported.notes === 'string' ? imported.notes : ''
        };
        selectedId = null;
        pendingDraft = null;
        editing = false;
        saveState();
        renderMarkers();
        renderDetail();
        renderTabs();
        showToast('備份匯入完成。');
      } catch (error) {
        showToast(`匯入失敗：${error.message || '檔案格式錯誤'}`);
      } finally {
        $('#importFile').value = '';
      }
    };
    reader.onerror = () => showToast('無法讀取這個檔案。');
    reader.readAsText(file);
  }

  function bindEvents() {
    $$('.city-button').forEach(button => button.addEventListener('click', () => setCity(button.dataset.city)));
    $$('.tab-button').forEach(button => button.addEventListener('click', () => { activeTab = button.dataset.tab; renderTabs(); }));
    $('#addPlaceButton').addEventListener('click', startAddMode);
    $('#exportButton').addEventListener('click', exportBackup);
    $('#importButton').addEventListener('click', () => $('#importFile').click());
    $('#importFile').addEventListener('change', event => importBackup(event.target.files[0]));
    $('#mapSearch').addEventListener('input', event => {
      searchTerm = event.target.value.trim();
      renderMarkers();
      if (activeTab === 'places') renderTabs();
    });
  }

  bindEvents();
  initMap();
  renderDetail();
  renderTabs();
  updateStats();
})();
