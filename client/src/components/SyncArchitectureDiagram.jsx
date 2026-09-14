export default function SyncArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 640 200"
      role="img"
      aria-label="Architecture diagram: SQLite source, Python sync service with repository and mapping layers, syncing into SQL Server tables"
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-faint)" />
        </marker>
      </defs>

      {/* SQLite source */}
      <rect x="10" y="70" width="130" height="60" rx="6" fill="var(--panel-raised)" stroke="var(--line)" />
      <text x="75" y="95" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="var(--font-mono)">SQLite</text>
      <text x="75" y="112" textAnchor="middle" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">source (planned)</text>

      <line x1="140" y1="100" x2="188" y2="100" stroke="var(--text-faint)" strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* Python service */}
      <rect x="190" y="30" width="220" height="140" rx="6" fill="var(--panel)" stroke="var(--amber)" />
      <text x="300" y="52" textAnchor="middle" fill="var(--amber)" fontSize="12" fontFamily="var(--font-mono)">MeetingDataService</text>

      <rect x="208" y="66" width="184" height="28" rx="4" fill="var(--panel-raised)" stroke="var(--line)" />
      <text x="300" y="84" textAnchor="middle" fill="var(--text)" fontSize="11" fontFamily="var(--font-mono)">repositories/</text>

      <rect x="208" y="102" width="184" height="28" rx="4" fill="var(--panel-raised)" stroke="var(--line)" />
      <text x="300" y="120" textAnchor="middle" fill="var(--text)" fontSize="11" fontFamily="var(--font-mono)">services/ (status &amp; key mapping)</text>

      <rect x="208" y="138" width="184" height="24" rx="4" fill="var(--panel-raised)" stroke="var(--line)" />
      <text x="300" y="154" textAnchor="middle" fill="var(--text)" fontSize="11" fontFamily="var(--font-mono)">database/ (pyodbc)</text>

      <line x1="410" y1="100" x2="458" y2="100" stroke="var(--text-faint)" strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* SQL Server */}
      <rect x="460" y="55" width="170" height="90" rx="6" fill="var(--panel-raised)" stroke="var(--line)" />
      <text x="545" y="78" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="var(--font-mono)">SQL Server</text>
      <text x="545" y="100" textAnchor="middle" fill="var(--teal)" fontSize="11" fontFamily="var(--font-mono)">tblActionItem</text>
      <text x="545" y="118" textAnchor="middle" fill="var(--teal)" fontSize="11" fontFamily="var(--font-mono)">tblStatusMaster</text>
    </svg>
  );
}
