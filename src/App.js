import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./pages/Navbar";
// import { FaBeer } from 'react-icons/fa';
// import { MdClear,MdAdd } from "react-icons/md";

const getLocalData = () => {
  let localData = localStorage.getItem("lists");
  if (localData) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [input, setInput] = useState("");
  const [ndadd, setndAdd] = useState(true);
  const [Discription, setDiscription] = useState("");
  const [editToggle, setEditToggle] = useState(true);
  const [editId, setEditId] = useState(null);

  const [items, setItems] = useState(getLocalData());

  const [coll, setColl] = useState(false);
  

  // const enterName = (e) => {
  //   setInput(e.target.value);
  // };
  const submit = () => {
    if (!input && !Discription) {
      alert("Please enter data");
    }
     else if (input && !editToggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === editId) {
            return { ...elem, title: input, discription: Discription };
          }
          return elem;
          
        })
        
      );
      setColl(false)
      setEditToggle(true);
      setInput("");
      setDiscription("");

      setEditId(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        title: input,
        discription: Discription,
      };

      setItems([...items, allInputData]);
      setInput("");
      setDiscription("");
      setColl(false)
    }
  };
  const deleteItem = (id) => {
    const updatedItems = items.filter((elem) => {
      return elem.id !== id;
    });

    setItems(updatedItems);
  };
  const editItem = (id) => {
    const editItemData = items.find((elem) => {
      return elem.id === id;
    });
    console.log(editItemData);
    setEditToggle(false);
    setInput(editItemData.title);
    setDiscription(editItemData.discription);

    setEditId(id);
    setColl(true)
  };
  // const statusbtn =()=>{
  //   setStatus(true);

  // }
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);


  const expendAddnote =()=>{
    setColl(true)
    setndAdd(false)


  }
  const collAddnote =()=>{
    setColl(false)
    setndAdd(true)


  }

  return (
    <>
    <Navbar/>
    <Container>
      <div className={coll?"input":"uncoll"}>
        <input
          type="text"
          placeholder="Title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <textarea style={{width:'200px'}}
          type="textarea"
          placeholder="Enter discription"
          value={Discription}
          onChange={(e) => setDiscription(e.target.value)}
        />
        {editToggle ? (
          <button
            onClick={submit}
            style={{
              width: "100px",
              backgroundColor: "yellowgreen",
              padding: "10px",
              cursor: "pointer",
              border: "none ",
            }}
          >
            Add Note
          </button>
        ) : (
          <button
            onClick={submit}
            style={{
              width: "100px",
              backgroundColor: "yellowgreen",
              padding: "10px",
              cursor: "pointer",
              border: "none ",
            }}
          >
            Save
          </button>
        )}
      </div>

      <div className="data">
{items.length !== 0?items.map((item) => {
          return (
            <div className="data-container" key={item.id}>
              {/* <p>Id:-{item.id}</p> */}
              <h1>Title:-{item.title}</h1>
              <p>Discription:-{item.discription}</p>
              <button onClick={() => deleteItem(item.id)} className="dltbtn">
                Delete
              </button>
              <button onClick={() => editItem(item.id)} className="editbtn">
                Edit
              </button>
              {/* <button onClick={statusbtn} key={index}>Done</button> */}
            </div>
          );
        }):<div className="nodata"><p>You Don't Take any Notes Plese Add Note To List</p> 
        {ndadd?
          <Ndbutton onClick={expendAddnote}>Add Note</Ndbutton>:<p></p>
        }
        </div> }
        
       
      </div>
      {coll?<button className="collapse" onClick={collAddnote}> <span className="sc1"></span> <span className="sc2"></span></button>:<button className="collapse" onClick={expendAddnote}><span className="s1"></span> <span></span></button>

      }
      
    </Container>
    </>
  );
}

export default App;

const Container = styled.section`
  width: 100vw;
  height: auto;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center;
  align-items: center; */

  /* .input{
  text-align: center;
} */
.uncoll{
  display: none;
}
.collapse{
  position: fixed;
 

  z-index: 99;
  bottom: 20px;
  right: 20px;
  border: none;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 2px  #ced1cd;
 



  span{
    width: 50%;
    border-radius: 1px;
    height: 2px;
    background-color: green;


  }
  .s1{
    transform: rotate(90deg);
   transition: transform 1s ease;
  }
  .sc1{
    transform:rotate(45deg);
    background-color: red;
  }
  .sc2{
    transform:rotate(-45deg);
    background-color: red;
  }
  
  
}

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 25vh;
    border-radius: 20px;
    padding:20px;
    position: fixed;
    bottom: 50px;
    right: 30px;
    transform: translateY(-100px);
    animation: cani 1s ease 1;

    z-index: 99;
   
    background-color: white;
    box-shadow: -2px -2px 5px 5px #ced1cd;


    @keyframes cani {
      from{transform: translateY(0px);}
      to{transform: translateY(-100px);}
      
    }


    input {
      padding: 10px;
      width: 200px;
      margin: 10px;
    }
  }

  .data {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /* padding: 20px; */
    align-items: center;
    justify-content: center;

    .data-container {
      margin: 10px;
    
      padding: 10px;
      border-radius: 10px;
      width: 250px;
      height: 250px;
      position: relative;
      box-shadow: -2px -2px 5px 5px #ced1cd;
     

      p{
        max-width: 90%;
        height: 90%;
        
      }

      .dltbtn {
        position: absolute;
        border: 1px solid white;
        border-radius: 10px;
        padding: 10px;
        width: 70px;
        cursor: pointer;
        bottom: 2px;
        right: 10px;

        &:hover {
          background-color: red;
          color: white;
        }
      }
      .editbtn {
        position: absolute;
        border: 1px solid white;
        border-radius: 10px;
        padding: 10px;
        width: 70px;
        cursor: pointer;
        bottom: 2px;
        left: 10px;
        &:hover {
          background-color: green;
          color: white;
        }
      }
    }
  }
`;

const Ndbutton = styled.button`
width: 50px;
height: 50px;
background-color: aliceblue;
`;
