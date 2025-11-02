// prisma/seeds/seed-command-types.ts
import { PrismaClient } from '../../generated/prisma-primary';

const prisma = new PrismaClient();
type Row = { name: string; description?: string | null };

const toStr = (s?: string | null) => {
  const v = (s ?? '').trim();
  return v.length ? v : null;
};

const rows: Row[] = [
  { name: 'Status', description: 'Query device status / info / firmware' },
  { name: 'Position Single', description: 'Request one-time GPS position (positionSingle)' },
  { name: 'Position Periodic Start', description: 'Start periodic reporting (positionPeriodic)' },
  { name: 'Position Periodic Stop', description: 'Stop periodic reporting (positionStop)' },
  { name: 'Set Reporting Interval', description: 'Set fix/upload/report intervals; aka Timer' },
  { name: 'Set Heartbeat Interval', description: 'Set heartbeat/keepalive interval' },
  { name: 'Set Timezone', description: 'Configure device timezone offset' },
  { name: 'Sync Time', description: 'Sync device time with server (NTP/GPS)' },
  { name: 'Set APN', description: 'APN/APN user/APN password configuration' },
  { name: 'Set Server', description: 'Server host and port; primary/backup' },
  { name: 'Set DNS', description: 'Configure DNS server(s)' },
  { name: 'Set GPRS/SMS Mode', description: 'Switch transport: GPRS <-> SMS' },
  { name: 'Set Data Protocol', description: 'Choose protocol variant (e.g., JT808/GT06 vendor mode)' },
  { name: 'Engine Stop', description: 'Immobilize vehicle (relay off)' },
  { name: 'Engine Resume', description: 'Mobilize vehicle (relay on)' },
  { name: 'Output Control', description: 'Set digital output ON/OFF (e.g., siren, buzzer)' },
  { name: 'Door Lock', description: 'Lock vehicle doors (if supported)' },
  { name: 'Door Unlock', description: 'Unlock vehicle doors (if supported)' },
  { name: 'Alarm Arm', description: 'Enable security alarms' },
  { name: 'Alarm Disarm', description: 'Disable security alarms' },
  { name: 'Movement Alarm', description: 'Enable/disable movement alarm' },
  { name: 'Vibration Alarm', description: 'Enable/disable shock/vibration alarm' },
  { name: 'Overspeed Alarm', description: 'Set speed limit / overspeed alarm threshold' },
  { name: 'Geo-fence Add', description: 'Create/assign geo-fence (circle/polygon)' },
  { name: 'Geo-fence Delete', description: 'Remove geo-fence' },
  { name: 'Panic Acknowledge', description: 'Acknowledge SOS/Panic event' },
  { name: 'Reboot Device', description: 'Soft reboot / restart' },
  { name: 'Power Off', description: 'Power down device (if supported)' },
  { name: 'Factory Reset', description: 'Reset to defaults' },
  { name: 'Sleep Mode On', description: 'Enable sleep/low power mode' },
  { name: 'Sleep Mode Off', description: 'Disable sleep/low power mode' },
  { name: 'LED Control', description: 'Enable/disable LED indicators' },
  { name: 'Buzzer Control', description: 'Enable/disable buzzer/beeper' },
  { name: 'Set SOS Number', description: 'Configure SOS/emergency numbers' },
  { name: 'Clear SOS Number', description: 'Clear SOS numbers' },
  { name: 'Set Authorized Numbers', description: 'Whitelist numbers allowed to control device' },
  { name: 'Set Odometer', description: 'Initialize/adjust odometer value' },
  { name: 'Reset Mileage', description: 'Reset trip mileage counter' },
  { name: 'Fuel Calibration', description: 'Calibrate analog/digital fuel sensor' },
  { name: 'Temperature Calibration', description: 'Calibrate temperature probe(s)' },
  { name: 'Harsh Driving Thresholds', description: 'Set accel/brake/turn sensitivity' },
  { name: 'Request Photo', description: 'Take snapshot / request image' },
  { name: 'Start Video', description: 'Start video stream/recording' },
  { name: 'Stop Video', description: 'Stop video stream/recording' },
  { name: 'Request DTC', description: 'Read OBD diagnostic trouble codes' },
  { name: 'Clear DTC', description: 'Clear OBD diagnostic trouble codes' },
  { name: 'Set PID Poll Interval', description: 'OBD/CAN PID polling rate' },
  { name: 'Enable CANBus', description: 'Enable CAN/J1939/J1708 data capture' },
  { name: 'Bind BLE Beacon', description: 'Pair BLE tag / beacon' },
  { name: 'Unbind BLE Beacon', description: 'Unpair BLE tag / beacon' },
  { name: 'RFID Whitelist', description: 'Manage allowed RFID/Driver IDs' },
  { name: 'FOTA Set URL', description: 'Configure firmware/asset URL' },
  { name: 'FOTA Start', description: 'Start firmware update' },
  { name: 'Upload Logs', description: 'Upload diagnostic logs' },
  { name: 'Voice Monitor', description: 'One-way audio monitor / listen-in' },
  { name: 'Send USSD', description: 'Send USSD code via modem' },
  { name: 'Send SMS', description: 'Send outbound SMS via device SIM' },
  { name: 'LBS/Wi-Fi Scan', description: 'Toggle LBS/Wi-Fi scan for hybrid positioning' },
  { name: 'A-GPS Assist', description: 'Download A-GPS assistance data' },
];

export async function seedCommandTypes(prisma: PrismaClient) {
  await prisma.$transaction(
    rows.map((r) =>
      prisma.commandType.upsert({
        where: { name: r.name }, // requires CommandType.name to be @unique
        update: { description: toStr(r.description) },
        create: { name: r.name, description: toStr(r.description) },
      }),
    ),
  );
  console.log(`✅ Command types seeded: ${rows.length}`);
}

// Allow running as a standalone script (CommonJS)
if (require.main === module) {
  const prisma = new PrismaClient();
  seedCommandTypes(prisma)
    .catch((e) => {
      console.error('❌ Seeding failed:', e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
