// import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredContacts } from "redux/contacts/contacts-selector";
import { fetchContacts, deleteContact } from "redux/contacts/contacts-operations";

import styles from "./styles.module.css";

function ListItem() {
  const contacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  return contacts.map((item) => (
    <li className={styles.listItem} key={item.id}>
      <p className={styles.itemText}>
        {item.name}: {item.number}
      </p>
      <button
        className={styles.deleteBtn}
        type="button"
        onClick={() => dispatch(deleteContact(item.id))}
      >
        Delete
      </button>
    </li>
  ));
};


export default ListItem;
