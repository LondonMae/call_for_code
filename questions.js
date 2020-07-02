function showMask() {
  document.getElementById('q1').style.display='none';
  document.getElementById('q2').style.display='block';
}

function showMask1() { //connected with the "next" button on dropdown question
  document.getElementById('q2').style.display = 'none';
  document.getElementById('cal').style.display='block';

  var original = document.getElementById('column');

  for(var i = 0; i < 6; i++){
    var clone = original.cloneNode(true);
    original.parentNode.appendChild(clone);
  }
}

function changeSelect() {
  if(document.getElementById("text").style.visibility == "visible") {
    document.getElementById("text").style.visibility = "hidden";
  }
}
