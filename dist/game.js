"use strict";

const paths = {
  city:'<path d="M3 21h18M5 21V9h5v12m0 0V3h6v18m0-8h4v8M7 12h1m4-6h2m-2 4h2m-2 4h2"/>',
  map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/>',
  bank:'<path d="m3 8 9-5 9 5v2H3zM5 10v8m5-8v8m4-8v8m5-8v8M3 19h18v2H3z"/>',
  hard:'<path d="M3 17h18v3H3zM5 17v-3a7 7 0 0 1 4-6m6 0a7 7 0 0 1 4 6v3M9 12V5h6v7"/>',
  book:'<path d="M4 4h14a2 2 0 0 1 2 2v14H6a2 2 0 0 1 0-4h14M4 4v14m5-10h7m-7 4h5"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M5 7 8 7l2-4h4l2 4 3 0 2 4-2 3v3l-3 3-4-1-4 1-3-3v-3l-2-3z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
  wallet:'<path d="M20 8H5a2 2 0 1 1 0-4h13v4M3 6v12a2 2 0 0 0 2 2h16V8m-6 4h6v4h-6z"/>',
  chart:'<path d="M4 4v16h16M7 14l4-5 4 3 5-7"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  layers:'<path d="m3 8 9-5 9 5-9 5zm0 4 9 5 9-5M3 16l9 5 9-5"/>',
  flag:'<path d="M5 21V3m0 1c6-4 8 4 14 0v11c-6 4-8-4-14 0"/>',
  chat:'<path d="M4 4h16v12H9l-5 4zM8 9h8m-8 3h5"/>',
  cross:'<path d="m6 6 12 12M18 6 6 18"/>'
};
const ic = name => '<i data-icon="' + name + '"></i>';
function icons(root = document) {
  root.querySelectorAll('[data-icon]:empty').forEach(el => {
    el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[el.dataset.icon] ?? paths.city) + '</svg>';
  });
}

const districts = [
  {type:'아파트', name:'솔빛동', place:'청운천 아파트', price:30000, noi:950, pos:[24,26], icon:'city', desc:'학교와 청운천 산책로가 가까운 주거지입니다. 신규 입주 물량이 임대료를 바꿉니다.', npc:'윤가람', role:'세무사', talk:'잔금일이 6월 1일의 어느 쪽에 있는지 보세요. 주택을 한 채 더 사면 보유세 공제도 달라질 수 있어요.'},
  {type:'토지', name:'북문 들녘', place:'북문역 예정지', price:20000, noi:0, pos:[74,21], icon:'layers', desc:'북문역 후보지와 연결되는 나대지입니다. 용도와 노선이 확정되면 개발성이 달라집니다.', npc:'이도현', role:'도시계획관', talk:'역 노선은 아직 후보가 두 곳입니다. 예정지라는 말만 믿고 사면 이자만 내며 기다려야 할 수도 있어요.'},
  {type:'오피스', name:'중앙로', place:'중앙로 오피스 빌딩', price:80000, noi:4000, pos:[55,48], icon:'city', desc:'시청과 업무지구를 잇는 중심가입니다. 임대율과 금리에 민감한 오피스가 밀집해 있습니다.', npc:'한소라', role:'공인중개사', talk:'옆 건물은 더 싸게 팔렸어요. 그쪽은 2층이 반년째 비어 있었거든요. 가격을 비교할 때 먼저 공실을 확인하세요.'},
  {type:'공장', name:'서강산단', place:'서강 3동 조립공장', price:40000, noi:2600, pos:[23,72], icon:'hard', desc:'물류망과 전력 공급이 좋은 산업단지입니다. 시설 수선비와 장기 임차인을 함께 살펴보세요.', npc:'배정호', role:'공장장', talk:'전력은 넉넉하지만 비가 오면 3동 안쪽 벽부터 젖습니다. 수선 견적은 900만 원이에요. 빈 상태로 버티는 비용도 계산해 보세요.'}
];
const pages = {map:['도시 지도','도시를 둘러보고, 변화의 첫 단서를 찾으세요.'],market:['부동산 시장','매입가와 임대수익, 세후 회수액을 비교하세요.'],bank:['청운은행','대출 금리와 분기 이자를 확인하고 유동성을 관리하세요.'],pf:['프로젝트 PF','부지 매입부터 준공까지 사업 계좌를 운영하세요.'],ledger:['투자 장부','현금흐름과 투자 결정의 결과를 확인하세요.']};
const eventDefs = {
  rail:{title:'청운역의 두 번째 출구', detail:'북문과 동문이 최종 후보입니다. 북문 필지의 매수선택권 가격은 1,000만 원입니다. 북문이 확정되면 시세보다 낮은 가격에 살 수 있습니다.', action:'선택권 매입 · 1,000만원'},
  auction:{title:'냉동창고 법원 경매', detail:'감정가는 4억 원입니다. 2억 8,000만 원에 입찰할 수 있습니다. 낙찰 후 냉동기 수선비와 공실 위험을 부담합니다.', action:'2억 8,000만원에 입찰'},
  anchor:{title:'앵커기업 본사 이전', detail:'오피스 한 채에 내부공사비 1,200만 원을 선투입합니다. 이사회가 이전을 승인하면 임대료가 올라갑니다.', action:'내부공사 승인 · 1,200만원'}
};
const defaultRates = {base:3, baseDate:'2026-10-22', fx:1332.33, fxDate:'2026-11-18', online:false};
let quotes = {...defaultRates};

function makeAssets(batch) {
  return districts.flatMap((d, district) => Array.from({length:batch === 0 ? 2 : 1}, (_, index) => {
    const factor = batch === 0 ? (index ? .82 : 1) : 1 + Math.sin(batch * 7 + district) * .17;
    return {id: batch + '-' + district + '-' + index, district, name:index ? d.name + ' 소형 ' + d.type : d.place + (batch ? ' ' + (batch + 1) + '호' : ''), value:Math.round(d.price * factor), noi:Math.round(d.noi * factor), occupancy:index ? .7 : .86, improvements:0, held:null};
  }));
}
function newGame(total = 20) {
  return {total, q:1, cash:50000, deposit:0, assets:makeAssets(0), project:null, policy:null, vote:null, event:null, rail:null, taxYears:{}, propertyTax:0, profits:{rent:0, interest:0, tax:0, project:0}, logs:[{q:1,note:'청운시 투자 시작',delta:50000}], rates:{...quotes}, ended:false};
}
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem('cheongun-game-v1'));
    return saved?.assets && saved?.rates ? saved : newGame();
  } catch { return newGame(); }
}
let game = restore();
let page = 'map', district = 2, filter = '전체', zoom = 1, position = [52,57], toastTimer, activeAsset;
const $ = selector => document.querySelector(selector);
const money = n => {
  const value = Math.round(n);
  const abs = Math.abs(value);
  const eok = Math.floor(abs / 10000), rest = abs % 10000;
  return (value < 0 ? '−' : '') + (eok ? eok + '억' + (rest ? ' ' : '') : '') + (rest || !eok ? rest.toLocaleString('ko-KR') + '만원' : '원');
};
const yearAt = q => Math.ceil(q / 4);
const quarterAt = q => (q - 1) % 4 + 1;
const metric = (name, value) => '<div class="metric"><span>' + name + '</span><b>' + value + '</b></div>';
const btn = (label, action, kind = 'outline', extra = '') => '<button class="' + kind + '" data-action="' + action + '" ' + extra + '>' + label + '</button>';
const held = () => game.assets.filter(a => a.held);
const debt = () => held().reduce((sum, a) => sum + a.held.loan, 0);
const simRate = () => game.rates.base + Math.sin((game.q - 1) * .48) * .65;
const yieldRate = a => a.held?.fixed ?? simRate() + 2;
const buyTax = (a, price = a.value) => a.district ? price * .04 : price * (price <= 60000 ? .01 : price >= 90000 ? .03 : (price / 1500000 - .03));
const sellPrice = a => Math.round(a.value * .97);
const brackets = [[1400,.06],[5000,.15],[8800,.24],[15000,.35],[30000,.38],[50000,.40],[100000,.42],[Infinity,.45]];
function progressive(amount, bands) {
  let low = 0, tax = 0;
  for (const [high, rate] of bands) {
    tax += Math.max(0, Math.min(amount, high) - low) * rate;
    if (amount <= high) break;
    low = high;
  }
  return tax;
}
function gain(a) {
  const quarters = game.q - a.held.at;
  const net = sellPrice(a) * .995 - a.held.cost - a.improvements;
  return Math.round(net > 0 && quarters >= 12 ? net * (1 - Math.min(.30, Math.floor(quarters / 4) * .02)) : net);
}
function saleTax(a, used = game.taxYears[yearAt(game.q)] ?? 0) {
  const quarters = game.q - a.held.at;
  const base = Math.max(0, gain(a) - Math.max(0, 250 - used));
  const shortRate = a.district === 0 ? (quarters < 4 ? .70 : .60) : (quarters < 4 ? .50 : .40);
  const landTax = a.district === 1 ? base * .10 : 0;
  const ordinary = progressive(base, brackets) + landTax;
  return Math.round((quarters < 8 ? Math.max(base * shortRate, ordinary) : ordinary) * 1.1);
}
function annualTaxes() {
  const owned = held();
  const house = owned.filter(a => a.district === 0);
  const sum = list => list.reduce((v,a) => v+a.value*.72,0);
  const property = Math.round(owned.reduce((v,a) => v+a.value*.72*.6*(a.district===0?.002:.0025),0));
  const housing = progressive(Math.max(0,sum(house)-(house.length===1?120000:90000))*.6, [[30000,.005],[60000,.007],[120000,.01],[250000,house.length>=3?.02:.013],[500000,house.length>=3?.03:.015],[940000,house.length>=3?.04:.02],[Infinity,house.length>=3?.05:.027]]);
  const land = progressive(Math.max(0,sum(owned.filter(a=>a.district===1))-50000), [[150000,.01],[450000,.02],[Infinity,.03]]);
  const attached = progressive(Math.max(0,sum(owned.filter(a=>a.district>1))*.55-800000), [[2000000,.005],[4000000,.006],[Infinity,.007]]);
  return {property, comprehensive:Math.round(housing+land+attached)};
}
function projectValue() {
  const p = game.project;
  return !p ? 0 : Math.max(0, (p.progress >= 3 ? projectPrice() * .97 : p.spent * .80) - p.drawn - p.interest);
}
function liquidation() {
  let allowance = game.taxYears[yearAt(game.q)] ?? 0;
  const amount = held().reduce((sum, a) => {
    const tax = saleTax(a, allowance);
    allowance += Math.max(0,gain(a));
    return sum + sellPrice(a)*.995 - a.held.loan - tax;
  }, 0);
  return Math.round(game.cash + game.deposit + amount + projectValue() + (game.project?.equity ?? 0) - game.propertyTax);
}
function record(note, delta = 0) {
  game.cash += delta;
  game.logs.push({q:game.q,note,delta});
}
function save() { try { localStorage.setItem('cheongun-game-v1', JSON.stringify(game)); } catch {} }
function notify(message) {
  $('#toast').textContent = message;
  $('#toast').style.display = 'block';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').style.display = 'none', 3400);
}
function modal(title, html) {
  const el = $('#dialog');
  $('#dialog-body').innerHTML = '<div class="panel-head"><h2>' + title + '</h2>' + btn(ic('cross'), 'close', 'outline', 'aria-label="닫기"') + '</div><div class="dialog-content">' + html + '</div>';
  icons(el);
  if (!el.open) el.showModal();
}
function close() { if ($('#dialog').open) $('#dialog').close(); }
function updateTicker() {
  $('#ticker').innerHTML = '<span>기준금리 <b>' + quotes.base.toFixed(2) + '%</b></span><span>USD/KRW <b>' + quotes.fx.toLocaleString('ko-KR',{minimumFractionDigits:2}) + '</b></span>' + btn(quotes.online ? '일별 고시' : '기준값', 'macro', 'ticker-link');
}
function showStats() {
  const items = [['clock','진행 분기',yearAt(game.q)+'년차 '+quarterAt(game.q)+'분기'],['wallet','보유 현금',money(game.cash)],['chart','세후 청산가치',money(liquidation())],['bank','담보 대출',money(debt())]];
  $('#stats').innerHTML = items.map(([icon,label,value])=>'<div class="stat">'+ic(icon)+'<div><small>'+label+'</small><b>'+value+'</b></div></div>').join('');
  $('#mode').innerHTML = ic('clock') + game.total + '분기 모드';
}
function cardAsset(a) {
  const d = districts[a.district];
  return '<article class="panel card"><span class="pill">'+d.type+(a.held?' · 보유 중':'')+'</span><h3>'+a.name+'</h3>'+metric('평가가',money(a.value))+metric('예상 연 순영업소득',money(a.noi*a.occupancy))+'<div class="row">'+btn(a.held?'보유자산 관리':'매물 상세','asset','outline','data-id="'+a.id+'"')+'</div></article>';
}
function eventCard() {
  if (game.vote && !game.vote.done) return '<section class="panel event notice"><span class="pill">청운시장 선거</span><h3>청운시의 다음 임기</h3><p>두 후보의 공약을 비교하고 투표하세요.</p>'+btn('공약 보기 · 투표','vote')+'</section>';
  if (game.event) {
    const e = eventDefs[game.event];
    return '<section class="panel event notice"><span class="pill">이번 분기 기회</span><h3>'+e.title+'</h3><p>'+e.detail.split('. ')[0]+'.</p>'+btn('기회 살펴보기','event')+'</section>';
  }
  return '<section class="panel event notice"><span class="pill">청운시 소식</span><h3>'+ (game.policy ? game.policy===1 ? '서강산단 도로 예산 통과' : '솔빛동 공공주택 계획 승인' : '시장 선거를 앞둔 청운시') +'</h3><p>'+ (game.policy ? '예산 집행에 따라 인근 수요와 공급이 달라집니다.' : '8분기에 첫 선거가 열립니다. 공약에 따라 교통과 공급 계획이 바뀝니다.') +'</p>'+btn('공약 보기','vote')+'</section>';
}
function renderMap() {
  const d = districts[district];
  const assets = game.assets.filter(a => a.district===district && !a.held).slice(0,2);
  return '<div class="board"><section class="panel"><div class="panel-head"><h2>'+ic('map')+' 청운시 지도</h2><small>4개 구역</small></div><div class="map" id="city-map" tabindex="0" aria-label="청운시 지도. 방향키로 이동할 수 있습니다"><div class="map-image" style="transform:scale('+zoom+')"></div><div class="map-layer" style="transform:scale('+zoom+')">'+districts.map((area,i)=>'<button class="marker '+(i===district?'active':'')+'" style="left:'+area.pos[0]+'%;top:'+area.pos[1]+'%" data-action="district" data-i="'+i+'">'+ic(area.icon)+area.name+'</button>').join('')+'<span class="avatar" style="left:'+position[0]+'%;top:'+position[1]+'%"></span></div><div class="map-tools">'+btn('+','zoom-in','', 'aria-label="확대"')+btn('−','zoom-out','', 'aria-label="축소"')+btn('◎','zoom-reset','', 'aria-label="지도 초기화"')+'</div><div class="map-hint">구역 클릭 · 방향키 이동</div></div><div class="map-bottom"><small class="muted">분기 '+game.q+' / '+game.total+'</small>'+btn(game.ended?'최종 결산 보기':game.total===40?'최대 2분기 진행':'다음 분기 진행','advance','primary')+'</div></section><div class="side"><section class="panel"><div class="panel-head"><h2>'+ic('pin')+' 현재 구역</h2></div><div class="location"><span class="pill">'+d.type+'</span><h3>'+d.name+'</h3><p>'+d.desc+'</p>'+assets.map(a=>'<div class="listing"><button data-action="asset" data-id="'+a.id+'"><span>'+a.name+'</span><b class="gold">'+money(a.value)+'</b></button></div>').join('')+'<div class="npc"><button data-action="npc"><span class="portrait">'+d.npc[0]+'</span><span><b>'+d.npc+'</b><small>'+d.role+' · 대화하기</small></span></button></div></div></section>'+eventCard()+'</div></div><section class="panel news below"><b>'+ic('book')+' 투자 속보</b><span>'+game.logs.at(-1).note+'</span></section>';
}
function projectPrice() { return Math.round(120000 * (1 + (game.policy===1?.07:0) + Math.sin(game.q*.8)*.035 - (simRate()-3)*.025)); }
function render() {
  const [title, subtitle] = pages[page];
  $('#title').textContent = page==='map'?'청운시 개발일지':title;
  $('#crumb').textContent = title;
  $('#subtitle').textContent = subtitle;
  document.querySelectorAll('[data-view]').forEach(el => el.classList.toggle('active',el.dataset.view===page));
  showStats(); updateTicker();
  $('#view').innerHTML = ({
    map:renderMap,
    market:()=>'<div class="row filters">'+['전체','토지','공장','오피스','아파트','보유 중'].map(name=>btn(name,'filter','chip '+(filter===name?'active':''),'data-filter="'+name+'"')).join('')+'</div><div class="grid">'+game.assets.filter(a => filter==='전체'||(filter==='보유 중'?a.held:districts[a.district].type===filter)).map(cardAsset).join('')+'</div>',
    bank:()=>'<div class="grid"><section class="panel card"><h3>청운은행 금융 창구</h3><p class="muted">문해진 심사역 · 대출을 받기 전 한 분기 공실을 버틸 수 있는지 확인하세요.</p>'+metric('신규 변동금리',(simRate()+2).toFixed(2)+'%')+metric('신규 고정금리',(simRate()+2.6).toFixed(2)+'%')+metric('예금 잔액',money(game.deposit))+'<div class="row">'+btn('1,000만원 예금','deposit','outline',game.ended||game.cash<1000?'disabled':'')+btn('예금 전액 해지','withdraw','outline',game.ended||!game.deposit?'disabled':'')+'</div></section>'+held().filter(a=>a.held.loan).map(a=>'<article class="panel card"><h3>'+a.name+'</h3>'+metric('남은 원금',money(a.held.loan))+metric('분기 이자',money(a.held.loan*yieldRate(a)/400))+metric('만기',a.held.due+'분기')+'<div class="row">'+btn('일부 상환','repay','outline','data-id="'+a.id+'" '+(game.ended?'disabled':''))+btn('고정금리로 대환','refinance','outline','data-id="'+a.id+'" '+(game.ended?'disabled':''))+'</div></article>').join('')+'</div>',
    pf:()=>{ const p=game.project; return '<div class="grid"><section class="panel card"><span class="pill">서강산단 · 개발 사업</span><h3>서강 냉장물류센터</h3><p class="muted">사전 임대계약을 확보해 공정별 대출을 집행합니다. 수입 설비는 발주 시점 환율로 계산합니다.</p>'+metric('기준 총사업비','10억원')+metric('자기자본','3억원')+metric('선순위 대출 한도','7억원')+metric('현재 예상 통매각가',money(projectPrice()))+(p?metric('공정',p.progress+'/3단계')+metric('집행 사업비',money(p.spent))+metric('PF 원금 / 누적 이자',money(p.drawn)+' / '+money(p.interest))+metric('추가출자 필요액',money(p.gap??0)):'')+'<div class="row">'+(!p?btn('사업 심사 신청','pf-open','primary',game.ended?'disabled':''):p.gap?btn('추가출자','pf-topup','primary',game.ended?'disabled':'')+btn('사업 정리','pf-cancel','outline',game.ended?'disabled':''):p.progress>=3?btn('준공 자산 매각','pf-exit','primary',game.ended?'disabled':''):btn('수입 설비 선발주','pf-lock','outline',game.ended||p.fx?'disabled':''))+'</div></section></div>';},
    ledger:()=>'<section class="panel"><div class="panel-head"><h2>분기별 거래 기록</h2>'+btn('결산 미리보기','settle')+'</div><div class="pad">'+[...game.logs].reverse().map(l=>'<div class="log-row"><span><b>'+l.q+'분기</b> · '+l.note+'</span><b class="'+(l.delta<0?'negative':'mint')+'">'+(l.delta?money(l.delta):'')+'</b></div>').join('')+'</div></section>'
  })[page]();
  icons(); save();
}
function assetDialog(a) {
  activeAsset = a;
  const d = districts[a.district];
  const information = metric('자산 유형',d.type)+metric('시장 평가가',money(a.value))+metric('모의 공시가격',money(a.value*.72))+metric('임대율',Math.round(a.occupancy*100)+'%')+metric('예상 분기 순영업소득',money(a.noi*a.occupancy/4));
  const actions = game.ended ? '' : !a.held ? btn('구매 조건 확인','purchase','primary') : btn('임대 운영 개선','upgrade')+btn('매각 조건 확인','sale','primary');
  modal(a.name,'<p class="muted">'+d.desc+'</p>'+information+(a.held?metric('취득가',money(a.held.cost))+metric('대출 잔액',money(a.held.loan)):'')+'<div class="row">'+actions+'</div>');
}
function loanLimit(a) {
  const ltv = a.district===1?.40:.60;
  const dscr = a.district===1?Infinity:a.noi*a.occupancy / ((simRate()+2.6)/100*1.2);
  return Math.min(Math.floor(a.value*ltv/100)*100, Math.floor(dscr/100)*100);
}
function buyPreview() {
  const a = activeAsset, form = $('#loan-kind');
  const kind = form.value, loan = kind==='cash'?0:loanLimit(a);
  const rate = simRate()+(kind==='fixed'?2.6:2);
  const tax = buyTax(a), fee = Math.round(a.value*.005), total = Math.round(a.value+tax+fee-loan);
  const reserve = a.district===1?loan*rate/200:0;
  $('#buy-preview').innerHTML = metric('대출 원금',money(loan))+metric('취득세 본세',money(tax))+metric('거래비',money(fee))+metric('예상 분기 이자',money(loan*rate/400))+metric('필요 현금',money(total+reserve))+metric('거래 후 현금',money(game.cash-total));
  $('#confirm-buy').disabled = total+reserve > game.cash || a.held || game.ended;
  return {loan,rate,total,kind};
}
function buyDialog() {
  modal('매수 조건 확인','<p>'+activeAsset.name+'</p><label for="loan-kind">자금 조달 방식</label><select id="loan-kind"><option value="cash">전액 현금</option><option value="fixed">고정금리 대출</option><option value="variable">변동금리 대출</option></select><div class="line"></div><div id="buy-preview"></div><div class="row">'+btn('매수 계약 체결','buy','primary','id="confirm-buy"')+'</div>');
  $('#loan-kind').addEventListener('change',buyPreview);
  buyPreview();
}
function executeSale(a, forced = false) {
  const price = sellPrice(a), tax = saleTax(a), year = yearAt(game.q);
  game.taxYears[year] = (game.taxYears[year]??0) + Math.max(0,gain(a));
  game.profits.tax += tax;
  record(a.name + (forced?' 담보 처분':' 매각'), Math.round(price*.995-a.held.loan-tax));
  a.held = null;
  a.improvements = 0;
}
function elections() {
  if ((game.q-8)%16===0 && game.q>=8) game.vote = {q:game.q,done:false};
  const schedule = {3:'rail',6:'auction',11:'anchor',16:'auction',23:'rail',29:'auction',35:'anchor'};
  const allowed = game.total===12?[3,6]:game.total===20?[3,6,11]:[3,6,11,23,35];
  game.event = allowed.includes(game.q)?schedule[game.q]:null;
}
function concludeVote() {
  if (!game.vote || game.vote.done) return;
  const result = game.vote.ballot ?? (game.vote.q===24?2:1);
  game.vote.done = true;
  game.policy = result;
  record(result===1?'개표 결과 · 서강산단 진입도로 공약 당선':'개표 결과 · 솔빛동 공공주택 공약 당선');
}
function settleQuarter() {
  game.rates = {...quotes};
  concludeVote();
  if (quarterAt(game.q)===2) {
    const tax = annualTaxes();
    game.propertyTax = tax.comprehensive;
    game.profits.tax += tax.property;
    if (tax.property) record('6월 1일 보유분 재산세',-tax.property);
    if (tax.comprehensive) record('6월 1일 종합부동산세 산정 · 4분기에 납부');
  }
  if (quarterAt(game.q)===4 && game.propertyTax) {
    game.profits.tax += game.propertyTax;
    record('종합부동산세 납부',-game.propertyTax);
    game.propertyTax = 0;
  }
  for (const a of held()) {
    const income = Math.round(a.noi * a.occupancy / 4), loan = a.held.loan;
    const interest = Math.round(loan * yieldRate(a) / 400);
    if (income) { game.profits.rent += income; record(a.name+' 임대 순수입',income); }
    if (interest) { game.profits.interest += interest; record(a.name+' 차입 이자',-interest); }
    if (loan && a.held.due===game.q) {
      if (game.cash < loan) executeSale(a,true);
      else { record(a.name+' 만기 원금 상환',-loan); a.held.loan = 0; }
    }
  }
  if (game.deposit) record('예금 이자',Math.round(game.deposit*Math.max(0,simRate()-.5)/400));
  const p = game.project;
  if (p) {
    if (p.progress<3 && !p.gap) {
      const stages = [45000,30000,25000];
      const fx = p.fx || game.rates.fx;
      const cost = Math.round(stages[p.progress] + (p.progress===2?(fx-defaultRates.fx)*10:0));
      const draw = Math.max(0,cost-p.equity);
      if (draw + p.drawn>70000) {
        p.gap = draw + p.drawn - 70000;
        p.fx = fx;
        record('냉장물류센터 공사비 초과 · 추가출자 검토');
      } else {
        p.drawn += draw;
        p.equity = Math.max(0,p.equity-cost);
        p.spent += cost;
        p.progress++;
        record('냉장물류센터 '+p.progress+'단계 '+(p.progress===3?'준공':'검수 완료'));
      }
    }
    p.interest += Math.round(p.drawn*(simRate()+3)/400);
  }
  if (game.rail && game.rail.due===game.q) {
    const won = game.q===5;
    if (won) {
      const site = game.assets.find(a=>a.id==='0-1-0');
      if (site) site.value = Math.round(site.value*1.25);
      record('북문역 출구 확정 · 북문 일대 평가가 상승');
    } else record('동문역 출구 확정 · 북문 선택권 소멸');
    if (won && game.rail.bought) record('매수선택권 차익 정산',5500);
    game.rail = null;
  }
  for (const a of game.assets) {
    const d = districts[a.district];
    const demand = Math.sin(game.q*.51 + a.district)*.035;
    const policy = game.vote && game.q >= game.vote.q+2 ? (game.policy===1 && a.district===3?.07:game.policy===2 && a.district===0?-.05:0):0;
    a.occupancy = Math.max(.5,Math.min(.99,a.occupancy+demand*.3+policy*.15));
    const isCommercial = a.district>=2;
    const capRate = Math.max(.035, (simRate()+(a.district===2?2:3))/100);
    const valuation = isCommercial
      ? a.noi*a.occupancy/capRate
      : a.value*(1 + demand + policy - (simRate()-3)*.016);
    a.value = Math.max(d.price*.4,Math.round(a.value + (valuation-a.value)*.35));
  }
  if (game.cash < 0 && game.deposit) { record('유동성 부족 · 예금 자동 해지',game.deposit); game.deposit = 0; }
  while (game.cash < 0 && held().length) executeSale(held().sort((a,b)=>a.value-b.value)[0],true);
  if (game.cash < 0 || game.q===game.total) { game.ended=true; return; }
  game.q++;
  if (quarterAt(game.q)===1) {
    game.assets.push(...makeAssets(yearAt(game.q)-1));
    record(yearAt(game.q)+'년차 · 신규 매물 4건 등록');
  } else record(game.q+'분기 · 시장 평가 업데이트');
  elections();
  if (game.event==='rail') game.rail={due:game.q+2,bought:false};
}
function showVote() {
  const open = game.vote && !game.vote.done;
  modal('청운시장 선거','<p class="muted">8·24·40분기에 해당하는 임기에 개표합니다. 당선 공약은 시행 시점 이후 수요와 공급에 영향을 줍니다.</p>'+metric('후보 김서진','산단 진입도로와 전력 증설')+metric('후보 박지우','솔빛동 공공주택과 환승버스')+(open?'<div class="row">'+btn('김서진에게 투표','cast','outline','data-i="1"')+btn('박지우에게 투표','cast','outline','data-i="2"')+btn('기권하기','abstain')+'</div>':''));
}
function finish() {
  const net = liquidation(), pct = (net/50000-1)*100;
  modal(game.ended?'최종 결산':'세후 청산가치 미리보기','<p class="gold" style="font-size:32px;font-weight:800">'+money(net)+'</p>'+metric('시작 자금 대비',pct.toFixed(1)+'%')+metric('누적 임대 순수입',money(game.profits.rent))+metric('누적 이자',money(game.profits.interest))+metric('납부한 세금',money(game.profits.tax))+metric('PF 회수 손익',money(game.profits.project))+'<div class="line"></div><p class="muted">가장 큰 의사결정을 투자 장부에서 골라 보세요. 어떤 가격 요인, 금융비용, 세금이 결과를 바꿨나요?</p><div class="row">'+btn('투자 장부 열기','open-ledger')+(game.ended?btn('다시 시작','setup','primary'):'')+'</div>');
}
function executeEvent() {
  const kind = game.event;
  if (kind==='rail' && game.cash>=1000) { game.rail.bought = true; record('북문 필지 매수선택권 매입',-1000); }
  else if (kind==='auction' && game.cash>=28000) {
    const a = {id:'auction-'+game.q,district:3,name:'경매 냉동창고',value:39000,noi:2900,occupancy:.35,improvements:0,held:{at:game.q,cost:28000,loan:0}};
    game.assets.push(a); record('냉동창고 낙찰 · 수선 및 임차인 유치 필요',-28000);
  } else if (kind==='anchor' && game.cash>=1200 && held().some(a=>a.district===2)) {
    const a = held().find(a=>a.district===2);
    record('본사 이전 조건부 내부공사',-1200);
    a.improvements += 1200;
    if (game.q===11) { a.noi *= 1.3; a.occupancy = .98; record('앵커기업 입주 계약 체결'); }
    else record('이사회 보류 · 본사 이전 무산');
  } else { notify('현금 또는 보유 조건이 부족합니다.'); return; }
  game.event=null; close(); render();
}
function changeView(next) { page=next; close(); render(); }
document.addEventListener('click', e => {
  const el = e.target.closest('button');
  if (!el) return;
  if (el.dataset.view) { changeView(el.dataset.view); return; }
  const action = el.dataset.action;
  const a = el.dataset.id ? game.assets.find(item=>item.id===el.dataset.id) : activeAsset;
  switch(action) {
  case 'close': close(); return;
  case 'setup':
    modal('플레이 기간 선택','<p class="muted">한 판 약 20분 · 새 게임을 시작하면 현재 진행 기록을 교체합니다.</p><div class="mode-grid">'+[[12,'3년 · 입문'],[20,'5년 · 표준'],[40,'10년 · 장기']].map(([n,label])=>btn('<b>'+n+'분기</b><span>'+label+'</span>','start','outline','data-i="'+n+'"')).join('')+'</div>'); return;
  case 'start': game=newGame(Number(el.dataset.i)); district=2; position=[52,57]; zoom=1; changeView('map'); notify('청운시에서의 첫 분기가 시작됩니다.'); return;
  case 'macro': modal('거시경제 데이터',metric('기준금리 공표일',quotes.baseDate)+metric('원/달러 일별 고시일',quotes.fxDate)+metric('환율 상태',quotes.online?'일별 공개 데이터 연결':'저장된 일별 기준값')+'<p class="muted">장중 시세 연결은 공급 계약이 필요합니다. 시나리오 금리 조정과 당일 공개 환율은 분기 정산과 신규 계약에 반영합니다.</p><p><a class="mint" href="https://www.bok.or.kr/portal/singl/baseRate/list.do?menuNo=200761" target="_blank" rel="noopener">한국은행 기준금리 추이</a> · <a class="mint" href="https://frankfurter.dev/" target="_blank" rel="noopener">공개 일별 환율 API</a></p>'); return;
  case 'district': district=Number(el.dataset.i); position=[districts[district].pos[0],districts[district].pos[1]+8]; break;
  case 'zoom-in': zoom=Math.min(1.4,zoom+.2); break;
  case 'zoom-out': zoom=Math.max(1,zoom-.2); break;
  case 'zoom-reset': zoom=1; break;
  case 'filter': filter=el.dataset.filter; break;
  case 'asset': assetDialog(a); return;
  case 'npc': { const d=districts[district]; modal(d.npc+' · '+d.role,'<p>“'+d.talk+'”</p><div class="row">'+btn(d.type+' 매물 비교','npc-market','primary')+btn('대화 닫기','close')+'</div>'); return; }
  case 'npc-market': filter=districts[district].type; changeView('market'); return;
  case 'purchase': buyDialog(); return;
  case 'buy': {
    const {loan,rate,total,kind}=buyPreview();
    if ($('#confirm-buy').disabled) return;
    a.held={at:game.q,cost:Math.round(a.value+buyTax(a)+a.value*.005),loan,fixed:kind==='fixed'?rate:null,due:game.q+12};
    game.profits.tax+=Math.round(buyTax(a)); record(a.name+' 매입 계약',-total); close(); notify('매입 계약을 체결했습니다.'); break;
  }
  case 'upgrade':
    if (game.ended || !a.held) return;
    if (game.cash<900 || a.occupancy>=.99 || !a.noi) {notify('운영 개선에 필요한 현금이나 개선 여지가 부족합니다.');return;}
    a.occupancy=Math.min(.99,a.occupancy+.18); a.improvements+=900; record(a.name+' 설비 개선 및 임차인 유치',-900); close(); break;
  case 'sale': modal('매각 조건 확인',metric('매수자 제시가',money(sellPrice(a)))+metric('양도세 및 지방소득세',money(saleTax(a)))+metric('대출 상환액',money(a.held.loan))+metric('세후 실수령액',money(sellPrice(a)*.995-saleTax(a)-a.held.loan))+'<div class="row">'+btn('매각 확정','sell','primary')+'</div>'); return;
  case 'sell': if (game.ended || !a.held) return; executeSale(a); close(); break;
  case 'deposit': if (game.ended || game.cash<1000) return; game.deposit+=1000; record('청운은행 정기예금',-1000); break;
  case 'withdraw': if (game.ended) return; record('청운은행 예금 해지',game.deposit); game.deposit=0; break;
  case 'repay': { const amount=Math.min(a.held.loan,5000,game.cash); if(game.ended||amount<=0) return; a.held.loan-=amount;record(a.name+' 원금 일부 상환',-amount); break; }
  case 'refinance': if(game.ended||game.cash<150)return; a.held.fixed=simRate()+2.6; a.held.due=game.q+12;record(a.name+' 고정금리 대환 수수료',-150);break;
  case 'pf-open': modal('냉장물류센터 금융 심사','<p class="muted">기준 총사업비 10억 원 중 3억 원을 출자합니다. 임대료를 할인해 사전임대율 50%를 확보하면 대출이 승인됩니다.</p><div class="row">'+btn('사전임대 계약 및 3억원 출자','pf-start','primary',game.cash<30000?'disabled':'')+'</div>');return;
  case 'pf-start': if(game.ended||game.project||game.cash<30000)return; game.project={progress:0,spent:0,drawn:0,interest:0,equity:30000,commitment:30000,fx:null,gap:0};record('서강 냉장물류센터 자기자본 출자',-30000);close();break;
  case 'pf-lock': if(game.ended||!game.project)return;game.project.fx=quotes.fx;record('수입 설비 원화 발주 금액 확정');break;
  case 'pf-topup': { const p=game.project;if(!p||game.ended||game.cash<p.gap){notify('추가출자에 필요한 현금이 부족합니다.');return;}p.equity+=p.gap;p.commitment+=p.gap;record('냉장물류센터 추가출자',-p.gap);p.gap=0;break; }
  case 'pf-exit':
  case 'pf-cancel': {
    const p=game.project;if(!p||game.ended)return;
    const returned=projectValue()+p.equity;game.profits.project+=returned-p.commitment;record('서강 냉장물류센터 사업 정산',returned);game.project=null;break;
  }
  case 'vote': showVote(); return;
  case 'abstain': concludeVote(); close(); break;
  case 'cast': if(!game.vote||game.vote.done||game.ended)return;game.vote.ballot=Number(el.dataset.i);concludeVote();close();break;
  case 'event': {
    const event=eventDefs[game.event];if(!event)return;
    modal(event.title,'<p>'+event.detail+'</p><div class="row">'+btn(event.action,'event-accept','primary')+btn('이번 기회 건너뛰기','event-skip')+'</div>');return;
  }
  case 'event-accept': if(!game.ended)executeEvent();return;
  case 'event-skip': game.event=null;close();break;
  case 'advance': {
    if(game.ended){finish();return;}
    const stop = game.vote && !game.vote.done && !game.vote.ballot;
    if(stop){showVote();return;}
    settleQuarter();
    if(game.total===40&&!game.ended&&!game.event&&!game.project?.gap&&!(game.vote&&!game.vote.done)&&!held().some(item=>item.held.due===game.q))settleQuarter();
    render();
    if(game.ended)finish();else if(game.vote&&!game.vote.done)showVote();else if(game.event)notify('새로운 투자 기회가 열렸습니다.');
    return;
  }
  case 'settle': finish(); return;
  case 'open-ledger': changeView('ledger'); return;
  default: return;
  }
  render();
});
document.addEventListener('keydown', e => {
  if (page!=='map' || !e.target.closest?.('#city-map') || $('#dialog').open) return;
  const move = {ArrowLeft:[-3,0],ArrowRight:[3,0],ArrowUp:[0,-3],ArrowDown:[0,3]}[e.key];
  if (!move) return;
  e.preventDefault();
  position=position.map((n,i)=>Math.max(4,Math.min(95,n+move[i])));
  const nearest = districts.map(d=>Math.hypot(d.pos[0]-position[0],d.pos[1]-position[1]));
  district=nearest.indexOf(Math.min(...nearest));
  render(); $('#city-map').focus({preventScroll:true});
});
async function refreshQuotes() {
  try {
    const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD&symbols=KRW',{signal:AbortSignal.timeout(7000)});
    if(!response.ok)return;
    const data = await response.json();
    if(Number.isFinite(data.rates?.KRW)&&data.date>=quotes.fxDate) {
      quotes={...quotes,fx:data.rates.KRW,fxDate:data.date,online:true};
      if(game.q===1)game.rates={...quotes};
      updateTicker();
    }
  } catch {}
}
render();
refreshQuotes();
setInterval(refreshQuotes,60000);
