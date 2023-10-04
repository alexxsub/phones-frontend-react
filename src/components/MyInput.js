import { READ_PHONES, CREATE_PHONE } from "./../Queries";
import { useMutation } from "@apollo/client";

//MyInput
export function MyInput({ state, value, onChange, resetPhone }) {
  const [runCreatePhone, { loading, error }] = useMutation(CREATE_PHONE, {
    onCompleted() {
      resetPhone();
    },
    refetchQueries: [
      {
        query: READ_PHONES,
      },
    ],
  });

  if (loading) return "Загрузка...";
  if (error) return `Ошибка! ${error.message}`;

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (!value.length) return;
      const { id, name, number } = state;
      runCreatePhone({ variables: { input: { id, name, number } } });
    }
  };

  return (
    <input
      placeholder="Введите имя"
      onChange={(e) => onChange(e)}
      value={value}
      onKeyUp={handleKeyUp}
    />
  );
}
