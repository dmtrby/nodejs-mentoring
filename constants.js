const WINDOWS_CPU_COMMAND = `pwsh -Command "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
const MAC_CPU_COMMAND = `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
const UPDATE_CALL_MILLISECONDS_RATE = 100; // ten times in a second
const LOG_MILLISECONDS_RATE = 1000 * 60; // every minute

module.exports = {
  WINDOWS_CPU_COMMAND,
  MAC_CPU_COMMAND,
  UPDATE_CALL_MILLISECONDS_RATE,
  LOG_MILLISECONDS_RATE,
};
