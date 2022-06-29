import express from 'express';
import passport from 'passport';
import User, { MonthlySessions } from '../models/index.js';
import { DateTime } from 'luxon';

const updateDataController = express.Router();

// update user's weekly stats
updateDataController.put(
  '/weeklystats/:focustime/:breaktime/:taskscompleted/:cycle',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const userid = req.user._id;
      const focusTime = Number(req.params.focustime);
      const breakTime = Number(req.params.breaktime);
      const taskCompleted = Number(req.params.taskscompleted); 
      const cycle = Number(req.params.cycle); 
   
      // const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const user = await User.findOne({_id: userid}); 
      // determines if a new item needs to be created for today in weeklyStats
      let initializeDailyStats = true;

      if(user.weeklyStats.length > 0) {
        user.weeklyStats.sort((a, b) => b.date - a.date)
        const sevenDaysPriorDate = new Date(DateTime.now().plus({days: -6}).toISO());
        
        for(let i=0; i<user.weeklyStats.length; i++) {
          const day = user.weeklyStats[i];

          // find today's record and update stats
          if(day.date.getFullYear() == new Date().getFullYear() 
            && day.date.getMonth() == new Date().getMonth() 
            && day.date.getDate() == new Date().getDate()) {
              user.weeklyStats[i] = {
                date: new Date(),
                sessionCount: day.sessionCount += 1,
                cycleCount: day.cycleCount += cycle,
                taskCompletionCount: day.taskCompletionCount += taskCompleted,
                totalFocusTime: day.totalFocusTime += focusTime*60*1000,
                totalBreakTime: day.totalBreakTime += breakTime*60*1000,
              };

              // if a record for today was found, set this to false so that a new dailystats for today isn't created and added
              initializeDailyStats = false;
          }

          // clean up - if the record is older than 7 days, remove it
          if (user.weeklyStats[i].date < sevenDaysPriorDate) {
            const removed = user.weeklyStats.splice(i,1);
            i--;
          }
        }
      } 

      // create a daily stats for today
      if (user.weeklyStats.length === 0 || initializeDailyStats) { 
        const weeklyStats = {
          date: new Date(),
          sessionCount: 1,
          cycleCount: 0,
          taskCompletionCount: 0,
          totalFocusTime: 0,
          totalBreakTime: 0,
        };

        user.weeklyStats.push(weeklyStats);
      } 

      // save changes
      await user.save();
      res.json(user);
    } catch (e) {
      console.error(e.message);
    }
  }
);

// 
updateDataController.post(
  '/stats/:cycle',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const userid = req.user._id;
      const cycleCount = req.params.cycle;
      const newSession = req.body;
      const options = { 
        upsert: true, 
        new: true, 
        setDefaultsOnInsert: true, 
        rawResult: false 
      };

      // const monthStartDate = new Date(new Date().getFullYear(), new Date().getMonth, 1);
      // console.log(monthStartDate)
      // const user = await MonthlySessions.findOne({_id: userid, startDate:{$gte: monthStartDate}}, options); 
      
      // find document matching user & date:
      //    if none found, create a new document for the date
      const dailySession = await MonthlySessions.findOneAndUpdate({ userId: '62b53d565effc13d8230a2d8' }, {}, options);

      // add new session data to the document
      dailySession.totalSessionCount = dailySession.totalSessionCount + 1;
      dailySession.totalCycleCount = dailySession.totalCycleCount + cycleCount;
      dailySession.session.push(newSession);
      dailySession.save();

      // new document:
      // user.startDate = monthStartDate;

      res.json(dailySession);
    } catch (e) {
      console.error(e.message);
    }
  }
);

// temporary function
const test = async () => {
  try {
    const cycleCount = 0;
    const newSession = {
      sessionDateTime: new Date(),
      focusTime: 60,
      breakTime: 14,
    };
    console.log('test');
    const options = { upsert: true, new: true, setDefaultsOnInsert: true, rawResult: false };
    
    // find document matching user & date:
    //    if none found, create a new document for the date
    const userDailySession = await MonthlySessions.findOneAndUpdate({ userId: '62b53d565effc13d8230a2d8' }, {}, options)

    userDailySession.totalSessionCount = userDailySession.totalSessionCount + 1;
    userDailySession.totalCycleCount = userDailySession.totalCycleCount + cycleCount;
    userDailySession.session.push(newSession);
    userDailySession.save();
    
  } catch (e) {
    console.error(e.message);
  }
}
test();

// TO REMOVE
const update = async () => {
  try {
    const oneUser = new User({
      email: 'jeannie@ggmail.coms',
      hashedPassword: 'pwd',
      weeklyStats: [{
        date: new Date('2022-06-10'),
        sessionCount: 1,
        totalFocusTime: 45*1000*60,
      },
      {
        date: new Date('2022-05-10'),
        sessionCount: 1,
        totalFocusTime: 45*1000*60,
      }]
    });
    console.log('add a user', oneUser);
    // await oneUser.save();
    // console.log('add a user 2', oneUser)
    // const User = await User.find(  );

  // const user = await User.find( {'weeklyStats.date': new Date(DateTime.now().toFormat('yyyy-MM-dd'))}); // this format/type works
  console.log('test time - query: ', new Date(new DateTime(2022,5,10,0,0,0).toFormat('yyyy-MM-dd')));
  
  //  new DateTime(2022,6,24,3,11,0).toISO()
    // const user = await User.find( {'weeklyStats.date': new Date(new DateTime(2022,5,10,0,0,0))});

    const user = await User.aggregate ([
      { $match: { 
          "weeklyStats.date": { $lt: new Date('2022-06-11')},
        } 
      },
      {
        $project: {
          email: "$email",
          weeklyStats: {
            $map: 
            {
              input: '$weeklyStats',
              as: 'item',
              in: {
                dateUTC: {
                  $dateToString: { format: "%Y-%m-%dT%H:%M", date: "$$item.date", timezone: "UTC" } },
                
                dateHonolulu: {
                  $dateToString: { format: "%Y-%m-%dT%H:%M", date: "$$item.date", timezone: "Pacific/Honolulu" } },
                }
              }
            },
          updatedAtUTC: {
            $dateToString: {format: "%Y-%m-%dT%H:%M", date: "$updatedAt", timezone: "UTC" } 
          },
          updatedAtHonolulu: {
            $dateToString: { format: "%Y-%m-%dT%H:%M", date: "$updatedAt", timezone: "Pacific/Honolulu" }
          },
        }
      }
    ]);

  } catch (e) {
    console.log(e.message);
  }
}
// update();

export default updateDataController;
