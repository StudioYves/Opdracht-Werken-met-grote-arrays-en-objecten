// GET UNORDERED LIST
const getUL = document.querySelector('#listWithResults')

//CLEAN DOM BEFORE NEW SELECTION
const removeSelection = () => {
    getUL.innerHTML = "";
}

// GET BUTTONS
const ButtonLandenlijst = document.querySelector('#btnLandenlijst');
const ButtonSteenbokvrouwen = document.querySelector('#btnSteenbokvrouwen');
const ButtonMeestemensen = document.querySelector('#btnMeestemensen');

//-------------LANDENLIJST-------------------------------------------------------------

//MAPPEN VAN NIEUWE ARRAY MET ALLE LANDEN UIT DE ARRAY RANDOMPERSONDATA
const allCountries = randomPersonData.map((person) => {
    //console.log(person.region);
    return person.region;
});

//WEERGAVE VAN UNIEKE LANDEN
const uniqueCountries = Array.from(new Set(allCountries));

//SORTEER UNIEKE LANDEN OP ALFABETISCHE VOLGORDE
const uniqueCountriesSorted = uniqueCountries.sort();

//ADD EVENT LISTENERS TO BUTTON
const clickButtonLandenlijst = ButtonLandenlijst.addEventListener('click', function(){
    removeSelection();
    
    for(let i=0; i<uniqueCountriesSorted.length; i++) {
        const listItem = document.createElement("li");
        const textNode = document.createElement("country");
        listItem.appendChild(textNode);
        getUL.appendChild(listItem);
        textNode.innerText = uniqueCountriesSorted[i];
    };
});

//--------LIJST MET STEENBOKVROUWEN--------------------------------------------------------


//FILTEREN OP VROUW, OUDER ZIJN DAN 30 (EN STEENBOK ZIJN....HOE DAN??)
const selectionOfPeople = randomPersonData.filter((person) => {
    return person.gender === "female" &&  person.age > 30
});

//MAPPEN VAN ARRAY MET ALLE NAMEN
const onlyNames = selectionOfPeople.map((person) => {
    return person.name + " " + person.surname;
});

//SORTEREN VAN ALLE MENSEN OP VOORNAAM
const onlyNamesSorted = onlyNames.sort();

//MAPPEN VAN ARRAY MET FOTO
const onlyPhoto = selectionOfPeople.map((person) => {
    return person.photo;
});


//ADD EVENT LISTENERS TO BUTTON
const clickButtonSteenbokvrouwen = ButtonSteenbokvrouwen.addEventListener('click', function(){
    removeSelection();
    for(let i=0; i<onlyNamesSorted.length; i++) {
        const listItem = document.createElement("li");
        const textNode = document.createElement("person");
        const newImage = document.createElement("img")
        newImage.setAttribute('src', onlyPhoto[i])
        listItem.appendChild(newImage);
        listItem.appendChild(textNode);
        getUL.appendChild(listItem);
        newImage.innerText = onlyPhoto[i];
        textNode.innerText = onlyNamesSorted[i];
        
    };
});


//-----------------------MEESTE MENSEN PER LAND ----------------------------------------------------


//FUNCTIE OM TE TELLEN
function findOcc(arr, key){
    let arr2 = [];
      
    arr.forEach((x)=>{
         
      // Checking if there is any object in arr2
      // which contains the key value
       if(arr2.some((val)=>{ return val[key] == x[key] })){
           
         // If yes! then increase the occurrence by 1
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["occurrence"]++
           }
        })
           
       }else{
         // If not! Then create a new object initialize 
         // it with the present iteration key's value and 
         // set the occurrence to 1
         let a = {}
         a[key] = x[key]
         a["occurrence"] = 1
         arr2.push(a);
       }
    })
      
    return arr2
  }
    
const outputArray = findOcc(randomPersonData, "region");

const outputArraySorted = outputArray.sort(function(a, b){
    return b.occurrence-a.occurrence
})



//ADD EVENT LISTENERS TO BUTTON
const clickMeestemensen = ButtonMeestemensen.addEventListener('click', function(){
    removeSelection();
    for(let i=0; i<outputArray.length; i++) {
        const listItem = document.createElement("li");
        const textNode = document.createElement("country");
        listItem.appendChild(textNode);
        getUL.appendChild(listItem);
        textNode.innerText = outputArray[i].region + ": " + outputArray[i].occurrence;
    };
    });


