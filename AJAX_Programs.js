function OpenWinProgram() {
  var queryString = location.search.substring(1);
  var a = queryString.split("|");
  var departmentID = a[0];
  var programID = a[1];
  var XHR = new XMLHttpRequest();
  XHR.open("get", "JSON_Programs.json", true);
  XHR.onreadystatechange = function () {
    if (XHR.readyState == 2);
    else if (XHR.readyState == 3);
    else if (XHR.readyState == 4 && XHR.status == 200) {
      var ProgramsData = eval("(" + XHR.responseText + ")");

      for (let index = 0; index < ProgramsData.length; index++) {
        for (
          let index2 = 0;
          index2 < ProgramsData[index].Department.Programs.length;
          index2++
        ) {
          if (
            ProgramsData[index].Department.id == departmentID &&
            ProgramsData[index].Department.Programs[index2].id == programID
          ) {
            document.getElementById("programDetails").innerHTML = `
                      <img src="logo.png" class="card-img-top w-75" alt="...">
                      <div class="card-body">
                        <h3 class="card-title">${ProgramsData[index].Department.Name}</h3>
                        <h5 class="card-title">${ProgramsData[index].Department.Programs[index2].Name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                     </div>
                     <ul class="list-group list-group-flush ">
                     <li class="list-group-item bg-dark text-white border border-2 border-primary">Version: ${ProgramsData[index].Department.Programs[index2].Version}</li>
                     <li class="list-group-item bg-dark text-white border border-2 border-primary">Core Type: ${ProgramsData[index].Department.Programs[index2].CoreType} </li>
                     <li class="list-group-item bg-dark text-white border border-2 border-primary">Size: ${ProgramsData[index].Department.Programs[index2].Size}</li>
                     </ul>
                   <div class="card-body">
                  <a href="${ProgramsData[index].Department.Programs[index2].Link}" class="btn btn-primary ">Click here for downloud</a>
                 </div>
               </div>`;
          }
        }
      }
    } else {
      alert("Error");
    }
  };
  XHR.send();
}

function searchProgram() {
  var searchInput = document.getElementById("searchInput").value;
  var contant = "";
  var XHR = new XMLHttpRequest();
  XHR.open("get", "JSON_Programs.json", true);
  XHR.onreadystatechange = function () {
    if (XHR.readyState == 2);
    else if (XHR.readyState == 3);
    else if (XHR.readyState == 4 && XHR.status == 200) {
      var ProgramsData = eval("(" + XHR.responseText + ")");

      for (let index = 0; index < ProgramsData.length; index++) {
        for (
          let index2 = 0;
          index2 < ProgramsData[index].Department.Programs.length;
          index2++
        ) {
          if (searchInput == "") {
            document.getElementById("searchProgramsResult").innerHTML = ``;
          } else {
            if (
              ProgramsData[index].Department.Programs[
                index2
              ].Name.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              contant += `
                   <li class="list-group-item"><a href="Program.html?${
                     ProgramsData[index].Department.id
                   }|${
                ProgramsData[index].Department.Programs[index2].id
              }" target="_blank"  class="text-primary cursor-pointer">
                       ${
                         ProgramsData[index].Department.Programs[index2].Name
                       } <span class="text-info">${
                ProgramsData[index].Department.Programs[index2].Version
              }</span>
                   <span class="text-warning" > ${
                     ProgramsData[index].Department.Programs[index2].CoreType ==
                     ""
                       ? ""
                       : "(" +
                         ProgramsData[index].Department.Programs[index2]
                           .CoreType +
                         ")"
                   }</span> <span class="text-success">(${
                ProgramsData[index].Department.Programs[index2].Size
              }) </span>  
                   </a></li>`;
            } else {
              document.getElementById("searchProgramsResult").innerHTML = ``;
            }
          }
        }
        
        document.getElementById(
          "searchProgramsResult"
        ).innerHTML = `${contant}`;
      }
    } else {
      alert("Error");
    }
  };
  XHR.send();
}
