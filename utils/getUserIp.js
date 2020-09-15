export default async getUserIp => {
  const response = await fetch(
    getUserIp || "https://api.ipify.org?format=json",
  );
  const ip = response.text();
  return ip;
};
