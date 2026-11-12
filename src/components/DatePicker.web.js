
export default function DatePicker({ value, onChange }) {
  const dataFormatada = [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, '0'),
    String(value.getDate()).padStart(2, '0'),
  ].join('-');

  return (
    <input
      type="date"
      min={new Date().toLocaleDateString('en-CA')}
      value={dataFormatada}
      onChange={(event) => {
        if (event.target.value) {
          const [ano, mes, dia] = event.target.value.split('-').map(Number);
          onChange(new Date(ano, mes - 1, dia));
        }
      }}
      style={{
        padding: 12,
        borderRadius: 10,
        border: '1px solid #E5C3C8',
        fontSize: 16,
        backgroundColor: '#FFFFFF',
      }}
    />
  );
}
