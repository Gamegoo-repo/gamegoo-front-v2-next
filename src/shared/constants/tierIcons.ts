import Bronze from "@/shared/assets/tier/bronze.svg";
import Challenger from "@/shared/assets/tier/challenger.svg";
import Diamond from "@/shared/assets/tier/diamond.svg";
import Emerald from "@/shared/assets/tier/emerald.svg";
import Gold from "@/shared/assets/tier/gold.svg";
import Grandmaster from "@/shared/assets/tier/grandmaster.svg";
import Master from "@/shared/assets/tier/master.svg";
import Platinum from "@/shared/assets/tier/platinum.svg";
import Silver from "@/shared/assets/tier/silver.svg";
import Unranked from "@/shared/assets/tier/unranked.svg";

export const TIER_ICONS = {
  UNRANKED: Unranked,
  BRONZE: Bronze,
  SILVER: Silver,
  GOLD: Gold,
  PLATINUM: Platinum,
  EMERALD: Emerald,
  DIAMOND: Diamond,
  MASTER: Master,
  GRANDMASTER: Grandmaster,
  CHALLENGER: Challenger
} as const;
