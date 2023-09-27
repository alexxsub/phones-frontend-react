import {Component} from 'react';
import './style.css'

class PhoneBook extends Component {
  constructor(props) {
    super(props);

    this.state = { phones: [], id:null,number:'',name: '',editmode:false };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.deletePhone = this.deletePhone.bind(this);
    this.resetPhone = this.resetPhone.bind(this);
    this.savePhone = this.savePhone.bind(this);
  }

  render() {
    return (
      <div>                   
       <table>
        <tbody>
          <tr>
            <td>
              <input
                  ref={(input) => { this.inputnumber = input; }} 
                  placeholder="Введите номер"
                  onChange={this.handleChangeNumber}
                  value={this.state.number}
                />
          </td>
          <td>
              <input
                placeholder="Введите имя"
                onChange={this.handleChangeName}
                value={this.state.name}
                onKeyUp={this.handleKeyUp}
              />
          </td>
          <td>
              {/* <button style={{ 'display': this.state.editmode ? 'block' : 'none' }} onClick={this.savePhone}>Сохранить</button> */}
              {this.state.editmode && <button onClick={this.savePhone}>Сохранить</button>}
          </td>
          <td>
              {/* <button style={{ 'display': this.state.editmode ? 'block' : 'none' }} onClick={this.resetPhone}>Отмена</button> */}
              {this.state.editmode &&<button  onClick={this.resetPhone}>Отмена</button>}
          </td>
      </tr>
   </tbody>
   </table> 
        <PhonesList 
              phones={this.state.phones}
              setPhone={this.setPhone}
              deletePhone={this.deletePhone}
        />
      </div>
    );
  }
  resetPhone(){
    this.setState({ 
      id:null,
      number: '',
      name: '',
      editmode:false });
      this.inputnumber.focus()
  }
  savePhone(){

    this.setState(state => ({
      phones: this.state.phones.map(phone => {
       if (phone.id===this.state.id) {
        phone.number=this.state.number
        phone.name=this.state.name
       } 
       return phone
    })
    }));
    this.resetPhone()
  }

  setPhone(phone) {
    this.setState({ 
      id:phone.id, 
      number: phone.number,
      name: phone.name,
      editmode:true });
    
    
  }

  deletePhone(id) {
    this.setState(state => ({
      phones: this.state.phones.filter(phone => 
       phone.id!==id
      )
    }));
  }
  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }
  handleChangeNumber(e) {
    this.setState({ number: e.target.value });
  }
  
  handleKeyUp = (event) => {
    if(event.key === 'Enter'){
      if (!this.state.name.length) {
        return;
      }
      const newItem = {
        id: Date.now(),
        number: this.state.number,
        name: this.state.name
        
      };
      this.setState(state => ({
        phones: state.phones.concat(newItem),
        id:null,
        name: '',
        number:''
      }));
      this.inputnumber.focus()
    }
    }
  


}

class PhonesList extends Component {

  render() {
    
    return (
  
 <table width="350px">
  <tbody>
   {this.props.phones.map(phone => (
          <tr key={phone.id}>          
          {/* eslint-disable-next-line  */}
          <td><a href="#" onClick={() => this.props.setPhone(phone)} >{ phone.number }</a></td>
          <td>{ phone.name }</td>
          <td><button onClick={() => this.props.deletePhone(phone.id)}> x</button></td>
        </tr>
        ))}

</tbody>

</table>

    );
  }


}

export default PhoneBook;
