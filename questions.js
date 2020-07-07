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
  var x = document.getElementsByTagName('DIV')
  for(var i = 0; i < x.length; i++){
    if (x[i].className == 'option' || x[i].style.visibility == 'hidden')
        x[i].style.visibility = 'visible';
    else if(x[i].className == 'text' || x[i].style.visibility == 'visible')
      x[i].style.visibility = 'hidden';
   }

}
