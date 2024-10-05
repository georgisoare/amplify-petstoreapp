import { useState } from "react";
import "./App.css";
import { Pets } from "./ui-components";
import { NavBarPet } from "./ui-components";
import { PetFooter } from "./ui-components";
import { AddPet } from "./ui-components";
import { PetDetails } from "./ui-components";
import { withAuthenticator } from "@aws-amplify/ui-react";

// import { uploadData } from "aws-amplify/storage";

function App({ user, signOut }) {
  // async function saveFile() {
  //   const file = "Hello, this is a test file!";
  //   const filename = "test.txt";

  //   try {
  //     const result = await uploadData({
  //       key: filename,
  //       data: new Blob([file], { type: "text/plain" }),
  //     }).result;
  //     console.log("Succeeded: ", result);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // }
  // const petProfileOverride = {
  //   Breed: { color: "blue" },
  // };
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pet, setPet] = useState();

  const [updatePet, setUpdatePet] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const formDetailsOverrides = {
    Close: {
      onClick: () => {
        setShowDetails(false);
      },
      style: {
        cursor: "pointer",
      },
    },
  };

  const formOverride = {
    "Add Pet": {
      children: updatePet ? "Update Pet" : "Add pet",
    },
    TextField29766922: {
      value: name,
    },
    TextField29766923: {
      value: age,
    },
    TextField29766924: {
      value: breed,
    },
    TextField38564063: {
      value: about,
    },
    TextField38564070: {
      value: color,
    },
    TextField38564077: {
      value: image,
    },
    image: {
      src:
        updatePet == null
          ? "https://media.istockphoto.com/id/1372997793/vector/cute-pembroke-welsh-corgi-dog-waving-paw-vector-illustration.jpg?s=612x612&w=0&k=20&c=T_GXRG6RG5Oy07rHGrR6XvKDQGY9mjeCmxjJ_oIVTGM="
          : updatePet.image,
    },
    Button38564085: {
      isDisabled: updatePet ? false : true,
    },
    Button29766926: {
      isDisabled: updatePet ? true : false,
    },
    MyIcon: {
      onClick: () => {
        setShowForm(false);
        setUpdatePet();
        setName();
        setAge();
        setBreed();
        setColor();
        setAbout();
        setImage();
      },
      style: {
        cursor: "pointer",
      },
    },
  };

  const navBarOverrides = {
    // image: {
    //   src: "https://w7.pngwing.com/pngs/459/678/png-transparent-dog-cartoon-mascot-pet-shop-logo.png",
    //   //src: user?.attributes?.profile,
    // },
    "Add Pet": {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        // saveFile();
        setShowForm(!showForm);
      },
    },
    Button: {
      onClick: signOut,
    },
    // Name: {
    //   children: user?.username,
    // },
  };
  return (
    <div className="App">
      <NavBarPet width={"100%"} overrides={navBarOverrides} />
      <header className="App-header">
        {showDetails && (
          <>
            <div className="modal-overlay" />
            <div className="modal">
              <PetDetails
                overrides={formDetailsOverrides}
                pet={pet}
                style={{
                  textAlign: "left",
                  margin: "1rem",
                }}
              />
            </div>
          </>
        )}
        {showForm && (
          <>
            <div className="modal-overlay" />
            <div className="modal-add-pet">
              <AddPet
                pet={updatePet}
                overrides={formOverride}
                width={"100%"}
                style={{
                  textAlign: "left",
                  margin: "1rem",
                  display: "contents",
                }}
              />
            </div>
          </>
        )}
        {/* <Pets /> */}
        <Pets
          overrideItems={({ item, index }) => ({
            overrides: {
              // Breed: {
              //   color: "blue",
              // },
              Button29766907: {
                onClick: () => {
                  setShowDetails(true);
                  setPet(item);
                },
              },
              Button38513715: {
                onClick: () => {
                  if (!showForm) {
                    setShowForm(true);
                  }
                  setUpdatePet(item);
                  setName(item.name);
                  setAge(item.age);
                  setBreed(item.breed);
                  setAbout(item.about);
                  setColor(item.color);
                  setImage(item.image);
                },
              },
            },
          })}
        />
        {/* <PetProfile overrides={petProfileOverride} /> */}
      </header>
      <PetFooter width={"100%"} />
    </div>
  );
}

export default withAuthenticator(App);
