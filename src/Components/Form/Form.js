// import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getContacts } from "redux/contacts/contacts-selector";
import { postContact } from "redux/contacts/contacts-operations";

import shortid from "shortid";
import styles from "./styles.module.css";

import { Button } from 'react-bootstrap';

function Form() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const inputHandler = (evt) => {
    switch (evt.target.name) {

      case "name":
        setName(evt.target.value);
        break;

      case "number":
        setNumber(evt.target.value);
        break;

      default:
        return;
    }
  };

  const submitHanlder = (evt) => {
    evt.preventDefault();
    const namesToLowerCase = contacts.map((item) => item.name.toLowerCase());

// проверка на повторение имени
    if (namesToLowerCase.find((item) => item === name.toLowerCase())) {
      alert("please change name");
      setName('');
      return 
    };
// отправка и создание нового контакта
    const contact = {
      name: name,
      number: number,
    };
    dispatch(postContact(contact));
    formReset();
  };

  const formReset = () => {
    setName("");
    setNumber("");
  };

  const IdName = shortid.generate();
  const IdNumber = shortid.generate();
  return (
    <form onSubmit={submitHanlder}>
      <label className={styles.formLabel} htmlFor={IdName}>
        Name
        <input
          id={IdName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          onChange={inputHandler}
          value={name}
          required
        />
      </label>

      <label className={styles.formLabel} htmlFor={IdNumber}>
        Number
        <input
          id={IdNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          onChange={inputHandler}
          value={number}
          required
        />
      </label>
      <Button className={styles.submitBtn} type="submit">
        Add Contact
      </Button>
    </form>
  );
};

export default Form;
