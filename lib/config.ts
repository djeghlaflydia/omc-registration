// Registration deadline: November 23rd, 2025 at 8:00 PM Algeria Time (CET - UTC+1)
export const REGISTRATION_DEADLINE = new Date("2025-11-22T20:00:00+01:00");

// Discord community invite link
export const DISCORD_INVITE_URL = "https://discord.gg/zYNew6HW9y";

export const isAfterDeadline = (): boolean => {
  return new Date() > REGISTRATION_DEADLINE;
};
