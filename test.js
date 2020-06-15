var mind = 100;
var body = 100;
var soul = 100;
var idealFreeTime = 2.5;
var idealExercise = 5;
var totalExercise = 0;

var currentSchedule = [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ];

var obligations = [ true, true, false, false, true, true, true, false, false, false, true, false, true, false, false, true ];
//basically data holder
class Schedule {
  constructor(scheduleData, likesSleep, morningPerson, likesJob, mood, favoriteThings, dislikes, exercise, interaction, age) {
    this.wakeup = (scheduleData.indexOf("wakeup") + 1); //turn into daily array
    this.bedtime = (scheduleData.indexOf("sleep") + 1); //turn into daily array
    this.scheduleData = scheduleData;
    this.obligations = this.obligations();
    this.sleepApproval = likesSleep;
    this.morningPerson = morningPerson;
    this.age = age;
    this.likesJob = likesJob;
    this.mood = mood;
    this.favoriteThings = favoriteThings;
    this.dislikes = dislikes;
    this.exercise = this.exercise(); //turn into total
    this.interaction = interaction; //turn into daily array;
    this.freeTime = this.amountOfFreeTime(); //turn into daily array
    this.sleep = (24 - this.bedtime) + this.wakeup;
    this.idealSleep = this.idealSleep;
  }

  idealSleep() {
    var idealSleep;
    if (this.age <= 12 && this.age > 6) {idealSleep = [9,12]; }
    else if (this.age > 12 && this.age <= 18) { return idealSleep = [8,10]; }
    else if (this.age > 18 && this.age <= 60) {return idealSleep = [7,24]; }
    else if (this.age > 60 && this.age <= 64) {return idealSleep = [7,9]; }
    else if (this.age > 64 && this.age <= 120) { return idealSleep = [7,8]; }
    else { return "invalid age, please try again"; }
  }

  obligations() {

    var size = this.scheduleData.length;
    this.scheduleData.forEach((item, i) => {
      if (!item) { size--; }
    });

    var obligations = new array(size);
    //coem back to this when schedule system is set up

  }

  exercise() {

  }

  amountOfFreeTime() {
    var freeTime = 0;
    for (var i = 0; i < obligations.length; i++) {
      if(!obligations[i]) { freeTime += 1; }
    }
    return freeTime;
  }

  idealFreeTime() {
    //if work 2.5, if not then  5
    if (work)
  }

  sleepDeviation() {

  }

  interaction() {

  }

  calcIdealness() {

    if (this.sleep < this.idealSleep[0] && this.sleep > this.idealSleep[1]) {
      var low = Math.abs(this.sleep - this.idealSleep[0]);
      var high = Math.abs(this.sleep - this.idealSleep[1]);
      if (low >= high) {
        mind -= low*11;
        body -= low *7;
      }
      else {
        mind -= high*11;
        body -= high*7;
       }
    }

    //for loop for each day
    var timeDiff = Math.abs(idealFreeTime-this.freeTime);
    mind -= (timeDiff*10);
    body -= (timeDiff*5);
    soul -= (timeDiff*5);


    var exerciseDiff = idealExercise - this.exercise;
    if (exerciseDiff > 0) {body -= (exerciseDiff*15);}

    if (!this.likesJob) {
      mind -= 10;
      soul -= 30;
    }

    soul -= this.mood/5;


  }




  get idealness(){

  }

  addMind() {

  }

  addBody(){

  }

  addSoul(){

  }


  get newSchedule(){

  }

}

//current user schedule
var mySchedule = new Schedule(currentSchedule, obligations, false, true, true, 30, "horses", "drinking", 1, true);

mySchedule.calcIdealness();
console.log(mind + " " + body + " " + soul);//compute maximum mind body soul based on obligations

//data for questions
