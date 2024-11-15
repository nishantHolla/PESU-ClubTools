
function StatusVisalizer({ data }) {
  const headers = data[0];
  const value = data.slice(1);

  return (
    <div
      className="status-visualizer-container"
      style={{ gridTemplateColumns: `repeat(${data[0].length}, 1fr)` }}
    >
      {headers.map((d, i) => (
        <div className="status-header" key={`header-${i}`}>
          {d}
        </div>
      ))}
      {value.map((row, i) =>
        row.map((c, j) => (
          <div className={`status-datacell ${c}-status-cell`} key={`cell-${i}-${j}`}>
            {c}
          </div>
        )),
      )}
    </div>
  );
}

export default StatusVisalizer;
