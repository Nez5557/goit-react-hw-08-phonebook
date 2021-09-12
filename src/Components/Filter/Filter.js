// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from 'redux/contacts/contacts-actions';
import { getFilter } from 'redux/contacts/contacts-selector'

import shortid from "shortid";
import styles from "./styles.module.css";

function Filter() {
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();
  
  const inputId = shortid.generate();
  return (
    <label className={styles.filterLabel} htmlFor={inputId}>
      Search
      <input
        id={inputId}
        type="text"
        name="filter"
        value={filterValue}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </label>
  );
};

export default Filter;
