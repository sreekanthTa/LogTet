import React from "react";
import styles from './inputfields.module.css';

const InputFields = React.forwardRef(({state=[],index=null,addReplies=()=>{}},ref) => {

 
    return   <form onSubmit={(e)=>addReplies(e,index)} className={styles.card} ref={ref}>
            <h2 className={styles.comHeader}>Comment</h2>
            <input  placeholder="Name" className={styles.name}></input>
            <textarea  rows="3"   placeholder="Comment" className={styles.comment}></textarea>
    
       <button type="submit" className={styles.buttons}>POST</button>
    
    </form>
    
     
})

export default InputFields;