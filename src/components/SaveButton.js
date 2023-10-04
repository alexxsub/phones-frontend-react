import { READ_PHONES, UPDATE_PHONE } from "./../Queries";
import { useMutation } from "@apollo/client";
//кнопка сохранить
export function SaveButton(props) {
  const [runSavePhone, { loading, error }] = useMutation(UPDATE_PHONE, {
    refetchQueries: [
      {
        query: READ_PHONES,
      },
    ],
  });

  if (loading) return "Загрузка...";
  if (error) return `Ошибка! ${error.message}`;
  const { id, name, number } = props.state;

  return (
    <button
      onClick={() => {
        runSavePhone({ variables: { input: { id, name, number } } });
        props.resetPhone();
      }}
    >
      Сохранить
    </button>
  );
}
