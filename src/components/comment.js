import React from "react";
import  styles from  './comment.module.css';
import InputFields from "./inputFields";
import moment from 'moment'
const Comments = ({
         state=null,
         deleteComment=()=>{}, 
         addReplies=()=>{},
         addChildReplies=()=>{},
         deleteChildReplies=()=>{},
         editReplies=()=>{}
         ,
         updateValue=()=>{}
         ,
         editChildReply=()=>{},
         editNestedChildReply=()=>{}
        }) =>{





    return  state&&state?.length>0 ? state?.map((e,i) =>{
        
        return<> 
                  <div key={i} className={styles.card}>
                        <div className={styles.commentHeder}>
                            <h3>{e?.Name}</h3>

                            <p className={styles.dates}>{moment(e?.CreatedAt).format("Do MMM YY")?.toString()}</p>
                        </div>
                      
                      <div className={styles.cardDetails}>
                        <input className={styles.comInputField} value={e?.Comments} onChange={(e)=>updateValue(e,i)} disabled={!e?.edit} />
                        <br></br>
                        <button className={styles.actButton} onClick={(e)=>addReplies(e,i)}>Reply</button>
                        <button className={styles.actButton} onClick={(e)=>editReplies(i)}>{!e?.edit  ? "Edit" :"post"}</button>
                        <button className={styles.dButton} onClick={()=>deleteComment(i)}><i class="fa fa-trash"  aria-hidden="true"></i> </button>
                      </div>
                      </div>  
                        {e?.update ? <InputFields index={i} addReplies={editReplies}></InputFields>:null}
                        {e?.reply ? <InputFields style={{marginTop:"10px"}}  index = {i} addReplies={addChildReplies}></InputFields> : null}

                

               <div className={styles.childCards} >
                <div >
                {
                    state?.[i]?.replies&&state?.[i]?.replies?.length>0 ? state?.[i]?.replies?.map((ee,ii)=>{
                      
                     return   <div key={ii} className={styles.childCarsdss}  >
                                <div className={styles.commentHeder}> <h3>{ee?.Name}</h3> <p className={styles.dates}>{moment(ee?.CreatedAt).format("Do MMM YY")?.toString()}</p> </div>
                                <div className={styles.cardDetaiss}>
                                  <input className={styles.comInputField} value={ee?.Comments} onChange={(e)=>editNestedChildReply(e,i,ii)} disabled={!ee?.edit} />
                                  <br></br>
                                  <button className={styles.actButton}  onClick={(e)=>editChildReply(i,ii)}>{!ee?.edit  ? "Edit" :"post"}</button>
                                  <button className={styles.dButton} onClick={()=>deleteChildReplies(i,ii)}><i class="fa fa-trash" aria-hidden="true"></i> </button>
                                </div>
 
                              </div>  
                    }) : null
                }

                </div>
                </div>
            
              </>
            }) : null
}

export default Comments;