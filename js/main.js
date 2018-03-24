let nameN = [];
let rollNo = [];
let passoutYear = [];
let stream = [];
let index=0,pos=0;

$(document).ready(function(){
    let nameN=JSON.parse(sessionStorage.getItem("nameN"));
    let rollNo=JSON.parse(sessionStorage.getItem("rollNo"));
    let stream=JSON.parse(sessionStorage.getItem("stream"));
    let passoutYear=JSON.parse(sessionStorage.getItem("passoutYear"));
    
    if(nameN.length==0){
        document.getElementById("table1").style.display="none";
    }

    for(let i=0;i<nameN.length;i++){
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
        
        tdName.appendChild(document.createTextNode(nameN[index]));
        tr.appendChild(tdName);
        tdRollNO.appendChild(document.createTextNode(rollNo[index]));
        tr.appendChild(tdRollNO);
        tdPassoutYear.appendChild(document.createTextNode(passoutYear[index]));
        tr.appendChild(tdPassoutYear);
        tdStream.appendChild(document.createTextNode(stream[index]));
        tr.appendChild(tdStream);
        tdSelect.appendChild(nodeCheck);
        tr.appendChild(tdSelect);
        tableBody.appendChild(tr);
        index++;
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

function submitDetails(){

    document.getElementById("table1").style.display="show";
    let n=document.getElementById("formName").value;
    let r=document.getElementById("formRollNO").value;
    let y=document.getElementById("formPassoutYear").value;
    let s=document.getElementById("formStream").value;
    
    if(n == "" || n == null || r == "" || r == null || y == "" || y == null || s == "" || s == null ){
        alert("Fields can't be empty!");
        return false;
    }
    nameN.push(n);
    rollNo.push(r);
    passoutYear.push(y);
    stream.push(s);

    window.sessionStorage.setItem("rollNo",JSON.stringify(rollNo));
    window.sessionStorage.setItem("nameN",JSON.stringify(nameN));
    window.sessionStorage.setItem("passoutYear",JSON.stringify(passoutYear));
    window.sessionStorage.setItem("stream",JSON.stringify(stream));

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
    
    tdName.appendChild(document.createTextNode(nameN[index]));
    tr.appendChild(tdName);
    tdRollNO.appendChild(document.createTextNode(rollNo[index]));
    tr.appendChild(tdRollNO);
    tdPassoutYear.appendChild(document.createTextNode(passoutYear[index]));
    tr.appendChild(tdPassoutYear);
    tdStream.appendChild(document.createTextNode(stream[index]));
    tr.appendChild(tdStream);
    tdSelect.appendChild(nodeCheck);
    tr.appendChild(tdSelect);
    tableBody.appendChild(tr);
    index++;

    document.getElementById("mainForm").reset();
}

function editDetails(){
    let ch = document.getElementsByName("box");
    let count = 0;

    for (let x=0; x<ch.length; x++){
        if(ch[x].checked){
            count++;
            pos = x;
        }
    }

    let storedNameN=JSON.parse(sessionStorage.getItem("nameN"));
    let storedRollNo=JSON.parse(sessionStorage.getItem("rollNo"));
    let storedStream=JSON.parse(sessionStorage.getItem("stream"));
    let storedPassoutYear=JSON.parse(sessionStorage.getItem("passoutYear"));
    
    if (count > 1){
        alert("Only select single row to edit.");
    } else if (count < 1) {
        alert("Select a row to edit");
    } else {
        $("#editDataModal").modal();
        $("#nameDetails").val(storedNameN[pos]);
        $("#rollNoDetails").val(storedRollNo[pos]);
        $("#passoutYearDetails").val(storedPassoutYear[pos]);
        $("#streamDetails").val(storedStream[pos]);
        
        ch[pos].checked = false;
    }

}

function editSubmit(){
    let table = $("#tableBody > tr");
    console.log(table);
    let data = table[pos].childNodes;

    data[0].innerHTML = nameN[pos] = $("#nameDetails").val();
    data[1].innerHTML = rollNo[pos] = $("#rollNoDetails").val();
    data[2].innerHTML = passoutYear[pos] = $("#passoutYearDetails").val();
    data[3].innerHTML = stream[pos] = $("#streamDetails").val();

    window.sessionStorage.setItem("rollNo",JSON.stringify(rollNo));
    window.sessionStorage.setItem("nameN",JSON.stringify(nameN));
    window.sessionStorage.setItem("passoutYear",JSON.stringify(passoutYear));
    window.sessionStorage.setItem("stream",JSON.stringify(stream));

    $("#editDataModal").modal("hide");
}

function deleteDetails() {
    let table_Body = document.getElementById("tableBody");
    let ch = document.getElementsByName("box");
    let count = 0;

    for (let x=0;x<ch.length; x++){
        if(ch[x].checked){
            table_Body.deleteRow(x);
            nameN.splice(x,1);
            rollNo.splice(x,1);
            passoutYear.splice(x,1);
            stream.splice(x,1);
            x=-1;
            count++;
        }
    }
    if(count==0){
        alert("Select a row to delete");
    }
    else{
        window.sessionStorage.setItem("rollNo",JSON.stringify(rollNo));
        window.sessionStorage.setItem("nameN",JSON.stringify(nameN));
        window.sessionStorage.setItem("passoutYear",JSON.stringify(passoutYear));
        window.sessionStorage.setItem("stream",JSON.stringify(stream));
        index -= count;

        if(nameN.length==0){
            document.getElementById("table1").style.display="none";
        }
    }
}
