export const mode = [
  { label: "모든 모드", value: "ALL" },
  { label: "빠른 대전", value: "FAST" },
  { label: "솔로랭크", value: "SOLO" },
  { label: "자유랭크", value: "FREE" },
  { label: "칼바람 나락", value: "ARAM" }
] as const;

export const tier = [
  { label: "티어 전체", value: "ALL" },
  { label: "언랭크", value: "UNRANKED" },
  { label: "아이언", value: "IRON" },
  { label: "브론즈", value: "BRONZE" },
  { label: "실버", value: "SILVER" },
  { label: "골드", value: "GOLD" },
  { label: "플래티넘", value: "PLATINUM" },
  { label: "에메랄드", value: "EMERALD" },
  { label: "다이아몬드", value: "DIAMOND" },
  { label: "마스터", value: "MASTER" },
  { label: "그랜드마스터", value: "GRANDMASTER" },
  { label: "챌린저", value: "CHALLENGER" }
] as const;

export const voice = [
  { label: "음성 채팅", value: "ALL" },
  { label: "음성 OFF", value: "UNAVAILABLE" },
  { label: "음성 ON", value: "AVAILABLE" }
] as const;

export type Mode = (typeof mode)[number];
export type Tier = (typeof tier)[number];
export type Voice = (typeof voice)[number];

export type ModeValue = Mode["value"];
export type TierValue = Tier["value"];
export type VoiceValue = Voice["value"];
