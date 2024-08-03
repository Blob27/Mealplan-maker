
function listfoods() {
    let foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
    var parent = document.getElementById("foodslist");
    parent.replaceChildren();
    if(foodsdict != null) {
        document.getElementById("foodslistmenuButtonDownload").disabled = false;
        document.getElementById("foodslistmenuButtonClear").disabled = false;
        document.getElementById("foodslistmenuButtonEdit").disabled = false;
        var foodslist = document.getElementById("foodslist");
        for([key, val] of Object.entries(foodsdict)) {
            var fooddiv = document.createElement("div");
            fooddiv.className = "Fooddiv";
            
            //Define elements of fooddiv
            var Title = document.createElement("div");
            var Nutrients = document.createElement("div");
            var Macros = document.createElement("div");
            var Carbs = document.createElement("div");
            var Protein = document.createElement("div");
            var Fat = document.createElement("div");
            var Calories = document.createElement("div");
            var CarbsTitle = document.createElement("div");
            var ProteinTitle = document.createElement("div");
            var FatTitle = document.createElement("div");
            var CarbsValue = document.createElement("div");
            var ProteinValue = document.createElement("div");
            var FatValue = document.createElement("div");
            var bottomContainer = document.createElement("div");
            var delib = document.createElement("button");
            var per100 = document.createElement("p");
    
    
    
            Title.className = "Title editable";
            Nutrients.className = "Nutrients";
            Macros.className = "Macros";
            Carbs.classList.add("MacroItem", "Carbs");
            Protein.classList.add("MacroItem", "Protein");
            Fat.classList.add("MacroItem", "Fat");
            Calories.className = "Calories editable";
            CarbsTitle.classList.add("MacroItemTitle", "CarbsTitle");
            ProteinTitle.classList.add("MacroItemTitle", "ProteinTitle");
            FatTitle.classList.add("MacroItemTitle", "FatTitle");
            CarbsValue.classList.add("MacroItemValue", "CarbsValue", "editable");
            ProteinValue.classList.add("MacroItemValue", "ProteinValue", "editable");
            FatValue.classList.add("MacroItemValue", "FatValue", "editable");
            bottomContainer.className = "bottomContainer";
            delib.className = "deleteIndividualButton"
            per100.className = "per100";
    
    
            Title.innerHTML = key;
            CarbsTitle.innerHTML = "Carbs";
            ProteinTitle.innerHTML = "Protein";
            FatTitle.innerHTML = "Fat";
    
            CarbsValue.innerHTML = val[0] + "g";
            ProteinValue.innerHTML = val[1] + "g";
            FatValue.innerHTML = val[2] + "g";
            Calories.innerHTML = val[3] + "kcal";
            per100.innerHTML = "/100g";
            
            delib.innerHTML = "<i class='fas fa-trash'></i>";
            delib.setAttribute("onclick", "confirmDeleteIndividual();");
            bottomContainer.appendChild(per100);
            bottomContainer.appendChild(delib);
            Carbs.appendChild(CarbsTitle);
            Carbs.appendChild(CarbsValue);
            Protein.appendChild(ProteinTitle);
            Protein.appendChild(ProteinValue);
            Fat.appendChild(FatTitle);
            Fat.appendChild(FatValue);
    
            Macros.appendChild(Carbs);
            Macros.appendChild(Protein);
            Macros.appendChild(Fat);
            
            Nutrients.appendChild(Macros);
            Nutrients.appendChild(Calories);
            
    
            fooddiv.appendChild(Title);
            fooddiv.appendChild(Nutrients)
            fooddiv.appendChild(bottomContainer);
            document.getElementById("foodslist").appendChild(fooddiv);
          }
    }
    else {
        document.getElementById("foodslistmenuButtonDownload").disabled = true;
        document.getElementById("foodslistmenuButtonClear").disabled = true;
        document.getElementById("foodslistmenuButtonEdit").disabled = true;
    }
    
}

// function handleSubmit(event) {
//     event.preventDefault();
//     let foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
//     var foodName = document.getElementById("newfoodTitle").value;
//     var Carbs = document.getElementById("newfoodCarbs").value;
//     var Protein = document.getElementById("newfoodProtein");
//     var Fat = document.getElementById("newfoodFat");
//     var Calories = document.getElementById("newfoodCalories"); 
//     var Nutrients = [Carbs, Protein, Fat, Calories];
//     if(foodsdict == null) {foodsdict = {}}
//     foodsdict[foodName.toString()] = Nutrients
//     localStorage.setItem("storedFoods", JSON.stringify(foodsdict));
//     listfoods();
// }

function submitNewFood(foodName, Carbs, Protein, Fat, Calories) {
    let foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
    if(foodsdict == null) {foodsdict = {}}
    for([key, val] of Object.entries(foodsdict)) {
        if(key == foodName) {
            window.alert("This name has already been used.")
            return;
        }
    }
    var Nutrients = [parseFloat(Carbs), parseFloat(Protein), parseFloat(Fat), parseFloat(Calories)];
    
    console.log(foodsdict);
    console.log(foodName);
    foodsdict[foodName.toString()] = Nutrients;
    localStorage.setItem("storedFoods", JSON.stringify(foodsdict));
    listfoods();
}

function downloadFoods() {
    let foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
    if(foodsdict != null) {
        const jsonString = JSON.stringify(foodsdict);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "mealplan.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}


function uploadFoods() {
    var fileselection = document.getElementById("fileselection");
    fileselection.setAttribute("onchange", "HandleUpload(this);");
    fileselection.click();
}

function HandleUpload(input) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(input.files[0]);
    function onReaderLoad(){
        var obj = JSON.parse(reader.result);
            localStorage.setItem("storedFoods", JSON.stringify(obj));
            listfoods();
    }

}

function clearFoods() {
    localStorage.setItem("storedFoods", null);
    listfoods();
}

function Accept(action) {
    action();
    var elements = document.getElementsByClassName("confirmChoiceButton");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementById("message").style.display = "none";
    var elements = document.getElementsByClassName("foodslistmenuButton");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "inline";
    }

}

function Refuse() {
    listfoods();
    var elements = document.getElementsByClassName("confirmChoiceButton");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementById("message").style.display = "none";
    var elements = document.getElementsByClassName("foodslistmenuButton");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "inline";
    }

}


function confirmChoice(message, action) {
    var foodslistmenu = document.getElementById("foodslistmenu");
    var elements = document.getElementsByClassName("foodslistmenuButton");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    var buttonAccept = document.createElement("button");
    var buttonRefuse = document.createElement("button");
    buttonAccept.style.backgroundColor = "green";
    buttonRefuse.style.backgroundColor = "red";
    buttonAccept.className = "confirmChoiceButton";
    buttonRefuse.className = "confirmChoiceButton";
    buttonAccept.onclick = function() {Accept(action);};
    buttonRefuse.onclick = function() {Refuse();};
    var check = document.createElement("i");
    var xmark = document.createElement("i");
    check.classList.add("fas", "fa-check");
    xmark.classList.add("fa-solid", "fa-xmark");
    buttonAccept.appendChild(check);
    buttonRefuse.appendChild(xmark);

    if(document.getElementById("message") == null) {
        var text = document.createElement("span");
        text.innerHTML = message;
        text.id = "message"
        foodslistmenu.appendChild(text);
    } else {
        var messagetext = document.getElementById("message");
        messagetext.innerHTML = message;
        document.getElementById("message").style.display = "inline";
    }

    if(action == uploadFoods) {
        var addImport = document.createElement("button");
        addImport.className = "addImport confirmChoiceButton tooltip";
        addImport.innerHTML = "<i class='fa-solid fa-plus'></i><span style = 'font-size: small' class='tooltiptext'>Foods will be loaded on top of currently loaded foods. Foods with same name will take the value of the imported file.</span>"

        addImport.setAttribute("onclick", "Accept(AddImport);")
        foodslistmenu.appendChild(addImport);

    }

    if(document.getElementById("foodslistmenu").lastChild.classname != "confirmChoiceButton") {
        foodslistmenu.appendChild(buttonAccept);
        foodslistmenu.appendChild(buttonRefuse);
    } else {
        buttonAccept.style.display = "inline";
        buttonRefuse.style.display = "inline";
    }


    
}

function editFoods() {
    var elements = document.getElementsByClassName("editable");
    for(let i = 0; i < elements.length; i++) {
        var text = elements[i].innerText;
        if(elements[i].classList.contains("MacroItemValue")) {
            text = text.replace("g", "");
        }
        if(elements[i].classList.contains("Calories")) {
            text = text.replace("kcal", "");
        }
        elements[i].setAttribute("onfocus", "selectText(this);")
        text = text.replace("kcal", "");
        elements[i].setAttribute("contenteditable", "true");
        elements[i].innerHTML = text;
        allowedKeys = ['Backspace','Tab','Escape','1','2','3','4','5','6','7','8','9','0','.','ArrowLeft','ArrowRight','Delete']
        if(!elements[i].classList.contains("Title")){   
            elements[i].setAttribute("onpaste", "return false;") 
            elements[i].addEventListener('keydown', async (e) => {
                if (!allowedKeys.includes(e.key)) {
                    e.preventDefault();
                    return false;
                } 
            });
        }
    }
}

function saveChanges() {
    var fooddivs = document.getElementsByClassName("Fooddiv");
    var foodsdict = {};

    for(let i = 0; i < fooddivs.length; i++) {
        var fooddiv = fooddivs[i];
        var Title;
        var Carbs;
        var Protein;
        var Fat;
        var Calories;
        var fooddivChildren = fooddiv.children;
        for(let j = 0; j < fooddivChildren.length; j++) {
            Child = fooddivChildren[j];
            Child.setAttribute("contenteditable", "false");
            Child.removeAttribute("onfocus");
            Child.removeAttribute("onpaste");
            Child.removeEventListener('keydown', async (e) => {
                if (!allowedKeys.includes(e.key)) {
                    e.preventDefault();
                    return false;
                } 
            });
            if(Child.classList.contains("Title")) {
                Title = Child.innerText;
            }
            if(Child.classList.contains("Nutrients")){
                var NutrientsChildren = Child.children;
                for(let k = 0; k < NutrientsChildren.length; k++) {
                    var NutrientsChild = NutrientsChildren[k];
                    if(NutrientsChild.classList.contains("Macros")) {
                        var MacrosChildren = NutrientsChild.children;
                        for(let l = 0; l < MacrosChildren.length; l++) {
                            var MacroItem = MacrosChildren[l];
                            var MacroItemChildren = MacroItem.children;
                            for(let p = 0; p < MacroItemChildren.length; p++) {
                                var MacroItemChild = MacroItemChildren[p];
                                if(MacroItemChild.classList.contains("CarbsValue")) {
                                    Carbs = MacroItemChild.innerHTML;
                                }
                                else if(MacroItemChild.classList.contains("ProteinValue")) {
                                    Protein = MacroItemChild.innerHTML;
                                }
                                else if(MacroItemChild.classList.contains("FatValue")) {
                                    Fat = MacroItemChild.innerHTML;
                                }
                            }

                        }
                    }
                    else if(NutrientsChild.classList.contains("Calories")) {
                        Calories = NutrientsChild.innerHTML;
                    }
                }
            }

                
        }
        var Nutrients = [parseFloat(Carbs), parseFloat(Protein), parseFloat(Fat), parseFloat(Calories)];
        if(Title == null || Title == "" || Title.replace(" ", "") == "") {
            window.alert("Can't save changes due to empty field.");
            listfoods();
            return;
        }
        for(let i = 0; i < Nutrients.length; i++) {
            var Nutrient = Nutrients[i];
            if (Nutrient == null || isNaN(Nutrient) || Nutrient == "") {
                window.alert("Can't save changes due to empty field.");
                listfoods();
                return;
            }
        }

        foodsdict[Title.toString()] = Nutrients;
    }
    localStorage.setItem("storedFoods", JSON.stringify(foodsdict));
    listfoods();
}

function selectText(container) {
    var r = document.createRange();
    var w = container;    
    r.selectNodeContents(w);  
    var sel=window.getSelection(); 
    sel.removeAllRanges(); 
    sel.addRange(r); 
}

function checkEmpty() {
    var foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
    if(foodsdict == null) {
        uploadFoods();
    } else {
        confirmChoice('Importing a file will overwrite currently loaded foods.', uploadFoods);
    }
}

function deleteIndividual(button) {
    var fooddiv = button.parentNode.parentNode.parentNode;
    var Title = fooddiv.firstChild.innerHTML;
    var foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
    delete foodsdict[Title];
    localStorage.setItem("storedFoods", JSON.stringify(foodsdict));
    listfoods();
}

function AddImport() {
    var fileselection = document.getElementById("fileselection");
    fileselection.setAttribute("onchange", "HandleAddImport(this);");
    fileselection.click();
}

function HandleAddImport(input) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(input.files[0]);

    function onReaderLoad(){
        
        var obj = JSON.parse(reader.result);
        var foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
        for([key1, val1] of Object.entries(foodsdict)) {
            for([key2, val2] of Object.entries(obj)) {
                if(key1 == key2) {
                    foodsdict[key1] = obj[key2];
                    delete obj[key2];
                }
            }
        }
        for([key, val] of Object.entries(obj)) {
            foodsdict[key] = obj[key];
        }
        localStorage.setItem("storedFoods", JSON.stringify(foodsdict));
        listfoods();
    }
}

function confirmDeleteIndividual() {
    var els = document.getElementsByClassName("deleteIndividualButton");
    for(let i = 0; i < els.length; i++) {
        els[i].style.display = "none";
    }

    
    var bottomContainers = document.getElementsByClassName("bottomContainer");
    for(let i = 0; i < bottomContainers.length; i++) {
        var confirmDI = document.createElement("button");
        var rejectDI = document.createElement("button");
        confirmDI.className = "deleteIndividualButtonAccept confirmDIButton";
        rejectDI.className = "deleteIndividualButtonReject confirmDIButton";
        confirmDI.setAttribute("onclick", "AcceptDeleteIndividual(this);");
        rejectDI.setAttribute("onclick", "RejectDeleteIndividual(this)")
        var check = document.createElement("i");
        var xmark = document.createElement("i");
        check.classList.add("fas", "fa-check");
        xmark.classList.add("fa-solid", "fa-xmark");
        confirmDI.appendChild(check);
        rejectDI.appendChild(xmark);
        var contain = document.createElement("div");
        contain.className = "containconfirmDI"
        contain.appendChild(confirmDI);
        contain.appendChild(rejectDI);
        bottomContainers[i].appendChild(contain);   
    }

}

function AcceptDeleteIndividual(button) {
    deleteIndividual(button)
    var els = document.getElementsByClassName("containconfirmDI");
    for(let i = 0; i < els.length; i++) {
        els[i].style.display = "none";
    }

    var elems = document.getElementsByClassName("deleteIndividualButton")
    for(let i = 0; i < elems.length; i++) {
        elems[i].style.display = "inline"
    }
    listfoods();
}

function RejectDeleteIndividual(button) {
    var els = document.getElementsByClassName("containconfirmDI");
    for(let i = 0; i < els.length; i++) {
        els[i].style.display = "none";
    }

    var elems = document.getElementsByClassName("deleteIndividualButton")
    for(let i = 0; i < elems.length; i++) {
        elems[i].style.display = "inline"
    }
    listfoods();
}

function changeButton() {
    var AddMealButton = document.getElementById("addMeal");
    var AddMealform = document.createElement("form")
    AddMealButton.style.display = "none"
    var AddMealInput = document.createElement("input");
    AddMealInput.className = "AddMealInput";
    AddMealInput.id = "AddMealInput";
    AddMealInput.placeholder = "Enter meal name";
    AddMealInput.setAttribute("required", "true");
    AddMealInput.name = "mealName";
    AddMealform.appendChild(AddMealInput)
    AddMealform.setAttribute("onsubmit", "HandleAddMeal(this);")
    let mealplangrid = AddMealButton.parentNode;
    mealplangrid.appendChild(AddMealform);
    AddMealInput.focus();

    // else {
    //     var them = document.getElementsByClassName("AddMealInput");
    //     for(let i = 0; i<them; i++) {
    //         them[i].style.display = "inline";
    //     }
    // }

//     var table = document.getElementById("maintable");
//     var Newrow = document.createElement("td");
//     var addFood = document.createElement("button");
//     addFood.innerHTML = "add Meal";
//     addFood.id = "addFoodmealplan"
//     Newrow.appendChild(addFood);
//     table.insertBefore(Newrow, table.firstChild);
    
}


function HandleAddMeal(form) {
    //template
    // var mealplan = {
    //     Title :{
    //     meal1: {
    //         apple: 100,
    //         banana: 900
    //     },
    //     meal2: {
    //         oatshoney: 100,
    //         yoghurt: 200
    //     }
    // }
    // }

    let mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    if(mealplanwhole == null) {mealplanwhole = {"Mealplan": {}}};
    let mealplan = Object.values(mealplanwhole)[0];
    let mealname = form.mealName.value;
    for([key, val] of Object.entries(mealplan)) {
        if(key == mealname) {
            window.alert("This name has already been used.");
            return;
        }
    }
    let newmeal = {};
    mealplanwhole[Object.keys(mealplanwhole)[0]][mealname.toString()] = newmeal;
    localStorage.setItem("mealplan", JSON.stringify(mealplanwhole));
    

    // var maintable = document.getElementById("maintable");
    // var newrow = document.createElement("tr");
    // var newblock = document.createElement("td");
    // newblock.className = "newblock";
    // var newFoodButton = document.createElement("button");
    // newFoodButton.className = "newFoodButtonMP buttontoinput"
    // newFoodButton.innerHTML = "Add Food"
    // var mealheader = document.createElement("div");
    // mealheader.className = "mealheader";
    // var headerblock = document.createElement("td");
    // var headerrow = document.createElement("tr");
    // mealheader.innerHTML = input.value;
    // headerblock.appendChild(mealheader);
    // headerrow.append(headerblock);
    // newblock.appendChild(newFoodButton);
    // newrow.appendChild(newblock);
    // maintable.insertBefore(headerrow, maintable.firstChild);
    // maintable.insertBefore(newrow, maintable.lastChild);
    // document.getElementById("AddMealInput").style.display = "none";
    // document.getElementById("addMeal").style.display = "inline";

}

function addFood(button) {
    var mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    mealplanwhole[Object.keys(mealplanwhole)[0]][button.parentNode.parentNode.id][null] = null;
    localStorage.setItem("mealplan", JSON.stringify(mealplanwhole));
    listMealPlan();
}

function listaddfoodbutton() {
    var addmealbutton = document.createElement("button")
    addmealbutton.setAttribute("onclick", "changeButton();")
    addmealbutton.id = "addMeal";
    addmealbutton.className = "buttontoinput";
    addmealbutton.innerHTML = "Add Meal";
    var addmealbar = document.createElement("tr");
    var addmealblock = document.createElement("td");
    addmealblock.appendChild(addmealbutton);
    addmealbar.appendChild(addmealblock);
    addmealblock.setAttribute("colspan", "2");

    if(document.getElementById("addMeal") == null) {
        maintable.appendChild(addmealbar);
    }
    else {
        document.getElementById("addMeal").style.display = "inline";
    }
}

function listMealPlan() {
    let foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
    let mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    var maintable = document.getElementById("maintable");
    if(mealplanwhole == null) {
        document.getElementById("savemealplan").disabled = true;
        document.getElementById("clearmealplan").disabled = true;
        maintable.replaceChildren();
        listaddfoodbutton();
        return;
    } else {
        document.getElementById("savemealplan").disabled = false;
        document.getElementById("clearmealplan").disabled = false;
    }
    let bigtotalcarbs = 0;
    let bigtotalprotein = 0;
    let bigtotalfat = 0;
    let bigtotalkcal = 0;
    var mealplantitle = document.getElementById("mealplantitleTE")
    mealplantitle.value = Object.keys(mealplanwhole)[0]
    var mealplangrid = document.getElementById("mealplangrid");
    maintable.replaceChildren();
    let mealplan = Object.values(mealplanwhole)[0];
    for([mealname, mealdict] of Object.entries(mealplan)) {
        maintable = document.getElementById("maintable");
        var mealheaderbar = document.createElement("tr");
        var mealheaderblock = document.createElement("td");
        var carbsheaderblock = document.createElement("td");
        var proteinheaderblock = document.createElement("td");
        var fatheaderblock = document.createElement("td");
        mealheaderblock.innerHTML = mealname;
        carbsheaderblock.innerHTML = "Carbs";
        proteinheaderblock.innerHTML = "Protein";
        fatheaderblock.innerHTML = "Fat";

        mealheaderblock.className = "mealheader";
        carbsheaderblock.className = "MacroHeader CarbsHeader";
        proteinheaderblock.className = "MacroHeader ProteinHeader";
        fatheaderblock.className = "MacroHeader FatHeader";
        mealheaderbar.appendChild(mealheaderblock);
        meal = mealplan[mealname];
        if(!Object.keys(meal).length < 1) {
            mealheaderbar.appendChild(carbsheaderblock);
            mealheaderbar.appendChild(proteinheaderblock);
            mealheaderbar.appendChild(fatheaderblock);
        }
        maintable.appendChild(mealheaderbar);
        if(mealdict == null) {
            return;
        }
        foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
        for([foodname, foodvalue] of Object.entries(mealdict)) {
            var newfoodbar = document.createElement("tr");
            newfoodbar.dataset["mealname"] = mealname;
            newfoodbar.dataset["foodname"] = foodname;
            var nameandvalueblock = document.createElement("td");
            var valuediv = document.createElement("div");
            var namediv = document.createElement("div");
            var valueinput = document.createElement("input");
            var deleteIndividualMP = document.createElement("button");
            var trash = document.createElement("i")
            var nameinput = document.createElement("select");
            var carbsvalue = document.createElement("td");
            var proteinvalue = document.createElement("td");
            var fatvalue = document.createElement("td");
            var subkcal = document.createElement("td");
            var gramsymbol = document.createElement("span")
            nameinput.style.width = "100%"
            nameandvalueblock.className = "nameandvalueblock";
            valuediv.className = "valuediv";
            namediv.className = "namediv";
            trash.classList.add("fas", "fa-trash");
            deleteIndividualMP.appendChild(trash);
            deleteIndividualMP.className = "deleteIndividualButton";
            deleteIndividualMP.setAttribute("onclick", "deleteIndividualMP(this);")
            valueinput.className = "valueinput";
            nameinput.className = "nameinput";
            carbsvalue.className = "carbsvaluemp";
            proteinvalue.className = "proteinvaluemp";
            gramsymbol.className = "gramsymbol";
            fatvalue.className = "fatvaluemp";
            subkcal.className = "subkcals"
            gramsymbol.innerHTML = "g";
            nameinput.setAttribute("onchange", "updateFoodName(this);");
            valueinput.setAttribute("onchange", "updateFoodValue(this);");
            subkcal.style.fontStyle = "italic";

            valueinput.setAttribute("type", "number");
            for(key of Object.keys(foodsdict)) {
                var option = document.createElement("option");
                option.value = key;
                option.innerHTML = key;
                nameinput.appendChild(option);
            }
            nameinput.value = foodname;
            if(foodvalue != null && foodvalue != "null") {
                valueinput.value = foodvalue;
            } else valueinput.placeholder = 0;
            if(foodname != "null" && foodvalue != null) {
                carbsvalue.innerHTML = Math.round(((foodsdict[foodname][0]*(foodvalue/100)) + Number.EPSILON) * 100) / 100 + "g";
                proteinvalue.innerHTML = Math.round(((foodsdict[foodname][1]*(foodvalue/100)) + Number.EPSILON) * 100) / 100 + "g";
                fatvalue.innerHTML = Math.round(((foodsdict[foodname][2]*(foodvalue/100)) + Number.EPSILON) * 100) / 100 + "g";
                subkcal.innerHTML = Math.round(((foodsdict[foodname][3]*(foodvalue/100)) + Number.EPSILON) * 100) / 100 + "kcal";
            }
            namediv.appendChild(nameinput);
            nameandvalueblock.appendChild(deleteIndividualMP);
            if(foodname != null && foodname != "null") {
                valuediv.appendChild(valueinput);
                nameandvalueblock.appendChild(valuediv);
                nameandvalueblock.appendChild(gramsymbol);
            } else namediv.style.width = "100%";
            nameandvalueblock.appendChild(namediv);
            newfoodbar.appendChild(nameandvalueblock);
            newfoodbar.appendChild(carbsvalue);
            newfoodbar.appendChild(proteinvalue);
            newfoodbar.appendChild(fatvalue);
            newfoodbar.appendChild(subkcal);
            maintable.appendChild(newfoodbar);
            delete foodsdict[foodname];
        }
        var addfoodbar = document.createElement("tr");
        var addfoodblock = document.createElement("td");
        var carbstotal = document.createElement("td");
        var proteintotal = document.createElement("td");
        var fattotal = document.createElement("td");
        var kcaltotal = document.createElement("td");
        var addfoodbutton = document.createElement("button");
        addfoodbutton.className = "addFoodmealplan";
        addfoodbutton.innerHTML = "Add Food";
        addfoodbutton.setAttribute("onclick", "addFood(this);")
        addfoodbar.style.lineHeight = "50px";

        addfoodbar.id = mealname;
        addfoodblock.appendChild(addfoodbutton);
        addfoodbar.appendChild(addfoodblock);
        var ctot = 0;
        var ptot = 0;
        var ftot = 0;
        var ktot = 0;
        if(!Object.values(mealplan[mealname]).length < 1) {
            foodsdict = JSON.parse(localStorage.getItem("storedFoods"));
            for([key, val] of Object.entries(mealplan[mealname])){
                if(key == "null") {
                    continue;
                }
                if(val == null) {
                    continue;
                }
                ctot = (Math.round(((ctot + foodsdict[key][0]*(val/100)) + Number.EPSILON) * 100) / 100);
                ptot = (Math.round(((ptot + foodsdict[key][1]*(val/100)) + Number.EPSILON) * 100) / 100);
                ftot = (Math.round(((ftot + foodsdict[key][2]*(val/100)) + Number.EPSILON) * 100) / 100);
                ktot = (Math.round(((ktot + foodsdict[key][3]*(val/100)) + Number.EPSILON) * 100) / 100);
            }
            carbstotal.innerHTML = ctot + "g";
            proteintotal.innerHTML = ptot + "g";
            fattotal.innerHTML = ftot + "g";
            kcaltotal.innerHTML = ktot + "kcal";
            carbstotal.style.fontStyle = "italic";
            proteintotal.style.fontStyle = "italic";
            fattotal.style.fontStyle = "italic";
            kcaltotal.style.fontWeight = "bold";
            addfoodbar.appendChild(carbstotal);
            addfoodbar.appendChild(proteintotal);
            addfoodbar.appendChild(fattotal);
            addfoodbar.appendChild(kcaltotal);
        }
        maintable.appendChild(addfoodbar);
        bigtotalcarbs = bigtotalcarbs + ctot;
        bigtotalprotein = bigtotalprotein + ptot;
        bigtotalfat = bigtotalfat + ftot;
        bigtotalkcal = bigtotalkcal + ktot;
    }
    var carbsdisplay = document.getElementById("carbstotalinfo");
    var proteindisplay = document.getElementById("proteintotalinfo");
    var fatdisplay = document.getElementById("fattotalinfo");
    var kcaldisplay = document.getElementById("kcaltotalinfo");
    carbsdisplay.innerHTML = "Carbs: " + bigtotalcarbs;
    proteindisplay.innerHTML = "Protein: " + bigtotalprotein;
    fatdisplay.innerHTML = "Fat: " +  bigtotalfat;
    kcaldisplay.innerHTML = "Total calories: " + bigtotalkcal;
    listaddfoodbutton();
    $("select").select2();
}

function updateFoodName(input) {
    let mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    let mealplan = mealplanwhole[Object.keys(mealplanwhole)[0]];
    let mealname = input.parentNode.parentNode.parentNode.getAttribute("data-mealname");
    let foodname = input.parentNode.parentNode.parentNode.getAttribute("data-foodname");
    console.log(mealname);
    if(foodname == "null") {
        foodname = null;
    }
    let oldvalue
    console.log(mealplan[mealname])
    if(foodname == null) {
        oldvalue = null;
    } else {oldvalue = mealplan[mealname][foodname];}
    delete mealplanwhole[Object.keys(mealplanwhole)[0]][mealname][foodname];
    mealplanwhole[Object.keys(mealplanwhole)[0]][mealname][input.value] = oldvalue;
    localStorage.setItem("mealplan", JSON.stringify(mealplanwhole));
    listMealPlan();
}

function updateFoodValue(input) {
    let mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    let mealplan = Object.keys(mealplanwhole)[0];
    let mealname = input.parentNode.parentNode.parentNode.getAttribute("data-mealname");
    let foodname = input.parentNode.parentNode.parentNode.getAttribute("data-foodname");
    mealplanwhole[Object.keys(mealplanwhole)[0]][mealname][foodname] = input.value;
    localStorage.setItem("mealplan", JSON.stringify(mealplanwhole));
    listMealPlan();
}

function updateMPTitle(form) {
    var newname = form.mealplantitleTE.value;
    var mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    if(mealplanwhole == null) {
        mealplanwhole = {};
        mealplanwhole[newname] = {};
        localStorage.setItem("mealplan", JSON.stringify(mealplanwhole));
        listMealPlan();
        return;
        }
    var oldmealplan = mealplanwhole[Object.keys(mealplanwhole)[0]]
    delete mealplanwhole[Object.keys(mealplanwhole)[0]]
    mealplanwhole[newname] = oldmealplan;
    localStorage.setItem("mealplan", JSON.stringify(mealplanwhole));
    listMealPlan();
}

function clearMealPlan() {
    localStorage.setItem("mealplan", null);
    listMealPlan();
}

function confirmChoiceMP(message, action) {
    var configmealplan = document.getElementById("configmealplan");
    var elements = document.getElementsByClassName("configmealplanbuttons");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    var buttonAccept = document.createElement("button");
    var buttonRefuse = document.createElement("button");
    buttonAccept.style.backgroundColor = "green";
    buttonRefuse.style.backgroundColor = "red";
    buttonAccept.className = "confirmChoiceButtonMP";
    buttonRefuse.className = "confirmChoiceButtonMP";
    buttonAccept.onclick = function() {AcceptMP(action);};
    buttonRefuse.onclick = function() {RefuseMP();};
    var check = document.createElement("i");
    var xmark = document.createElement("i");
    check.classList.add("fas", "fa-check");
    xmark.classList.add("fa-solid", "fa-xmark");
    buttonAccept.appendChild(check);
    buttonRefuse.appendChild(xmark);
    var ell = document.createElement("button");
    ell.innerHTML = "hello";
    

    if(document.getElementById("messageMP") == null) {
        var text = document.createElement("span");
        text.innerHTML = message;
        text.id = "messageMP"
        configmealplan.appendChild(text);
    } else {
        var messagetext = document.getElementById("messageMP");
        messagetext.innerHTML = message;
        document.getElementById("messageMP").style.display = "inline";
    }

    if(configmealplan.lastChild.classname != "confirmChoiceButtonMP") {
        configmealplan.appendChild(buttonAccept);
        configmealplan.appendChild(buttonRefuse);
    } else {
        buttonAccept.style.display = "inline";
        buttonRefuse.style.display = "inline";
    }


    
}

function AcceptMP(action) {
    action();
    var elements = document.getElementsByClassName("confirmChoiceButtonMP");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementById("messageMP").style.display = "none";
    var elements = document.getElementsByClassName("configmealplanbuttons");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "inline";
    }

}

function RefuseMP() {
    listMealPlan();
    var elements = document.getElementsByClassName("confirmChoiceButtonMP");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementById("messageMP").style.display = "none";
    var elements = document.getElementsByClassName("configmealplanbuttons");
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = "inline";
    }

}

function uploadMealPlan() {
    var fileselection = document.getElementById("fileselectionMP");
    fileselection.setAttribute("onchange", "HandleUploadMP(this);");
    fileselection.click();
}

function HandleUploadMP(fileselection) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(fileselection.files[0]);
    function onReaderLoad(){
        var obj = JSON.parse(reader.result);
        localStorage.setItem("mealplan", JSON.stringify(obj));
        listMealPlan();
    }

}

function checkEmptyMP() {
    var mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    if(mealplanwhole == null) {
        uploadMealPlan();
    } else {
        confirmChoiceMP('Importing a file will overwrite the currently loaded meal plan.', uploadMealPlan);
    }
}

function downloadMealPlan() {
    let mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    if(mealplanwhole != null) {
        const jsonString = JSON.stringify(mealplanwhole);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        var mealplanname = Object.keys(mealplanwhole)[0];
        a.download = mealplanname + ".json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function deleteIndividualMP(button) {
    let mealplanwhole = JSON.parse(localStorage.getItem("mealplan"));
    let mealname = button.parentNode.parentNode.getAttribute("data-mealname");
    let foodname = button.parentNode.parentNode.getAttribute("data-foodname");
    delete mealplanwhole[Object.keys(mealplanwhole)[0]][mealname][foodname]
    localStorage.setItem("mealplan", JSON.stringify(mealplanwhole));
    listMealPlan();
}