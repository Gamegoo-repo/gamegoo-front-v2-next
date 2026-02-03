import { POSITION_ICONS, TIER_ICONS } from "@/shared/constants";

import { Position, Tier } from "@/features/board";

export const getPositionIcon = (position: Position) =>
  POSITION_ICONS[position as keyof typeof POSITION_ICONS];

export const getTierIcon = (tier: Tier) => TIER_ICONS[tier as keyof typeof TIER_ICONS];
