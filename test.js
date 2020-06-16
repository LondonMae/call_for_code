var mind = 100;
var body = 100;
var soul = 100;
var idealExercise = 5;
var totalExercise = 0;

var currentSchedule = [[ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ]];

var obligations = [ true, true, false, false, true, true, true, false, false, false, true, false, true, false, false, true ];
//basically data holder
class Schedule {
  constructor(scheduleData, likesSleep, morningPerson, likesJob, mood, favoriteThings, dislikes, exercise, interaction, age, work) {
    this.scheduleData = scheduleData;
    this.wakeup = this.wakeup();
    this.bedtime = this.bedtime();
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
    this.sleep = this.sleep();
    this.idealSleep = this.idealSleep;
    this.work = work;
  }

  wakeup() {
    var wakeupTime = new Array(7);
    this.scheduleData.forEach((schedule, i) => {
      wakeupTime.push((schedule.indexOf("wakeup") + 1));
    });
    return wakeupTime;
  }

  bedtime() {
    var bedTime = new Array(7);
    this.scheduleData.forEach((schedule, i) => {
      bedTime.push((schedule.indexOf("sleep") + 1));
    });
    return bedTime;
  }

  sleep() {
    var sleepTimes = new Array(7);
    for (var i = 0; i < this.wakeup.length; i++) {
      sleepTimes.push((24 - this.bedtime[i]) + this.wakeup[i]);
      console.log((24 - this.bedtime[i]) + this.wakeup[i]);
    }
    return sleepTimes;
  }

  idealSleep() {
    var idealSleep;
    if (this.age <= 12 && this.age > 6) {idealSleep = [9,12]; }
    else if (this.age > 12 && this.age <= 18) { idealSleep = [8,10]; }
    else if (this.age > 18 && this.age <= 60) { idealSleep = [7,24]; }
    else if (this.age > 60 && this.age <= 64) { idealSleep = [7,9]; }
    else if (this.age > 64 && this.age <= 120) { idealSleep = [7,8]; }
    return idealSleep;
  }

  exercise() {
    var totalExercise = 0;
    this.scheduleData.forEach((schedule, i) => {
      schedule.forEach((hour, j) => {
        if (hour == "exercise") { totalExercise += 1; }
      });
    });
    return totalExercise;
  }

  amountOfFreeTime() {

    var size = this.scheduleData.length;
    this.scheduleData.forEach((item, i) => {
      if (!item) { size--; }
    });

    var obligations = new Array(size);

    var freeTime = 0;
    for (var i = 0; i < obligations.length; i++) {
      if(!obligations[i]) { freeTime += 1; }
    }
    return freeTime;
  }

  idealFreeTime() {
    //if work 2.5, if not then  5
    if (this.work) { this.idealFreeTime = 2.5; }
    if (!this.work) { this.idealFreeTime = 5; }

  }

  sleepDeviation() {

  }

  interaction() {

  }

  calcIdealness() {

    for (var i = 0; i < this.sleep.length; i++) {
      if (this.sleep[i] < this.idealSleep[0] || this.sleep[i] > this.idealSleep[1]) {
        console.log(this.sleep[i] + " " + this.idealSleep[0]);
        var low = Math.abs(this.sleep[i] - this.idealSleep[0]);
        var high = Math.abs(this.sleep[i] - this.idealSleep[1]);
        if (low >= high) {
          mind -= low*11/7;
          body -= low;
        }
        else {
          mind -= high*11/7;
          body -= high;
         }
      }
    }


    //for loop for each day
    var timeDiff = Math.abs(this.idealFreeTime-this.freeTime);
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
    //
    // if (!interaction) { soul -= 30; }


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
