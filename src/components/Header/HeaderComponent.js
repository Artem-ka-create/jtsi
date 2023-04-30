
import styles from './HeaderComponent.module.css';

function HeaderComponent({headerText}){


return(
    <h1 className={styles.headerComponent} >
    <img style={{ width:50, marginRight:50}} src='T-logo.png'/>
    {headerText}
    </h1>
)

}

export default HeaderComponent;