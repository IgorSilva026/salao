
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ value, onChange }) {
  return (
    <DateTimePicker
      value={value}
      mode="date"
      display="default"
      minimumDate={new Date()}
      onChange={(event, dataEscolhida) => {
        onChange(dataEscolhida);
      }}
    />
  );
}
