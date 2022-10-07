var btnCheck_status = document.getElementById("btn_status");
var check_status = document.querySelector('input[name="group1"]:checked');
// var check_status2 = document.getElementById("radio2");

//btnCheck_status.addEventListener('click', getValue);
btnCheck_status.addEventListener("click", getValue);
function getValue() {
  if (document.getElementById("radio1").checked == true) {
     console.log("Click radio1");
     window.open("./flight_status.html", "_blank");
     
  }
  if (document.getElementById("radio2").checked == true) {
     console.log("Click radio2");
     window.open("./weather.html", "_blank");
  }
   
  if (document.getElementById("radio3").checked == true) {
   console.log("Click radio2");
   window.open("./flight_info.html", "_blank");
}
  console.log(check_status);

  // if (check_status1.value === "1") {
  //    console.log("open flight_status.html ");
  //    window.open("./flight_status.html", "_blank");
  // }
  // if (check_status2.value === "2") {
  //    alert(check_status2.value);
  //    console.log("open weather.html ");
  //    window.open("./weather.html", "_blank");
  // }
}
