class student{
    constructor(name,rollNo,year,stream){
        this.name=name;
        this.rollNo=rollNo;
        this.year=year;
        this.stream=stream;
    }
}
let index=0,pos=0;
var stud = [];
$(document).ready(function(){
    if(!(typeof(sessionStorage.getItem("stud"))=='undefined')) 
        stud=JSON.parse(sessionStorage.getItem("stud"));
    
    if(stud!=null && stud.length>0){
        document.getElementById("table1").style.display="show";
        for(let i=0;i<stud.length;i++)
            addToTable(stud,i);
    }
    $("#editButton").click(function(){
        editDetails();
    });

    $("#submit_button").click(function(){
        submitDetails();
    });

    $("#deleteButton").click(function() {
        deleteDetails();
    });

    $("#submitModal").click(function(){
        editSubmit();
    });
});

submitDetails = () =>{

    let n=document.getElementById("formName").value;
    let r=document.getElementById("formRollNO").value;
    let y=document.getElementById("formPassoutYear").value;
    let s=document.getElementById("formStream").value;
    if(n == "" || n == null || r == "" || r == null || y == "" || y == null || s == "" || s == null ){
        alert("Fields can't be empty!");
        return false;
    }
    newStud = new student(n,r,y,s);
    console.log(newStud);
    stud.push(newStud);

    window.sessionStorage.setItem("stud",JSON.stringify(stud));

    addToTable(stud,index);
    window.location.reload(true);
    document.getElementById("mainForm").reset();
}

function addToTable(stud,index){
    console.log(stud[index]);
    let tableBody = document.getElementById("tableBody");

    let nodeCheck = document.createElement("input");
    nodeCheck.type = "checkbox";
    nodeCheck.classname = "ch";
    nodeCheck.name = "box";

    let tdName = document.createElement("td");
    let tdRollNO = document.createElement("td");
    let tdStream = document.createElement("td");
    let tdPassoutYear = document.createElement("td");;
    let tdSelect = document.createElement("td");
    let tr = document.createElement("tr");
    tr.name = "rows";
    
    tdName.appendChild(document.createTextNode(stud[index].name));
    tr.appendChild(tdName);
    tdRollNO.appendChild(document.createTextNode(stud[index].rollNo));
    tr.appendChild(tdRollNO);
    tdPassoutYear.appendChild(document.createTextNode(stud[index].year));
    tr.appendChild(tdPassoutYear);
    tdStream.appendChild(document.createTextNode(stud[index].stream));
    tr.appendChild(tdStream);
    tdSelect.appendChild(nodeCheck);
    tr.appendChild(tdSelect);
    tableBody.appendChild(tr);
    index++;
}
function editDetails(){
    let checkBox = document.getElementsByName("box");
    let count = 0;

    for (let x=0; x<checkBox.length; x++){
        if(checkBox[x].checked){
            count++;
            pos = x;
        }
    }

    let storedStud=(JSON.parse(sessionStorage.getItem("stud")))[pos];
    if (count > 1){
        alert("Only select single row to edit.");
    } else if (count < 1) {
        alert("Select a row to edit");
    } else {
        $("#editDataModal").modal();
        $("#nameDetails").val(storedStud.name);
        $("#rollNoDetails").val(storedStud.id);
        $("#passoutYearDetails").val(storedStud.year);
        $("#streamDetails").val(storedStud.stream);
        
        ch[pos].checked = false;
    }

}

function editSubmit(){
    let table = $("#tableBody > tr");
    console.log(table);
    let data = table[pos].childNodes;

    data[0].innerHTML = stud[pos].name = $("#nameDetails").val();
    data[1].innerHTML = stud[pos].id = $("#rollNoDetails").val();
    data[2].innerHTML = stud[pos].year = $("#passoutYearDetails").val();
    data[3].innerHTML = stud[pos].stream = $("#streamDetails").val();
    window.sessionStorage.setItem("stud",JSON.stringify(stud));
    
    $("#editDataModal").modal("hide");
}
function allClick() {
    let allCheck=document.getElementById("allcheck");
    let checkBox = document.getElementsByName("box");
    
    if(allCheck.checked){
        for(let i=0;i<checkBox.length;i++)
            checkBox[i].checked=true;
    }
    else {
        for(let i=0;i<checkBox.length;i++)
            checkBox[i].checked=false;
    }
}
function deleteDetails() {
    let table_Body = document.getElementById("tableBody");
    let checkBox = document.getElementsByName("box");
    let count = 0;

    for (let x=0;x<checkBox.length; x++){
        if(checkBox[x].checked){
            table_Body.deleteRow(x);
            stud.splice(x,1);
            x=-1;
            count++;
        }
    }
    if(count==0){
        alert("Select a row to delete");
    }
    else{
        window.sessionStorage.setItem("stud",JSON.stringify(stud));
        index -= count;

        if(stud.length==0){
            document.getElementById("table1").style.display="none";
        }
    }
}
