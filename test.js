var mind = 100;
var body = 100;
var soul = 100;

var currentSchedule = [[ false, false, false, false, false, false, "wakeup", "breakfast", "exercise", "exercise", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "exercise", "exercise", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "exercise", "exercise", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "exercise", "exercise", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "exercise", "exercise", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "exercise", "exercise", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "interaction", "sleep" ], [ false, false, false, false, false, false, "wakeup", "breakfast", "exercise", "exercise", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ]];

var activities = { "mind": ["reading", "video games", "television"],
              "body": ["yoga", "gym", "run"],
              "soul": ["food with friends", "baking", "meditation"] };

var obligations = [ true, true, false, false, true, true, true, false, false, false, true, false, true, false, false, true ];

class Schedule {
  constructor(scheduleData, age, likesJob, mood, favoriteThings, dislikes, interaction, work) {
    this.scheduleData = scheduleData;
    this.wakeup = this.wakeup();
    this.bedtime = this.bedtime();
    this.age = age;
    this.likesJob = likesJob;
    this.mood = mood;
    this.favoriteThings = favoriteThings;
    this.dislikes = dislikes;
    this.exercise = this.exercise();
    this.idealExercise = this.idealExercise();
    this.interaction = this.interaction();
    this.freeTime = this.amountOfFreeTime();
    this.sleep = this.sleep();
    this.idealSleep = this.idealSleep();
    this.idealFreeTime = this.idealFreeTime();
    this.sleepDeviation = this.sleepDeviation();
    this.work = work;
  }

  wakeup() {
    var wakeupTime = new Array();
    this.scheduleData.forEach((schedule) => {
      wakeupTime.push((schedule.indexOf("wakeup") + 1));
    });
    return wakeupTime;
  }

  bedtime() {
    var bedTime = new Array();
    this.scheduleData.forEach((schedule) => {
      bedTime.push((schedule.indexOf("sleep") + 1));
    });
    return bedTime;
  }

  sleep() {
    var sleepTimes = new Array();
    for (var i = 0; i < this.wakeup.length; i++) {
      sleepTimes.push((24 - this.bedtime[i]) + this.wakeup[i]);
    }
    return sleepTimes;
  }

  idealSleep() {
    var idealSleep = new Array();
    if (this.age <= 12 && this.age > 6) {idealSleep = [9,12]; }
    else if (this.age > 12 && this.age <= 18) { idealSleep = [8,10]; }
    else if (this.age > 18 && this.age <= 60) { idealSleep = [7,24]; }
    else if (this.age > 60 && this.age <= 64) { idealSleep = [7,9]; }
    else if (this.age > 64 && this.age <= 120) { idealSleep = [7,8]; }
    return idealSleep;
  }

  exercise() {
    var totalExercise = 0;
    this.scheduleData.forEach((schedule) => {
      schedule.forEach((hour) => {
        if (hour == "exercise") { totalExercise+=60;}
      });
    });
    return totalExercise;
  }

  idealExercise() {
    if (this.age < 65) { return 300; }
    else { return false; }
  }

  //incomplete
  amountOfFreeTime() {
    var time = new Array();

    for (var j = 0; j < 7; j++) {
      var size = this.scheduleData.length;
      this.scheduleData.forEach((item, i) => {
        if (!item) { size--; }
      });
    var obligations = new Array(size);
    //fill obligations array

    var freeTime = 0;
    for (var i = 0; i < obligations.length; i++) {
      if(!obligations[i]) { freeTime += 1; }
    }
      time.push(freeTime);
    }
    return time;
  }

  idealFreeTime() {
    var free = new Array();
    for (var i = 0; i < 7; i++) {
      if (this.work) { free.push(2.5); }
      if (!this.work) { free.push(5); }
    }
    return free;
  }

  work() {

  }

  sleepDeviation() {
    var mean = 0;
    this.bedtime.forEach((day, i) => {
      mean += this.bedtime[i];
    });
    mean /= 7;

    var sd = 0;
    this.bedtime.forEach((day, i) => {
      sd += Math.pow((this.bedtime[i] - mean), 2);
    });

    sd = Math.sqrt(sd)/7;
    return sd;
  }

  interaction() {

    this.scheduleData.forEach((day, i) => {
      day.forEach((hour, i) => {
        if (hour == "interaction") {
          return true;}
      });
    });
    return false;
  }


  sleeping() {
    for (var i = 0; i < this.sleep.length; i++) {
      if (this.sleep[i] < this.idealSleep[0] || this.sleep[i] > this.idealSleep[1]) {
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
    }}}


    var timeDiff;
    for (var i = 0; i < 7; i++) {
      timeDiff = Math.abs(this.idealFreeTime[i]-this.freeTime[i]);
      mind -= (timeDiff*6/7);
      body -= (timeDiff*3/7);
      soul -= (timeDiff*3/7);
    }


    if (this.idealExercise != false) {
      var exerciseDiff = this.idealExercise - this.exercise;
      if (exerciseDiff > 0) {
        if (exerciseDiff < 150) {body -= (exerciseDiff/20);}
        else {body -= (exerciseDiff/10);}
    }}


    if (!this.likesJob) {
      mind -= 10;
      soul -= 30;
    }


    soul -= this.mood/5;


    if (!this.interaction) { soul -= 30; } //tbd if efficient... maybe just ask user


    this.mind -= this.sleepDeviation*6;
    this.body -= this.sleepDeviation*4;

  }

  //for lowest score implement morse of those activities
//fix problems first
//put in obligations
//add chosen mind related activities
  addMind() {

  }

  //add chosen body related activities
  addBody(){

  }

  //add chosen soul related activites
  addSoul(){

  }


  get newSchedule(){

  }

  //what's left?
  // subtract the bad things, add the good things, account for social distancing


}

//current user schedule
var mySchedule = new Schedule(currentSchedule, 18, true, 0, "Hi", "bye", false);
mySchedule.calcIdealness();
console.log(mySchedule.order());
console.log(mind + " " + body + " " + soul);
