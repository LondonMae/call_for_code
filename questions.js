function showMask() {
  /*var node = document.getElementById('q'); I tried doing this if statement to be more efficient but it doesn't show the second question.
    if (node.style.visibility=='visible') { Both divs had the ID "q" so I'm not sure how to efficiently do this. Right now I only have those
        node.style.visibility = 'hidden'; simple line statements working.
    }
    else
        node.style.visibility = 'visible'*/
  document.getElementById('q1').style.display='none'; //I was using visibilty here but it was messing with css for some reason
  document.getElementById('q2').style.display='block';
}
