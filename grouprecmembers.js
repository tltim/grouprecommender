document.getElementById("nextBtn").onclick = function() {

  var hrefString = "grouprec.html?";

  var files1 = document.getElementById('selectFiles1').files;
  if (files1.length <= 0) {
    return false;
  }
  var fr1 = new FileReader();
  fr1.onload = function(e) { 
  console.log(e);
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
    console.log(result);
    hrefString += formatted + "&";
    //console.log(formatted);
  }
  fr1.readAsText(files1.item(0));

  var files2 = document.getElementById('selectFiles2').files;
  if (files2.length <= 0) {
    return false;
  }
  var fr2 = new FileReader(); 
  fr2.onload = function(e) { 
  console.log(e);
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
    console.log(result);
    hrefString += formatted + "&";
    //console.log(formatted);
  }
  fr2.readAsText(files2.item(0));

  var files3 = document.getElementById('selectFiles3').files;
  if (files3.length <= 0) {
    return false;
  }
  var fr3 = new FileReader();
  fr3.onload = function(e) { 
  console.log(e);
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result);
    console.log(result);
    hrefString += formatted;
    //console.log(localStorage.getItem("result1"));
    //console.log(formatted);
  }
  fr3.readAsText(files3.item(0));

  setTimeout(function(){window.location.href=hrefString;}, 1000);
}

