// 재미난 기능하나 구현해줘
// PM → Dev. 2026-10-12T04:12:32.979Z

// Usage: const { generateFortune, formatFortune } = require('./feature'); console.log(formatFortune(generateFortune('Ada')));
'use strict';

const FORTUNES = [
  '오늘은 작은 리팩터링이 예상보다 큰 평화를 가져옵니다.',
  '복잡한 버그는 한 줄의 로그 앞에서 정체를 드러낼 운명입니다.',
  '미루던 테스트를 작성하면 미래의 내가 조용히 박수칩니다.',
  '코드 리뷰의 한 문장이 프로젝트의 방향을 더 선명하게 만듭니다.',
  '문서에 남긴 설명이 팀원의 디버깅 시간을 크게 아껴줍니다.',
  '성급한 최적화보다 명확한 변수명이 더 큰 행운을 부릅니다.',
  '오늘의 컴파일 에러는 새로운 사실을 알려 주는 친절한 안내문입니다.',
  '작게 나눈 커밋 하나가 나중에 큰 구원 밧줄이 됩니다.'
];

const LANGUAGES = [
  { language: 'JavaScript', emoji: '✨' },
  { language: 'TypeScript', emoji: '🛡️' },
  { language: 'Python', emoji: '🐍' },
  { language: 'Rust', emoji: '🦀' },
  { language: 'Go', emoji: '🐹' },
  { language: 'SQL', emoji: '🗃️' },
  { language: 'Kotlin', emoji: '🟣' },
  { language: 'Shell', emoji: '🖥️' }
];

const DEBUG_ACTIONS = [
  '문제가 나는 입력을 가장 작게 재현해 보세요.',
  '핵심 분기 전후에 구조화된 로그를 하나만 추가해 보세요.',
  '스택 트레이스의 첫 번째 내 코드 위치부터 확인해 보세요.',
  '변경 사항을 둘로 나누고, 어느 쪽에서 문제가 생기는지 좁혀 보세요.',
  '실패하는 사례를 테스트로 먼저 고정해 보세요.',
  '변수 이름과 실제 값이 일치하는지 한 번 천천히 확인해 보세요.',
  '의존성 버전과 잠금 파일의 변경 사항을 비교해 보세요.',
  '5분만 자리를 비운 뒤, 에러 메시지를 처음 보는 것처럼 읽어 보세요.'
];

function normalizeSeed(seed) {
  if (seed === undefined || seed === null || seed === '') {
    return String(Date.now());
  }

  if (typeof seed === 'string') return seed;
  if (typeof seed === 'number' || typeof seed === 'boolean' || typeof seed === 'bigint') {
    return String(seed);
  }

  try {
    return JSON.stringify(seed);
  } catch (_) {
    return String(seed);
  }
}

function hashSeed(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function pick(items, hash, offset) {
  return items[(hash >>> offset) % items.length];
}

function generateFortune(seed) {
  const normalizedSeed = normalizeSeed(seed);
  const hash = hashSeed(normalizedSeed);
  const lucky = pick(LANGUAGES, hash, 3);

  return {
    fortune: pick(FORTUNES, hash, 0),
    luckyLanguage: lucky.language,
    luckyEmoji: lucky.emoji,
    debuggingAction: pick(DEBUG_ACTIONS, hash, 7),
    riskScore: (hash % 10) + 1
  };
}

function riskLabel(score) {
  if (score <= 3) return '낮음';
  if (score <= 6) return '보통';
  if (score <= 8) return '주의';
  return '높음';
}

function formatFortune(fortune) {
  if (!fortune || typeof fortune !== 'object') {
    throw new TypeError('formatFortune에는 generateFortune이 반환한 운세 객체가 필요합니다.');
  }

  const lines = [
    '╔══════════ 오늘의 코드 운세 ══════════╗',
    `║ ${fortune.luckyEmoji} 행운의 언어: ${fortune.luckyLanguage}`,
    `║ 🔮 운세: ${fortune.fortune}`,
    `║ 🛠️ 디버깅 추천: ${fortune.debuggingAction}`,
    `║ ⚠️ 위험도: ${fortune.riskScore}/10 (${riskLabel(fortune.riskScore)})`,
    '╚══════════════════════════════════════╝'
  ];

  return lines.join('\n');
}

module.exports = { generateFortune, formatFortune };

if (require.main === module) {
  const example = generateFortune('오늘의_코드_운세');
  console.log(formatFortune(example));

  const repeated = generateFortune('오늘의_코드_운세');
  if (JSON.stringify(example) !== JSON.stringify(repeated)) {
    throw new Error('같은 시드는 같은 운세를 생성해야 합니다.');
  }
}
