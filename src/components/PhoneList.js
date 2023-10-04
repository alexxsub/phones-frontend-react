import { DeleteButton } from "./../components";
import { useQuery } from "@apollo/client";
import { READ_PHONES } from "./../Queries";

// дополнительный компонент - список телевонной книги
export function PhonesList(props) {
  const { loading, error, data } = useQuery(READ_PHONES);

  if (loading) return "Загрузка...";
  if (error) return `Ошибка! ${error.message}`;

  return (
    <table width="350px">
      <tbody>
        {data.readPhones.map((phone) => (
          <tr key={phone.id}>
            <td>
              {/* eslint-disable-next-line  */}
              <a href="#" onClick={() => props.setPhone(phone)}>
                {phone.number}
              </a>
            </td>
            <td>{phone.name}</td>
            <td>
              <DeleteButton id={phone.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
