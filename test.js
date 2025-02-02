var mind = 100;
var body = 100;
var soul = 100;

var currentSchedule = [[ false, false, false, false, false, false, "wakeup", "food", "exercise", "exercise", "work", "food", "active liesure", "chill", "chill", "chill", "food", "chill",
"active liesure", "chill", "chill", "sleep" ], [ false, false, false, false, false, false, "wakeup", "food", "exercise", "exercise", "work", "food", "active liesure", "chill", "chill", "chill", "food", "chill",
"active liesure", "chill", "chill", "sleep" ], [ false, false, false, false, false, false, "wakeup", "food", "exercise", "exercise", "work", "food", "active liesure", "chill", "chill", "chill", "food", "chill",
"active liesure", "chill", "chill", "sleep" ], [ false, false, false, false, false, false, "wakeup", "food", "exercise", "exercise", "work", "food", "active liesure", "chill", "chill", "chill", "food", "chill",
"active liesure", "chill", "chill", "sleep" ], [ false, false, false, false, false, false, "wakeup", "food", "exercise", "exercise", "work", "food", "active liesure", "chill", "chill", "chill", "food", "chill",
"active liesure", "chill", "chill", "sleep" ], [ false, false, false, false, false, false, "wakeup", "food", "exercise", "exercise", "work", "food", "active liesure", "chill", "chill", "chill", "food", "chill",
"active liesure", "chill", "chill", "sleep" ], [ false, false, false, false, false, false, "wakeup", "food", "exercise", "exercise", "work", "food", "active liesure", "chill", "chill", "chill", "food", "chill",
"active liesure", "chill", "chill", "sleep" ]];

var obligations = [{6:"first thing", 7:"breakfast", 8:"run", 10:"code", 11:"lunch", 4:"dinner", 9:"sleep"}, {6:"first thing", 7:"breakfast", 8:"run", 10:"code", 11:"lunch", 4:"dinner", 9:"sleep"}, {6:"first thing", 7:"breakfast", 8:"run", 10:"code", 11:"lunch", 4:"dinner", 9:"sleep"}, {6:"first thing", 7:"breakfast", 8:"run", 10:"code", 11:"lunch", 4:"dinner", 9:"sleep"}, {6:"first thing", 7:"breakfast", 8:"run", 10:"code", 11:"lunch", 4:"dinner", 9:"sleep"}, {6:"first thing", 7:"breakfast", 8:"run", 10:"code", 11:"lunch", 4:"dinner", 9:"sleep"}, {6:"first thing", 7:"breakfast", 8:"run", 10:"code", 11:"lunch", 4:"dinner", 9:"sleep"}];

var toDo = [["walk dogs", "reading"], ["walk dogs", "reading"], ["walk dogs", "reading"], ["walk dogs", "reading"], ["walk dogs", "reading"], ["walk dogs", "reading"], ["walk dogs", "reading"]];

var activities = { "mind": ["reading", "video games", "television"],
              "body": ["yoga", "gym", "run"],
              "soul": ["food with friends", "baking", "meditation"] };

class Schedule {
  constructor(scheduleData, toDo, obligations, age, likesJob, mood, favoriteThings, dislikes) {
    this.scheduleData = scheduleData;
    this.toDo = toDo;
    this.obligations = obligations;
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
    this.work = this.work();
    this.idealFreeTime = this.idealFreeTime();
    this.sleepDeviation = this.sleepDeviation();
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
    for (var i = 0; i < 7; i++) {
      var size = this.scheduleData[i].length;
      this.scheduleData[i].forEach((hour) => {
        if (hour == false) { size--; }
      });
      time.push(size - (Object.keys(this.obligations[i]).length + this.toDo[i].length));
    }
    return time;
  }

  idealFreeTime() {
    var free = new Array();
    for (var i = 0; i < 7; i++) {
      if (this.work[i]) { free.push(2.5); }
      if (!this.work[i]) { free.push(5); }
    }
    return free;
  }

  work() {
    var works = [false, false, false, false, false, false, false];
    for (var i = 0; i < 7; i++) {
      this.scheduleData[i].forEach((hour) => {
        if (hour == "work") { works[i] = true;}
      });
    }
    return works;
  }

  averageFreeTime() {
    var avgByDay = {"workdays": 0, "days": 0};
    for (var i = 0; i < 7; i++) {
      if (this.work[i]) {avgByDay["workdays"] += this.freeTime[i];}
      if (!this.work[i]) {avgByDay["days"] += this.freeTime[i];}
    }
    var numDays = {"workdays": 0, "days": 0};
    for (var i = 0; i < 7; i++) {
      if (this.work[i]) { numDays["workdays"]++; }
      if (this.work[i]) { numDays["days"]++; }
    }
    avgByDay["workdays"] /= numDays["workdays"];
    avgByDay["days"] /= numDays["days"];
    return avgByDay;
  }

  sleepDeviation() {
    var mean = 0;
    this.bedtime.forEach((i) => {
      mean += this.bedtime[i];
    });
    mean /= 7;

    var sd = 0;
    this.bedtime.forEach((i) => {
      sd += Math.pow((this.bedtime[i] - mean), 2);
    });

    sd = Math.sqrt(sd)/7;
    return sd;
  }

  interaction() {

    this.scheduleData.forEach((day) => {
      day.forEach((hour) => {
        if (hour == "interaction") {
          return true;}
      });
    });
    return false;
  }


  calcIdealness() {
    mind = 100;
    body = 100;
    soul = 100;


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
    }}

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

  //make bedtime the mean bedTime
  //make sleep time the time that is closest in range
  //subtract some free time or add (randoized)
  //add exercise
  //add at least one hour interaction

  //calc idealness after change, then add mind body soul, then calc again

  change() {
    var mean = 0;
    this.bedtime.forEach((i) => {
      mean += this.bedtime[i];
    });
    mean /= 7;
    this.bedtime.forEach((i) => {
      this.bedtime[i] = mean;
    });

    mean = 0;
    this.sleep.forEach((i) => {
      mean += this.sleep[i];
    });
    mean /= 7;
    if (mean > this.idealSleep[0] && mean < this.idealSleep[1]) { this.sleep = (idealSleep[0] + idealSleep[1]) / 2; }
    else if (mean < this.idealSleep[0]) { this.sleep = idealSleep[0]; }
    else if (mean > this.idealSleep[1]) { this.sleep = idealSleep[1]; }

      this.wakeup.forEach((i) => {
        this.wakeup[i] = this.bedtime[i] - (24 - this.sleep);
      });

    var avgFree = this.averageFreeTime();
    //go through number of days and spread out the free time based on average amount of time availible and ideal :)
    //go through all days, if workday and less, find max avail time,
    //if freedays have a lot more, move toDos to freedays after origional movement

    this.scheduleData.forEach((day, i) => {
      if (this.work[i] && this.freeTime[i] < avgFree["workday"]) {
        day.forEach((hour, i) => {
          var hours = new Array();
          if (!Object.keys(this.obligations).includes(i) &&) {
            hours.push(Math.random()*10);
          }
        });
       }
    });

    //exercise
    //iteraction






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
var mySchedule = new Schedule(currentSchedule, toDo, obligations, 18, true, 0, "Hi", "bye");
mySchedule.calcIdealness();
console.log(mind + " " + body + " " + soul);
mySchedule.change();
mySchedule.calcIdealness();
console.log(mind + " " + body + " " + soul);
