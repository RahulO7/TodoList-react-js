import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
  // const [status, setStatus] = useState(false);
  const [Discription, setDiscription] = useState("");
  const [editToggle, setEditToggle] = useState(true);
  const [editId, setEditId] = useState(null);

  const [items, setItems] = useState(getLocalData());
  // const [itemDisc, setItemsDisc] = useState([]);

  // const enterName = (e) => {
  //   setInput(e.target.value);
  // };
  const submit = () => {
    if (!input && !Discription) {
      alert("Please enter data");
    } else if (input && !editToggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === editId) {
            return { ...elem, title: input, discription: Discription };
          }
          return elem;
        })
      );
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
  };
  // const statusbtn =()=>{
  //   setStatus(true);

  // }
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <Container>
      <div className="input">
        <input
          type="text"
          placeholder="Title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
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
        {items.map((item) => {
          return (
            <div className="data-container" key={item.id}>
              <p>Id:-{item.id}</p>
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
        })}
      </div>
    </Container>
  );
}

export default App;

const Container = styled.section`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* .input{
  text-align: center;
} */

  .input {
    display: flex;
    flex-direction: column;

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
    justify-content: flex-start;
    .data-container {
      margin: 10px;
      border: 2px solid;
      padding: 5px;
      border-radius: 10px;
      min-width: 250px;
      min-height: 250px;
      position: relative;

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
