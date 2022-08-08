import styles from './app.module.css';
import InputFields from "./components/inputFields";
import Comments from "./components/comment";
import React, { useRef, useState } from "react";

function App() {

  const ref = useRef();

  const[state, setState] = useState([
    //   {Name: 'first freight forwarder', 
    //   Comments: 'o', 
    //   CreatedAt:"Sun Aug 07 2022 11:23:07",
    //         replies:[ 
    //           {Name: 'first freight forwarder', 
    //           Comments: 'o', 
    //           CreatedAt:"Sun Aug 05 2022 11:23:07",
    //         },
    //         {Name: 'first freight forwarder', 
    //         Comments: 'o', 
    //         CreatedAt:"Sun Aug 02 2022 11:23:07",
    //         },
    //         {Name: 'first freight forwarder', 
    //         Comments: 'o', 
    //         CreatedAt:"Sun Aug 09 2022 11:23:07",
    //       }
    //     ]
    // },
    
  ]);

  const [asc, setAsc] = useState(false);

  const updateState = (e) =>{

    e.preventDefault()

     const [name, comment] = e?.target?.elements;

     if(name?.value?.trim()?.length>0 && comment?.value?.trim()?.length>0){

      setState([...state,{Name:name.value, Comments:comment.value, CreatedAt:new Date()}])

      ref.current.reset()


     } else{
      alert("please fill all details")
     }


    
  }

  const deleteComment = (i) =>{

    let arr = [...state];
    arr.splice(i,1);

    setState([...arr])


  }


  const addReplies = (e,i) =>{

    e.preventDefault()

    let arbs = [...state];

    arbs[i] = {...arbs[i],reply:true};

    setState([...arbs])
    
  }

  const addChildReplies = (e,i)=>{

    e.preventDefault();

    const [name, comment] = e?.target?.elements;

    const newObj = {Name:name.value, Comments:comment.value, CreatedAt:new Date()};
 
    const nestedReplies = [...(state?.[i]?.replies ? state?.[i]?.replies : [])];

          nestedReplies.push(newObj)

    const copyState =  [...state];

        copyState[i] = {...copyState[i], reply:false, replies:nestedReplies};

    setState([...copyState])


  };

  const deleteChildReplies = (i,ii) =>{


    const checkState = [...state]
  
    checkState?.[i]?.replies?.splice(ii,1);
         
    setState([...checkState]);   

  };


  
  const editReply = (i) =>{
 
    let copyState = [...state];

    copyState[i] = {...copyState[i], edit: !copyState[i]?.edit };


    setState([...copyState]);

 
  };


  const editChildReply = (i, ii) =>{
 
    let copyState = [...state];
 
    copyState[i].replies[ii] = {...copyState[i]?.replies[ii], edit: !copyState[i]?.replies[ii]?.edit}

    setState([...copyState]);

 
  };

  const editNestedChildReply = (e,i, ii) =>{
 
    let copyState = [...state];
 
    copyState[i].replies[ii] = {...copyState[i]?.replies[ii], Comments: e?.target?.value}

    setState([...copyState]);

 
  };


  
  const updateValue = (e,i)=>{

    let copyState = [...state];

    copyState[i] = {...copyState[i], Comments:e?.target?.value };


    setState([...copyState]);


  }



  

  React.useEffect(()=>{


    if(state&&state.length>0){
   
      localStorage.removeItem("data");

      localStorage.setItem("data", JSON.stringify(state));

    }
   
   


  },[state])

  React.useEffect(()=>{

    const data = JSON.parse(localStorage.getItem("data"));

    if(data&&data.length){
      setState([...data]);

    }


  },[])

  const sortByDate = () => {


    let newState = [...state];


    newState?.forEach((e,i)=>{

        return newState[i]?.replies?.map(()=>{
 
        return   newState[i]?.replies.sort(function compare(a,b){
 
          return  asc  ? new Date(a.CreatedAt) - new Date(b.CreatedAt) : new Date(b.CreatedAt) - new Date(a.CreatedAt)
        });
 
      })
    })

    setAsc(!asc)

    console.log("new state",asc)

    setState([...newState])

    
  }
  

  return (<div className={styles.formBody}  >
       <InputFields state={state} addReplies={updateState}  ref={ref}></InputFields>
        <div  style={{textAlign:"right",cursor:"Pointer", fontSize:"12px"}} ><h4 onClick={sortByDate}>
        Sort by Date and Time
          </h4></div>
       <Comments
        state={state} 
        editReplies={editReply}
        deleteComment={deleteComment} 
        addReplies={addReplies} 
        addChildReplies={addChildReplies} 
        deleteChildReplies={deleteChildReplies}
        editChildReply={editChildReply}
        editNestedChildReply={editNestedChildReply}
        updateValue={updateValue}></Comments>
    </div>
  );
}

export default App;
