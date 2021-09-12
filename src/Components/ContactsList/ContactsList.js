import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { getLoader } from "redux/contacts/contacts-selector";
import { useSelector } from "react-redux";

function ConctactsList({ children }) {
  const loader = useSelector(getLoader);
  
  return (
    <ul className={styles.contactsList}>
      {loader && <h4>Loading...</h4>}
      {children}
    </ul>
  );
}

ConctactsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConctactsList;
