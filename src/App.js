import { Component } from "react";
import "./style.css";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_PHONE,
  READ_PHONES,
  UPDATE_PHONE,
  DELETE_PHONE,
} from "./Queries";

class PhoneBook extends Component {
  constructor(props) {
    super(props);
    // состояние компонента
    this.state = {
      id: null,
      number: "",
      name: "",
      editmode: false,
    };
    //методы компонента
    this.setPhone = this.setPhone.bind(this);
    this.resetPhone = this.resetPhone.bind(this);
  }
  // метод отрисовки, возвращает документ
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  ref={(input) => {
                    this.inputnumber = input;
                  }}
                  placeholder="Введите номер"
                  onChange={(e) => this.setState({ number: e.target.value })}
                  value={this.state.number}
                />
              </td>
              <td>
                <MyInput
                  state={this.state}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
                  resetPhone={this.resetPhone}
                />
              </td>
              <td>
                {/* <button style={{ 'display': this.state.editmode ? 'block' : 'none' }} onClick={this.savePhone}>Сохранить</button> */}
                {this.state.editmode && (
                  <SaveButton state={this.state} resetPhone={this.resetPhone} />
                )}
              </td>
              <td>
                {/* <button style={{ 'display': this.state.editmode ? 'block' : 'none' }} onClick={this.resetPhone}>Отмена</button> */}
                {this.state.editmode && (
                  <button onClick={this.resetPhone}>Отмена</button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <PhonesList setPhone={this.setPhone} />
      </div>
    );
  }
  // хук на монтаж компонента на страницу, подменяем заголовок приложения
  componentDidMount() {
    document.title = "SPA PhoneBook";
  }
  // сброс параметров редактирования
  resetPhone() {
    this.setState({
      id: null,
      number: "",
      name: "",
      editmode: false,
    });
    this.inputnumber.focus();
  }

  // устанавливаем данные при редактировании
  setPhone(phone) {
    this.setState({
      id: phone.id,
      number: phone.number,
      name: phone.name,
      editmode: true,
    });
  }
}

//MyInput
function MyInput({ state, value, onChange, resetPhone }) {
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

//кнопка сохранить
function SaveButton(props) {
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

//кнопка удаления
function DeleteButton(props) {
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
// дополнительный компонент - список телевонной книги
function PhonesList(props) {
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

export default PhoneBook;
