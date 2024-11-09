function CsvVisalizer({ data }) {
  const headers = data[0];
  const value = data.slice(1);
  return (
    <div
      className="csv-visualizer-container"
      style={{ gridTemplateColumns: `repeat(${data[0].length}, max-content)` }}
    >
      {headers.map((d, i) => (
        <div className="csv-header" key={`header-${i}`}>
          {d}
        </div>
      ))}
      {value.map((row, i) =>
        row.map((c, j) => (
          <div className="csv-datacell" key={`cell-${i}-${j}`}>
            {c}
          </div>
        )),
      )}
    </div>
  );
}

export default CsvVisalizer;
