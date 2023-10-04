import { Component } from "react";
import "./style.css";
import { PhonesList, SaveButton, MyInput } from "./components";

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

export default PhoneBook;
