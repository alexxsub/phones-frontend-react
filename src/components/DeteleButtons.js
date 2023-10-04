import { READ_PHONES, DELETE_PHONE } from "./../Queries";
import { useMutation } from "@apollo/client";
//кнопка удаления
export function DeleteButton(props) {
  const [runDeletePhone, { loading, error }] = useMutation(DELETE_PHONE, {
    refetchQueries: [
      {
        query: READ_PHONES,
      },
    ],
  });

  if (loading) return "Загрузка...";
  if (error) return `Ошибка! ${error.message}`;

  return (
    <button onClick={() => runDeletePhone({ variables: { id: props.id } })}>
      X
    </button>
  );
}
